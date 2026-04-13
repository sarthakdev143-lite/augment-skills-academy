import type {
  AdminOverview,
  BlogPostPreview,
  CourseDetail,
  CourseSummary,
  DashboardOverview,
  Profile,
  RevenuePoint,
} from "@/types";

const instructorProfiles: Record<string, Profile> = {
  "90000000-0000-0000-0000-000000000001": {
    id: "90000000-0000-0000-0000-000000000001",
    full_name: "Aarav Menon",
    avatar_url: null,
    role: "instructor",
    bio: "Platform engineer focused on teaching resilient product architecture.",
    created_at: "2026-01-12T00:00:00.000Z",
  },
  "90000000-0000-0000-0000-000000000002": {
    id: "90000000-0000-0000-0000-000000000002",
    full_name: "Naina Shah",
    avatar_url: null,
    role: "instructor",
    bio: "TypeScript and DX specialist helping teams ship safer code faster.",
    created_at: "2026-01-20T00:00:00.000Z",
  },
  "90000000-0000-0000-0000-000000000003": {
    id: "90000000-0000-0000-0000-000000000003",
    full_name: "Kabir Rao",
    avatar_url: null,
    role: "instructor",
    bio: "AI product builder translating prototypes into production systems.",
    created_at: "2026-02-05T00:00:00.000Z",
  },
};

export const marketingStats = [
  { label: "Learners trained", value: "18k+" },
  { label: "Course completion rate", value: "92%" },
  { label: "Enterprise cohorts", value: "140+" },
  { label: "Avg. rating", value: "4.9/5" },
];

export const testimonials = [
  {
    name: "Maya Thompson",
    role: "Frontend Engineer at Fluxbase",
    quote:
      "The curriculum feels like pairing with a senior engineer who cares about how software behaves in production.",
  },
  {
    name: "Rohit Bansal",
    role: "Platform Lead at Northstar",
    quote:
      "We used the academy for an internal upskilling sprint and got a reusable architecture playbook out of it.",
  },
  {
    name: "Elena Park",
    role: "Indie founder",
    quote:
      "The lessons bridge the gap between tutorial confidence and shipping confidence. That difference really matters.",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$99",
    cadence: "per course",
    description: "Own a single deep-dive course with lifetime access and downloadable assets.",
    features: [
      "One-time purchase",
      "Lesson notes and attachments",
      "Certificate on completion",
    ],
  },
  {
    name: "All Access",
    price: "$39",
    cadence: "per month",
    description: "Access the full academy catalogue, new releases, and cohort extras.",
    features: [
      "Monthly or annual billing",
      "Every current and future course",
      "Priority support and cohort drops",
    ],
  },
];

export const fallbackCourseDetails: CourseDetail[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    slug: "nextjs-production",
    title: "Next.js in Production",
    description:
      "Build resilient App Router products with caching, auth boundaries, observability, and deployment strategy.",
    price_cents: 9900,
    thumbnail_url: null,
    category: "Web Development",
    level: "intermediate",
    featured: true,
    published: true,
    instructor_id: "90000000-0000-0000-0000-000000000001",
    created_at: "2026-03-08T00:00:00.000Z",
    total_lessons: 8,
    duration_seconds: 11100,
    average_rating: 4.9,
    review_count: 128,
    instructor: instructorProfiles["90000000-0000-0000-0000-000000000001"],
    outcomes: [
      "Model cache and revalidation strategies for App Router applications",
      "Protect dashboards and mutations with Supabase session-aware auth",
      "Design deployment-ready route trees, metadata, and streaming boundaries",
    ],
    modules: [
      {
        id: "33333333-3333-3333-3333-333333333331",
        course_id: "11111111-1111-1111-1111-111111111111",
        title: "Foundation",
        position: 1,
        lessons: [
          {
            id: "44444444-4444-4444-4444-444444444441",
            course_id: "11111111-1111-1111-1111-111111111111",
            module_id: "33333333-3333-3333-3333-333333333331",
            title: "Platform tour",
            position: 1,
            mux_asset_id: null,
            mux_playback_id: null,
            content_md: "Map the major moving pieces in the codebase before shipping changes.",
            is_preview: true,
            duration_seconds: 420,
            attachment_url: null,
          },
          {
            id: "44444444-4444-4444-4444-444444444443",
            course_id: "11111111-1111-1111-1111-111111111111",
            module_id: "33333333-3333-3333-3333-333333333331",
            title: "App Router mental model",
            position: 2,
            mux_asset_id: null,
            mux_playback_id: null,
            content_md: "Understand layouts, loading states, metadata, and route groups.",
            is_preview: true,
            duration_seconds: 780,
            attachment_url: null,
          },
        ],
      },
      {
        id: "33333333-3333-3333-3333-333333333332",
        course_id: "11111111-1111-1111-1111-111111111111",
        title: "Scaling the product",
        position: 2,
        lessons: [
          {
            id: "44444444-4444-4444-4444-444444444442",
            course_id: "11111111-1111-1111-1111-111111111111",
            module_id: "33333333-3333-3333-3333-333333333332",
            title: "Server actions and RLS",
            position: 1,
            mux_asset_id: null,
            mux_playback_id: null,
            content_md: "Implement secure mutations with typed validation and path revalidation.",
            is_preview: false,
            duration_seconds: 780,
            attachment_url: null,
          },
          {
            id: "44444444-4444-4444-4444-444444444444",
            course_id: "11111111-1111-1111-1111-111111111111",
            module_id: "33333333-3333-3333-3333-333333333332",
            title: "Observability and launch checklists",
            position: 2,
            mux_asset_id: null,
            mux_playback_id: null,
            content_md: "Add error boundaries, webhooks, analytics, and release gates.",
            is_preview: false,
            duration_seconds: 960,
            attachment_url: null,
          },
        ],
      },
    ],
    preview_lessons: [
      {
        id: "44444444-4444-4444-4444-444444444441",
        course_id: "11111111-1111-1111-1111-111111111111",
        module_id: "33333333-3333-3333-3333-333333333331",
        title: "Platform tour",
        position: 1,
        mux_asset_id: null,
        mux_playback_id: null,
        content_md: "Map the major moving pieces in the codebase before shipping changes.",
        is_preview: true,
        duration_seconds: 420,
        attachment_url: null,
      },
      {
        id: "44444444-4444-4444-4444-444444444443",
        course_id: "11111111-1111-1111-1111-111111111111",
        module_id: "33333333-3333-3333-3333-333333333331",
        title: "App Router mental model",
        position: 2,
        mux_asset_id: null,
        mux_playback_id: null,
        content_md: "Understand layouts, loading states, metadata, and route groups.",
        is_preview: true,
        duration_seconds: 780,
        attachment_url: null,
      },
    ],
    reviews: [
      {
        id: "55555555-5555-5555-5555-555555555551",
        user_id: "70000000-0000-0000-0000-000000000001",
        course_id: "11111111-1111-1111-1111-111111111111",
        rating: 5,
        body: "Practical, opinionated, and the closest thing to shadowing a production team.",
        approved: true,
        created_at: "2026-03-21T00:00:00.000Z",
        author_name: "Sara James",
        author_role: "student",
      },
      {
        id: "55555555-5555-5555-5555-555555555552",
        user_id: "70000000-0000-0000-0000-000000000002",
        course_id: "11111111-1111-1111-1111-111111111111",
        rating: 5,
        body: "The module on auth boundaries saved us weeks of trial and error.",
        approved: true,
        created_at: "2026-03-28T00:00:00.000Z",
        author_name: "Daniel Cho",
        author_role: "student",
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    slug: "typescript-foundations",
    title: "TypeScript Foundations",
    description:
      "Strengthen type modeling, validation, and API ergonomics for collaborative engineering teams.",
    price_cents: 7900,
    thumbnail_url: null,
    category: "Programming",
    level: "beginner",
    featured: true,
    published: true,
    instructor_id: "90000000-0000-0000-0000-000000000002",
    created_at: "2026-02-12T00:00:00.000Z",
    total_lessons: 6,
    duration_seconds: 7800,
    average_rating: 4.8,
    review_count: 94,
    instructor: instructorProfiles["90000000-0000-0000-0000-000000000002"],
    outcomes: [
      "Design safer shared types for app and API boundaries",
      "Validate form and webhook inputs with Zod",
      "Refactor away from implicit any-driven bugs",
    ],
    modules: [
      {
        id: "33333333-3333-3333-3333-333333333333",
        course_id: "22222222-2222-2222-2222-222222222222",
        title: "Type system essentials",
        position: 1,
        lessons: [
          {
            id: "44444444-4444-4444-4444-444444444445",
            course_id: "22222222-2222-2222-2222-222222222222",
            module_id: "33333333-3333-3333-3333-333333333333",
            title: "Literal types and narrowing",
            position: 1,
            mux_asset_id: null,
            mux_playback_id: null,
            content_md: "Use discriminated unions and narrowing to keep state logic explicit.",
            is_preview: true,
            duration_seconds: 540,
            attachment_url: null,
          },
        ],
      },
    ],
    preview_lessons: [
      {
        id: "44444444-4444-4444-4444-444444444445",
        course_id: "22222222-2222-2222-2222-222222222222",
        module_id: "33333333-3333-3333-3333-333333333333",
        title: "Literal types and narrowing",
        position: 1,
        mux_asset_id: null,
        mux_playback_id: null,
        content_md: "Use discriminated unions and narrowing to keep state logic explicit.",
        is_preview: true,
        duration_seconds: 540,
        attachment_url: null,
      },
    ],
    reviews: [
      {
        id: "55555555-5555-5555-5555-555555555553",
        user_id: "70000000-0000-0000-0000-000000000003",
        course_id: "22222222-2222-2222-2222-222222222222",
        rating: 5,
        body: "Exactly the right balance of clarity and real-world tradeoffs.",
        approved: true,
        created_at: "2026-03-19T00:00:00.000Z",
        author_name: "Priya Desai",
        author_role: "student",
      },
    ],
  },
  {
    id: "66666666-6666-6666-6666-666666666666",
    slug: "ai-product-systems",
    title: "AI Product Systems",
    description:
      "Ship AI features with evals, cost controls, guardrails, and workflows that hold up after launch.",
    price_cents: 12900,
    thumbnail_url: null,
    category: "AI Engineering",
    level: "advanced",
    featured: true,
    published: true,
    instructor_id: "90000000-0000-0000-0000-000000000003",
    created_at: "2026-03-20T00:00:00.000Z",
    total_lessons: 7,
    duration_seconds: 9240,
    average_rating: 4.9,
    review_count: 66,
    instructor: instructorProfiles["90000000-0000-0000-0000-000000000003"],
    outcomes: [
      "Design production-safe prompt pipelines and eval loops",
      "Choose storage, background jobs, and UX patterns for AI features",
      "Balance quality, latency, and cost under real traffic",
    ],
    modules: [
      {
        id: "33333333-3333-3333-3333-333333333334",
        course_id: "66666666-6666-6666-6666-666666666666",
        title: "Architecture and quality",
        position: 1,
        lessons: [
          {
            id: "44444444-4444-4444-4444-444444444446",
            course_id: "66666666-6666-6666-6666-666666666666",
            module_id: "33333333-3333-3333-3333-333333333334",
            title: "Eval loops that teams actually maintain",
            position: 1,
            mux_asset_id: null,
            mux_playback_id: null,
            content_md: "Treat evals as product assets, not one-off demos.",
            is_preview: true,
            duration_seconds: 660,
            attachment_url: null,
          },
        ],
      },
    ],
    preview_lessons: [
      {
        id: "44444444-4444-4444-4444-444444444446",
        course_id: "66666666-6666-6666-6666-666666666666",
        module_id: "33333333-3333-3333-3333-333333333334",
        title: "Eval loops that teams actually maintain",
        position: 1,
        mux_asset_id: null,
        mux_playback_id: null,
        content_md: "Treat evals as product assets, not one-off demos.",
        is_preview: true,
        duration_seconds: 660,
        attachment_url: null,
      },
    ],
    reviews: [],
  },
];

export const fallbackCourses: CourseSummary[] = fallbackCourseDetails.map((course) => ({
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
}));

export function getFallbackCourseBySlug(slug: string) {
  return fallbackCourseDetails.find((course) => course.slug === slug) ?? null;
}

export function getFallbackCourseById(id: string) {
  return fallbackCourseDetails.find((course) => course.id === id) ?? null;
}

export const fallbackBlogPosts: BlogPostPreview[] = [
  {
    slug: "ship-full-stack-skill-systems",
    title: "Ship Skill Systems, Not Just Courses",
    description:
      "How we design outcomes-first curricula that map directly to production work.",
    category: "Curriculum",
    author: "Aarav Menon",
    readingTime: "6 min read",
    publishedAt: "2026-03-10",
    featured: true,
    excerpt:
      "Strong technical education closes the gap between isolated knowledge and repeatable shipping habits.",
  },
  {
    slug: "from-notes-to-portfolio",
    title: "From Lesson Notes to Portfolio Evidence",
    description:
      "A practical framework for turning course notes into artifacts that matter in interviews and on teams.",
    category: "Career Growth",
    author: "Naina Shah",
    readingTime: "4 min read",
    publishedAt: "2026-03-24",
    excerpt:
      "The fastest way to make learning visible is to transform it into small, inspectable proofs of work.",
  },
];

export const fallbackRevenueSeries: RevenuePoint[] = [
  { label: "Jan", revenue: 18000, enrollments: 112 },
  { label: "Feb", revenue: 24500, enrollments: 156 },
  { label: "Mar", revenue: 31200, enrollments: 201 },
  { label: "Apr", revenue: 36800, enrollments: 229 },
];

export const fallbackDashboardOverview: DashboardOverview = {
  studentName: "Learner",
  activeCourses: 2,
  completedCourses: 1,
  certificateCount: 1,
  bookmarkedLessons: 3,
  notesCount: 5,
  courses: [
    {
      ...fallbackCourses[0],
      progress_percent: 68,
      completed_lessons: 5,
      last_lesson_title: "Server actions and RLS",
      certificate_id: null,
    },
    {
      ...fallbackCourses[1],
      progress_percent: 100,
      completed_lessons: 6,
      last_lesson_title: "Refactoring with confidence",
      certificate_id: "cert_demo_0001",
    },
  ],
  notifications: [
    {
      id: "80000000-0000-0000-0000-000000000001",
      user_id: "demo-user",
      title: "New lesson published",
      body: "Production launch checklists was added to Next.js in Production.",
      read: false,
      created_at: "2026-04-12T09:00:00.000Z",
      href: "/dashboard/courses/11111111-1111-1111-1111-111111111111",
    },
    {
      id: "80000000-0000-0000-0000-000000000002",
      user_id: "demo-user",
      title: "Certificate ready",
      body: "Your TypeScript Foundations certificate is ready to download.",
      read: true,
      created_at: "2026-04-10T09:00:00.000Z",
      href: "/certificates/cert_demo_0001",
    },
  ],
};

export const fallbackAdminOverview: AdminOverview = {
  totalRevenue: 110500,
  totalEnrollments: 698,
  activeStudents: 482,
  activeSubscriptions: 164,
  pendingReviews: 7,
  recentCourses: fallbackCourses,
  recentReviews: fallbackCourseDetails.flatMap((course) => course.reviews).slice(0, 3),
  coupons: [
    {
      id: "coupon-demo-1",
      code: "WELCOME20",
      discount_type: "percent",
      discount_value: 20,
      max_uses: 500,
      used_count: 128,
      expires_at: "2026-06-01T00:00:00.000Z",
      active: true,
    },
    {
      id: "coupon-demo-2",
      code: "ANNUAL1000",
      discount_type: "fixed",
      discount_value: 1000,
      max_uses: 120,
      used_count: 44,
      expires_at: "2026-07-01T00:00:00.000Z",
      active: true,
    },
  ],
  revenueSeries: fallbackRevenueSeries,
};
