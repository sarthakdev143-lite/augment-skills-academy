import { getMuxClient } from "@/lib/mux/client";

export async function createMuxUploadUrl() {
  const mux = getMuxClient();
  const upload = await mux.video.uploads.create({
    cors_origin: "*",
    new_asset_settings: {
      playback_policy: ["signed"],
    },
  });

  return upload;
}
