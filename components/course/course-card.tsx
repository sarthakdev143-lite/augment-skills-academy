import Link from "next/link";
import { ArrowRight, Clock3, Star, Users } from "lucide-react";
import { getCourseCareerSignal } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";
import type { CourseSummary } from "@/types";

type CourseCardProps = {
  course: CourseSummary;
};

const categoryStyles: Record<string, {
  headerBg:   string;
  accentFrom: string;
  accentTo:   string;
  badge:      string;
  pill:       string;
  cta:        string;
  icon:       string;
}> = {
  "Web Development": {
    headerBg:   "#0d1e35",
    accentFrom: "#132238",
    accentTo:   "#1e3a5f",
    badge:      "rgba(255,255,255,0.12)",
    pill:       "#1e90ff",
    cta:        "#132238",
    icon:       "#6aadff",
  },
  "Programming": {
    headerBg:   "#0c2e2a",
    accentFrom: "#0f7f78",
    accentTo:   "#0a5e58",
    badge:      "rgba(255,255,255,0.12)",
    pill:       "#0f7f78",
    cta:        "#0f7f78",
    icon:       "#44d4c9",
  },
  "AI Engineering": {
    headerBg:   "#2a1208",
    accentFrom: "#e36a2f",
    accentTo:   "#c85420",
    badge:      "rgba(255,255,255,0.12)",
    pill:       "#e36a2f",
    cta:        "#e36a2f",
    icon:       "#ffb088",
  },
};

const defaultStyle = {
  headerBg:   "#1a0d30",
  accentFrom: "#8b5cf6",
  accentTo:   "#7c3aed",
  badge:      "rgba(255,255,255,0.12)",
  pill:       "#8b5cf6",
  cta:        "#8b5cf6",
  icon:       "#c4b5fd",
};

export function CourseCard({ course }: CourseCardProps) {
  const signal = getCourseCareerSignal(course.slug);
  const style  = categoryStyles[course.category] ?? defaultStyle;

  const levelColors: Record<string, string> = {
    beginner:     "#22c55e",
    intermediate: "#f59e0b",
    advanced:     "#ef4444",
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_4px_24px_rgba(26,18,9,0.06)] card-hover-glow">

      {/* ── Colored header ── */}
      <div
        className="relative overflow-hidden px-6 pt-7 pb-8"
        style={{ background: `linear-gradient(135deg, ${style.accentFrom} 0%, ${style.headerBg} 100%)` }}
      >
        {/* Subtle orb */}
        <div
          className="absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${style.icon}, transparent 70%)` }}
        />

        {/* SVG wave */}
        <svg
          aria-hidden
          viewBox="0 0 400 28"
          className="absolute bottom-0 left-0 w-full"
          preserveAspectRatio="none"
          style={{ fill: "var(--surface)" }}
        >
          <path d="M0 28 Q80 8 160 18 Q240 28 320 12 Q360 4 400 14 L400 28Z" />
        </svg>

        {/* Badges row */}
        <div className="mb-5 flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white"
            style={{ background: style.badge }}
          >
            {course.category}
          </span>
          <span
            className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]"
            style={{
              background: `${levelColors[course.level] ?? "#888"}20`,
              color: levelColors[course.level] ?? "#888",
            }}
          >
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="relative text-xl font-black text-white leading-snug pb-6">
          {course.title}
        </h3>

        {/* Target role tag */}
        <p className="relative text-[11px] font-bold text-white/55 pb-2">
          → {signal.targetRole}
        </p>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col px-6 py-5">
        {/* Promise */}
        <p className="text-[13px] leading-7 text-muted">{signal.promise}</p>

        {/* Meta row */}
        <div className="mt-5 flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-muted">
            <Clock3 size={12} className="text-accent" />
            {signal.duration} · {signal.weeklyCommitment}
          </span>
          <span className="flex items-center gap-1.5 text-muted">
            <Users size={12} className="text-accent" />
            {course.total_lessons} lessons
          </span>
          {course.average_rating && (
            <span className="flex items-center gap-1.5 text-muted">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-foreground">{course.average_rating.toFixed(1)}</span>
              {course.review_count > 0 && (
                <span className="text-muted/60">({course.review_count})</span>
              )}
            </span>
          )}
        </div>

        {/* Tool chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {signal.tools.slice(0, 4).map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold text-muted"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-auto pt-6">
          <div className="mb-4 h-px bg-border/60" />
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-muted/60">Price</p>
              <p className="text-2xl font-black text-foreground">
                {formatCurrency(course.price_cents / 100)}
              </p>
            </div>
            <Link
              href={`/courses/${course.slug}`}
              className="shimmer-btn inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-black text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
              style={{ background: `linear-gradient(135deg, ${style.accentFrom}, ${style.accentTo})` }}
            >
              Enroll <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
