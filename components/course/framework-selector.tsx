"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FrameworkSelectorProps = {
  options: string[];
  courseSlug: string;
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function FrameworkSelector({ options, courseSlug }: FrameworkSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams.get("track") ?? slugify(options[0] ?? "");

  const enrollHref = useMemo(() => `/enroll?course=${courseSlug}&track=${selected}`, [courseSlug, selected]);

  function updateTrack(track: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("track", track);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const value = slugify(option);
          const active = value === selected;
          return (
            <button
              key={option}
              type="button"
              onClick={() => updateTrack(value)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                active ? "border-accent bg-accent text-white" : "border-border bg-background text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <Link href={enrollHref} className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-black text-white">
        Enroll Now
      </Link>
    </div>
  );
}
