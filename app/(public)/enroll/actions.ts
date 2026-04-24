"use server";

import { z } from "zod";
import { EnrollmentConfirmation } from "@/emails/enrollment-confirmation";
import { env, isSupabaseConfigured } from "@/lib/env";
import { getResendClient } from "@/lib/resend/client";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
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

  try {
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

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: env.RESEND_FROM_EMAIL ?? "augmentskillacademy@gmail.com",
        to: parsed.data.email,
        subject: "You're enrolled at Augment Skills Academy",
        react: EnrollmentConfirmation({
          studentName: parsed.data.name,
          courseName: parsed.data.courseName,
          selectedTrack: parsed.data.selectedTrack,
        }),
      });
    } catch {
      // Silent fallback by request.
    }

    return {
      status: "success",
      message: `You're in. We've received your enrollment request. Our team will reach out to ${parsed.data.email} within 24 hours.`,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to submit your enrollment right now.",
    };
  }
}
