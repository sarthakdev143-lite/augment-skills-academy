import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "@/components/course/course-card";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  marketingStats,
  pricingPlans,
  testimonials,
} from "@/lib/demo-data";
import { listPublishedCourses } from "@/lib/courses";
import { isSupabaseConfigured } from "@/lib/env";

export const revalidate = 3600;

export default async function HomePage() {
  const courses = await listPublishedCourses();
  const featured = courses.filter((course) => course.featured).slice(0, 3);
  const isDemoMode = !isSupabaseConfigured();

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="space-y-8">
            <Badge>Built for modern engineering teams</Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-7xl">
                Learn through systems that feel like real product work.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted">
                Augment Skills Academy teaches full-stack, platform, and AI
                engineering through production-minded architecture, guided assets,
                and outcome-first course design.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(91,77,247,0.3)]"
              >
                Explore catalogue <ArrowRight size={16} />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground"
              >
                Start learning
              </Link>
            </div>
            {isDemoMode ? (
              <div className="rounded-[24px] border border-amber-500/25 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
                Demo mode is active because `.env.local` is missing. Public pages
                use fallback content until Supabase and the other integrations are
                configured.
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {marketingStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-border bg-surface px-5 py-5"
                >
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-sm text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="overflow-hidden rounded-[36px] p-0">
              <div className="grid gap-4 border-b border-border/70 p-6 md:grid-cols-2">
                <div className="rounded-[28px] bg-[#111529] p-6 text-white">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/60">
                    What you get
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold">
                    Project-based lessons, notes, resources, and certificates
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Every learning path is built to shorten the gap between
                    understanding the concept and shipping the capability.
                  </p>
                </div>
                <div className="rounded-[28px] bg-[linear-gradient(135deg,#6b5cff,#1fb8a6)] p-6 text-white">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                    Team ready
                  </p>
                  <p className="mt-4 text-3xl font-semibold">
                    Cohorts, dashboards, and role-gated admin tooling
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    The platform is designed for individual learners and team-wide
                    upskilling programs.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3">
                {[
                  "Server Components by default",
                  "Supabase auth and RLS-backed data",
                  "Payments, certificates, and notifications",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[24px] border border-border/70 bg-white/35 px-4 py-4 text-sm text-muted dark:bg-white/5"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <Badge>Featured courses</Badge>
              <h2 className="mt-4 text-3xl font-semibold">Choose a focused path</h2>
            </div>
            <Link href="/courses" className="text-sm font-medium text-accent">
              View all courses
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((course, index) => (
            <Reveal key={course.id} delay={index * 0.05}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <Card className="h-full">
              <Badge>Testimonials</Badge>
              <h2 className="mt-4 text-3xl font-semibold">
                Trusted by builders who ship
              </h2>
              <div className="mt-8 grid gap-4">
                {testimonials.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-[24px] border border-border/70 bg-white/35 px-5 py-5 dark:bg-white/5"
                  >
                    <p className="text-base leading-7 text-foreground">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <p className="mt-4 font-medium">{item.name}</p>
                    <p className="text-sm text-muted">{item.role}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="h-full">
              <Badge>Pricing</Badge>
              <h2 className="mt-4 text-3xl font-semibold">
                Learn course-by-course or join all access
              </h2>
              <div className="mt-8 space-y-4">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className="rounded-[24px] border border-border/70 bg-white/35 p-5 dark:bg-white/5"
                  >
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold">{plan.name}</p>
                        <p className="mt-1 text-sm text-muted">
                          {plan.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-semibold">{plan.price}</p>
                        <p className="text-sm text-muted">{plan.cadence}</p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      {plan.features.map((feature) => (
                        <p key={feature} className="text-sm text-muted">
                          {feature}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
