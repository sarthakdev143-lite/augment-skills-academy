import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireAuth } from "@/lib/auth";
import { getCoursePlayerData } from "@/lib/courses";
import { formatDuration } from "@/lib/utils";

type PageProps = {
  params: Promise<{ courseId: string }>;
};

export default async function CoursePlayerPage({ params }: PageProps) {
  const user = await requireAuth();
  const { courseId } = await params;
  const course = await getCoursePlayerData(courseId, user.id);

  if (!course) {
    notFound();
  }

  const totalLessons = course.modules.flatMap((module) => module.lessons).length;
  const completedCount = course.completedLessonIds.length;
  const progress = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-6">
          <Card>
            <Badge>{course.course.category}</Badge>
            <h1 className="mt-4 text-3xl font-semibold">{course.course.title}</h1>
            <p className="mt-4 text-sm leading-7 text-muted">
              Continue learning, keep notes per lesson, and return to bookmarked
              sections when you need a refresher.
            </p>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-muted">
                <span>Overall progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </Card>

          <Card>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">
              Lesson sidebar
            </p>
            <div className="mt-5 space-y-4">
              {course.modules.map((module) => (
                <div key={module.id}>
                  <p className="text-sm font-semibold">{module.title}</p>
                  <div className="mt-3 space-y-2">
                    {module.lessons.map((lesson) => {
                      const completed = course.completedLessonIds.includes(lesson.id);
                      const bookmarked = course.bookmarkedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className="rounded-2xl border border-border/60 bg-white/35 px-4 py-3 text-sm dark:bg-white/5"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-medium">{lesson.title}</p>
                            <span className="text-xs text-muted">
                              {formatDuration(lesson.duration_seconds ?? 0)}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                            <span>{completed ? "Completed" : "Up next"}</span>
                            {bookmarked ? <span>Bookmarked</span> : null}
                            {lesson.is_preview ? <span>Preview</span> : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        <section className="space-y-6">
          <Card className="overflow-hidden p-0">
            <div className="aspect-video bg-[linear-gradient(135deg,#111529,#20355f,#1fb8a6)]" />
            <div className="p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-muted">
                Current lesson
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                {course.currentLesson?.title ?? "Choose a lesson"}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {course.currentLesson?.content_md ??
                  "Mux playback, signed access, and downloadable resources connect here once lesson assets are attached."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
                {course.previousLessonId ? <span>Previous lesson available</span> : null}
                {course.nextLessonId ? <span>Next lesson ready</span> : null}
                {course.playbackToken ? <span>Signed playback enabled</span> : null}
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <p className="text-sm uppercase tracking-[0.18em] text-muted">
                Lesson notes
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                {course.currentLesson
                  ? course.notesByLessonId[course.currentLesson.id] ||
                    "No saved note yet. The player route is ready for per-lesson note persistence."
                  : "Select a lesson to view or save notes."}
              </p>
            </Card>
            <Card>
              <p className="text-sm uppercase tracking-[0.18em] text-muted">
                Resources and downloads
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                {course.currentLesson?.attachment_url
                  ? "This lesson includes an attachment stored in Supabase Storage."
                  : "Attachments, PDFs, and code snippets will appear here when lesson assets are provided."}
              </p>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
