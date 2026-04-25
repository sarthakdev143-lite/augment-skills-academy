import Image from "next/image";
import { Clock, Filter, Layers, Search } from "lucide-react";
import { CourseCard } from "@/components/course/course-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/reveal";
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
  const catalogSignals = [
    { label: "Programs live", value: `${allCourses.length}`, icon: <Layers size={16} /> },
    { label: "Role categories", value: `${categories.length}`, icon: <Filter size={16} /> },
    { label: "Weekly hours", value: "5-9 hrs", icon: <Clock size={16} /> },
  ];

  return (
    <main className="overflow-x-hidden pb-20">
      <section className="relative mx-auto max-w-7xl px-6 pb-10 pt-12">
        <div className="ambient-ring blob left-[-2rem] top-6 h-28 w-28 bg-accent/16" />
        <div className="ambient-ring blob-delay right-0 top-10 h-36 w-36 bg-accent-2/14" />

        <div className="relative grid gap-10 xl:grid-cols-[1fr_0.95fr] xl:items-center">
          <Reveal>
            <Badge>Courses</Badge>
            <h1 className="mt-5 text-5xl font-black leading-tight text-balance md:text-6xl">
              Choose the path that matches the role you want next
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-muted">
              Explore mentor-led courses in AI, DevOps, frontend, backend, and fully custom learning tracks.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="gradient-border-card overflow-hidden rounded-[34px] p-4">
              <div className="relative overflow-hidden rounded-[28px] bg-[#fff8ef] p-4">
                <Image
                  src="/catalog-grid-illustration.svg"
                  alt="Course catalog illustration"
                  width={760}
                  height={560}
                  className="h-auto w-full rounded-[22px]"
                />
                <div className="absolute inset-x-8 bottom-8 shine-border-card-dark rounded-3xl p-7 text-black shadow-xl">
                  <p className="mb-5 text-[10px] font-black uppercase tracking-[0.22em] text-black/50">Catalogue signals</p>
                  <div className="grid grid-cols-3 gap-3">
                    {catalogSignals.map((signal) => (
                      <div key={signal.label} className="rounded-2xl bg-black/[0.04] p-4 text-center">
                        <div className="mb-2 flex justify-center text-accent">{signal.icon}</div>
                        <p className="text-xl font-black">{signal.value}</p>
                        <p className="mt-1 text-[10px] font-semibold text-black/45">{signal.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <Reveal>
          <form className="glass-panel grid gap-3 rounded-[28px] p-5 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
            <div className="relative">
              <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/60" />
              <Input name="q" placeholder="Search courses, roles, or topics" defaultValue={params.q ?? ""} className="pl-9" />
            </div>
            <Select name="category" defaultValue={params.category ?? ""}>
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
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
            </Select>
            <button type="submit" className="shimmer-btn rounded-2xl bg-accent px-6 py-3 text-sm font-black text-white">
              Apply
            </button>
          </form>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">
            <span className="font-black text-foreground">{courses.length}</span> courses matched
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Reveal key={course.id} delay={index * 0.05}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
