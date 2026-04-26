export type AppRole = "student" | "instructor" | "admin";

export type ActionResult<T> = {
  data?: T;
  error?: string;
};

export type ServerActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  redirectTo?: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: AppRole;
  bio: string | null;
  created_at: string;
};

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price_cents: number;
  thumbnail_url: string | null;
  category: string;
  level: CourseLevel;
  published: boolean;
  featured: boolean;
  instructor_id: string;
  created_at: string;
  tagline?: string;
  tools?: string[];
  frameworkOptions?: string[];
  bonusAddon?: string;
  isCustom?: boolean;
  customFlowDescription?: string;
};

export type CourseModule = {
  id: string;
  course_id: string;
  title: string;
  position: number;
};

export type Lesson = {
  id: string;
  course_id: string;
  module_id: string;
  title: string;
  position: number;
  content_md: string | null;
  is_preview: boolean;
  duration_seconds: number | null;
  attachment_url: string | null;
};

export type Enrollment = {
  id: string;
  user_id: string;
  course_id: string;
  source: "purchase" | "coupon" | "admin" | "subscription";
  created_at: string;
};

export type LessonProgress = {
  id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  updated_at: string;
};

export type Certificate = {
  id: string;
  user_id: string;
  course_id: string;
  completion_date: string;
  pdf_url: string | null;
  created_at: string;
};

export type Review = {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  body: string;
  approved: boolean;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
};

export type LessonNote = {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  body: string;
  created_at: string;
  updated_at: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  created_at: string;
};

export type BlogPostFrontmatter = {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  readingTime: string;
  publishedAt: string;
  featured?: boolean;
};

export type BlogPostPreview = BlogPostFrontmatter & {
  excerpt: string;
};

export type CourseModuleWithLessons = CourseModule & {
  lessons: Lesson[];
};

export type ReviewWithAuthor = Review & {
  author_name: string;
  author_role: AppRole;
};

export type CourseSummary = Course & {
  total_lessons: number;
  duration_seconds: number;
  average_rating: number;
  review_count: number;
  instructor: Profile | null;
};

export type CourseDetail = CourseSummary & {
  modules: CourseModuleWithLessons[];
  preview_lessons: Lesson[];
  reviews: ReviewWithAuthor[];
  outcomes: string[];
};

export type DashboardCourse = CourseSummary & {
  progress_percent: number;
  completed_lessons: number;
  last_lesson_title: string | null;
  certificate_id: string | null;
};

export type NotificationFeedItem = Notification & {
  href: string;
};

export type DashboardOverview = {
  studentName: string;
  activeCourses: number;
  completedCourses: number;
  certificateCount: number;
  bookmarkedLessons: number;
  notesCount: number;
  courses: DashboardCourse[];
  notifications: NotificationFeedItem[];
};

export type CoursePlayerData = {
  course: CourseSummary;
  modules: CourseModuleWithLessons[];
  currentLesson: Lesson | null;
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  notesByLessonId: Record<string, string>;
  previousLessonId: string | null;
  nextLessonId: string | null;
  playbackToken: string | null;
};

export type CertificateVerificationRecord = Certificate & {
  student_name: string;
  course_name: string;
};

export type RevenuePoint = {
  label: string;
  revenue: number;
  enrollments: number;
};

export type AdminCourseOverview = CourseSummary & {
  enrollment_count: number;
};

export type EnrollmentRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  course_slug: string;
  course_name: string;
  selected_track: string | null;
  background_level: string;
  preferred_start_date: string | null;
  additional_info: string | null;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};
