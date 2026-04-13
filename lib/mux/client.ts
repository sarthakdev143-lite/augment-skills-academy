import Mux from "@mux/mux-node";
import { env } from "@/lib/env";

let muxClient: Mux | null = null;

export function getMuxClient() {
  if (!muxClient) {
    muxClient = new Mux({
      tokenId: env.MUX_TOKEN_ID,
      tokenSecret: env.MUX_TOKEN_SECRET,
    });
  }

  return muxClient;
}
