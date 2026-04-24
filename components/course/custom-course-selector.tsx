"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CustomCourseSelectorProps = {
  options: Array<{ slug: string; title: string; topics: string[] }>;
};

export function CustomCourseSelector({ options }: CustomCourseSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(value: string) {
    setSelected((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  const href = useMemo(() => {
    const query = selected.join(",");
    return query
      ? `/enroll?course=custom-learning-path&selections=${encodeURIComponent(query)}`
      : "/enroll?course=custom-learning-path";
  }, [selected]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option.slug} className="block rounded-2xl border border-border bg-background p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={selected.includes(option.slug)}
                onChange={() => toggle(option.slug)}
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-foreground">{option.title}</p>
                <p className="mt-2 text-sm text-muted">{option.topics.join(" · ")}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
      <Link href={href} className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-black text-white">
        Enroll Now
      </Link>
    </div>
  );
}
