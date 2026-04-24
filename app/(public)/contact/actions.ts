"use server";

import { z } from "zod";
import { env } from "@/lib/env";
import { getResendClient } from "@/lib/resend/client";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { ServerActionState } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  message: z.string().min(20, "Share at least a little detail so we can help well."),
});

export async function submitContactAction(input: {
  name: string;
  email: string;
  message: string;
}): Promise<ServerActionState> {
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

  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    });

    if (error) {
      throw error;
    }

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: env.RESEND_FROM_EMAIL ?? "augmentskillacademy@gmail.com",
        to: parsed.data.email,
        subject: "We received your message - Augment Skills Academy",
        text: "We got your message! The Augment Skills Academy team will be in touch soon. - augmentskillacademy@gmail.com",
      });
    } catch {
      // Silent fallback by request.
    }

    return {
      status: "success",
      message: `Thanks for reaching out! We'll get back to you at ${parsed.data.email} within 24 hours.`,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to submit your message right now.",
    };
  }
}
