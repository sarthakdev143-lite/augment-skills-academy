/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, BookOpenCheck, Briefcase, CircleCheckBig, Layers3, LineChart, Shield, Sparkles } from "lucide-react";
import { CourseCard } from "@/components/course/course-card";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { academyFaqs, learningPillars, marketingStats, testimonials } from "@/lib/demo-data";
import { listPublishedCourses } from "@/lib/courses";

export const revalidate = 3600;

export default async function HomePage() {
  const courses = await listPublishedCourses();
  const featured = courses.filter((course) => course.featured).slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-8 pb-10 sm:pb-20">
      <section className="page-shell relative pb-8 pt-8 sm:pt-10 md:pb-14 md:pt-20">
        <div className="ambient-ring blob -left-16 top-8 h-24 w-24 sm:h-32 sm:w-32 bg-accent/20" />
        <div className="ambient-ring blob-delay -right-8 top-28 h-28 w-28 sm:h-40 sm:w-28 bg-accent-2/18" />

        <div className="relative grid gap-8 sm:gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Reveal className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-3 py-1.5 sm:px-4 sm:py-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-accent">Real skills. Real careers.</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-[1.06] tracking-tight text-balance md:text-6xl lg:text-7xl">
                Build your next tech career with mentors who do the work
              </h1>
              <p className="max-w-xl text-sm sm:text-lg leading-7 sm:leading-8 text-muted md:text-xl">
                Structured courses, hands-on projects, and placement support designed to move you from learning to employability.
              </p>
            </div>

            <div className="flex flex-col min-[400px]:flex-row flex-wrap gap-3">
              <Link href="/courses" className="shimmer-btn inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-black text-white">
                Explore Courses
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground/12 bg-background/60 px-5 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-bold text-foreground">
                Get Started
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { value: "3x", label: "Career acceleration" },
                { value: "4.9+", label: "Learner rating" },
                { value: "100%", label: "Placement Support" },
              ].map((item) => (
                <div key={item.label} className="stat-pip flex items-center gap-2 rounded-full px-4 py-2">
                  <span className="text-sm font-black text-foreground">{item.value}</span>
                  <span className="text-xs text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="illustration-shell shine-border-card relative rounded-4xl bg-[linear-gradient(180deg,#081b38_0%,#0d2b52_100%)] p-4 shadow-[0_32px_80px_rgba(4,25,62,0.30)] md:p-5">
              <Image
                src="/hero-dashboard-illustration.svg"
                alt="Academy dashboard showing progress, mentoring, and career outcomes"
                width={880}
                height={760}
                priority
                className="h-auto w-full rounded-[26px]"
              />
              <div className="mt-4 rounded-3xl sm:rounded-[28px] border border-white/12 bg-white/85 p-4 sm:p-5 shadow-[0_24px_48px_rgba(7,26,51,0.18)] backdrop-blur-xl md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                      What you get
                    </span>
                    <h2 className="mt-3 sm:mt-4 text-xl sm:text-xl sm:text-[22px] font-black leading-tight text-foreground">
                      Everything you need to move from learning to hiring-ready
                    </h2>
                  </div>
                  <div className="hidden aspect-square items-center justify-center rounded-2xl bg-accent p-2.5 text-white md:flex">
                    <Sparkles size={18} />
                  </div>
                </div>
                <div className="mt-4 sm:mt-5 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                  {[
                    "Industry-expert mentors",
                    "Hands-on Live project work",
                    "Resume, mock interviews and referrals",
                    "Lifetime community access",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-accent/10 bg-white px-4 py-3 text-foreground/85">
                      <CircleCheckBig size={16} className="mt-1 text-accent-3" />
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-band relative overflow-hidden py-10">
        <div className="page-shell relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { value: marketingStats[0].value, label: marketingStats[0].label },
              { value: marketingStats[1].value, label: marketingStats[1].label },
              { value: marketingStats[2].value, label: marketingStats[2].label },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.07}>
                <div className="glass-panel rounded-3xl p-6 text-center">
                  <p className="text-3xl font-black text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-6 rounded-4xl bg-accent/10 p-6 lg:grid-cols-[1fr_0.92fr] lg:items-center md:p-8">
            <div className="min-w-0">
              <h2 className="text-2xl font-black text-foreground">We don't just teach - we help you land</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                Every learner gets resume review, mock interviews, referral connections, and career guidance until they reach their goal.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {["Resume Help", "Mock Interviews", "Referrals", "Career Connections"].map((item) => (
                  <span key={item} className="rounded-full border border-accent/20 bg-background px-4 py-2 text-sm font-semibold text-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-panel relative overflow-hidden rounded-[28px] p-3">
              <Image
                src="/career-support-illustration.svg"
                alt="Career support illustration showing resume review and placement readiness"
                width={760}
                height={520}
                className="aspect-4/3 w-full rounded-[22px] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-accent/12 bg-[linear-gradient(180deg,rgba(7,26,51,0.98)_0%,rgba(12,43,84,0.96)_100%)] p-5 sm:p-5 text-white shadow-[0_28px_80px_rgba(7,26,51,0.18)]">
              <div className="ambient-ring blob -left-8 top-10 h-24 w-24 sm:h-32 sm:w-32 bg-accent/30" />
              <div className="ambient-ring blob-delay right-0 top-0 h-32 w-32 sm:h-44 sm:w-44 bg-accent-2/20" />
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="logo-pill flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl">
                  <Image src="/brand-mark.png" alt="Augment Skills Academy mark" width={30} height={30} className="sm:w-8.5 sm:h-8.5" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.24em] text-accent-2/80">Learning system</p>
                  <h2 className="mt-1 sm:mt-2 text-2xl sm:text-2xl font-black md:text-4xl">A clear roadmap from first lesson to first offer</h2>
                </div>
              </div>
              <p className="relative mt-4 sm:mt-5 max-w-2xl text-sm leading-6 sm:leading-7 text-white/68">
                Courses, mentor reviews, project checkpoints, and placement preparation all live in one guided flow.
              </p>

              <div className="relative mt-6 sm:mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  {
                    icon: <BookOpenCheck size={18} />,
                    title: "Guided curriculum",
                    body: "Structured weekly sprints with practical outputs instead of passive lesson piles.",
                  },
                  {
                    icon: <Layers3 size={18} />,
                    title: "Project checkpoints",
                    body: "Mentor-reviewed builds, portfolio polish, and feedback that compounds each week.",
                  },
                  {
                    icon: <LineChart size={18} />,
                    title: "Career readiness",
                    body: "Interview drills, resumes, and placement support synced to your learning pace.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-accent-2">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/60">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="gradient-border-card h-full overflow-hidden rounded-[36px] p-4">
              <div className="grid-pattern relative overflow-hidden rounded-[28px] bg-white p-4 md:p-5">
                <Image
                  src="/placement-blueprint-mockup.svg"
                  alt="Platform mockup showing learner journey, mentor reviews, and placement readiness metrics"
                  width={920}
                  height={760}
                  className="aspect-4/3 w-full rounded-[22px] object-cover object-top"
                />
                <div className="mt-4 inline-flex max-w-full rounded-full border border-accent/12 bg-background/90 px-4 py-2 text-sm font-semibold text-foreground shadow-[0_16px_34px_rgba(7,26,51,0.12)] backdrop-blur">
                  Dashboard + mentor workflow + placement pipeline
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-16">
        <Reveal>
          <div className="mb-14">
            <Badge>Why it works</Badge>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black md:text-5xl">Structured learning, practical work, career direction</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {learningPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.07}>
              <div className="rounded-3xl border border-border bg-surface p-5 sm:p-7 shadow-[0_12px_40px_rgba(26,18,9,0.08)] card-hover-glow">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-accent">{pillar.eyebrow}</p>
                <h3 className="mt-4 text-2xl font-black text-foreground">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-shell my-10">
        <div className="rounded-[40px] bg-[linear-gradient(180deg,#081a34_0%,#0d2546_100%)] px-5 sm:px-10 py-10 sm:py-14 text-white">
        <Reveal>
          <div className="mb-14">
            <Badge className="bg-white/10 text-white hover:bg-white/20 border-white/10">Our Mentors</Badge>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black md:text-5xl text-white">Learn from industry professionals who've been there</h2>
            <p className="mt-4 max-w-3xl text-lg text-white/70">
              We partner with experienced engineers, product leads, and growth professionals who mentor you through structured paths. No celebrities - just people who do this work every day.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-1">
            {[
              {
                icon: <Award size={22} />,
                title: "Industry Veterans",
                body: "Working professionals with 5-15 years in top product companies",
              },
              {
                icon: <Briefcase size={22} />,
                title: "Real-World Experience",
                body: "Every mentor has shipped production systems used by thousands",
              },
              {
                icon: <Shield size={22} />,
                title: "Privacy Respected",
                body: "Our mentors guide you behind the scenes - your growth is what's front and center",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/8 p-5 sm:p-7 backdrop-blur-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent-2">{item.icon}</div>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{item.body}</p>
              </div>
            ))}
          </div>
          <Reveal delay={0.08}>
            <div className="gradient-border-card overflow-hidden rounded-4xl p-4">
              <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#edf6ff_0%,#d9edff_100%)] p-4">
                <Image
                  src="/mentor-network-illustration.svg"
                  alt="Mentor network illustration representing guided cohort learning"
                  width={760}
                  height={640}
                  className="aspect-4/3 w-full rounded-[22px] object-cover object-top"
                />
                <div className="absolute bottom-7 left-7 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/85 px-4 py-2 text-sm font-semibold text-foreground shadow-[0_14px_40px_rgba(20,14,5,0.12)] backdrop-blur">
                  Cohort guidance
                  <ArrowUpRight size={14} className="text-accent" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-16">
        <Reveal>
          <div className="mb-14 text-center">
            <Badge>Courses</Badge>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black md:text-5xl">Choose your path</h2>
          </div>
        </Reveal>
        <div className="flex gap-5 sm:gap-6 flex-row-reverse max-lg:flex-wrap-reverse justify-center">
          {featured.map((course, index) => (
            <Reveal key={course.id} delay={index * 0.05}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-shell py-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#081a34_0%,#0f2a56_58%,#0b4e88_100%)] px-5 sm:px-8 py-10 sm:py-14 text-white md:px-14 md:py-10">
            <div className="ambient-ring blob -left-4 -top-4 h-36 w-36 bg-accent/25" />
            <div className="ambient-ring blob-delay right-10 top-8 h-28 w-28 bg-accent-2/20" />

            <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight md:text-5xl">Ready to build your next move?</h2>
                <p className="mt-5 max-w-lg text-base leading-8 text-white/60">
                  Explore the right course, enroll with your preferred track, and let our team guide you through the next step.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-3">
                  <Image
                    src="/catalog-grid-illustration.svg"
                    alt="Course catalog illustration"
                    width={720}
                    height={520}
                    className="aspect-4/3 w-full rounded-[22px] object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/courses" className="shimmer-btn inline-flex items-center justify-center rounded-full bg-accent px-5 sm:px-8 py-4.5 text-sm font-black text-white">
                    Explore Courses
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 sm:px-8 py-4 text-sm font-bold text-white/80">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden py-10 sm:py-16">
        <div className="page-shell relative">
          <Reveal>
            <div className="mb-14 text-center">
              <Badge>Reviews</Badge>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black md:text-5xl">What learners say</h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={`${testimonial.name}-${index}`} delay={index * 0.07}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-5 sm:p-7 shadow-[0_16px_48px_rgba(26,18,9,0.1)] card-hover-glow">
                  <p className="flex-1 text-sm leading-7 text-muted">"{testimonial.quote}"</p>
                  <div className="mt-6 border-t border-border pt-5">
                    <p className="text-sm font-black text-foreground">{testimonial.name}</p>
                    <p className="text-[11px] text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-16">
        <Reveal>
          <div className="mb-14 text-center">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black md:text-5xl">Questions we always get</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {academyFaqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.05}>
              <details className="group rounded-2xl border border-border bg-surface px-7 py-5 open:pb-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-foreground">
                  {faq.question}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-lg leading-none text-accent">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
