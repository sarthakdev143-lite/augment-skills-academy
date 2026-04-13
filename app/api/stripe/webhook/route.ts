import { headers } from "next/headers";
import { env } from "@/lib/env";
import { getStripeClient } from "@/lib/stripe/client";
import { handleStripeEvent } from "@/lib/stripe/webhooks";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature." }, { status: 400 });
  }

  try {
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
    await handleStripeEvent(event);
    return Response.json({ received: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Webhook error." },
      { status: 400 },
    );
  }
}
