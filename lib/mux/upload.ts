import { getMuxClient } from "@/lib/mux/client";

export async function createMuxUploadUrl() {
  getMuxClient();
  console.warn("not configured");
  return null;
}
