/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Rocket, Shield, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { marketingStats } from "@/lib/demo-data";

const values = [
  {
    icon: <Target size={22} />,
    title: "Outcome-first design",
    body: "We design each path around the role learners want to reach, so every module has a clear purpose and career context.",
  },
  {
    icon: <Shield size={22} />,
    title: "Mentor-led growth",
    body: "Every learner is guided by a real professional who reviews your work, answers your doubts, and helps you build a career strategy - not just finish a course.",
  },
  {
    icon: <Rocket size={22} />,
    title: "Portfolio-ready proof",
    body: "Projects, case studies, and guided reviews help you leave with proof you can show in interviews and applications.",
  },
  {
    icon: <Briefcase size={22} />,
    title: "Community & accountability",
    body: "Learning alone is hard. Our cohorts keep you in a room with peers, mentors, and a support system that keeps you moving.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden pb-20">
      <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-14">
        <div className="ambient-ring blob left-[-3rem] top-8 h-28 w-28 bg-accent/18" />
        <div className="ambient-ring blob-delay right-0 top-10 h-40 w-40 bg-accent-2/15" />

        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative max-w-3xl">
            <Reveal>
              <Badge>About</Badge>
              <h1 className="mt-5 text-5xl font-black leading-tight text-balance md:text-6xl">Building real careers through real skills</h1>
              <p className="mt-6 text-xl leading-9 text-muted">
                Augment Skills Academy was built because we saw too many learners stuck between endless tutorials and actual employment. We bridge that gap with structured paths, hands-on projects, and mentors who've walked the same road.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="gradient-border-card overflow-hidden rounded-[34px] p-4">
              <div className="relative overflow-hidden rounded-[28px] bg-[#0b1928] p-4">
                <Image
                  src="/about-journey-illustration.svg"
                  alt="Illustration showing the academy journey from learning to career outcomes"
                  width={760}
                  height={560}
                  className="h-auto w-full rounded-[22px]"
                />
                <div className="absolute bottom-7 left-7 rounded-full border border-white/10 bg-[#081321]/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  Designed for momentum
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-10">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-3 gap-5">
            {marketingStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.07}>
                <div className="glass-panel rounded-3xl p-6 text-center">
                  <p className="text-3xl font-black text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-12">
            <Badge>Our values</Badge>
            <h2 className="mt-4 text-4xl font-black text-balance md:text-5xl">What shapes the academy</h2>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.07}>
              <div className="card-hover-glow rounded-3xl border border-border bg-surface p-7">
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-accent/10 text-accent">{value.icon}</div>
                <h3 className="text-xl font-black text-foreground">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-14">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <div className="rounded-3xl bg-[#0e1e33] p-8 text-white">
                <h2 className="text-2xl font-black">How we teach</h2>
                <div className="mt-5 space-y-4 text-sm text-white/75">
                  {[
                    "Mentor feedback on your real project work",
                    "Structured roadmaps that reduce random tutorial hopping",
                    "Checkpoint reviews that keep your momentum visible",
                    "Career guidance that connects learning to hiring outcomes",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-3" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass-panel overflow-hidden rounded-3xl p-4">
                <Image
                  src="/mentor-network-illustration.svg"
                  alt="Mentor network illustration"
                  width={760}
                  height={640}
                  className="h-auto w-full rounded-[24px]"
                />
                <div className="mt-5 rounded-[24px] border border-border bg-surface-strong p-6">
                  <h2 className="text-2xl font-black text-foreground">What you get</h2>
                  <div className="mt-5 space-y-3.5 text-sm text-muted">
                    {["Resume help", "Mock interviews", "Referral network", "Career guidance", "Community"].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <ArrowRight size={14} className="mt-0.5 text-accent" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-[#0b1928] px-8 py-12 text-center text-white md:px-14">
            <div className="ambient-ring blob left-8 top-6 h-24 w-24 bg-accent/20" />
            <div className="relative">
              <h2 className="text-3xl font-black md:text-4xl">Ready to build a stronger career path?</h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-white/60">
                Explore our mentor-led programs and find the path that maps to the role you want next.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/courses" className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-black text-white">
                  Explore Courses
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white/80">
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
