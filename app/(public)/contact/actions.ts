"use server";

import { z } from "zod";
import { env } from "@/lib/env";
import { getResendClient } from "@/lib/resend/client";
import type { ServerActionState } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  company: z.string().optional(),
  message: z.string().min(20, "Share at least a little detail so we can help well."),
});

export async function submitContactAction(input: {
  name: string;
  email: string;
  company?: string;
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

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.SUPPORT_EMAIL ?? env.RESEND_FROM_EMAIL,
      replyTo: parsed.data.email,
      subject: `New academy inquiry from ${parsed.data.name}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        `Company: ${parsed.data.company || "N/A"}`,
        "",
        parsed.data.message,
      ].join("\n"),
    });

    return {
      status: "success",
      message: "Thanks for reaching out. We will follow up soon.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to send your message right now.",
    };
  }
}
