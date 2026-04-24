/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Award, Briefcase, CircleCheckBig, Shield } from "lucide-react";
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
    <main className="overflow-x-hidden pb-20">
      <section className="relative mx-auto max-w-7xl px-6 pb-8 pt-10 md:pb-14 md:pt-20">
        <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/8 px-4 py-2">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Real skills. Real careers.</span>
              </div>
              <h1 className="text-5xl font-black leading-[1.06] tracking-tight text-balance md:text-6xl lg:text-7xl">
                Build your next tech career with mentors who do the work
              </h1>
              <p className="max-w-xl text-lg leading-8 text-muted md:text-xl">
                Structured courses, hands-on projects, and placement support designed to move you from learning to employability.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/courses" className="shimmer-btn inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-base font-black text-white">
                Explore Courses
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-full border-2 border-foreground/12 bg-background/60 px-8 py-4 text-base font-bold text-foreground">
                Get Started
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { value: "3x", label: "Career acceleration" },
                { value: "4.9★", label: "Satisfaction" },
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
            <div className="shine-border-card relative rounded-[32px] bg-[#0e1e33] p-7 shadow-[0_32px_80px_rgba(0,0,0,0.30)]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
                What you get
              </span>
              <h2 className="mt-6 text-[22px] font-black leading-tight text-white">Everything you need to move from learning to hiring-ready</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Industry-expert mentors",
                  "Hands-on project work",
                  "Resume, mock interviews & referrals",
                  "Lifetime community access",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 text-white/85">
                    <CircleCheckBig size={16} className="mt-1 text-accent-3" />
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-10 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-3 gap-5">
            {[
              { value: marketingStats[0].value, label: marketingStats[0].label, color: "#0f7f78" },
              { value: marketingStats[1].value, label: marketingStats[1].label, color: "#f6c46e" },
              { value: marketingStats[2].value, label: marketingStats[2].label, color: "#8b5cf6" },
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.07}>
                <div className="glass-panel rounded-3xl p-6 text-center">
                  <p className="text-3xl font-black text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 rounded-[32px] bg-accent/10 p-8">
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-14">
            <Badge>Why it works</Badge>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">Structured learning, practical work, career direction</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {learningPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.07}>
              <div className="rounded-3xl border border-border bg-surface p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-accent">{pillar.eyebrow}</p>
                <h3 className="mt-4 text-2xl font-black text-foreground">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-14">
            <Badge>Our Mentors</Badge>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">Learn from industry professionals who've been there</h2>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              We partner with experienced engineers, product leads, and growth professionals who mentor you through structured paths. No celebrities - just people who do this work every day.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
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
            <div key={item.title} className="rounded-3xl border border-border bg-surface p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">{item.icon}</div>
              <h3 className="text-xl font-black text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-14 text-center">
            <Badge>Courses</Badge>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">Choose your path</h2>
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

      <section className="relative py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <Badge>Reviews</Badge>
              <h2 className="mt-4 text-4xl font-black md:text-5xl">What learners say</h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={`${testimonial.name}-${index}`} delay={index * 0.07}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-background/80 p-7">
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

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <div className="mb-14 text-center">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">Questions we always get</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {academyFaqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.05}>
              <details className="group rounded-2xl border border-border bg-surface px-7 py-5 open:pb-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-foreground">
                  {faq.question}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/10 text-accent text-lg leading-none">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-[#0b1928] px-8 py-14 text-white md:px-14 md:py-16">
            <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-3xl font-black leading-tight md:text-5xl">Ready to build your next move?</h2>
                <p className="mt-5 max-w-lg text-base leading-8 text-white/60">
                  Explore the right course, enroll with your preferred track, and let our team guide you through the next step.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:min-w-[200px]">
                <Link href="/courses" className="shimmer-btn inline-flex items-center justify-center rounded-full bg-accent px-8 py-4.5 text-sm font-black text-white">
                  Explore Courses
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white/80">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
