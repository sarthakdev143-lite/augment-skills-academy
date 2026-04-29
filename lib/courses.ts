import { cache } from "react";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseSchemaStatus } from "@/lib/supabase/schema";
import {
  fallbackCourseDetails,
  fallbackCourses,
  getFallbackCourseById,
  getFallbackCourseBySlug,
} from "@/lib/demo-data";
import { isSupabaseConfigured } from "@/lib/env";
import type {
  CertificateVerificationRecord,
  ContactSubmission,
  Course,
  CourseDetail,
  CourseLevel,
  CourseSummary,
  EnrollmentRequest,
} from "@/types";

type CourseCatalogueFilters = {
  query?: string;
  category?: string;
  level?: string;
  sort?: string;
};

function normalizeFilters(filters: CourseCatalogueFilters) {
  return {
    query: filters.query?.trim().toLowerCase() ?? "",
    category: filters.category?.trim() ?? "",
    level: filters.level?.trim() ?? "",
    sort: filters.sort?.trim() ?? "newest",
  };
}

function applyCatalogueFilters(courses: CourseSummary[], rawFilters: CourseCatalogueFilters) {
  const filters = normalizeFilters(rawFilters);

  const filtered = courses.filter((course) => {
    const matchesQuery =
      !filters.query ||
      [course.title, course.description, course.category]
        .join(" ")
        .toLowerCase()
        .includes(filters.query);
    const matchesCategory = !filters.category || course.category === filters.category;
    const matchesLevel = !filters.level || course.level === filters.level;

    return matchesQuery && matchesCategory && matchesLevel;
  });

  return filtered.sort((left, right) => {
    if (filters.sort === "rating") {
      return right.average_rating - left.average_rating;
    }

    return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
  });
}

function toSummary(course: Course | CourseSummary): CourseSummary {
  if ("total_lessons" in course) {
    return course;
  }

  return {
    ...course,
    total_lessons: 0,
    duration_seconds: 0,
    average_rating: 0,
    review_count: 0,
    instructor: null,
  };
}

export async function listPublishedCourses(filters: CourseCatalogueFilters = {}) {
  if (!isSupabaseConfigured()) {
    return applyCatalogueFilters(fallbackCourses, filters);
  }

  const supabase = await createSupabaseServerClient();
  let query = supabase.from("courses").select("*").eq("published", true);
  const normalized = normalizeFilters(filters);

  if (normalized.query) {
    query = query.or(
      [
        `title.ilike.%${normalized.query}%`,
        `description.ilike.%${normalized.query}%`,
        `category.ilike.%${normalized.query}%`,
      ].join(","),
    );
  }

  if (normalized.category) {
    query = query.eq("category", normalized.category);
  }

  if (normalized.level) {
    query = query.eq("level", normalized.level as CourseLevel);
  }

  query = normalized.sort === "rating"
    ? query.order("average_rating", { ascending: false, nullsFirst: false })
    : query.order("created_at", { ascending: false });

  const { data } = await query;

  if (!data?.length) {
    return applyCatalogueFilters(fallbackCourses, filters);
  }

  return applyCatalogueFilters((data as Course[]).map(toSummary), filters);
}

export const getCourseBySlug = cache(async (slug: string): Promise<CourseDetail | null> => {
  const fallback = getFallbackCourseBySlug(slug);

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle();

  if (!data) {
    return fallback;
  }

  const base = toSummary(data as Course);
  return {
    ...base,
    modules: fallback?.modules ?? [],
    preview_lessons: fallback?.preview_lessons ?? [],
    reviews: [],
    outcomes: fallback?.outcomes ?? [],
    tagline: fallback?.tagline,
    tools: fallback?.tools,
    frameworkOptions: fallback?.frameworkOptions,
    bonusAddon: fallback?.bonusAddon,
    isCustom: fallback?.isCustom,
    customFlowDescription: fallback?.customFlowDescription,
  };
});

export async function getCertificateVerificationRecord(id: string) {
  if (!isSupabaseConfigured()) {
    if (id === "cert_demo_0001") {
      const fallbackCourse = getFallbackCourseById("course-frontend-003") ?? fallbackCourseDetails[0];
      return {
        id,
        user_id: "demo-user",
        course_id: fallbackCourse.id,
        completion_date: "2026-04-01",
        pdf_url: null,
        created_at: "2026-04-01T00:00:00.000Z",
        student_name: "Learner",
        course_name: fallbackCourse.title,
      } satisfies CertificateVerificationRecord;
    }

    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data: certificate } = await supabase.from("certificates").select("*").eq("id", id).maybeSingle();

  if (!certificate) {
    return null;
  }

  const [{ data: course }, { data: profile }] = await Promise.all([
    supabase.from("courses").select("title").eq("id", certificate.course_id).maybeSingle(),
    supabase.from("profiles").select("full_name").eq("id", certificate.user_id).maybeSingle(),
  ]);

  return {
    ...certificate,
    student_name: (profile as { full_name?: string } | null)?.full_name ?? "Learner",
    course_name: (course as { title?: string } | null)?.title ?? "Course",
  } satisfies CertificateVerificationRecord;
}

export async function listEnrollmentRequests(): Promise<EnrollmentRequest[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const schemaStatus = await getSupabaseSchemaStatus();
  if (schemaStatus.status !== "ready") {
    return [];
  }

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("enrollment_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (data ?? []) as EnrollmentRequest[];
}

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const schemaStatus = await getSupabaseSchemaStatus();
  if (schemaStatus.status !== "ready") {
    return [];
  }

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (data ?? []) as ContactSubmission[];
}
