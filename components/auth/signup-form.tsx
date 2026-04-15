"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInWithGoogleAction, signUpAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ServerActionState } from "@/types";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormValues = z.infer<typeof schema>;

type SignUpFormProps = {
  next?: string;
};

export function SignUpForm({ next = "/dashboard" }: SignUpFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [state, setState] = React.useState<ServerActionState>({ status: "idle" });
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await signUpAction(values);
      setState(result);
      if (result.redirectTo) {
        router.push(result.redirectTo);
      }
    });
  });

  return (
    <div className="rounded-[28px] border border-border bg-surface p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Create account</h2>
        <p className="mt-2 text-sm text-muted">
          Start as a student and unlock courses, certificates, notes, and progress
          tracking.
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Full name</label>
          <Input {...form.register("fullName")} />
          {form.formState.errors.fullName ? (
            <p className="text-sm text-rose-400">{form.formState.errors.fullName.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <p className="text-sm text-rose-400">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <Input type="password" {...form.register("password")} />
          {form.formState.errors.password ? (
            <p className="text-sm text-rose-400">{form.formState.errors.password.message}</p>
          ) : null}
        </div>

        {state.message && state.status !== "idle" ? (
          <p className={state.status === "error" ? "text-sm text-rose-400" : "text-sm text-emerald-400"}>
            {state.message}
          </p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating..." : "Create account"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={googlePending}
            onClick={() =>
              startGoogleTransition(async () => {
                const result = await signInWithGoogleAction({ next });
                if (result.redirectTo) {
                  window.location.href = result.redirectTo;
                } else {
                  setState(result);
                }
              })
            }
          >
            {googlePending ? "Loading..." : "Continue with Google"}
          </Button>
        </div>
      </form>
    </div>
  );
}
