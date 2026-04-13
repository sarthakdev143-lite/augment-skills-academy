"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { NotificationFeedItem } from "@/types";

async function fetchNotifications() {
  const response = await fetch("/api/notifications", {
    credentials: "same-origin",
  });

  if (!response.ok) {
    return [] as NotificationFeedItem[];
  }

  return (await response.json()) as NotificationFeedItem[];
}

export function NotificationBell() {
  const { data = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval: 30_000,
  });

  const unreadCount = data.filter((item) => !item.read).length;

  return (
    <details className="relative">
      <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-border bg-surface text-foreground">
        <Bell size={16} />
        {unreadCount ? (
          <span className="absolute right-0 top-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        ) : null}
      </summary>

      <div className="glass-panel absolute right-0 top-14 z-30 w-80 rounded-[24px] p-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Notifications</p>
          <span className="text-xs uppercase tracking-[0.18em] text-muted">
            Live
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {data.length ? (
            data.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="block rounded-2xl border border-border/60 px-4 py-3 hover:bg-white/35 dark:hover:bg-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{item.title}</p>
                  {!item.read ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </Link>
            ))
          ) : (
            <p className="rounded-2xl border border-dashed border-border px-4 py-6 text-sm text-muted">
              Your notifications will appear here once enrollments, purchases, or
              lesson updates start flowing in.
            </p>
          )}
        </div>
      </div>
    </details>
  );
}
