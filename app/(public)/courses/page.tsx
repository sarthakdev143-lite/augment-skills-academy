import { CourseCard } from "@/components/course/course-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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
      query: params.q,
      category: params.category,
      level: params.level,
      sort: params.sort,
    }),
  ]);

  const categories = [...new Set(allCourses.map((course) => course.category))];
  const catalogueSignals = [
    { label: "Programs live", value: `${allCourses.length}` },
    { label: "Role categories", value: `${categories.length}` },
    { label: "Commitment", value: "5-9 hrs/week" },
  ];

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.92fr] xl:items-center">
          <div className="max-w-3xl">
            <Badge>Program catalogue</Badge>
            <h1 className="mt-5 text-balance text-5xl font-semibold md:text-6xl">
              Find the path that matches the role you actually want next.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Explore mentor-led programs by role direction, level, and learning
              commitment so it is easier to choose the path that fits your next move.
            </p>
          </div>

          <div className="section-shell rounded-[38px] p-6 lg:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Catalogue signals
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {catalogueSignals.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-border/70 bg-white/72 px-4 py-4 shadow-[0_14px_30px_rgba(19,34,56,0.06)] dark:bg-white/6"
                >
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[26px] border border-border/70 bg-white/68 px-5 py-5 dark:bg-white/6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Role-first discovery
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Compare programs by role direction, mentor support, and project load instead of just topic names.
                </p>
              </div>
              <div className="rounded-[26px] border border-border/70 bg-[#132238] px-5 py-5 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  Mentor-led signal
                </p>
                <p className="mt-3 text-sm leading-7 text-white/76">
                  See delivery style, project intensity, and outcome cues before
                  you even open the detail page.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form className="section-shell mt-10 grid gap-4 rounded-[30px] p-5 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <Input
            name="q"
            placeholder="Search programs, roles, categories, and topics"
            defaultValue={params.q ?? ""}
          />
          <Select name="category" defaultValue={params.category ?? ""}>
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
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
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </Select>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-2xl bg-[#132238] px-5 py-3 text-sm font-medium text-white"
          >
            Apply
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">{courses.length} programs matched</p>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 4).map((category) => (
              <span
                key={category}
                className="rounded-full border border-border/75 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {courses.length ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="section-shell mt-8 rounded-[30px] p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              No programs match those filters yet.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Try a broader search or reset the filters to explore the full academy
              catalogue.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
