import { ArrowRight, Search, Filter, Layers, Clock } from "lucide-react";
import { CourseCard } from "@/components/course/course-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Reveal } from "@/components/reveal";
import { listPublishedCourses } from "@/lib/courses";

export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    level?: string;
    sort?: string;
  }>;
};

export default async function CoursesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [allCourses, courses] = await Promise.all([
    listPublishedCourses(),
    listPublishedCourses({
      query:    params.q,
      category: params.category,
      level:    params.level,
      sort:     params.sort,
    }),
  ]);

  const categories     = [...new Set(allCourses.map((c) => c.category))];
  const catalogSignals = [
    { label: "Programs live",   value: `${allCourses.length}`,  icon: <Layers size={16} /> },
    { label: "Role categories", value: `${categories.length}`,  icon: <Filter size={16} /> },
    { label: "Weekly hours",    value: "5–9 hrs",               icon: <Clock size={16} /> },
  ];

  return (
    <main className="overflow-x-hidden pb-20">

      {/* ── HERO ── */}
      <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-10">
        {/* Orbs */}
        <div
          aria-hidden
          className="blob pointer-events-none absolute -top-20 -left-16 h-80 w-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #e36a2f, transparent 65%)" }}
        />
        <div
          aria-hidden
          className="blob-delay pointer-events-none absolute top-4 right-0 h-64 w-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #0f7f78, transparent 65%)" }}
        />

        <div className="relative grid gap-10 xl:grid-cols-[1fr_0.9fr] xl:items-center">
          {/* Left */}
          <Reveal>
            <Badge>Program catalogue</Badge>
            <h1 className="mt-5 text-5xl font-black leading-tight text-balance md:text-6xl">
              Find the path that matches the role you{" "}
              <span className="text-gradient-accent">actually want</span> next
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted max-w-lg">
              Explore mentor-led programs by role direction, level, and learning
              commitment — so it is easier to choose the path that fits your next move.
            </p>
          </Reveal>

          {/* Right — signal card */}
          <Reveal delay={0.1}>
            <div className="shine-border-card rounded-3xl bg-[#0e1e33] p-7 text-white shadow-xl">
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.22em] text-white/50">
                Catalogue signals
              </p>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {catalogSignals.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white/[0.06] p-4 text-center">
                    <div className="flex justify-center mb-2 text-accent-3">{s.icon}</div>
                    <p className="text-xl font-black">{s.value}</p>
                    <p className="mt-1 text-[10px] text-white/45 font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-white/[0.06] p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-accent mb-2">
                    Role-first discovery
                  </p>
                  <p className="text-xs leading-6 text-white/60">
                    Compare programs by role direction, mentor support, and project load.
                  </p>
                </div>
                <div className="rounded-2xl bg-accent/20 p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-accent-3 mb-2">
                    Mentor-led signal
                  </p>
                  <p className="text-xs leading-6 text-white/60">
                    Delivery style and outcome cues before you open the detail page.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <Reveal>
          <form className="glass-panel rounded-[28px] p-5 grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60 pointer-events-none" />
              <Input
                name="q"
                placeholder="Search programs, roles, topics…"
                defaultValue={params.q ?? ""}
                className="pl-9"
              />
            </div>

            <Select name="category" defaultValue={params.category ?? ""}>
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>

            <Select name="level" defaultValue={params.level ?? ""}>
              <option value="">All levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Select>

            <Select name="sort" defaultValue={params.sort ?? "newest"}>
              <option value="newest">Newest</option>
              <option value="rating">Highest rated</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
            </Select>

            <button
              type="submit"
              className="shimmer-btn inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-black text-white shadow-[0_4px_16px_rgba(227,106,47,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(227,106,47,0.50)] transition-all"
            >
              <Filter size={14} /> Apply
            </button>
          </form>
        </Reveal>

        {/* Results meta */}
        <Reveal delay={0.05}>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted">
              <span className="font-black text-foreground">{courses.length}</span> programs matched
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <a
                  key={c}
                  href={`?category=${encodeURIComponent(c)}`}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted hover:border-accent/40 hover:text-foreground hover:bg-accent/5 transition-all"
                >
                  {c}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── GRID ── */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        {courses.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {courses.map((course, i) => (
              <Reveal key={course.id} delay={i * 0.05}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="glass-panel rounded-3xl p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Search size={24} className="text-accent" />
              </div>
              <p className="text-xl font-black text-foreground">
                No programs match those filters yet
              </p>
              <p className="mt-3 text-sm leading-7 text-muted max-w-sm mx-auto">
                Try a broader search or reset the filters to explore the full academy catalogue.
              </p>
              <a
                href="/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-black text-white shadow-[0_4px_16px_rgba(227,106,47,0.35)]"
              >
                Reset filters <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>
        )}
      </section>
    </main>
  );
}
