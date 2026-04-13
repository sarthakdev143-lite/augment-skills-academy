import { Activity, BadgeDollarSign, GraduationCap, Star } from "lucide-react";
import { KpiCard } from "@/components/admin/kpi-card";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth";
import { getAdminOverview } from "@/lib/courses";
import { formatCurrency } from "@/lib/utils";

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

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
          label="Pending reviews"
          value={String(overview.pendingReviews)}
          hint="Moderation queue"
          icon={<Star size={20} />}
        />
      </div>

      <div className="mt-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <h2 className="text-2xl font-semibold">Revenue reporting snapshot</h2>
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
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold">Coupon management</h2>
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
        </Card>
      </div>

      <div className="mt-12 grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold">Recent courses</h2>
          <div className="mt-6 space-y-3">
            {overview.recentCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border border-border/60 bg-white/35 px-4 py-4 dark:bg-white/5"
              >
                <p className="font-medium">{course.title}</p>
                <p className="mt-2 text-sm text-muted">
                  {course.category} · {course.level}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold">Review moderation</h2>
          <div className="mt-6 space-y-3">
            {overview.recentReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-border/60 bg-white/35 px-4 py-4 dark:bg-white/5"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium">{review.author_name}</p>
                  <p className="text-sm text-muted">{review.rating}/5</p>
                </div>
                <p className="mt-2 text-sm text-muted">{review.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
