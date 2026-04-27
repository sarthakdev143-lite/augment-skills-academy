/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Image from "next/image";
import { BriefcaseBusiness, CircleCheckBig, Clock3, Target } from "lucide-react";
import { notFound } from "next/navigation";
import { Curriculum } from "@/components/course/curriculum";
import { CustomCourseSelector } from "@/components/course/custom-course-selector";
import { FrameworkSelector } from "@/components/course/framework-selector";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCourseBySlug } from "@/lib/courses";
import { getCourseCareerSignal } from "@/lib/demo-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const customOptions = [
  { slug: "ai-machine-learning", title: "AI & Machine Learning", topics: ["Python", "ML", "LLMs"] },
  { slug: "devops-engineering", title: "DevOps Engineering", topics: ["Linux", "Docker", "Kubernetes"] },
  { slug: "frontend-development", title: "Frontend Development", topics: ["HTML/CSS", "JavaScript", "Framework track"] },
  { slug: "backend-development", title: "Backend Development", topics: ["APIs", "Databases", "Deployment"] },
];

export async function generateStaticParams() {
  return [
    { slug: "ai-machine-learning" },
    { slug: "devops-engineering" },
    { slug: "frontend-development" },
    { slug: "backend-development" },
    { slug: "custom-learning-path" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) {
    return {};
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: course.thumbnail_url ? [course.thumbnail_url] : [],
    },
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) {
    notFound();
  }

  const signal = getCourseCareerSignal(course.slug);
  const spotlightItems = [
    { label: "Duration", value: signal.duration, detail: signal.weeklyCommitment, icon: Clock3 },
    { label: "Project load", value: signal.projectCount, detail: "Applied deliverables", icon: BriefcaseBusiness },
    { label: "Target role", value: signal.targetRole, detail: signal.delivery, icon: Target },
  ];

  return (
    <main className="pb-16">
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr] xl:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-accent text-black">{signal.cohortLabel}</Badge>
              <Badge>{course.category}</Badge>
              <Badge>{course.level}</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black md:text-6xl">{course.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{course.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {spotlightItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="stat-tile rounded-[28px] px-5 py-5">
                    <Icon size={18} className="text-accent" />
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted">{item.label}</p>
                    <p className="mt-3 text-lg font-semibold text-foreground">{item.value}</p>
                    <p className="mt-1 text-sm text-muted">{item.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 inset-x-7 bottom-7 rounded-[28px] border border-white/10 bg-[#081321]/80 p-5 text-white backdrop-blur-xl">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">What's included</p>
              <div className="mt-4 space-y-3">
                {signal.support.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CircleCheckBig size={16} className="mt-1 text-accent-3" />
                    <p className="text-sm leading-7 text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted">
              <span>{course.total_lessons} lessons</span>
              {course.tagline ? <span>{course.tagline}</span> : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className="gradient-border-card overflow-hidden rounded-[34px] p-4">
              <div className="relative overflow-hidden rounded-[28px] bg-[#0e1e33] p-4">
                <Image
                  src="/hero-dashboard-illustration.svg"
                  alt="Course outcomes illustration"
                  width={880}
                  height={760}
                  className="h-auto w-full rounded-[22px]"
                />
              </div>
            </div>

            <Card className="rounded-[34px] p-8">
              {course.frameworkOptions?.length ? (
                <div>
                  <p className="text-sm font-semibold text-foreground">Choose your track</p>
                  <div className="mt-4">
                    <FrameworkSelector options={course.frameworkOptions} courseSlug={course.slug} />
                  </div>
                </div>
              ) : null}

              {course.isCustom ? (
                <div className={course.frameworkOptions?.length ? "mt-8" : ""}>
                  <p className="text-sm font-semibold text-foreground">Choose what to combine</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{course.customFlowDescription}</p>
                  <div className="mt-4">
                    <CustomCourseSelector options={customOptions} />
                  </div>
                </div>
              ) : null}

              {!course.frameworkOptions?.length && !course.isCustom ? (
                <a href={`/enroll?course=${course.slug}`} className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-black text-white">
                  Enroll Now
                </a>
              ) : null}
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4">
        <div className="section-shell rounded-[34px] p-5 w-fit">
          <div className="flex flex-wrap gap-2">
            {signal.tools.map((tool) => (
              <span key={tool} className="rounded-full bg-[#132238]/6 px-3 py-1.5 text-md font-semibold text-muted dark:bg-white/8">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div>
            <h2 className="text-3xl font-black">Curriculum</h2>
            <p className="mt-3 max-w-3xl text-muted">Preview lessons are publicly visible, while enrolled learners unlock the full path with mentor guidance and project work.</p>
            <div className="mt-8">
              <Curriculum modules={course.modules} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel overflow-hidden rounded-[34px] p-4">
              <Image
                src="/mentor-network-illustration.svg"
                alt="Mentor support illustration"
                width={760}
                height={640}
                className="h-auto w-full rounded-3xl"
              />
            </div>

            <Card className="rounded-[34px]">
              <p className="text-sm uppercase tracking-[0.18em] text-muted">Your Mentor</p>
              <h3 className="mt-4 text-2xl font-semibold">Industry Expert Mentor</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                You'll be matched with an experienced industry professional specialized in this track. Our mentors are working professionals - not just teachers.
              </p>
            </Card>

            <Card className="rounded-[34px]">
              <p className="text-sm uppercase tracking-[0.18em] text-muted">Learning outcomes</p>
              <div className="mt-4 space-y-3">
                {course.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3">
                    <CircleCheckBig size={16} className="mt-1 text-accent" />
                    <p className="text-sm leading-7 text-muted">{outcome}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
