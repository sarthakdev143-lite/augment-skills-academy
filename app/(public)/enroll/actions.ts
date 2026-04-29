"use server";

import { z } from "zod";
import { EnrollmentConfirmation } from "@/emails/enrollment-confirmation";
import { env, isSupabaseConfigured } from "@/lib/env";
import { getResendClient } from "@/lib/resend/client";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getSupabaseSchemaStatus } from "@/lib/supabase/schema";
import type { ServerActionState } from "@/types";

const enrollmentSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(10, "Enter at least 10 digits."),
  courseSlug: z.string().min(1),
  courseName: z.string().min(1),
  selectedTrack: z.string().optional(),
  backgroundLevel: z.string().min(1, "Select your current background."),
  preferredStartDate: z.string().optional(),
  additionalInfo: z.string().optional(),
});

async function sendSupportNotification(input: z.infer<typeof enrollmentSchema>) {
  const resend = getResendClient();
  const supportEmail = env.SUPPORT_EMAIL ?? env.RESEND_FROM_EMAIL;

  if (!supportEmail) {
    throw new Error("Support email is not configured");
  }

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL ?? "augmentskillacademy@gmail.com",
    to: supportEmail,
    subject: `New enrollment request from ${input.name}`,
    text: [
      "A new enrollment request was received.",
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      `Course: ${input.courseName}`,
      `Track: ${input.selectedTrack ?? "Not specified"}`,
      `Background: ${input.backgroundLevel}`,
      `Preferred start date: ${input.preferredStartDate || "Not specified"}`,
      "",
      "Additional info:",
      input.additionalInfo || "None",
    ].join("\n"),
  });
}

async function sendSubmitterConfirmation(input: z.infer<typeof enrollmentSchema>) {
  const resend = getResendClient();

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL ?? "augmentskillacademy@gmail.com",
    to: input.email,
    subject: "You're enrolled at Augment Skills Academy",
    react: EnrollmentConfirmation({
      studentName: input.name,
      courseName: input.courseName,
      selectedTrack: input.selectedTrack,
    }),
  });
}

export async function submitEnrollmentAction(input: z.infer<typeof enrollmentSchema>): Promise<ServerActionState> {
  const parsed = enrollmentSchema.safeParse(input);

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
      message: "Supabase is not configured for enrollments.",
    };
  }

  const schemaStatus = await getSupabaseSchemaStatus();
  let storedInSupabase = false;
  let deliveredByEmail = false;

  try {
    try {
      if (schemaStatus.status === "ready") {
        const supabase = createSupabaseAdminClient();
        const { error } = await supabase.from("enrollment_requests").insert({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          course_slug: parsed.data.courseSlug,
          course_name: parsed.data.courseName,
          selected_track: parsed.data.selectedTrack ?? null,
          background_level: parsed.data.backgroundLevel,
          preferred_start_date: parsed.data.preferredStartDate || null,
          additional_info: parsed.data.additionalInfo || null,
        });

        if (error) {
          throw error;
        }
        storedInSupabase = true;
      }
    } catch (error) {
      console.error("Enrollment storage failed", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unable to store enrollment right now.");
    }

    try {
      await sendSupportNotification(parsed.data);
      deliveredByEmail = true;
    } catch {
      console.error("Enrollment support notification failed");
    }

    try {
      await sendSubmitterConfirmation(parsed.data);
    } catch {
      // Silent fallback by request.
    }

    if (!storedInSupabase && !deliveredByEmail) {
      return {
        status: "error",
        message: "Unable to submit your enrollment right now.",
      };
    }

    return {
      status: "success",
      message: storedInSupabase
        ? `You're in. We've received your enrollment request. Our team will reach out to ${parsed.data.email} within 24 hours.`
        : `You're in. Your enrollment request was routed directly to our team and we'll reach out to ${parsed.data.email} within 24 hours.`,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to submit your enrollment right now.",
    };
  }
}
