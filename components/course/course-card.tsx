import Link from "next/link";
import { ArrowRight, Clock3, Star, Users } from "lucide-react";
import { getCourseCareerSignal } from "@/lib/demo-data";
import type { CourseSummary } from "@/types";

type CourseCardProps = {
  course: CourseSummary;
};

const categoryStyles: Record<string, { accentFrom: string; accentTo: string; badge: string }> = {
  "Web Development": { accentFrom: "#132238", accentTo: "#1e3a5f", badge: "#6aadff" },
  Programming: { accentFrom: "#0f7f78", accentTo: "#0a5e58", badge: "#44d4c9" },
  "AI Engineering": { accentFrom: "#e36a2f", accentTo: "#c85420", badge: "#ffb088" },
  DevOps: { accentFrom: "#14532d", accentTo: "#166534", badge: "#86efac" },
  Custom: { accentFrom: "#6d28d9", accentTo: "#7c3aed", badge: "#c4b5fd" },
};

const defaultStyle = { accentFrom: "#132238", accentTo: "#1e3a5f", badge: "#6aadff" };

export function CourseCard({ course }: CourseCardProps) {
  const signal = getCourseCareerSignal(course.slug);
  const style = categoryStyles[course.category] ?? defaultStyle;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_4px_24px_rgba(26,18,9,0.06)]">
      <div
        className="relative overflow-hidden px-6 pb-8 pt-7"
        style={{ background: `linear-gradient(135deg, ${style.accentFrom} 0%, ${style.accentTo} 100%)` }}
      >
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/90" style={{ background: "rgba(255,255,255,0.12)" }}>
            {course.category}
          </span>
          <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ background: "rgba(255,255,255,0.12)", color: style.badge }}>
            {course.level}
          </span>
        </div>
        <h3 className="text-xl font-black leading-snug text-white">{course.title}</h3>
        <p className="pt-3 text-[11px] font-bold text-white/65">{signal.targetRole}</p>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="text-[13px] leading-7 text-muted">{signal.promise}</p>

        <div className="mt-5 flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-muted">
            <Clock3 size={12} className="text-accent" />
            {signal.duration} · {signal.weeklyCommitment}
          </span>
          <span className="flex items-center gap-1.5 text-muted">
            <Users size={12} className="text-accent" />
            {course.total_lessons} lessons
          </span>
          {course.review_count > 0 ? (
            <span className="flex items-center gap-1.5 text-muted">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {course.average_rating.toFixed(1)} ({course.review_count})
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {signal.tools.slice(0, 4).map((tool) => (
            <span key={tool} className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold text-muted">
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-black text-white"
            style={{ background: `linear-gradient(135deg, ${style.accentFrom}, ${style.accentTo})` }}
          >
            Know More & Enroll <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
