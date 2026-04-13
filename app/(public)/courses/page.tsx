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

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <Badge>Catalogue</Badge>
        <h1 className="mt-4 text-4xl font-semibold">
          Find your next learning path
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Search by topic, filter by level, and sort by price or rating while the
          course catalogue stays easy to scan.
        </p>
      </div>

      <form className="section-shell mt-10 grid gap-4 rounded-[28px] p-5 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <Input
          name="q"
          placeholder="Search courses, categories, and topics"
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
          className="inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 text-sm font-medium text-white"
        >
          Apply
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted">{courses.length} courses matched</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}
