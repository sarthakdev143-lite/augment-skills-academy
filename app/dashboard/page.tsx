import { CourseProgressCard } from "@/components/dashboard/course-progress-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireAuth } from "@/lib/auth";
import { getDashboardOverview } from "@/lib/courses";

export default async function DashboardPage() {
  const user = await requireAuth();
  const overview = await getDashboardOverview(
    user.id,
    (user.user_metadata.full_name as string | undefined) ?? user.email ?? "Learner",
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-3xl">
        <Badge>Welcome back</Badge>
        <h1 className="mt-4 text-4xl font-semibold">{overview.studentName}</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Keep moving through your active paths, pick up recent lesson updates,
          and track completion toward your next certificate.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          { label: "Active courses", value: overview.activeCourses },
          { label: "Completed", value: overview.completedCourses },
          { label: "Certificates", value: overview.certificateCount },
          { label: "Bookmarks", value: overview.bookmarkedLessons },
          { label: "Notes", value: overview.notesCount },
        ].map((item) => (
          <Card key={item.label} className="rounded-[24px] p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-muted">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-semibold">{item.value}</p>
          </Card>
        ))}
      </div>

      <section className="mt-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="text-2xl font-semibold">My courses</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {overview.courses.map((course) => (
              <CourseProgressCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Recent updates</h2>
          <div className="mt-6 grid gap-4">
            {overview.notifications.map((notification) => (
              <Card key={notification.id} className="rounded-[24px] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium">{notification.title}</p>
                  {!notification.read ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {notification.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
