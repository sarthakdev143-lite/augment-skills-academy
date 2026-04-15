import { createHmac } from "node:crypto";
import { env } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type RazorpayEventPayload = {
  event: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        customer_id?: string;
        amount?: number;
        currency?: string;
        status?: string;
      };
    };
  };
};

export function isValidRazorpayWebhook(rawBody: string, signature: string) {
  const digest = createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
  return digest === signature;
}

export async function handleRazorpayEvent(event: RazorpayEventPayload) {
  const supabase = createSupabaseAdminClient();
  const payment = event.payload?.payment?.entity;

  if (!payment?.id) {
    return;
  }

  await supabase.from("payments").insert({
    razorpay_payment_id: payment.id,
    razorpay_customer_id: payment.customer_id ?? null,
    amount_cents: payment.amount ?? 0,
    currency: payment.currency?.toLowerCase() ?? "inr",
    status: payment.status ?? event.event,
  });
}
