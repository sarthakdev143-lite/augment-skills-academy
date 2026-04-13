import { Resend } from "resend";
import { env } from "@/lib/env";

let resendClient: Resend | null = null;

export function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY);
  }

  return resendClient;
}
