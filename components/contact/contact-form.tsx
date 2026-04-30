"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
  phone: z.string().min(10, "Enter at least 10 digits."),
  message: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ServerActionState>({ status: "idle" });
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const serverFieldErrors = state.fieldErrors ?? {};

  React.useEffect(() => {
    if (state.status === "success") {
      form.reset();
    }
  }, [form, state.status]);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const result = await submitContactAction(values);
      setState(result);
    });
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-medium">Name</label>
          <Input id="contact-name" required autoComplete="name" {...form.register("name")} />
          {form.formState.errors.name?.message || serverFieldErrors.name?.[0] ? (
            <p className="text-sm text-rose-400">{form.formState.errors.name?.message ?? serverFieldErrors.name?.[0]}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
          <Input id="contact-email" type="email" required autoComplete="email" {...form.register("email")} />
          {form.formState.errors.email?.message || serverFieldErrors.email?.[0] ? (
            <p className="text-sm text-rose-400">{form.formState.errors.email?.message ?? serverFieldErrors.email?.[0]}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-phone" className="text-sm font-medium">Phone Number</label>
        <Input
          id="contact-phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+91 98765 43210"
          {...form.register("phone")}
        />
        {form.formState.errors.phone?.message || serverFieldErrors.phone?.[0] ? (
          <p className="text-sm text-rose-400">{form.formState.errors.phone?.message ?? serverFieldErrors.phone?.[0]}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
        <Textarea
          id="contact-message"
          {...form.register("message")}
          placeholder="Tell us about your goals, which course you're interested in, or any questions you have..."
        />
        {form.formState.errors.message?.message || serverFieldErrors.message?.[0] ? (
          <p className="text-sm text-rose-400">{form.formState.errors.message?.message ?? serverFieldErrors.message?.[0]}</p>
        ) : null}
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
