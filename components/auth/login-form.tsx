"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  requestMagicLinkAction,
  signInAction,
  signInWithGoogleAction,
} from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ServerActionState } from "@/types";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormValues = z.infer<typeof schema>;

const idleState: ServerActionState = { status: "idle" };

type LoginFormProps = {
  next?: string;
  initialMessage?: string;
};

export function LoginForm({ next = "/dashboard", initialMessage }: LoginFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [magicPending, startMagicTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [state, setState] = React.useState<ServerActionState>(
    initialMessage
      ? {
          status: "error",
          message: initialMessage,
        }
      : idleState,
  );
  const [magicState, setMagicState] = React.useState<ServerActionState>(idleState);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await signInAction({
        ...values,
        next,
      });
      setState(result);
      if (result.redirectTo) {
        router.push(result.redirectTo);
      }
    });
  });

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-border bg-surface p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Login</h2>
          <p className="mt-2 text-sm text-muted">
            Continue with your email and password, or use a faster sign-in path.
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" {...form.register("password")} />
            {form.formState.errors.password ? (
              <p className="text-sm text-rose-400">
                {form.formState.errors.password.message}
              </p>
            ) : null}
          </div>

          {state.message && state.status !== "idle" ? (
            <p className={state.status === "error" ? "text-sm text-rose-400" : "text-sm text-emerald-400"}>
              {state.message}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            disabled={magicPending}
            onClick={() =>
              startMagicTransition(async () => {
                const result = await requestMagicLinkAction({
                  email: form.getValues("email"),
                  next,
                });
                setMagicState(result);
              })
            }
          >
            {magicPending ? "Sending..." : "Send magic link"}
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

        {magicState.message ? (
          <p
            className={
              magicState.status === "error"
                ? "mt-4 text-sm text-rose-400"
                : "mt-4 text-sm text-emerald-400"
            }
          >
            {magicState.message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
