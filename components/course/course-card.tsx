import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Clock3, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCourseCareerSignal } from "@/lib/demo-data";
import { formatCurrency, formatDuration } from "@/lib/utils";
import type { CourseSummary } from "@/types";

type CourseCardProps = {
  course: CourseSummary;
};

export function CourseCard({ course }: CourseCardProps) {
  const signal = getCourseCareerSignal(course.slug);

  return (
    <Card className="flex h-full flex-col justify-between overflow-hidden rounded-[36px] p-0">
      <div className="ink-panel p-6">
        <div className="academy-mesh opacity-35" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-white/10 bg-white/10 text-white">
              {signal.cohortLabel}
            </Badge>
            <Badge className="border-white/10 bg-white/8 text-white/74">
              {course.category}
            </Badge>
            <Badge className="border-white/10 bg-white/8 text-white/74">
              {course.level}
            </Badge>
          </div>

          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/58">
                Target role
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {signal.targetRole}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-3 text-right text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">
                Price
              </p>
              <p className="mt-1 text-xl font-semibold">
                {formatCurrency(course.price_cents / 100)}
              </p>
            </div>
          </div>

          <h3 className="mt-6 text-3xl font-semibold text-balance text-white">
            {course.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/72">{signal.promise}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-4">
              <Clock3 size={16} className="text-[#ffd18b]" />
              <p className="mt-3 text-sm font-semibold text-white">{signal.duration}</p>
              <p className="text-xs text-white/56">{signal.weeklyCommitment}</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-4">
              <BriefcaseBusiness size={16} className="text-[#66d0c7]" />
              <p className="mt-3 text-sm font-semibold text-white">{signal.projectCount}</p>
              <p className="text-xs text-white/56">Applied deliverables</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-4">
              <Star size={16} className="fill-current text-[#ffd18b]" />
              <p className="mt-3 text-sm font-semibold text-white">
                {course.average_rating ? course.average_rating.toFixed(1) : "New"}
              </p>
              <p className="text-xs text-white/56">{course.review_count} learner reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex flex-wrap gap-2">
            {signal.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-[#132238]/6 px-3 py-1.5 text-xs font-semibold text-muted dark:bg-white/8"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-[26px] border border-border/70 bg-white/56 px-4 py-4 dark:bg-white/6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Mentor format
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              {signal.delivery}
            </p>
            <p className="mt-1 text-sm text-muted">
              {course.instructor?.full_name
                ? `Led by ${course.instructor.full_name}`
                : "Led by Augment Skills Academy mentors"}
            </p>
            <p className="mt-2 text-xs text-muted">
              {course.total_lessons} lessons / {formatDuration(course.duration_seconds)}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Includes
            </p>
            <p className="mt-2 text-sm text-muted">
              {signal.support.slice(0, 2).join(" / ")}
            </p>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#132238] px-5 py-3 text-sm font-semibold text-white"
          >
            View path <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
