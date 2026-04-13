import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDuration } from "@/lib/utils";
import type { CourseSummary } from "@/types";

type CourseCardProps = {
  course: CourseSummary;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{course.category}</Badge>
          <Badge>{course.level}</Badge>
        </div>
        <CardTitle className="mt-5 text-balance">{course.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {course.description}
        </CardDescription>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
          <span>{course.total_lessons} lessons</span>
          <span>{formatDuration(course.duration_seconds)}</span>
          <span className="inline-flex items-center gap-1">
            <Star size={14} className="fill-current text-amber-400" />
            {course.average_rating ? course.average_rating.toFixed(1) : "New"}
          </span>
        </div>

        {course.instructor?.full_name ? (
          <p className="mt-4 text-sm text-muted">
            Instructor:{" "}
            <span className="font-medium text-foreground">
              {course.instructor.full_name}
            </span>
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-lg font-semibold text-foreground">
          {formatCurrency(course.price_cents / 100)}
        </p>
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          View course <ArrowRight size={16} />
        </Link>
      </div>
    </Card>
  );
}
