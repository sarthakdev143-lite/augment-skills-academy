"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { requestPasswordResetAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ServerActionState } from "@/types";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

export function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = React.useState<ServerActionState>({ status: "idle" });
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await requestPasswordResetAction(values);
      setState(result);
    });
  });

  return (
    <div className="rounded-[28px] border border-border bg-surface p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Reset password</h2>
        <p className="mt-2 text-sm text-muted">
          We will send you a secure link to set a new password.
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <p className="text-sm text-rose-400">{form.formState.errors.email.message}</p>
          ) : null}
        </div>

        {state.message && state.status !== "idle" ? (
          <p className={state.status === "error" ? "text-sm text-rose-400" : "text-sm text-emerald-400"}>
            {state.message}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Sending..." : "Send reset link"}
        </Button>
      </form>
    </div>
  );
}
