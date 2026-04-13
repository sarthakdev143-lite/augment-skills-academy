import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import type { DashboardCourse } from "@/types";

type CourseProgressCardProps = {
  course: DashboardCourse;
};

export function CourseProgressCard({ course }: CourseProgressCardProps) {
  return (
    <Card className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{course.category}</Badge>
            <Badge>{course.level}</Badge>
          </div>
          <CardTitle className="mt-5">{course.title}</CardTitle>
          <CardDescription>
            {course.completed_lessons} of {course.total_lessons} lessons completed
          </CardDescription>
        </div>
        {course.certificate_id ? (
          <Link
            href={`/certificates/${course.certificate_id}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground"
          >
            <Award size={14} />
            Certificate
          </Link>
        ) : null}
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted">
          <span>Progress</span>
          <span>{course.progress_percent}%</span>
        </div>
        <Progress value={course.progress_percent} />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted">
          {course.last_lesson_title ? `Last lesson: ${course.last_lesson_title}` : formatCurrency(course.price_cents / 100)}
        </p>
        <Link
          href={`/dashboard/courses/${course.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          Continue <ArrowRight size={16} />
        </Link>
      </div>
    </Card>
  );
}
