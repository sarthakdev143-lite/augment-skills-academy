import { Inbox, Mail, CalendarDays } from "lucide-react";
import { KpiCard } from "@/components/admin/kpi-card";
import { Card } from "@/components/ui/card";
import { listContactSubmissions, listEnrollmentRequests } from "@/lib/courses";
import { getSupabaseSchemaStatus } from "@/lib/supabase/schema";
import { formatDate } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/env";

function startOfWeek(date: Date) {
  const next = new Date(date);
  const day = next.getDay();
  const diff = (day + 6) % 7;
  next.setDate(next.getDate() - diff);
  next.setHours(0, 0, 0, 0);
  return next;
}

export default async function AdminPage() {
  const [enrollments, contacts, schemaStatus] = await Promise.all([
    listEnrollmentRequests(),
    listContactSubmissions(),
    getSupabaseSchemaStatus(),
  ]);

  const thisWeek = startOfWeek(new Date()).getTime();
  const thisWeekEnrollments = enrollments.filter((item) => new Date(item.created_at).getTime() >= thisWeek);
  const courseBreakdown = enrollments.reduce<Record<string, number>>((acc, item) => {
    acc[item.course_slug] = (acc[item.course_slug] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-7xl">
        <h1 className="text-4xl font-semibold">Admin overview</h1>
        <p className="mt-4 text-lg leading-8 text-muted">Review enrollment requests, contact submissions, and quick summary stats from one place.</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <KpiCard label="Total Enrollments" value={String(enrollments.length)} hint="All enrollment requests" icon={<Inbox size={20} />} />
        <KpiCard label="Contact Messages" value={String(contacts.length)} hint="All contact form submissions" icon={<Mail size={20} />} />
        <KpiCard label="This Week's Enrollments" value={String(thisWeekEnrollments.length)} hint="Submitted since Monday" icon={<CalendarDays size={20} />} />
      </div>

      {schemaStatus.status === "missing_schema" ? (
        <Card className="mt-8 border-amber-300/70 bg-amber-50/70">
          <h2 className="text-xl font-semibold text-amber-950">Database setup incomplete</h2>
          <p className="mt-3 text-sm leading-7 text-amber-900">
            This admin panel is connected to Supabase, but the required tables have not been created in the current project yet.
            Public forms can still route submissions to your support inbox when email is configured, but they will not appear here until the schema is applied.
          </p>
          <p className="mt-3 text-sm text-amber-950">
            Missing tables: {schemaStatus.missingTables.join(", ")}
          </p>
          <p className="mt-3 text-sm text-amber-900">
            Apply <code>supabase/schema.sql</code> and <code>supabase/enrollment-schema.sql</code> in your Supabase SQL editor before production launch.
          </p>
        </Card>
      ) : null}

      {schemaStatus.status === "error" ? (
        <Card className="mt-8 border-rose-300/70 bg-rose-50/70">
          <h2 className="text-xl font-semibold text-rose-950">Supabase connection issue</h2>
          <p className="mt-3 text-sm leading-7 text-rose-900">
            The admin panel could not verify the current Supabase schema. Check your environment variables and service role key before launch.
          </p>
          <p className="mt-3 text-sm text-rose-950">{schemaStatus.message}</p>
        </Card>
      ) : null}

      <div className="mt-12 space-y-6">
        <Card>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Enrollment Requests</h2>
              <p className="mt-2 text-sm text-muted">Every enrollment request, ordered from newest to oldest.</p>
            </div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">{enrollments.length} enrollment requests</span>
          </div>

          {!isSupabaseConfigured() ? (
            <p className="mt-6 rounded-2xl border border-dashed border-border/70 px-4 py-6 text-sm text-muted">Supabase is not configured. Enrollment requests will appear here after configuration.</p>
          ) : enrollments.length ? (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-muted">
                  <tr>
                    {["Name", "Email", "Phone", "Course", "Track", "Background", "Start Date", "Notes", "Submitted At"].map((header) => (
                      <th key={header} className="border-b border-border/60 px-3 py-3 font-medium">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((item) => (
                    <tr key={item.id} className="align-top">
                      <td className="border-b border-border/40 px-3 py-4">{item.name}</td>
                      <td className="border-b border-border/40 px-3 py-4">{item.email}</td>
                      <td className="border-b border-border/40 px-3 py-4">{item.phone}</td>
                      <td className="border-b border-border/40 px-3 py-4">{item.course_name}</td>
                      <td className="border-b border-border/40 px-3 py-4">{item.selected_track ?? "-"}</td>
                      <td className="border-b border-border/40 px-3 py-4">{item.background_level}</td>
                      <td className="border-b border-border/40 px-3 py-4">{item.preferred_start_date ?? "-"}</td>
                      <td className="border-b border-border/40 px-3 py-4">{item.additional_info ?? "-"}</td>
                      <td className="border-b border-border/40 px-3 py-4">{formatDate(item.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-border/70 px-4 py-6 text-sm text-muted">No enrollment requests yet.</p>
          )}
        </Card>

        <Card>
          <h2 id="contact-messages" className="text-2xl font-semibold">Contact Submissions</h2>
          <div className="mt-6 space-y-3">
            {!isSupabaseConfigured() ? (
              <p className="rounded-2xl border border-dashed border-border/70 px-4 py-6 text-sm text-muted">Supabase is not configured. Contact submissions will appear here after configuration.</p>
            ) : contacts.length ? (
              contacts.map((item) => (
                <details key={item.id} className="rounded-2xl border border-border/60 bg-white/35 px-4 py-4 dark:bg-white/5">
                  <summary className="cursor-pointer list-none">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted">{item.email}</p>
                        <p className="text-sm text-muted">{item.phone}</p>
                      </div>
                      <p className="max-w-xl text-sm text-muted">{item.message.slice(0, 100)}{item.message.length > 100 ? "..." : ""}</p>
                      <span className="text-sm text-muted">{formatDate(item.created_at)}</span>
                    </div>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.message}</p>
                </details>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-border/70 px-4 py-6 text-sm text-muted">No contact messages yet.</p>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold">Student/Enrollment Summary</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 p-4">
              <p className="text-sm text-muted">Total enrollments</p>
              <p className="mt-2 text-3xl font-black">{enrollments.length}</p>
            </div>
            <div className="rounded-2xl border border-border/60 p-4 md:col-span-2">
              <p className="text-sm text-muted">Course breakdown</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(courseBreakdown).map(([slug, count]) => (
                  <span key={slug} className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                    {slug}: {count}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-muted">Most recent 5 enrollments</p>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-muted">
                  <tr>
                    <th className="border-b border-border/60 px-3 py-3 font-medium">Name</th>
                    <th className="border-b border-border/60 px-3 py-3 font-medium">Course</th>
                    <th className="border-b border-border/60 px-3 py-3 font-medium">Track</th>
                    <th className="border-b border-border/60 px-3 py-3 font-medium">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td className="border-b border-border/40 px-3 py-4">{item.name}</td>
                      <td className="border-b border-border/40 px-3 py-4">{item.course_name}</td>
                      <td className="border-b border-border/40 px-3 py-4">{item.selected_track ?? "-"}</td>
                      <td className="border-b border-border/40 px-3 py-4">{formatDate(item.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
