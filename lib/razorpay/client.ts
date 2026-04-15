import Razorpay from "razorpay";
import { env } from "@/lib/env";

let razorpayClient: Razorpay | null = null;

export function getRazorpayClient() {
  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
  }

  return razorpayClient;
}
