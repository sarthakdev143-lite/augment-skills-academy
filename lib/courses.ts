import { cache } from "react";
import { isSupabaseConfigured } from "@/lib/env";
import { createMuxPlaybackToken } from "@/lib/mux/tokens";
import {
  fallbackAdminOverview,
  fallbackCourseDetails,
  fallbackCourses,
  fallbackDashboardOverview,
  getFallbackCourseById,
  getFallbackCourseBySlug,
} from "@/lib/demo-data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  AdminOverview,
  Bookmark,
  Certificate,
  CertificateVerificationRecord,
  Course,
  CourseDetail,
  CourseLevel,
  CourseModule,
  CourseModuleWithLessons,
  CoursePlayerData,
  CourseSummary,
  DashboardCourse,
  DashboardOverview,
  Enrollment,
  Lesson,
  LessonNote,
  LessonProgress,
  Notification,
  NotificationFeedItem,
  Profile,
  Review,
  ReviewWithAuthor,
} from "@/types";

type CourseCatalogueFilters = {
  query?: string;
  category?: string;
  level?: string;
  sort?: string;
};

function buildModules(modules: CourseModule[], lessons: Lesson[]) {
  return modules
    .sort((left, right) => left.position - right.position)
    .map<CourseModuleWithLessons>((module) => ({
      ...module,
      lessons: lessons
        .filter((lesson) => lesson.module_id === module.id)
        .sort((left, right) => left.position - right.position),
    }));
}

function buildCourseSummary(
  course: Course,
  modules: CourseModule[],
  lessons: Lesson[],
  reviews: Review[],
  instructor: Profile | null,
): CourseSummary {
  const courseLessons = lessons.filter((lesson) => lesson.course_id === course.id);
  const approvedReviews = reviews.filter((review) => review.course_id === course.id && review.approved);
  const totalSeconds = courseLessons.reduce(
    (sum, lesson) => sum + (lesson.duration_seconds ?? 0),
    0,
  );
  const averageRating = approvedReviews.length
    ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length
    : 0;

  return {
    ...course,
    total_lessons: courseLessons.length || modules.filter((module) => module.course_id === course.id).length,
    duration_seconds: totalSeconds,
    average_rating: averageRating,
    review_count: approvedReviews.length,
    instructor,
  };
}

function isCourseDetail(course: Course | CourseDetail): course is CourseDetail {
  return "modules" in course && Array.isArray(course.modules);
}

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
    switch (filters.sort) {
      case "price-asc":
        return left.price_cents - right.price_cents;
      case "price-desc":
        return right.price_cents - left.price_cents;
      case "rating":
        return right.average_rating - left.average_rating;
      default:
        return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
    }
  });
}

function buildFallbackDashboardOverview(studentName: string | null) {
  return {
    ...fallbackDashboardOverview,
    studentName: studentName || fallbackDashboardOverview.studentName,
  };
}

async function safePlaybackToken(playbackId: string | null) {
  if (!playbackId) {
    return null;
  }

  try {
    return await createMuxPlaybackToken(playbackId);
  } catch {
    return null;
  }
}

async function listCourseRelatedData(courseIds: string[]) {
  if (!courseIds.length) {
    return {
      modules: [] as CourseModule[],
      lessons: [] as Lesson[],
      reviews: [] as Review[],
      profiles: [] as Profile[],
    };
  }

  const supabase = await createSupabaseServerClient();

  const [{ data: modulesData }, { data: lessonsData }, { data: reviewsData }, { data: courseData }] =
    await Promise.all([
      supabase.from("modules").select("*").in("course_id", courseIds),
      supabase.from("lessons").select("*").in("course_id", courseIds),
      supabase.from("reviews").select("*").in("course_id", courseIds).eq("approved", true),
      supabase.from("courses").select("*").in("id", courseIds),
    ]);

  const courses = (courseData ?? []) as Course[];
  const instructorIds = [...new Set(courses.map((course) => course.instructor_id).filter(Boolean))];
  const { data: profilesData } = instructorIds.length
    ? await supabase.from("profiles").select("*").in("id", instructorIds)
    : { data: [] };

  return {
    modules: (modulesData ?? []) as CourseModule[],
    lessons: (lessonsData ?? []) as Lesson[],
    reviews: (reviewsData ?? []) as Review[],
    profiles: (profilesData ?? []) as Profile[],
  };
}

export async function listPublishedCourses(filters: CourseCatalogueFilters = {}) {
  if (!isSupabaseConfigured()) {
    return applyCatalogueFilters(fallbackCourses, filters);
  }

  const supabase = await createSupabaseServerClient();

  let query = supabase.from("courses").select("*").eq("published", true);
  const normalizedFilters = normalizeFilters(filters);

  if (normalizedFilters.query) {
    query = query.or(
      [
        `title.ilike.%${normalizedFilters.query}%`,
        `description.ilike.%${normalizedFilters.query}%`,
        `category.ilike.%${normalizedFilters.query}%`,
      ].join(","),
    );
  }

  if (normalizedFilters.category) {
    query = query.eq("category", normalizedFilters.category);
  }

  if (normalizedFilters.level) {
    query = query.eq("level", normalizedFilters.level as CourseLevel);
  }

  switch (normalizedFilters.sort) {
    case "price-asc":
      query = query.order("price_cents", { ascending: true });
      break;
    case "price-desc":
      query = query.order("price_cents", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return applyCatalogueFilters(fallbackCourses, filters);
  }

  const courses = data as Course[];
  const { modules, lessons, reviews, profiles } = await listCourseRelatedData(
    courses.map((course) => course.id),
  );

  return applyCatalogueFilters(
    courses.map((course) =>
      buildCourseSummary(
        course,
        modules,
        lessons,
        reviews,
        profiles.find((profile) => profile.id === course.instructor_id) ?? null,
      ),
    ),
    filters,
  );
}

export const getCourseBySlug = cache(async (slug: string) => {
  if (!isSupabaseConfigured()) {
    return getFallbackCourseBySlug(slug);
  }

  const supabase = await createSupabaseServerClient();
  const { data: courseData, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !courseData) {
    return getFallbackCourseBySlug(slug);
  }

  const course = courseData as Course;

  const [{ data: moduleData }, { data: lessonData }, { data: reviewData }, { data: profileData }] =
    await Promise.all([
      supabase.from("modules").select("*").eq("course_id", course.id).order("position"),
      supabase.from("lessons").select("*").eq("course_id", course.id).order("position"),
      supabase.from("reviews").select("*").eq("course_id", course.id).eq("approved", true),
      course.instructor_id
        ? supabase.from("profiles").select("*").eq("id", course.instructor_id).single()
        : Promise.resolve({ data: null }),
    ]);

  const modules = (moduleData ?? []) as CourseModule[];
  const lessons = (lessonData ?? []) as Lesson[];
  const reviews = (reviewData ?? []) as Review[];
  const instructor = (profileData as Profile | null) ?? null;
  const fallback = getFallbackCourseBySlug(slug);

  let reviewAuthors: Profile[] = [];
  const reviewUserIds = [...new Set(reviews.map((review) => review.user_id))];

  if (reviewUserIds.length) {
    const { data: authorData } = await supabase.from("profiles").select("*").in("id", reviewUserIds);
    reviewAuthors = (authorData ?? []) as Profile[];
  }

  return {
    ...buildCourseSummary(course, modules, lessons, reviews, instructor),
    modules: buildModules(modules, lessons),
    preview_lessons: lessons.filter((lesson) => lesson.is_preview),
    reviews: reviews.map<ReviewWithAuthor>((review) => {
      const author = reviewAuthors.find((profile) => profile.id === review.user_id);
      return {
        ...review,
        author_name: author?.full_name ?? "Academy learner",
        author_role: author?.role ?? "student",
      };
    }),
    outcomes:
      fallback?.outcomes ?? [
        "Structured learning path with production-ready project decisions",
        "Practice assets, templates, and implementation notes",
        "Certificate-ready completion journey",
      ],
  } satisfies CourseDetail;
});

export async function getDashboardOverview(userId: string, studentName: string | null) {
  if (!isSupabaseConfigured()) {
    return buildFallbackDashboardOverview(studentName);
  }

  const supabase = await createSupabaseServerClient();
  const { data: enrollmentsData } = await supabase.from("enrollments").select("*").eq("user_id", userId);
  const enrollments = (enrollmentsData ?? []) as Enrollment[];

  if (!enrollments.length) {
    return buildFallbackDashboardOverview(studentName);
  }

  const courseIds = enrollments.map((enrollment) => enrollment.course_id);
  const [{ data: coursesData }, { data: progressData }, { data: certificatesData }, { data: notificationData }] =
    await Promise.all([
      supabase.from("courses").select("*").in("id", courseIds),
      supabase.from("progress").select("*").eq("user_id", userId).in("course_id", courseIds),
      supabase.from("certificates").select("*").eq("user_id", userId).in("course_id", courseIds),
      supabase.from("notifications").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
    ]);

  const { modules, lessons, reviews, profiles } = await listCourseRelatedData(courseIds);

  const [{ data: bookmarkData }, { data: noteData }] = await Promise.all([
    supabase.from("bookmarks").select("*").eq("user_id", userId),
    supabase.from("lesson_notes").select("*").eq("user_id", userId),
  ]);

  const courses = (coursesData ?? []) as Course[];
  const progress = (progressData ?? []) as LessonProgress[];
  const certificates = (certificatesData ?? []) as Certificate[];
  const notifications = (notificationData ?? []) as Notification[];
  const bookmarks = (bookmarkData ?? []) as Bookmark[];
  const notes = (noteData ?? []) as LessonNote[];

  const dashboardCourses = courses.map<DashboardCourse>((course) => {
    const summary = buildCourseSummary(
      course,
      modules,
      lessons,
      reviews,
      profiles.find((profile) => profile.id === course.instructor_id) ?? null,
    );
    const courseLessons = lessons.filter((lesson) => lesson.course_id === course.id);
    const completedLessons = progress.filter(
      (entry) => entry.course_id === course.id && entry.completed,
    ).length;
    const progressPercent = courseLessons.length
      ? Math.round((completedLessons / courseLessons.length) * 100)
      : 0;

    return {
      ...summary,
      progress_percent: progressPercent,
      completed_lessons: completedLessons,
      last_lesson_title: courseLessons.find((lesson) =>
        progress.some((entry) => entry.lesson_id === lesson.id && entry.completed),
      )?.title ?? null,
      certificate_id:
        certificates.find((certificate) => certificate.course_id === course.id)?.id ?? null,
    };
  });

  const feed = notifications.map<NotificationFeedItem>((notification) => ({
    ...notification,
    href: notification.title.toLowerCase().includes("certificate")
      ? "/dashboard"
      : `/dashboard/courses/${dashboardCourses[0]?.id ?? ""}`,
  }));

  return {
    studentName: studentName || "Learner",
    activeCourses: dashboardCourses.filter((course) => course.progress_percent < 100).length,
    completedCourses: dashboardCourses.filter((course) => course.progress_percent >= 100).length,
    certificateCount: certificates.length,
    bookmarkedLessons: bookmarks.length,
    notesCount: notes.length,
    courses: dashboardCourses.length ? dashboardCourses : fallbackDashboardOverview.courses,
    notifications: feed.length ? feed : fallbackDashboardOverview.notifications,
  } satisfies DashboardOverview;
}

export async function getCoursePlayerData(courseId: string, userId: string) {
  if (!isSupabaseConfigured()) {
    const fallbackCourse = getFallbackCourseById(courseId);
    if (!fallbackCourse) {
      return null;
    }

    const orderedLessons = fallbackCourse.modules.flatMap((module) => module.lessons);
    const currentLesson = orderedLessons[0] ?? null;

    return {
      course: {
        id: fallbackCourse.id,
        slug: fallbackCourse.slug,
        title: fallbackCourse.title,
        description: fallbackCourse.description,
        price_cents: fallbackCourse.price_cents,
        thumbnail_url: fallbackCourse.thumbnail_url,
        category: fallbackCourse.category,
        level: fallbackCourse.level,
        featured: fallbackCourse.featured,
        published: fallbackCourse.published,
        instructor_id: fallbackCourse.instructor_id,
        created_at: fallbackCourse.created_at,
        total_lessons: fallbackCourse.total_lessons,
        duration_seconds: fallbackCourse.duration_seconds,
        average_rating: fallbackCourse.average_rating,
        review_count: fallbackCourse.review_count,
        instructor: fallbackCourse.instructor,
      },
      modules: fallbackCourse.modules,
      currentLesson,
      completedLessonIds: [],
      bookmarkedLessonIds: [],
      notesByLessonId: {},
      previousLessonId: null,
      nextLessonId: orderedLessons[1]?.id ?? null,
      playbackToken: null,
    } satisfies CoursePlayerData;
  }

  const supabase = await createSupabaseServerClient();
  const [{ data: courseData }, { data: progressData }, { data: bookmarkData }, { data: noteData }] =
    await Promise.all([
      supabase.from("courses").select("*").eq("id", courseId).single(),
      supabase.from("progress").select("*").eq("user_id", userId).eq("course_id", courseId),
      supabase.from("bookmarks").select("*").eq("user_id", userId).eq("course_id", courseId),
      supabase.from("lesson_notes").select("*").eq("user_id", userId).eq("course_id", courseId),
    ]);

  const course: Course | CourseDetail | null =
    (courseData as Course | null) ?? getFallbackCourseById(courseId);
  const progress = (progressData ?? []) as LessonProgress[];
  const bookmarks = (bookmarkData ?? []) as Bookmark[];
  const notes = (noteData ?? []) as LessonNote[];

  if (!course) {
    return null;
  }

  const fallbackCourse = getFallbackCourseById(courseId);

  let modules: CourseModule[] = [];
  let lessons: Lesson[] = [];
  let reviews: Review[] = [];
  let instructor: Profile | null = null;

  if (isCourseDetail(course)) {
    modules = course.modules;
    lessons = course.modules.flatMap((module) => module.lessons);
    reviews = course.reviews;
    instructor = course.instructor;
  } else {
    const { modules: moduleData, lessons: lessonData, reviews: reviewData, profiles } =
      await listCourseRelatedData([course.id]);
    modules = moduleData;
    lessons = lessonData;
    reviews = reviewData;
    instructor = profiles.find((profile) => profile.id === course.instructor_id) ?? null;
  }

  const summary: CourseSummary = isCourseDetail(course)
    ? {
        id: course.id,
        slug: course.slug,
        title: course.title,
        description: course.description,
        price_cents: course.price_cents,
        thumbnail_url: course.thumbnail_url,
        category: course.category,
        level: course.level,
        featured: course.featured,
        published: course.published,
        instructor_id: course.instructor_id,
        created_at: course.created_at,
        total_lessons: course.total_lessons,
        duration_seconds: course.duration_seconds,
        average_rating: course.average_rating,
        review_count: course.review_count,
        instructor: course.instructor,
      }
    : buildCourseSummary(course, modules, lessons, reviews, instructor);

  const builtModules: CourseModuleWithLessons[] = isCourseDetail(course)
    ? course.modules
    : buildModules(modules, lessons);
  const orderedLessons = builtModules.flatMap((module) => module.lessons);
  const currentLesson =
    orderedLessons.find(
      (lesson) => !progress.some((entry) => entry.lesson_id === lesson.id && entry.completed),
    ) ?? orderedLessons[0] ?? null;
  const currentIndex = currentLesson
    ? orderedLessons.findIndex((lesson) => lesson.id === currentLesson.id)
    : -1;

  return {
    course: summary,
    modules: builtModules.length ? builtModules : fallbackCourse?.modules ?? [],
    currentLesson,
    completedLessonIds: progress.filter((entry) => entry.completed).map((entry) => entry.lesson_id),
    bookmarkedLessonIds: bookmarks.map((bookmark) => bookmark.lesson_id),
    notesByLessonId: Object.fromEntries(notes.map((note) => [note.lesson_id, note.body])),
    previousLessonId: currentIndex > 0 ? orderedLessons[currentIndex - 1]?.id ?? null : null,
    nextLessonId:
      currentIndex >= 0 && currentIndex < orderedLessons.length - 1
        ? orderedLessons[currentIndex + 1]?.id ?? null
        : null,
    playbackToken: await safePlaybackToken(currentLesson?.mux_playback_id ?? null),
  } satisfies CoursePlayerData;
}

export async function getCertificateVerificationRecord(id: string) {
  if (!isSupabaseConfigured()) {
    if (id === "cert_demo_0001") {
      return {
        id,
        user_id: "demo-user",
        course_id: fallbackCourseDetails[1]?.id ?? "",
        completion_date: "2026-04-01",
        pdf_url: null,
        created_at: "2026-04-01T00:00:00.000Z",
        student_name: "Learner",
        course_name: "TypeScript Foundations",
      } satisfies CertificateVerificationRecord;
    }

    return null;
  }

  const supabase = await createSupabaseServerClient();
  const { data: certificateData } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", id)
    .single();

  const certificate = certificateData as Certificate | null;

  if (!certificate) {
    return null;
  }

  const [{ data: courseData }, { data: profileData }] = await Promise.all([
    supabase.from("courses").select("title").eq("id", certificate.course_id).single(),
    supabase.from("profiles").select("full_name").eq("id", certificate.user_id).single(),
  ]);

  return {
    ...certificate,
    student_name: ((profileData as { full_name?: string } | null)?.full_name ?? "Academy learner"),
    course_name: ((courseData as { title?: string } | null)?.title ?? "Course"),
  } satisfies CertificateVerificationRecord;
}

export async function getAdminOverview() {
  if (!isSupabaseConfigured()) {
    return fallbackAdminOverview;
  }

  const supabase = await createSupabaseServerClient();
  const [{ data: paymentData }, { data: enrollmentData }, { data: reviewData }, { data: couponData }] =
    await Promise.all([
      supabase.from("payments").select("*"),
      supabase.from("enrollments").select("*"),
      supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("coupons").select("*").order("active", { ascending: false }),
    ]);

  const courses = await listPublishedCourses();

  if (!paymentData && !enrollmentData) {
    return fallbackAdminOverview;
  }

  const payments = (paymentData ?? []) as Array<{ amount_cents: number; status: string }>;
  const enrollments = (enrollmentData ?? []) as Enrollment[];
  const reviews = (reviewData ?? []) as Review[];
  const coupons = (couponData ?? []) as AdminOverview["coupons"];

  return {
    totalRevenue: payments.reduce((sum, payment) => sum + payment.amount_cents, 0) / 100,
    totalEnrollments: enrollments.length,
    activeStudents: new Set(enrollments.map((enrollment) => enrollment.user_id)).size,
    activeSubscriptions: payments.filter((payment) =>
      payment.status.includes("subscription"),
    ).length,
    pendingReviews: reviews.filter((review) => !review.approved).length,
    recentCourses: courses.slice(0, 4),
    recentReviews: reviews.map<ReviewWithAuthor>((review) => ({
      ...review,
      author_name: "Academy learner",
      author_role: "student",
    })),
    coupons: coupons.length ? coupons : fallbackAdminOverview.coupons,
    revenueSeries: fallbackAdminOverview.revenueSeries,
  } satisfies AdminOverview;
}
