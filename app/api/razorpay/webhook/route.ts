import { headers } from "next/headers";
import { handleRazorpayEvent, isValidRazorpayWebhook } from "@/lib/razorpay/webhooks";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = (await headers()).get("x-razorpay-signature");

  if (!signature) {
    return Response.json({ error: "Missing signature." }, { status: 400 });
  }

  if (!isValidRazorpayWebhook(rawBody, signature)) {
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    const event = JSON.parse(rawBody) as { event: string };
    await handleRazorpayEvent(event);
    return Response.json({ received: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Webhook error." },
      { status: 400 },
    );
  }
}
