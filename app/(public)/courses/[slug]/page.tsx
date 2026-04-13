import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";
import { Curriculum } from "@/components/course/curriculum";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCourseBySlug } from "@/lib/courses";
import { formatCurrency, formatDuration } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) {
    return {};
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: course.thumbnail_url ? [course.thumbnail_url] : [],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{course.category}</Badge>
            <Badge>{course.level}</Badge>
          </div>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold">
            {course.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {course.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted">
            <span>{course.total_lessons} lessons</span>
            <span>{formatDuration(course.duration_seconds)}</span>
            <span className="inline-flex items-center gap-1">
              <Star size={15} className="fill-current text-amber-400" />
              {course.average_rating ? course.average_rating.toFixed(1) : "New"} (
              {course.review_count} reviews)
            </span>
          </div>
        </div>

        <Card className="h-fit">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">
            Enrollment options
          </p>
          <p className="mt-4 text-4xl font-semibold">
            {formatCurrency(course.price_cents / 100)}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Includes lesson notes, attachments, completion tracking, and
            downloadable certificate generation when you finish the course.
          </p>
          <div className="mt-6 grid gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-white"
            >
              Enroll now
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground"
            >
              Already enrolled? Open dashboard
            </Link>
          </div>
        </Card>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-3xl font-semibold">Curriculum</h2>
          <p className="mt-3 max-w-3xl text-muted">
            Preview lessons are publicly visible, while enrolled students unlock
            the full path inside the course player.
          </p>
          <div className="mt-8">
            <Curriculum modules={course.modules} />
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">
              Instructor
            </p>
            <h3 className="mt-4 text-2xl font-semibold">
              {course.instructor?.full_name ?? "Augment Skills Academy"}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {course.instructor?.bio ??
                "Experienced practitioners building production-grade learning paths for teams and individual engineers."}
            </p>
          </Card>

          <Card>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">
              Learning outcomes
            </p>
            <div className="mt-4 space-y-3">
              {course.outcomes.map((outcome) => (
                <p key={outcome} className="text-sm leading-7 text-muted">
                  {outcome}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-semibold">Preview and reviews</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">
              Free preview lessons
            </p>
            <div className="mt-5 space-y-3">
              {course.preview_lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="rounded-2xl border border-border/60 bg-white/35 px-4 py-4 dark:bg-white/5"
                >
                  <p className="font-medium">{lesson.title}</p>
                  <p className="mt-2 text-sm text-muted">
                    {lesson.content_md ?? "Preview content available from this lesson."}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4">
            {course.reviews.length ? (
              course.reviews.map((review) => (
                <Card key={review.id}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{review.author_name}</p>
                      <p className="text-sm text-muted">{review.author_role}</p>
                    </div>
                    <div className="inline-flex items-center gap-1 text-sm text-amber-400">
                      <Star size={14} className="fill-current" />
                      {review.rating}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">{review.body}</p>
                </Card>
              ))
            ) : (
              <Card>
                <p className="text-sm text-muted">
                  New course launch. The first approved reviews will appear here
                  after learners complete 30% of the curriculum.
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
