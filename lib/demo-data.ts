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
    bio: "Platform architect mentoring engineers through production-grade frontend and backend systems.",
    created_at: "2026-01-12T00:00:00.000Z",
  },
  "90000000-0000-0000-0000-000000000002": {
    id: "90000000-0000-0000-0000-000000000002",
    full_name: "Naina Shah",
    avatar_url: null,
    role: "instructor",
    bio: "TypeScript educator helping career switchers build confidence, fluency, and interview-ready proof of work.",
    created_at: "2026-01-20T00:00:00.000Z",
  },
  "90000000-0000-0000-0000-000000000003": {
    id: "90000000-0000-0000-0000-000000000003",
    full_name: "Kabir Rao",
    avatar_url: null,
    role: "instructor",
    bio: "AI product lead turning promising prototypes into measurable systems with evals, guardrails, and launch discipline.",
    created_at: "2026-02-05T00:00:00.000Z",
  },
};

export const marketingStats = [
  { label: "Learners mentored", value: "38k+" },
  { label: "Avg. career jump", value: "2.4x" },
  { label: "Hiring teams engaged", value: "320+" },
  { label: "Learner rating", value: "4.8/5" },
];

export const testimonials = [
  {
    name: "Ritika Sharma",
    role: "UI Engineer at Northlane",
    quote:
      "What changed for me was the structure. I stopped consuming random tutorials and started shipping work that actually looked employable.",
  },
  {
    name: "Joseph Mathew",
    role: "Growth Engineer at Beamstack",
    quote:
      "The mentor reviews were blunt in the best way. Every project became tighter, clearer, and easier to explain in interviews.",
  },
  {
    name: "Ayesha Khan",
    role: "Career Switcher to Product Ops",
    quote:
      "I joined for the curriculum and stayed for the accountability. It finally felt like someone had designed the path around a real job outcome.",
  },
];

export const pricingPlans = [
  {
    name: "Specialization Track",
    price: "$99",
    cadence: "one-time cohort fee",
    description: "Choose one career path and get lessons, projects, mentor reviews, and portfolio feedback.",
    features: [
      "Live and recorded lessons",
      "Mentor office hours",
      "Portfolio-ready capstone",
    ],
  },
  {
    name: "Career Accelerator",
    price: "$39",
    cadence: "per month",
    description: "Access all current paths, guided study plans, and community-first career support.",
    features: [
      "Monthly or annual billing",
      "Every path and future releases",
      "Interview rooms and community clinics",
    ],
  },
];

export const learnerJourneys = [
  {
    name: "Ishita Verma",
    track: "Product Design Path",
    before: "Mechanical engineering graduate unsure how to break into digital roles",
    after: "Associate product designer leading onboarding experiments",
    quote:
      "The weekly critiques gave me more clarity than months of self-study. I finally knew what good work looked like.",
  },
  {
    name: "Siddharth Rao",
    track: "Growth Marketing Path",
    before: "Handled ad-hoc sales outreach without a clear digital strategy foundation",
    after: "Growth associate running paid, lifecycle, and landing page experiments",
    quote:
      "The projects felt close to the work I was applying for, so interviews became much easier to navigate.",
  },
  {
    name: "Neha Kulkarni",
    track: "AI Product Systems Path",
    before: "Frontend developer experimenting with AI features on the side",
    after: "Shipped internal copilots with evals, guardrails, and launch reporting",
    quote:
      "It was the first learning experience that treated AI like a product system instead of a prompt trick.",
  },
];

export const proofHighlights = [
  {
    title: "Mentor-led cohorts",
    description:
      "Live sessions, project reviews, and weekly checkpoints keep momentum high and guesswork low.",
  },
  {
    title: "Portfolio-first outcomes",
    description:
      "Every path ends with artifacts you can show recruiters, managers, and clients with confidence.",
  },
  {
    title: "Career support loops",
    description:
      "Resume clinics, interview prep, and narrative coaching help learners translate skill into opportunity.",
  },
];

export const logoCloud = [
  "Northlane",
  "OrbitPay",
  "Helio Commerce",
  "Scope AI",
  "Layerworks",
  "SignalOS",
];

export const learningPillars = [
  {
    eyebrow: "Discover",
    title: "Choose a path that matches your next role, not just your current curiosity",
    description:
      "Start with structured role maps, sample lessons, and mentor guidance so you are not guessing what to learn next.",
  },
  {
    eyebrow: "Build",
    title: "Practice through guided projects that feel like real delivery work",
    description:
      "Assignments are designed to mimic handoffs, reviews, and constraints that show up on actual teams.",
  },
  {
    eyebrow: "Launch",
    title: "Turn your coursework into visible proof recruiters and hiring managers can trust",
    description:
      "We help package projects, certificates, and stories into a portfolio narrative that is ready for applications.",
  },
];

export const mentorHighlights = [
  {
    name: "Aarav Menon",
    role: "Platform Systems Mentor",
    focus: "Next.js, backend architecture, team-ready shipping habits",
    stat: "150+ guided capstone reviews",
  },
  {
    name: "Naina Shah",
    role: "TypeScript and DX Mentor",
    focus: "Foundations, API modeling, interview clarity, developer confidence",
    stat: "4.9/5 learner feedback",
  },
  {
    name: "Kabir Rao",
    role: "AI Product Mentor",
    focus: "Evals, guardrails, product thinking, launch-readiness for AI workflows",
    stat: "20+ AI launches supported",
  },
];

export const academyFaqs = [
  {
    question: "Who are these programs designed for?",
    answer:
      "They are built for ambitious beginners, career switchers, and working professionals who want structured guidance into a sharper role.",
  },
  {
    question: "Do I get live support or only recordings?",
    answer:
      "Each path combines structured lessons with mentor-led sessions, office hours, and review checkpoints so learners are not left studying alone.",
  },
  {
    question: "What makes the learning experience outcome-oriented?",
    answer:
      "We anchor every program around a role goal, a set of applied projects, and support for turning that work into portfolio and interview material.",
  },
  {
    question: "Can teams use this for internal upskilling?",
    answer:
      "Yes. The platform already supports enterprise cohorts, private onboarding tracks, and progress visibility for managers.",
  },
];

export const contactHighlights = [
  "Book a career conversation for the right learning path",
  "Plan a private cohort for product, growth, or engineering teams",
  "Partner with the academy on workshops, content, or placements",
];

type CourseCareerSignal = {
  cohortLabel: string;
  targetRole: string;
  duration: string;
  weeklyCommitment: string;
  delivery: string;
  projectCount: string;
  promise: string;
  tools: string[];
  support: string[];
};

const courseCareerSignals: Record<string, CourseCareerSignal> = {
  "nextjs-production": {
    cohortLabel: "Job-ready web systems path",
    targetRole: "Frontend or platform engineer",
    duration: "8 weeks",
    weeklyCommitment: "6-8 hrs/week",
    delivery: "Mentor reviews + implementation labs",
    projectCount: "3 production-style builds",
    promise: "Learn to architect, review, and ship modern full-stack experiences with stronger technical judgment.",
    tools: ["Next.js 16", "Supabase", "Razorpay", "Deployment workflows"],
    support: ["Weekly review rooms", "Architecture feedback", "Portfolio framing"],
  },
  "typescript-foundations": {
    cohortLabel: "Core engineering confidence path",
    targetRole: "Frontend engineer or full-stack contributor",
    duration: "6 weeks",
    weeklyCommitment: "5-6 hrs/week",
    delivery: "Hands-on drills + code review clinics",
    projectCount: "2 portfolio artifacts",
    promise: "Build fluency with types, validation, and safer collaboration patterns that hiring teams look for.",
    tools: ["TypeScript", "Zod", "API contracts", "Refactoring exercises"],
    support: ["Doubt-clearing sessions", "Interview story coaching", "Resume proof points"],
  },
  "ai-product-systems": {
    cohortLabel: "Advanced AI delivery path",
    targetRole: "AI product engineer",
    duration: "7 weeks",
    weeklyCommitment: "7-9 hrs/week",
    delivery: "Live cohort + evaluation workshops",
    projectCount: "2 AI launch simulations",
    promise: "Move from demo-grade AI features to robust, testable systems that can survive real usage.",
    tools: ["Prompt workflows", "Evals", "Guardrails", "Background jobs"],
    support: ["Launch teardown sessions", "Quality scorecards", "Career narrative support"],
  },
};

export function getCourseCareerSignal(slug: string) {
  return (
    courseCareerSignals[slug] ?? {
      cohortLabel: "Mentor-led specialization",
      targetRole: "Modern product builder",
      duration: "6 weeks",
      weeklyCommitment: "5 hrs/week",
      delivery: "Mentor-led learning",
      projectCount: "2 guided projects",
      promise: "Build practical skill with structure, feedback, and portfolio-ready output.",
      tools: ["Projects", "Mentor support", "Feedback"],
      support: ["Career coaching", "Community access", "Project review"],
    }
  );
}

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
