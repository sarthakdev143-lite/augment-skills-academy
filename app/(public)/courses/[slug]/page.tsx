import type { Metadata } from "next";
import Link from "next/link";
import { BriefcaseBusiness, CircleCheckBig, Clock3, Star, Target } from "lucide-react";
import { notFound } from "next/navigation";
import { Curriculum } from "@/components/course/curriculum";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCourseBySlug } from "@/lib/courses";
import { getCourseCareerSignal } from "@/lib/demo-data";
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

  const signal = getCourseCareerSignal(course.slug);
  const spotlightItems = [
    { label: "Duration", value: signal.duration, detail: signal.weeklyCommitment, icon: Clock3 },
    { label: "Project load", value: signal.projectCount, detail: "Applied deliverables", icon: BriefcaseBusiness },
    { label: "Target role", value: signal.targetRole, detail: signal.delivery, icon: Target },
  ];

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr] xl:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-accent text-white">{signal.cohortLabel}</Badge>
              <Badge>{course.category}</Badge>
              <Badge>{course.level}</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold md:text-6xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              {course.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {spotlightItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="stat-tile rounded-[28px] px-5 py-5 dark:text-white"
                  >
                    <Icon size={18} className="text-accent" />
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                      {item.label}
                    </p>
                    <p className="mt-3 text-lg font-semibold">{item.value}</p>
                    <p className="mt-1 text-sm text-muted">{item.detail}</p>
                  </div>
                );
              })}
            </div>

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

          <div className="ink-panel rounded-[40px] p-8 lg:p-10">
            <div className="academy-mesh opacity-35" />
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.18em] text-white/60">
                Enrollment snapshot
              </p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-semibold">
                    {formatCurrency(course.price_cents / 100)}
                  </p>
                  <p className="mt-2 text-sm text-white/60">one-time cohort fee</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white">
                  {course.average_rating ? course.average_rating.toFixed(1) : "New"} rated
                </div>
              </div>

              <div className="mt-6 rounded-[28px] border border-white/10 bg-white/8 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/56">
                  Mentor format
                </p>
                <p className="mt-3 text-lg font-semibold text-white">{signal.delivery}</p>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  Includes lesson notes, attachments, completion tracking, and
                  certificate-ready course completion.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {signal.support.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleCheckBig size={16} className="mt-1 text-[#ffd18b]" />
                    <p className="text-sm text-white/76">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-[#132238]"
                >
                  Enroll now
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-medium text-white"
                >
                  Already enrolled? Open dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4">
        <div className="section-shell rounded-[34px] p-5">
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
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
            <Card className="rounded-[34px]">
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

            <Card className="rounded-[34px]">
              <p className="text-sm uppercase tracking-[0.18em] text-muted">
                Learning outcomes
              </p>
              <div className="mt-4 space-y-3">
                {course.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3">
                    <CircleCheckBig size={16} className="mt-1 text-accent" />
                    <p className="text-sm leading-7 text-muted">{outcome}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="text-3xl font-semibold">Preview and reviews</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-[34px]">
            <p className="text-sm uppercase tracking-[0.18em] text-muted">
              Free preview lessons
            </p>
            <div className="mt-5 space-y-3">
              {course.preview_lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="rounded-[24px] border border-border/60 bg-white/40 px-4 py-4 dark:bg-white/5"
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
                <Card key={review.id} className="rounded-[30px]">
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
              <Card className="rounded-[30px]">
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
