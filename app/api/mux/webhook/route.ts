import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const payload = (await request.json()) as { type?: string; data?: { id?: string } };
  if (payload.type !== "video.asset.ready") {
    return Response.json({ ignored: true });
  }

  const supabase = createSupabaseAdminClient();
  await supabase
    .from("lessons")
    .update({ mux_asset_id: payload.data?.id ?? null })
    .eq("mux_asset_id", payload.data?.id ?? "");

  return Response.json({ received: true });
}
