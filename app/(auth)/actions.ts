"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { WelcomeEmail } from "@/emails/welcome-email";
import { getSafeRedirectPath } from "@/lib/auth";
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

const passwordResetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
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

async function getAppUrl() {
  const headerStore = await headers();
  const origin = headerStore.get("origin");

  if (origin) {
    return origin;
  }

  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost ?? headerStore.get("host");

  if (host) {
    const protocol =
      headerStore.get("x-forwarded-proto") ??
      (env.NEXT_PUBLIC_APP_URL.startsWith("https://") ? "https" : "http");

    return `${protocol}://${host}`;
  }

  return env.NEXT_PUBLIC_APP_URL;
}

async function buildAuthCallbackUrl(next: string) {
  const url = new URL("/auth/callback", await getAppUrl());
  url.searchParams.set("next", getSafeRedirectPath(next));
  return url.toString();
}

export async function signInAction(input: {
  email: string;
  password: string;
  next?: string | null;
}): Promise<ServerActionState> {
  const nextPath = getSafeRedirectPath(input.next);
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
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to sign in.",
    };
  }

  redirect(nextPath);
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
        emailRedirectTo: await buildAuthCallbackUrl("/dashboard"),
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
  next?: string | null;
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
        emailRedirectTo: await buildAuthCallbackUrl(input.next ?? "/dashboard"),
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
      redirectTo: await buildAuthCallbackUrl("/reset-password?mode=recovery"),
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

export async function updatePasswordAction(input: {
  password: string;
  confirmPassword: string;
  next?: string | null;
}): Promise<ServerActionState> {
  const nextPath = getSafeRedirectPath(input.next);
  const parsed = passwordResetSchema.safeParse(input);

  if (!parsed.success) {
    return validationError(
      "Please correct the highlighted password fields.",
      parsed.error.flatten().fieldErrors,
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.updateUser({
      password: parsed.data.password,
    });

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    revalidatePath("/", "layout");
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unable to update your password.",
    };
  }

  redirect(nextPath);
}

export async function signInWithGoogleAction(input?: {
  next?: string | null;
}): Promise<ServerActionState> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: await buildAuthCallbackUrl(input?.next ?? "/dashboard"),
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
