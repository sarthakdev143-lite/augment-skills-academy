import { SignJWT, importPKCS8 } from "jose";
import { env } from "@/lib/env";

export async function createMuxPlaybackToken(playbackId: string) {
  if (!env.MUX_SIGNING_PRIVATE_KEY || !env.MUX_SIGNING_KEY_ID) {
    throw new Error("Mux signing credentials are not configured.");
  }

  const privateKey = await importPKCS8(
    env.MUX_SIGNING_PRIVATE_KEY.replace(/\\n/g, "\n"),
    "RS256",
  );

  return new SignJWT({ sub: playbackId, aud: "v" })
    .setProtectedHeader({ alg: "RS256", kid: env.MUX_SIGNING_KEY_ID })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(privateKey);
}
