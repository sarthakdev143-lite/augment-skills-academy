import Link from "next/link";
import {
  ArrowRight, Star, Users, Trophy, Briefcase, PlayCircle,
  CheckCircle2, Zap, Code2, Target, Rocket, BookOpen,
  Award, TrendingUp, Shield, Sparkles, MessageSquare,
} from "lucide-react";
import { CourseCard } from "@/components/course/course-card";
import { Reveal } from "@/components/reveal";
import { MarqueeRow } from "@/components/marquee-row";
import { HeroWords } from "@/components/hero-words";
import { Badge } from "@/components/ui/badge";
import {
  academyFaqs,
  learnerJourneys,
  learningPillars,
  logoCloud,
  marketingStats,
  mentorHighlights,
  pricingPlans,
  testimonials,
} from "@/lib/demo-data";
import { listPublishedCourses } from "@/lib/courses";
import { isSupabaseConfigured } from "@/lib/env";

export const revalidate = 3600;

const placementCards = [
  { name: "Ritika S.",    from: "UI/UX Designer",     to: "Product Designer",     company: "Northlane" },
  { name: "Joseph M.",    from: "Sales Exec",          to: "Growth Engineer",      company: "Beamstack" },
  { name: "Ayesha K.",    from: "BA Graduate",         to: "Product Ops Lead",     company: "OrbitPay" },
  { name: "Siddharth R.", from: "Ad-hoc marketer",    to: "Growth Associate",     company: "SignalOS" },
  { name: "Neha K.",      from: "Frontend Dev",        to: "AI Product Engineer",  company: "Scope AI" },
  { name: "Kabir D.",     from: "Freelancer",          to: "Full-Stack Engineer",  company: "Layerworks" },
  { name: "Priya V.",     from: "Content Writer",      to: "SEO Strategist",       company: "Helio Commerce" },
  { name: "Ansh T.",      from: "Intern",              to: "Platform Engineer",    company: "Northlane" },
];

const pillarIcons = [
  <Target  key="target" size={28} />,
  <Code2   key="code"   size={28} />,
  <Rocket  key="rocket" size={28} />,
];

const pillarGradients = [
  "from-[#132238] to-[#1e3a5f]",
  "from-[#e36a2f] to-[#c85420]",
  "from-[#0f7f78] to-[#0a5c57]",
];

const mentorColors = [
  { ring: "#132238", bg: "from-[#132238] to-[#1a3050]" },
  { ring: "#e36a2f", bg: "from-[#e36a2f] to-[#c85420]" },
  { ring: "#0f7f78", bg: "from-[#0f7f78] to-[#0a5c57]" },
];

const statIcons = [
  <Users    key="u" size={20} />,
  <TrendingUp key="t" size={20} />,
  <Briefcase key="b" size={20} />,
  <Star     key="s" size={20} />,
];

export default async function HomePage() {
  const courses    = await listPublishedCourses();
  const featured   = courses.filter((c) => c.featured).slice(0, 3);
  const isDemoMode = !isSupabaseConfigured();

  return (
    <main className="overflow-x-hidden pb-20">

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-8 md:pt-20 md:pb-14">
        {/* Animated gradient orbs */}
        <div
          aria-hidden
          className="blob pointer-events-none absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #e36a2f 0%, transparent 65%)" }}
        />
        <div
          aria-hidden
          className="blob-delay pointer-events-none absolute top-8 right-0 h-[380px] w-[380px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #0f7f78 0%, transparent 65%)" }}
        />
        <div
          aria-hidden
          className="blob-slow pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f6c46e 0%, transparent 65%)" }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

          {/* ── Left column ── */}
          <Reveal className="space-y-8">
            {isDemoMode && (
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                <Zap size={12} className="fill-amber-500 text-amber-500" />
                Demo mode — connect Supabase to go live
              </div>
            )}

            <div className="space-y-5">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/8 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">
                  38,000+ learners transformed
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl font-black leading-[1.06] tracking-tight text-balance md:text-6xl lg:text-7xl">
                Launch your{" "}
                <span className="relative inline-block">
                  <HeroWords
                    words={["Tech Career", "AI Skills", "Next Role", "Portfolio"]}
                    className="text-gradient-accent"
                  />
                </span>
                <br />
                <span className="text-foreground">with mentors</span>
              </h1>

              <p className="max-w-xl text-lg leading-8 text-muted md:text-xl">
                Structured learning paths, weekly mentor reviews, and portfolio-first
                projects built to get you to your next role — not just through a course.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="shimmer-btn inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-base font-black text-white shadow-[0_8px_32px_rgba(227,106,47,0.42)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(227,106,47,0.55)] transition-all duration-300"
              >
                Start your application <ArrowRight size={18} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2.5 rounded-full border-2 border-foreground/12 bg-background/60 px-8 py-4 text-base font-bold text-foreground backdrop-blur-sm hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"
              >
                <PlayCircle size={18} className="text-accent" />
                Explore programs
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { icon: <Users      size={15} />, value: "38k+",  label: "Learners" },
                { icon: <Trophy     size={15} />, value: "4.8★",  label: "Avg rating" },
                { icon: <Briefcase  size={15} />, value: "320+",  label: "Hiring partners" },
                { icon: <TrendingUp size={15} />, value: "2.4×",  label: "Career jump" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="stat-pip flex items-center gap-2 rounded-full px-4 py-2"
                >
                  <span className="text-accent">{s.icon}</span>
                  <span className="text-sm font-black text-foreground">{s.value}</span>
                  <span className="text-xs text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Right column: placement card ── */}
          <Reveal delay={0.12}>
            <div className="relative">
              {/* Glow */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-[36px] opacity-50"
                style={{ filter: "blur(40px)", background: "radial-gradient(circle at 50% 60%, rgba(227,106,47,0.22), transparent 70%)" }}
              />

              {/* Main card */}
              <div className="shine-border-card relative rounded-[32px] bg-[#0e1e33] p-7 shadow-[0_32px_80px_rgba(0,0,0,0.30)]">
                {/* Dot pattern bg */}
                <div className="absolute inset-0 rounded-[32px] overflow-hidden opacity-[0.04]">
                  <div className="dot-pattern absolute inset-0" />
                </div>

                {/* Card header */}
                <div className="relative flex items-center justify-between gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-black/70">
                    <Sparkles size={10} className="text-accent-3" />
                    Career acceleration
                  </span>
                  <span className="text-[11px] font-semibold text-black/45">Next cohort — May 4</span>
                </div>

                <h2 className="relative text-[22px] font-black leading-tight mb-6">
                  From any background<br />
                  <span className="text-accent-3">to your dream role</span>
                </h2>

                {/* Mini placement cards */}
                <div className="relative space-y-2.5">
                  {placementCards.slice(0, 4).map((p, i) => (
                    <div
                      key={p.name}
                      className="flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 hover:bg-white/[0.10] transition-colors"
                    >
                      <div
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
                        style={{ background: ["#e36a2f","#0f7f78","#f6c46e","#8b5cf6"][i % 4] }}
                      >
                        {p.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold truncate">{p.name}</p>
                        <p className="text-[11px] text-black/50 truncate">
                          {p.from}{" "}
                          <span className="mx-1 text-black/30">→</span>{" "}
                          <span className="text-accent-3 font-semibold">{p.to}</span>
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-black/35 flex-shrink-0 bg-white/5 rounded-full px-2 py-0.5">
                        {p.company}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Avatar row */}
                <div className="relative mt-5 flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {["#e36a2f","#0f7f78","#f6c46e","#8b5cf6","#22d3ee"].map((c, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-[#0e1e33] shadow-sm"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={11} className="fill-accent-3 text-accent-3" />
                      ))}
                    </div>
                    <p className="text-[11px] text-white/55">+38k learners transformed</p>
                  </div>
                </div>
              </div>

              {/* Floating badge: completion */}
              <div className="float-anim absolute -right-5 -bottom-5 rounded-2xl bg-accent px-4 py-3 text-white shadow-[0_12px_32px_rgba(227,106,47,0.50)]">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-75">Completion</p>
                <p className="text-3xl font-black leading-tight">97%</p>
              </div>

              {/* Floating badge: rating */}
              <div className="float-anim absolute right-24 -bottom-5 rounded-2xl bg-[#0f7f78] px-4 py-3 text-white shadow-[0_12px_32px_rgba(15,127,120,0.40)]" style={{ animationDelay: "1s" }}>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-75">Rating</p>
                <p className="text-3xl font-black leading-tight">4.9<span className="text-lg">★</span></p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          LOGO CLOUD
      ══════════════════════════════════════════════════════════ */}
      <section className="relative border-y border-border/50 bg-surface/40 py-6 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-5 text-center text-[10px] font-black uppercase tracking-[0.25em] text-muted/60">
            Our learners now work at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {logoCloud.map((logo) => (
              <span
                key={logo}
                className="rounded-full border border-border/70 bg-surface px-5 py-2 text-xs font-bold text-muted/60 hover:border-accent/30 hover:text-foreground hover:bg-accent/5 transition-all duration-200 cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PLACEMENT MARQUEE
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-12 overflow-hidden">
        {/* Left / right fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10" style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10" style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

        <Reveal>
          <p className="mb-7 text-center text-[10px] font-black uppercase tracking-[0.25em] text-muted/60">
            Real learner transformations
          </p>
        </Reveal>
        <MarqueeRow cards={placementCards} />
        <div className="mt-3">
          <MarqueeRow cards={[...placementCards].reverse()} reverse />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-1 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[
              { icon: statIcons[0], value: "38,000+", label: "Learners mentored",    color: "#e36a2f" },
              { icon: statIcons[1], value: "2.4×",    label: "Avg career jump",      color: "#0f7f78" },
              { icon: statIcons[2], value: "320+",    label: "Hiring teams engaged", color: "#8b5cf6" },
              { icon: statIcons[3], value: "4.8 / 5", label: "Learner satisfaction", color: "#f6c46e" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.07}>
                <div className="glass-panel rounded-3xl p-6 text-center card-hover-glow">
                  <div
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                    style={{ background: `${stat.color}26` }}
                  >
                    <span style={{ color: stat.color }}>{stat.icon}</span>
                  </div>
                  <p className="text-3xl font-black text-foreground tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY IT WORKS — Learning Pillars
      ══════════════════════════════════════════════════════════ */}
      <section id="outcomes" className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <Badge>Why it works</Badge>
            <h2 className="mt-4 text-4xl font-black leading-tight text-balance md:text-5xl">
              A system designed around getting you{" "}
              <span className="text-gradient-accent">hired</span>, not just educated
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Every path combines structured lessons, mentor reviews, portfolio artifacts, and
              career support into one outcome-first experience.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {learningPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${pillarGradients[i]} p-8 text-white shadow-xl card-hover-glow`}
              >
                {/* Background decoration */}
                <svg
                  aria-hidden
                  className="absolute -right-10 -bottom-10 h-48 w-48 opacity-8"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="45" fill="currentColor" />
                </svg>
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, white, transparent 70%)" }}
                />

                {/* Step number */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-white">
                    {pillarIcons[i]}
                  </div>
                  <span className="text-5xl font-black text-white/10 leading-none select-none">
                    0{i + 1}
                  </span>
                </div>

                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/55">
                  {pillar.eyebrow}
                </p>
                <h3 className="text-xl font-black leading-snug text-balance flex-1">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{pillar.description}</p>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white/60 group-hover:text-white transition-colors">
                  Learn more
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURED COURSES
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        {/* Section bg tint */}
        <div className="absolute inset-0 bg-surface/40" />
        <div className="absolute inset-0 grid-pattern opacity-60" />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <Badge>Programs</Badge>
                <h2 className="mt-4 text-4xl font-black text-balance md:text-5xl">
                  Pick your specialization path
                </h2>
                <p className="mt-3 text-lg text-muted max-w-lg">
                  Outcome-mapped tracks with mentor support and portfolio-ready capstones.
                </p>
              </div>
              <Link
                href="/courses"
                className="hidden items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-foreground hover:border-accent/50 hover:bg-accent/5 transition-all whitespace-nowrap md:inline-flex"
              >
                All programs <ArrowRight size={14} className="text-accent" />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map((course, i) => (
              <Reveal key={course.id} delay={i * 0.07}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-foreground"
            >
              View all programs <ArrowRight size={14} className="text-accent" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          LEARNER TRANSFORMATIONS
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal>
          <div className="mb-14 text-center">
            <Badge>Success stories</Badge>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Real people. <span className="text-gradient-teal">Real results.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted leading-8">
              Not testimonials. Actual before/after career journeys from learners who
              shipped work and got hired.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {learnerJourneys.map((story, i) => {
            const colors = ["#e36a2f","#0f7f78","#8b5cf6"] as const;
            return (
              <Reveal key={story.name} delay={i * 0.08}>
                <div className="group relative flex h-full flex-col rounded-3xl border border-border bg-surface p-7 card-hover-glow">
                  {/* Top color bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: colors[i % 3] }}
                  />

                  {/* Avatar + name */}
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${colors[i % 3]}, ${colors[i % 3]}99)` }}
                    >
                      {story.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-black text-foreground">{story.name}</p>
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                        style={{ background: `${colors[i % 3]}18`, color: colors[i % 3] }}
                      >
                        <BookOpen size={9} /> {story.track}
                      </span>
                    </div>
                  </div>

                  {/* Before / After */}
                  <div className="mb-5 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl border border-border bg-background/60 p-3.5">
                      <p className="mb-1.5 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-muted/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted/40 inline-block" />
                        Before
                      </p>
                      <p className="text-xs font-semibold text-foreground leading-snug">{story.before}</p>
                    </div>
                    <div className="rounded-2xl p-3.5" style={{ background: colors[i % 3] + "18" }}>
                      <p className="mb-1.5 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest" style={{ color: colors[i % 3] + "aa" }}>
                        <span className="h-1.5 w-1.5 rounded-full inline-block" style={{ background: colors[i % 3] }} />
                        After
                      </p>
                      <p className="text-xs font-bold leading-snug" style={{ color: colors[i % 3] }}>{story.after}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="mt-auto">
                    <MessageSquare size={16} className="text-muted/30 mb-2" />
                    <p className="text-sm leading-7 text-muted italic">"{story.quote}"</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MENTORS
      ══════════════════════════════════════════════════════════ */}
      <section id="mentors" className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a1628]/[0.03] dark:bg-white/[0.01]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-14">
              <Badge>Mentors</Badge>
              <h2 className="mt-4 text-4xl font-black text-balance md:text-5xl">
                Learn from practitioners<br className="hidden sm:block" />
                <span className="text-gradient-accent"> who've been there</span>
              </h2>
              <p className="mt-4 text-lg text-muted max-w-xl">
                Every mentor has shipped production work, led teams, and helped learners
                land real jobs at companies that matter.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {mentorHighlights.map((mentor, i) => (
              <Reveal key={mentor.name} delay={i * 0.07}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-7 card-hover-glow">
                  {/* Subtle gradient corner */}
                  <div
                    className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${mentorColors[i % 3].ring}, transparent 70%)` }}
                  />

                  <div className="mb-5 flex items-start justify-between gap-3">
                    {/* Avatar with gradient ring */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${mentorColors[i % 3].ring}ee, ${mentorColors[i % 3].ring}99)` }}
                      >
                        {mentor.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div
                        className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-sm border border-border"
                      >
                        <Award size={11} style={{ color: mentorColors[i % 3].ring }} />
                      </div>
                    </div>

                    {/* Stat badge */}
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-black"
                      style={{ background: `${mentorColors[i % 3].ring}15`, color: mentorColors[i % 3].ring }}
                    >
                      <Shield size={9} /> {mentor.stat}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-foreground">{mentor.name}</h3>
                  <p className="mt-1 text-sm font-bold" style={{ color: mentorColors[i % 3].ring }}>
                    {mentor.role}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted flex-1">{mentor.focus}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {mentor.focus.split(", ").map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <div className="mb-14 text-center">
            <Badge>Pricing</Badge>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-muted">No hidden fees. Cancel any time.</p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 ${
                  i === 1
                    ? "bg-[#0e1e33] text-white shadow-[0_32px_80px_rgba(0,0,0,0.25)] ring-2 ring-accent/40"
                    : "border border-border bg-surface"
                }`}
              >
                {/* Popular badge */}
                {i === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[11px] font-black text-white shadow-[0_4px_16px_rgba(227,106,47,0.45)]">
                      <Sparkles size={10} /> Most popular
                    </span>
                  </div>
                )}

                {/* Orange glow for featured */}
                {i === 1 && (
                  <div
                    className="absolute inset-0 rounded-3xl opacity-[0.06] pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, #e36a2f, transparent)" }}
                  />
                )}

                <p className={`text-[10px] font-black uppercase tracking-[0.22em] ${i === 1 ? "text-white/50" : "text-muted"}`}>
                  {plan.name}
                </p>

                <div className="mt-4 flex items-end gap-2">
                  <p className="text-5xl font-black">{plan.price}</p>
                  <p className={`mb-1.5 text-sm ${i === 1 ? "text-white/55" : "text-muted"}`}>
                    {plan.cadence}
                  </p>
                </div>

                <p className={`mt-4 text-sm leading-7 ${i === 1 ? "text-white/70" : "text-muted"}`}>
                  {plan.description}
                </p>

                <ul className="mt-7 flex-1 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                          i === 1 ? "bg-accent/20" : "bg-accent/10"
                        }`}
                      >
                        <CheckCircle2 size={13} className={i === 1 ? "text-accent-3" : "text-accent"} />
                      </div>
                      <span className={i === 1 ? "text-white/80" : "text-muted"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`shimmer-btn mt-8 flex items-center justify-center gap-2 rounded-full py-4 text-sm font-black transition-all hover:-translate-y-0.5 ${
                    i === 1
                      ? "bg-accent text-white shadow-[0_8px_28px_rgba(227,106,47,0.45)] hover:shadow-[0_16px_40px_rgba(227,106,47,0.60)]"
                      : "border-2 border-foreground/12 text-foreground hover:border-accent/40 hover:bg-accent/5"
                  }`}
                >
                  Get started <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Guarantee note */}
        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-muted flex items-center justify-center gap-2">
            <Shield size={14} className="text-accent" />
            14-day money-back guarantee — no questions asked
          </p>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-surface/50" />
        <div className="absolute inset-0 dot-pattern opacity-40" />

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <Badge>Reviews</Badge>
              <h2 className="mt-4 text-4xl font-black md:text-5xl">
                What learners say
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.07}>
                <div className="group relative flex h-full flex-col rounded-3xl border border-border bg-background/80 p-7 backdrop-blur-sm card-hover-glow">
                  {/* Quote mark */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-5xl font-black text-accent/10 leading-none select-none">"</span>
                  </div>

                  <p className="flex-1 text-sm leading-7 text-muted">"{t.quote}"</p>

                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-black text-accent">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-black text-foreground">{t.name}</p>
                      <p className="text-[11px] text-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <div className="mb-14 text-center">
            <Badge>FAQ</Badge>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Questions we always get
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {academyFaqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.05}>
              <details className="group rounded-2xl border border-border bg-surface px-7 py-5 open:pb-6 transition-all open:shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-foreground select-none">
                  {faq.question}
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-lg leading-none group-open:bg-accent group-open:text-white group-open:rotate-45 transition-all duration-300">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-[#0b1928] px-8 py-14 text-white md:px-14 md:py-16">
            {/* Animated gradient orbs */}
            <div
              aria-hidden
              className="blob absolute -top-20 -left-20 h-64 w-64 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, #e36a2f, transparent 70%)" }}
            />
            <div
              aria-hidden
              className="blob-delay absolute -bottom-16 right-10 h-56 w-56 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #0f7f78, transparent 70%)" }}
            />
            <div
              aria-hidden
              className="blob-slow absolute top-1/2 right-1/3 h-40 w-40 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, #f6c46e, transparent 70%)" }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]">
              <div className="grid-pattern absolute inset-0" />
            </div>

            <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-3/30 bg-accent-3/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-accent-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-3 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-3" />
                  </span>
                  Applications open
                </div>

                <h2 className="text-3xl font-black text-balance leading-tight md:text-5xl">
                  Ready to transform<br />
                  <span className="text-gradient-accent">your career?</span>
                </h2>
                <p className="mt-5 text-white/60 leading-8 max-w-lg text-base">
                  Join 38,000+ learners who made the leap. Structured paths, mentor reviews,
                  and a community that keeps you accountable and moving.
                </p>

                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Mentor-led cohorts", "Portfolio-first", "Career support", "14-day guarantee"].map((t) => (
                    <span key={t} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold text-white/60">
                      <CheckCircle2 size={10} className="text-accent-3" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 md:min-w-[200px]">
                <Link
                  href="/signup"
                  className="shimmer-btn inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4.5 text-sm font-black text-white shadow-[0_8px_32px_rgba(227,106,47,0.55)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(227,106,47,0.70)] transition-all duration-300"
                >
                  Apply now <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white/80 hover:bg-white/5 hover:border-white/30 transition-all"
                >
                  Talk to an advisor
                </Link>
                <p className="text-center text-[10px] text-white/30 font-semibold">May 4 cohort · Limited seats</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}