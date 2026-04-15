import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleCheckBig,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
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

type HighlightPillar = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const heroPillars: HighlightPillar[] = [
  {
    icon: GraduationCap,
    title: "Live cohort rooms",
    description: "Premium-feeling sessions with mentor checkpoints and sharp feedback loops.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Role-first projects",
    description: "Every module pushes toward a portfolio artifact that reads like real work.",
  },
  {
    icon: Target,
    title: "Career positioning",
    description: "Applications, resumes, and interview stories are built into the learning flow.",
  },
  {
    icon: ShieldCheck,
    title: "Accountability built in",
    description: "Weekly reviews keep momentum high and drop-off low for ambitious learners.",
  },
];

const journeySteps = [
  {
    step: "01",
    title: "Choose the right role direction",
    description: "Start with a clearer destination so the program feels like a career move, not content browsing.",
  },
  {
    step: "02",
    title: "Learn through guided delivery work",
    description: "Assignments are framed like real briefs, reviews, and handoffs instead of passive lessons.",
  },
  {
    step: "03",
    title: "Refine with mentors every week",
    description: "Feedback loops turn rough output into work you can explain with confidence.",
  },
  {
    step: "04",
    title: "Package the outcome professionally",
    description: "Your capstone, story, and proof of work become ready for applications and interviews.",
  },
];

const operationsSignals = [
  { label: "Next cohort", value: "May 4, 2026" },
  { label: "Live reviews", value: "Every week" },
  { label: "Portfolio sprint", value: "Final 10 days" },
];

export const revalidate = 3600;

export default async function HomePage() {
  const courses = await listPublishedCourses();
  const featured = courses.filter((course) => course.featured).slice(0, 3);
  const isDemoMode = !isSupabaseConfigured();

  return (
    <main className="pb-10">
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-accent text-white shadow-[0_14px_30px_rgba(239,125,58,0.2)]">
                Applications open for the next mentor-led cohort
              </Badge>
              <Badge>Live cohorts and portfolio-first outcomes</Badge>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.96] md:text-7xl">
                Launch your next role with mentor-led programs built for real career momentum.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted md:text-xl">
                Explore structured learning paths with live reviews,
                industry-style projects, and career support that helps your
                work read clearly to hiring teams.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#132238] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(19,34,56,0.22)]"
              >
                Start your application <ArrowRight size={16} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center rounded-full border border-border/80 bg-white/72 px-6 py-3.5 text-sm font-semibold text-foreground shadow-[0_14px_30px_rgba(19,34,56,0.08)]"
              >
                Explore programs
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {heroPillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.title}
                    className="stat-tile rounded-[28px] px-5 py-5 dark:text-white"
                  >
                    <Icon size={18} className="text-accent" />
                    <h2 className="mt-4 text-xl font-semibold">{pillar.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {marketingStats.map((item) => (
                <div
                  key={item.label}
                  className="stat-tile rounded-[28px] px-5 py-5 dark:text-white"
                >
                  <p className="text-3xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-sm text-muted">{item.label}</p>
                </div>
              ))}
            </div>

            {isDemoMode ? (
              <div className="rounded-[26px] border border-[#ef7d3a]/20 bg-[#ef7d3a]/10 px-5 py-4 text-sm leading-7 text-foreground">
                Demo mode is active because `.env.local` is incomplete. Public
                pages are still rendering with fallback academy content while
                integrations are configured.
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="ink-panel rounded-[42px] p-8 lg:p-10">
              <div className="academy-mesh opacity-35" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Badge className="border-white/10 bg-white/10 text-white">
                    Outcome command center
                  </Badge>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                    <Sparkles size={14} />
                    Premium cohort flow
                  </span>
                </div>

                <h2 className="mt-6 max-w-lg text-3xl font-semibold text-balance text-white lg:text-4xl">
                  Move from curiosity to capability with a learning experience that feels serious, supportive, and role-focused.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">
                  From mentor checkpoints to capstone packaging, every step is
                  designed to help ambitious learners build stronger output and
                  present it with more confidence.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {operationsSignals.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[24px] border border-white/10 bg-white/8 px-4 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/56">
                        {item.label}
                      </p>
                      <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[30px] border border-white/10 bg-white/8 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/56">
                      Recent learner outcomes
                    </p>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">
                      Portfolio + placement prep
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {learnerJourneys.map((story) => (
                      <div
                        key={story.name}
                        className="rounded-[24px] border border-white/10 bg-[#102035]/80 px-4 py-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">{story.name}</p>
                            <p className="text-xs uppercase tracking-[0.18em] text-white/56">
                              {story.track}
                            </p>
                          </div>
                          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                            Career move
                          </span>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
                          <p className="text-sm leading-6 text-white/72">{story.before}</p>
                          <TrendingUp size={18} className="text-[#ffd18b]" />
                          <p className="text-sm font-medium leading-6 text-white">
                            {story.after}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 md:py-8">
        <Reveal>
          <div className="section-shell rounded-[38px] px-6 py-8 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <Badge>Trust and credibility</Badge>
                <h2 className="mt-4 text-3xl font-semibold text-balance lg:text-4xl">
                  Proof, clarity, and momentum from the first scroll onward.
                </h2>
                <p className="mt-4 text-base leading-8 text-muted">
                  Learners want to know what they will build, who will guide
                  them, and how the journey connects to the role they want next.
                  This experience makes those answers easier to trust.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {marketingStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[28px] border border-border/70 bg-white/70 px-5 py-5 shadow-[0_14px_34px_rgba(19,34,56,0.06)] dark:bg-white/6"
                  >
                    <p className="text-3xl font-semibold">{item.value}</p>
                    <p className="mt-2 text-sm text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
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
        </Reveal>
      </section>

      <section id="outcomes" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="ink-panel rounded-[40px] p-8 lg:p-10">
              <div className="academy-mesh opacity-35" />
              <div className="relative">
                <Badge className="border-white/10 bg-white/10 text-white">
                  Why it feels stronger
                </Badge>
                <h2 className="mt-5 max-w-lg text-4xl font-semibold text-balance text-white">
                  Built for ambitious learners who want visible proof of work, not passive course completion.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">
                  The strongest learning journeys combine structure, live
                  feedback, and portfolio-ready output. That is the system these
                  programs are designed to deliver.
                </p>

                <div className="mt-8 space-y-4">
                  {proofHighlights.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <CircleCheckBig size={18} className="mt-1 text-[#ffd18b]" />
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/58">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white/74">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6">
            {learningPillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.05}>
                <Card className="rounded-[34px] px-6 py-6">
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
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Badge>Programs</Badge>
              <h2 className="mt-4 text-4xl font-semibold text-balance">
                Role-focused specializations built to feel closer to launch tracks than ordinary courses.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                Each path is scoped around a clear role destination, mentor
                support, guided projects, and the practical output you need to
                move with more clarity.
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
        <Reveal>
          <div className="max-w-3xl">
            <Badge>Journey</Badge>
            <h2 className="mt-4 text-4xl font-semibold text-balance">
              The best learning journeys feel clear, energizing, and easy to commit to from day one.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Start with the role you want, build through guided delivery work,
              and finish with proof that is ready for interviews, portfolios,
              and real career conversations.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {journeySteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.05}>
              <Card className="h-full rounded-[32px] px-6 py-6">
                <span className="inline-flex rounded-full bg-[#132238] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {item.step}
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-balance">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="mentors" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="section-shell rounded-[38px] p-8 lg:p-10">
              <Badge>Mentors</Badge>
              <h2 className="mt-5 text-4xl font-semibold text-balance">
                Learn from practitioners who know how strong work gets evaluated in the real world.
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                Strong teaching is part craft and part care. Our mentors bring
                both: sharp judgment, clear feedback, and a bias toward helping
                learners ship work they can stand behind.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {mentorHighlights.map((mentor, index) => (
              <Reveal key={mentor.name} delay={index * 0.05}>
                <Card className="h-full rounded-[34px]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#132238] text-lg font-semibold text-white">
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="ink-panel rounded-[38px] p-8 lg:p-10">
              <div className="academy-mesh opacity-35" />
              <div className="relative">
                <Badge className="border-white/10 bg-white/10 text-white">
                  Plans
                </Badge>
                <h2 className="mt-5 text-4xl font-semibold text-balance text-white">
                  Choose the support system that matches how you want to learn and grow.
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/72">
                  Join one specialization or stay inside the broader learning
                  ecosystem with ongoing access to paths, resources, and mentor
                  touchpoints.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {pricingPlans.map((plan, index) => (
              <Reveal key={plan.name} delay={index * 0.06}>
                <Card className={`h-full rounded-[34px] ${index === 1 ? "bg-[#132238] text-white" : ""}`}>
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
                          className={index === 1 ? "mt-1 text-[#ffd18b]" : "mt-1 text-accent"}
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
            <Card className="h-full rounded-[36px]">
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
                <Card className="rounded-[30px]">
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
