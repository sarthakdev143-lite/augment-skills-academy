"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  requestPasswordResetAction,
  updatePasswordAction,
} from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ServerActionState } from "@/types";

const requestSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

const recoverySchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RequestFormValues = z.infer<typeof requestSchema>;
type RecoveryFormValues = z.infer<typeof recoverySchema>;

type ResetPasswordFormProps = {
  mode?: "request" | "recovery";
  next?: string;
};

export function ResetPasswordForm({
  mode = "request",
  next = "/dashboard",
}: ResetPasswordFormProps) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = React.useState<ServerActionState>({ status: "idle" });
  const requestForm = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      email: "",
    },
  });
  const recoveryForm = useForm<RecoveryFormValues>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onRequestSubmit = requestForm.handleSubmit((values) => {
    startTransition(async () => {
      const result = await requestPasswordResetAction(values);
      setState(result);
    });
  });

  const onRecoverySubmit = recoveryForm.handleSubmit((values) => {
    startTransition(async () => {
      const result = await updatePasswordAction({
        ...values,
        next,
      });
      setState(result);
    });
  });

  return (
    <div className="rounded-[28px] border border-border bg-surface p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          {mode === "recovery" ? "Choose a new password" : "Reset password"}
        </h2>
        <p className="mt-2 text-sm text-muted">
          {mode === "recovery"
            ? "Set a fresh password for your account and continue back into the app."
            : "We will send you a secure link to set a new password."}
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={mode === "recovery" ? onRecoverySubmit : onRequestSubmit}
      >
        {mode === "recovery" ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">New password</label>
              <Input type="password" {...recoveryForm.register("password")} />
              {recoveryForm.formState.errors.password ? (
                <p className="text-sm text-rose-400">
                  {recoveryForm.formState.errors.password.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm password</label>
              <Input type="password" {...recoveryForm.register("confirmPassword")} />
              {recoveryForm.formState.errors.confirmPassword ? (
                <p className="text-sm text-rose-400">
                  {recoveryForm.formState.errors.confirmPassword.message}
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" {...requestForm.register("email")} />
            {requestForm.formState.errors.email ? (
              <p className="text-sm text-rose-400">
                {requestForm.formState.errors.email.message}
              </p>
            ) : null}
          </div>
        )}

        {state.message && state.status !== "idle" ? (
          <p className={state.status === "error" ? "text-sm text-rose-400" : "text-sm text-emerald-400"}>
            {state.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending
            ? mode === "recovery"
              ? "Updating..."
              : "Sending..."
            : mode === "recovery"
              ? "Update password"
              : "Send reset link"}
        </Button>
      </form>
    </div>
  );
}
