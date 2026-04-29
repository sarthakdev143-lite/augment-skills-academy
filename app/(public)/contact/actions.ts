"use server";

import { z } from "zod";
import { env } from "@/lib/env";
import { getResendClient } from "@/lib/resend/client";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getSupabaseSchemaStatus } from "@/lib/supabase/schema";
import { isSupabaseConfigured } from "@/lib/env";
import type { ServerActionState } from "@/types";

function getDigitsOnlyPhone(value: string) {
  return value.replace(/\D/g, "");
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((value) => getDigitsOnlyPhone(value).length >= 10, "Enter at least 10 digits."),
  message: z.string().trim().min(20, "Share at least a little detail so we can help well."),
});

function isMissingContactSubmissionsTable(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as { code?: string; message?: string };
  return candidate.code === "PGRST205" || candidate.message?.includes("contact_submissions") === true;
}

async function sendSupportNotification(input: z.infer<typeof contactSchema>) {
  const resend = getResendClient();
  const supportEmail = env.SUPPORT_EMAIL ?? env.RESEND_FROM_EMAIL;

  if (!supportEmail) {
    throw new Error("Support email is not configured");
  }

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL ?? "augmentskillacademy@gmail.com",
    to: supportEmail,
    subject: `New contact submission from ${input.name}`,
    text: [
      "A new contact form submission was received.",
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
  });
}

async function sendSubmitterConfirmation(input: z.infer<typeof contactSchema>) {
  const resend = getResendClient();

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL ?? "augmentskillacademy@gmail.com",
    to: input.email,
    subject: "We received your message - Augment Skills Academy",
    text: "We got your message! The Augment Skills Academy team will be in touch soon. - augmentskillacademy@gmail.com",
  });
}

export async function submitContactAction(_prevState: ServerActionState, formData: FormData): Promise<ServerActionState> {
  const input = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message: "Supabase is not configured for contact submissions.",
    };
  }

  const schemaStatus = await getSupabaseSchemaStatus();
  let storedInSupabase = false;
  let deliveredByEmail = false;

  if (schemaStatus.status === "ready") {
    try {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message,
      });

      if (error) {
        throw error;
      }
      storedInSupabase = true;
    } catch (error) {
      console.error("Contact submission failed", error);

      if (!isMissingContactSubmissionsTable(error)) {
        return {
          status: "error",
          message: "Unable to submit your message right now.",
        };
      }
    }
  }

  try {
    await sendSupportNotification(parsed.data);
    deliveredByEmail = true;
  } catch (error) {
    console.error("Contact support notification failed", error);
  }

  try {
    await sendSubmitterConfirmation(parsed.data);
  } catch {
    // Silent fallback by request.
  }

  if (!storedInSupabase && !deliveredByEmail) {
    return {
      status: "error",
      message: "Unable to submit your message right now.",
    };
  }

  return {
    status: "success",
    message: storedInSupabase
      ? `Thanks for reaching out! We'll get back to you at ${parsed.data.email} within 24 hours.`
      : `Thanks for reaching out! Your message was routed directly to our team and we'll get back to you at ${parsed.data.email} within 24 hours.`,
  };
}
