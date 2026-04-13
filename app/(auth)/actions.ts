"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { WelcomeEmail } from "@/emails/welcome-email";
import { env } from "@/lib/env";
import { getResendClient } from "@/lib/resend/client";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import type { ServerActionState } from "@/types";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(2, "Please enter your full name."),
});

const emailOnlySchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

function validationError(
  message: string,
  fieldErrors: Record<string, string[] | undefined>,
): ServerActionState {
  return {
    status: "error",
    message,
    fieldErrors,
  };
}

export async function signInAction(input: {
  email: string;
  password: string;
}): Promise<ServerActionState> {
  const parsed = signInSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(
      "Please check your credentials and try again.",
      parsed.error.flatten().fieldErrors,
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword(parsed.data);

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    revalidatePath("/", "layout");

    return {
      status: "success",
      message: "Welcome back.",
      redirectTo: "/dashboard",
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to sign in.",
    };
  }
}

export async function signUpAction(input: {
  fullName: string;
  email: string;
  password: string;
}): Promise<ServerActionState> {
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(
      "Please complete the required fields.",
      parsed.error.flatten().fieldErrors,
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard`,
        data: {
          full_name: parsed.data.fullName,
          role: "student",
        },
      },
    });

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    if (data.user?.id) {
      const admin = createSupabaseAdminClient();
      await admin.from("profiles").upsert({
        id: data.user.id,
        full_name: parsed.data.fullName,
        role: "student",
      });
    }

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: env.RESEND_FROM_EMAIL,
        to: parsed.data.email,
        subject: "Welcome to Augment Skills Academy",
        react: WelcomeEmail({ userName: parsed.data.fullName }),
      });
    } catch {
      // Avoid blocking sign-up on email delivery issues.
    }

    revalidatePath("/", "layout");

    return {
      status: "success",
      message:
        "Your account has been created. Check your inbox to verify your email before signing in.",
      redirectTo: "/login",
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to create account.",
    };
  }
}

export async function requestMagicLinkAction(input: {
  email: string;
}): Promise<ServerActionState> {
  const parsed = emailOnlySchema.safeParse(input);

  if (!parsed.success) {
    return validationError(
      "Enter a valid email to receive a magic link.",
      parsed.error.flatten().fieldErrors,
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: parsed.data.email,
      options: {
        emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "success",
      message: "Magic link sent. Check your inbox to continue.",
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to send magic link.",
    };
  }
}

export async function requestPasswordResetAction(input: {
  email: string;
}): Promise<ServerActionState> {
  const parsed = emailOnlySchema.safeParse(input);

  if (!parsed.success) {
    return validationError(
      "Enter a valid email to request a password reset.",
      parsed.error.flatten().fieldErrors,
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/reset-password`,
    });

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "success",
      message: "Password reset instructions are on the way.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to request password reset.",
    };
  }
}

export async function signInWithGoogleAction(): Promise<ServerActionState> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard`,
      },
    });

    if (error || !data.url) {
      return {
        status: "error",
        message: error?.message ?? "Unable to start Google sign-in.",
      };
    }

    return {
      status: "success",
      redirectTo: data.url,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to start Google sign-in.",
    };
  }
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
