import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { NotificationFeedItem } from "@/types";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json([], { status: 401 });
  }

  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const notifications = ((data ?? []) as NotificationFeedItem[]).map((item) => ({
    ...item,
    href: item.title.toLowerCase().includes("certificate") ? "/dashboard" : "/dashboard",
  }));

  return Response.json(notifications);
}
