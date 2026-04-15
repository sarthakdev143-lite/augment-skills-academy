import Link from "next/link";
import {
  Activity,
  BadgeDollarSign,
  BookOpen,
  GraduationCap,
  Star,
} from "lucide-react";
import { KpiCard } from "@/components/admin/kpi-card";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { getAdminOverview } from "@/lib/courses";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminPage() {
  await requireRole(["admin"]);
  const overview = await getAdminOverview();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold">Admin overview</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Monitor revenue, active learners, review moderation, and the health of
          your course catalogue from one place.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Revenue"
          value={formatCurrency(overview.totalRevenue)}
          hint="Across one-time purchases and subscriptions"
          icon={<BadgeDollarSign size={20} />}
        />
        <KpiCard
          label="Enrollments"
          value={String(overview.totalEnrollments)}
          hint="Total active enrollments"
          icon={<GraduationCap size={20} />}
        />
        <KpiCard
          label="Students"
          value={String(overview.activeStudents)}
          hint="Unique learners in the platform"
          icon={<Activity size={20} />}
        />
        <KpiCard
          label="Courses"
          value={String(overview.courses.length)}
          hint="Published and draft courses"
          icon={<BookOpen size={20} />}
        />
        <KpiCard
          label="Pending reviews"
          value={String(overview.pendingReviews)}
          hint="Moderation queue"
          icon={<Star size={20} />}
        />
      </div>

      <div className="mt-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <h2 className="text-2xl font-semibold">Revenue reporting snapshot</h2>
          {overview.totalRevenue > 0 || overview.totalEnrollments > 0 ? (
            <div className="mt-6 grid gap-3">
              {overview.revenueSeries.map((point) => (
                <div
                  key={point.label}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-white/35 px-4 py-4 dark:bg-white/5"
                >
                  <div>
                    <p className="font-medium">{point.label}</p>
                    <p className="text-sm text-muted">{point.enrollments} enrollments</p>
                  </div>
                  <p className="text-lg font-semibold">{formatCurrency(point.revenue)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-border/70 px-4 py-6 text-sm text-muted">
              No revenue or enrollment data has landed yet. Once purchases start
              coming in, monthly reporting will appear here automatically.
            </p>
          )}
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold">Coupon management</h2>
          {overview.coupons.length ? (
            <div className="mt-6 space-y-3">
              {overview.coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="rounded-2xl border border-border/60 bg-white/35 px-4 py-4 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">{coupon.code}</p>
                    <p className="text-sm text-muted">
                      {coupon.discount_type === "percent"
                        ? `${coupon.discount_value}%`
                        : formatCurrency(coupon.discount_value / 100)}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {coupon.used_count} used
                    {coupon.max_uses ? ` of ${coupon.max_uses}` : ""}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-border/70 px-4 py-6 text-sm text-muted">
              No coupons created yet.
            </p>
          )}
        </Card>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Course catalogue</h2>
              <p className="mt-2 text-sm text-muted">
                Every course in your database, including drafts and unpublished work.
              </p>
            </div>
            <p className="text-sm text-muted">{overview.courses.length} total courses</p>
          </div>

          {overview.courses.length ? (
            <div className="mt-6 grid gap-4 xl:grid-cols-2">
              {overview.courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-border/60 bg-white/35 px-5 py-5 dark:bg-white/5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="text-lg font-semibold text-foreground hover:text-accent"
                      >
                        {course.title}
                      </Link>
                      <p className="mt-2 text-sm text-muted">
                        {course.category} / {course.level}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                          course.published
                            ? "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300"
                            : "bg-amber-500/12 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {course.published ? "Published" : "Draft"}
                      </span>
                      {course.featured ? (
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                          Featured
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Price
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {formatCurrency(course.price_cents / 100)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Lessons
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {course.total_lessons}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Enrollments
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {course.enrollment_count}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Rating
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {course.review_count
                          ? `${course.average_rating.toFixed(1)} / 5`
                          : "No reviews yet"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
                    <p>Instructor: {course.instructor?.full_name ?? "Unassigned"}</p>
                    <p>Created {formatDate(course.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-border/70 px-4 py-6 text-sm text-muted">
              No courses found in Supabase yet. Once you add courses, they will show up
              here automatically.
            </p>
          )}
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold">Review moderation</h2>
          {overview.recentReviews.length ? (
            <div className="mt-6 space-y-3">
              {overview.recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-border/60 bg-white/35 px-4 py-4 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{review.author_name}</p>
                      <p className="text-sm text-muted">{review.author_role}</p>
                    </div>
                    <p className="text-sm text-muted">{review.rating}/5</p>
                  </div>
                  <p className="mt-2 text-sm text-muted">{review.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-border/70 px-4 py-6 text-sm text-muted">
              No reviews submitted yet.
            </p>
          )}
        </Card>
      </div>
    </main>
  );
}
