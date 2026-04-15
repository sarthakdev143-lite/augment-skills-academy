import Link from "next/link";
import { ArrowRight, Star, Users, Trophy, Briefcase, Target, Rocket, Code2, Shield, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { marketingStats, testimonials, mentorHighlights } from "@/lib/demo-data";

const values = [
  {
    icon: <Target size={22} />,
    title: "Outcome-first design",
    body: "We build every path around a specific role outcome, not a topic. The curriculum follows the job, not the other way around.",
    color: "#e36a2f",
  },
  {
    icon: <Code2 size={22} />,
    title: "Production-grade learning",
    body: "We lead with systems thinking. Typed workflows, secure mutations, and deployment-ready choices — not isolated tricks.",
    color: "#0f7f78",
  },
  {
    icon: <Rocket size={22} />,
    title: "Portfolio-ready proof",
    body: "Every path ends with artifacts you can show recruiters, managers, and clients with full confidence — not just another certificate.",
    color: "#8b5cf6",
  },
  {
    icon: <Shield size={22} />,
    title: "Sustainable momentum",
    body: "We keep the learner experience warm, clear, and confidence-building so people finish instead of burning out.",
    color: "#f59e0b",
  },
];

const teamUses = [
  "Platform onboarding for new hires",
  "Internal upskilling on App Router, TypeScript, and AI product systems",
  "Reusable architecture guidance that survives after the cohort ends",
  "Interview preparation and portfolio narrative coaching",
];

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden pb-20">

      {/* ── HERO ── */}
      <section className="relative mx-auto max-w-7xl px-6 pt-14 pb-16">
        {/* Orbs */}
        <div
          aria-hidden
          className="blob pointer-events-none absolute -top-24 -left-16 h-96 w-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #e36a2f, transparent 65%)" }}
        />
        <div
          aria-hidden
          className="blob-delay pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #0f7f78, transparent 65%)" }}
        />

        <div className="relative max-w-3xl">
          <Reveal>
            <Badge>About</Badge>
            <h1 className="mt-5 text-5xl font-black leading-tight text-balance md:text-6xl">
              An academy designed around{" "}
              <span className="text-gradient-accent">real delivery</span> work
            </h1>
            <p className="mt-6 text-xl leading-9 text-muted">
              We build learning systems for engineers, operators, and ambitious career
              switchers who want more than surface-level tutorials. Stronger architecture,
              calmer onboarding, and sharper production instincts.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-black text-white shadow-[0_8px_28px_rgba(227,106,47,0.40)] hover:-translate-y-0.5 transition-all"
              >
                Browse programs <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/12 px-7 py-3.5 text-sm font-bold text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                Enterprise enquiry
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-surface/50" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[
              { icon: <Users size={18} />,     value: marketingStats[0].value, label: marketingStats[0].label, color: "#e36a2f" },
              { icon: <Rocket size={18} />,    value: marketingStats[1].value, label: marketingStats[1].label, color: "#0f7f78" },
              { icon: <Briefcase size={18} />, value: marketingStats[2].value, label: marketingStats[2].label, color: "#8b5cf6" },
              { icon: <Star size={18} />,      value: marketingStats[3].value, label: marketingStats[3].label, color: "#f59e0b" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="glass-panel rounded-3xl p-6 text-center card-hover-glow">
                  <div
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${s.color}20` }}
                  >
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <p className="text-3xl font-black text-foreground">{s.value}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-12">
            <Badge>Our values</Badge>
            <h2 className="mt-4 text-4xl font-black text-balance md:text-5xl">
              What makes us different
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="group rounded-3xl border border-border bg-surface p-7 card-hover-glow h-full">
                <div
                  className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl shadow-sm"
                  style={{ background: `${v.color}18` }}
                >
                  <span style={{ color: v.color }}>{v.icon}</span>
                </div>
                <h3 className="text-xl font-black text-foreground">{v.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── HOW WE TEACH + TEAM USES ── */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-surface/40" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* How we teach */}
            <Reveal>
              <div className="rounded-3xl bg-[#0e1e33] p-8 text-white h-full shadow-xl shine-border-card">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Sparkles size={20} className="text-accent-3" />
                </div>
                <h2 className="text-2xl font-black">How we teach</h2>
                <div className="mt-5 space-y-4">
                  {[
                    "We lead with systems thinking, not isolated tricks",
                    "We favor typed workflows, secure mutations, and deployment-ready choices",
                    "We keep the learner experience warm, clear, and confidence-building",
                    "We measure success by job outcomes, not course completions",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-3" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* What teams use us for */}
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-surface p-8 h-full card-hover-glow">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                  <Briefcase size={20} className="text-accent" />
                </div>
                <h2 className="text-2xl font-black text-foreground">What teams use us for</h2>
                <div className="mt-5 space-y-3.5">
                  {teamUses.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-muted">
                      <ArrowRight size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/8 px-5 py-2.5 text-sm font-bold text-accent hover:bg-accent hover:text-white transition-all"
                >
                  Talk to us about enterprise <ArrowRight size={13} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-12 text-center">
            <Badge>Testimonials</Badge>
            <h2 className="mt-4 text-4xl font-black">What learners say</h2>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7 card-hover-glow">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-7 text-muted">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-xs font-black text-accent">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-black text-foreground">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-[#0b1928] px-8 py-12 text-white text-center md:px-14">
            <div aria-hidden className="blob absolute -top-16 -left-16 h-48 w-48 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #e36a2f, transparent 70%)" }} />
            <div aria-hidden className="blob-delay absolute -bottom-12 right-10 h-40 w-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #0f7f78, transparent 70%)" }} />
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent-3 mb-3">Start your journey</p>
              <h2 className="text-3xl font-black md:text-4xl">Ready to build your next career move?</h2>
              <p className="mt-4 text-white/60 leading-7 max-w-xl mx-auto">
                Explore our mentor-led programs and find the path that maps to the role you want next.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/courses" className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-black text-white shadow-[0_8px_28px_rgba(227,106,47,0.50)] hover:-translate-y-1 transition-all">
                  Browse programs <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white/80 hover:bg-white/5 transition-all">
                  Talk to an advisor
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
