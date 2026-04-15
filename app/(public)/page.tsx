import Link from "next/link";
import { ArrowRight, CircleCheckBig, Sparkles } from "lucide-react";
import { CourseCard } from "@/components/course/course-card";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  academyFaqs,
  learnerJourneys,
  learningPillars,
  logoCloud,
  marketingStats,
  mentorHighlights,
  pricingPlans,
  proofHighlights,
} from "@/lib/demo-data";
import { listPublishedCourses } from "@/lib/courses";
import { isSupabaseConfigured } from "@/lib/env";

export const revalidate = 3600;

export default async function HomePage() {
  const courses = await listPublishedCourses();
  const featured = courses.filter((course) => course.featured).slice(0, 3);
  const isDemoMode = !isSupabaseConfigured();

  return (
    <main className="pb-10">
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal className="space-y-8">
            <Badge className="bg-accent/10 text-accent">
              Mentor-led outcomes for product and engineering careers
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] md:text-7xl">
                Build the skills, proof, and momentum needed for your next role.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted md:text-xl">
                Augment Skills Academy combines structured learning paths, mentor
                reviews, project-based practice, and career support so learners
                can move from ambition to visible progress.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(227,106,47,0.28)]"
              >
                Start your application <ArrowRight size={16} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground"
              >
                Explore programs
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {marketingStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-border/70 bg-white/55 px-5 py-5 shadow-[0_14px_40px_rgba(19,34,56,0.06)] dark:bg-white/6"
                >
                  <p className="text-3xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm text-muted">{item.label}</p>
                </div>
              ))}
            </div>

            {isDemoMode ? (
              <div className="rounded-[26px] border border-[#e36a2f]/20 bg-[#e36a2f]/9 px-5 py-4 text-sm leading-7 text-foreground">
                Demo mode is active because `.env.local` is missing. Public
                pages use fallback academy content until Supabase, Razorpay, Mux,
                and email integrations are configured.
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="overflow-hidden rounded-[38px] p-0">
              <div className="bg-[#132238] p-8 text-white">
                <div className="flex items-center justify-between gap-4">
                  <Badge className="border-white/12 bg-white/10 text-white">
                    Career acceleration board
                  </Badge>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                    <Sparkles size={14} />
                    92% weekly completion
                  </span>
                </div>
                <h2 className="mt-6 max-w-md text-3xl font-semibold text-balance">
                  Structured enough to keep you moving, flexible enough to fit a working schedule.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/72">
                  Application review, path matching, mentor checkpoints, project
                  submissions, and portfolio support all live inside one guided
                  learning system.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Cohort start", value: "May 4" },
                    { label: "Live reviews", value: "Weekly" },
                    { label: "Capstone showcase", value: "Final week" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-white/10 bg-white/7 px-4 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/56">
                        {item.label}
                      </p>
                      <p className="mt-3 text-lg font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-2">
                {learnerJourneys.slice(0, 2).map((story) => (
                  <div
                    key={story.name}
                    className="rounded-[26px] border border-border/70 bg-white/55 p-5 dark:bg-white/6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {story.track}
                    </p>
                    <p className="mt-3 text-lg font-semibold">{story.after}</p>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      Started as: {story.before}
                    </p>
                    <p className="mt-4 text-sm font-medium text-foreground">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 md:py-10">
        <Reveal>
          <div className="section-shell rounded-[34px] px-6 py-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <Badge>Learning ecosystem</Badge>
                <p className="mt-4 max-w-xl text-lg font-semibold text-foreground">
                  Built with the same clarity, review loops, and outcome focus
                  that strong teams expect from internal upskilling.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {logoCloud.map((logo) => (
                  <span
                    key={logo}
                    className="logo-pill rounded-full px-4 py-2 text-sm font-semibold text-foreground"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="outcomes" className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="max-w-3xl">
            <Badge>Why it works</Badge>
            <h2 className="mt-4 text-4xl font-semibold text-balance">
              A learning system designed around confidence, proof of work, and real job outcomes.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              We do not stop at lesson delivery. Each path is built around the
              complete arc of choosing a role, building skill, and presenting
              that progress clearly to the outside world.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {proofHighlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <Card className="h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                  {item.title}
                </p>
                <p className="mt-4 text-base leading-8 text-muted">
                  {item.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {learningPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={0.1 + index * 0.05}>
              <Card className="h-full">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                  {pillar.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-balance">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {pillar.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Badge>Programs</Badge>
              <h2 className="mt-4 text-4xl font-semibold text-balance">
                Specializations that feel closer to career tracks than isolated courses.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                Each path is scoped around a role destination, mentor support,
                guided projects, and the practical output you need to move with
                more clarity.
              </p>
            </div>
            <Link href="/courses" className="text-sm font-semibold text-accent">
              See full program list
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((course, index) => (
            <Reveal key={course.id} delay={index * 0.05}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <Card className="h-full bg-[#132238] text-white">
              <Badge className="border-white/12 bg-white/10 text-white">
                Learner transformations
              </Badge>
              <h2 className="mt-5 max-w-lg text-4xl font-semibold text-balance">
                The strongest signal is not what we promise, it is what learners become able to show.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">
                From career switchers to working engineers, we support learners
                in building stronger output, clearer narratives, and more
                interview-ready confidence.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Structured study plans with checkpoints",
                  "Applied projects reviewed by mentors",
                  "Career storytelling support for interviews and applications",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleCheckBig size={18} className="mt-1 text-[#f6c46e]" />
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <div className="grid gap-5">
            {learnerJourneys.map((story, index) => (
              <Reveal key={story.name} delay={0.05 + index * 0.04}>
                <Card className="rounded-[30px]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                        {story.track}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold">{story.name}</h3>
                    </div>
                    <div className="rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      Outcome story
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[24px] border border-border/70 bg-white/55 px-4 py-4 dark:bg-white/6">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Before
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted">{story.before}</p>
                    </div>
                    <div className="rounded-[24px] border border-border/70 bg-[#132238] px-4 py-4 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                        After
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/80">{story.after}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm font-medium leading-7 text-foreground">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="mentors" className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="max-w-3xl">
            <Badge>Mentors</Badge>
            <h2 className="mt-4 text-4xl font-semibold text-balance">
              Learn from practitioners who care about how your work reads in the real world.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Strong teaching is part craft and part care. Our mentors bring both:
              technical judgment, clear feedback, and a bias toward helping
              learners ship work they can stand behind.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {mentorHighlights.map((mentor, index) => (
            <Reveal key={mentor.name} delay={index * 0.05}>
              <Card className="h-full">
                <div className="flex items-center justify-between gap-4">
                  <div className="h-14 w-14 rounded-full bg-[#132238] text-center text-lg leading-[56px] font-semibold text-white">
                    {mentor.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {mentor.stat}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{mentor.name}</h3>
                <p className="mt-2 text-sm font-semibold text-accent-2">{mentor.role}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{mentor.focus}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Card className="h-full">
              <Badge>Plans</Badge>
              <h2 className="mt-4 text-4xl font-semibold text-balance">
                Join one specialization or stay inside the broader career ecosystem.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                The structure stays focused, whether you want one clear path or
                continuous access to multiple tracks, resources, and mentor touchpoints.
              </p>
            </Card>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {pricingPlans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 0.06}>
                <Card className={`h-full ${index === 1 ? "bg-[#132238] text-white" : ""}`}>
                  <p
                    className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                      index === 1 ? "text-white/60" : "text-muted"
                    }`}
                  >
                    {plan.name}
                  </p>
                  <p className="mt-5 text-4xl font-semibold">{plan.price}</p>
                  <p
                    className={`mt-1 text-sm ${
                      index === 1 ? "text-white/72" : "text-muted"
                    }`}
                  >
                    {plan.cadence}
                  </p>
                  <p
                    className={`mt-5 text-sm leading-7 ${
                      index === 1 ? "text-white/78" : "text-muted"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CircleCheckBig
                          size={16}
                          className={index === 1 ? "mt-1 text-[#f6c46e]" : "mt-1 text-accent"}
                        />
                        <p
                          className={`text-sm ${
                            index === 1 ? "text-white/78" : "text-muted"
                          }`}
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Card className="h-full">
              <Badge>FAQs</Badge>
              <h2 className="mt-4 text-4xl font-semibold text-balance">
                The questions ambitious learners usually ask before they commit.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                If you are deciding between self-study and a structured learning
                path, these are the tradeoffs that matter most.
              </p>
            </Card>
          </Reveal>

          <div className="space-y-4">
            {academyFaqs.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.05}>
                <Card>
                  <h3 className="text-xl font-semibold">{item.question}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.answer}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
