import type Stripe from "stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function handleStripeEvent(event: Stripe.Event) {
  const supabase = createSupabaseAdminClient();

  switch (event.type) {
    case "checkout.session.completed":
    case "invoice.paid":
    case "customer.subscription.deleted": {
      await supabase.from("payments").insert({
        stripe_session_id: event.id,
        status: event.type,
        amount_cents: 0,
        currency: "usd",
      });
      break;
    }
    default:
      break;
  }
}
