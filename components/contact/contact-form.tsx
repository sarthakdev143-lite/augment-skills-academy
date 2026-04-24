"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitContactAction } from "@/app/(public)/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ServerActionState } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Enter a valid email address."),
  message: z.string().min(20, "Please share a bit more context."),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = React.useState<ServerActionState>({ status: "idle" });
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await submitContactAction(values);
      setState(result);
      if (result.status === "success") {
        form.reset();
      }
    });
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input {...form.register("name")} />
          {form.formState.errors.name ? <p className="text-sm text-rose-400">{form.formState.errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" {...form.register("email")} />
          {form.formState.errors.email ? <p className="text-sm text-rose-400">{form.formState.errors.email.message}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Message</label>
        <Textarea
          {...form.register("message")}
          placeholder="Tell us about your goals, which course you're interested in, or any questions you have..."
        />
        {form.formState.errors.message ? <p className="text-sm text-rose-400">{form.formState.errors.message.message}</p> : null}
      </div>

      {state.message && state.status !== "idle" ? (
        <p className={state.status === "error" ? "text-sm text-rose-400" : "text-sm text-emerald-400"}>{state.message}</p>
      ) : null}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
