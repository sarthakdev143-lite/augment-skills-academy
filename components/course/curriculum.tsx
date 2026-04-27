import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDuration } from "@/lib/utils";
import type { CourseModuleWithLessons } from "@/types";

type CurriculumProps = {
  modules: CourseModuleWithLessons[];
};

export function Curriculum({ modules }: CurriculumProps) {
  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <Card key={module.id} className="rounded-3xl p-0">
          <details className="group" open={module.position === 1}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted">
                  Module {module.position}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{module.title}</h3>
              </div>
              <p className="text-sm text-muted">{module.lessons.length} lessons</p>
            </summary>
            <div className="border-t border-border/70 px-5 py-4">
              <div className="space-y-3">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-white/35 px-4 py-3 dark:bg-white/5"
                  >
                    <div>
                      <p className="font-medium">{lesson.title}</p>
                      <p className="mt-1 text-sm text-muted">
                        {lesson.content_md ?? "Hands-on implementation notes and lesson resources."}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 text-sm text-muted">
                      {lesson.is_preview ? <Badge>Preview</Badge> : null}
                      <span>{formatDuration(lesson.duration_seconds ?? 0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </Card>
      ))}
    </div>
  );
}
