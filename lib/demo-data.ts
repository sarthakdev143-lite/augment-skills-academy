import type {
  BlogPostPreview,
  CourseDetail,
  CourseSummary,
  DashboardOverview,
  Profile,
} from "@/types";

const mentorProfile: Profile = {
  id: "90000000-0000-0000-0000-000000000001",
  full_name: "Industry Expert Mentor",
  avatar_url: null,
  role: "instructor",
  bio: "Working professionals mentoring learners through practical projects, reviews, and career transitions.",
  created_at: "2026-01-12T00:00:00.000Z",
};

export const marketingStats = [
  { label: "Average career acceleration", value: "3x" },
  { label: "Learner satisfaction score", value: "4.9★" },
  { label: "Placement support provided", value: "100%" },
];

// Replace these with real student testimonials.
// Each entry: { name: string, role: string, quote: string }
// Add or remove items freely - the grid auto-adjusts.
export const testimonials = [
  { name: "Student Name", role: "Role at Company", quote: "Your testimonial here." },
  { name: "Student Name", role: "Role at Company", quote: "Your testimonial here." },
  { name: "Student Name", role: "Role at Company", quote: "Your testimonial here." },
];

export const learningPillars = [
  {
    eyebrow: "Discover",
    title: "Choose a path that matches your next role",
    description:
      "Pick a structured route aligned to the skills employers actually expect for frontend, backend, AI, and DevOps roles.",
  },
  {
    eyebrow: "Build",
    title: "Learn by doing with guided project work",
    description:
      "Every track includes practical exercises, reviews, and projects that make your growth visible to both mentors and recruiters.",
  },
  {
    eyebrow: "Launch",
    title: "Turn progress into portfolio proof",
    description:
      "Resume support, mock interviews, and mentor guidance help you package your work into a stronger hiring story.",
  },
];

export const academyFaqs = [
  {
    question: "Who are these courses designed for?",
    answer: "Anyone who wants to build a real tech career - whether you're a complete beginner, someone switching fields, or a working professional looking to upskill. We have beginner-friendly paths and advanced tracks to match your starting point.",
  },
  {
    question: "Do I need prior coding experience?",
    answer: "For most of our courses, no. Our AI/ML, Frontend, and Backend tracks start from the very basics. DevOps assumes some familiarity with computers but no coding experience required. We guide you step by step.",
  },
  {
    question: "How does the mentorship work?",
    answer: "You'll be assigned a dedicated industry mentor who reviews your projects, answers questions, and holds regular check-ins throughout your course. This isn't automated - it's a real person invested in your progress.",
  },
  {
    question: "What kind of placement support do you provide?",
    answer: "We provide resume reviews, mock technical interviews, referrals to our hiring network, LinkedIn profile optimization, and career strategy guidance. We stay with you until you land your goal role.",
  },
  {
    question: "Can I choose my own framework in the Frontend or Backend course?",
    answer: "Yes. When you enroll in Frontend Development, you choose one framework to specialize in: React, Next.js, Angular, Vue.js, or SvelteKit. Backend learners choose from Node.js/Express, Python/FastAPI, Go/Gin, Java/Spring, or Ruby on Rails. Tailwind CSS is included free with every frontend track.",
  },
  {
    question: "What is the Custom Learning Path?",
    answer: "If you want to combine topics across our courses - say, AI + Backend, or DevOps + Frontend - or if you have a very specific career goal, we'll design a personalized roadmap just for you. Select your topics during enrollment and our team will reach out to finalize your custom plan.",
  },
  {
    question: "How long do the courses take?",
    answer: "AI/ML and DevOps take about 12-14 weeks at 6-8 hours per week. Frontend and Backend take 10-12 weeks. The Custom path is fully flexible based on your goals and availability.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes. If you're not satisfied within the first 7 days of starting your course, we'll give you a full refund - no questions asked.",
  },
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
  "ai-machine-learning": {
    cohortLabel: "Zero to AI-ready path",
    targetRole: "AI/ML Engineer",
    duration: "14 weeks",
    weeklyCommitment: "6-8 hrs/week",
    delivery: "Mentor-led + project builds",
    projectCount: "3 capstone projects",
    promise: "From Python basics to deploying ML models and working with LLMs.",
    tools: ["Python", "NumPy", "Pandas", "scikit-learn", "PyTorch", "LangChain", "HuggingFace", "Docker"],
    support: ["Weekly mentor sessions", "Project reviews", "Portfolio & career help"],
  },
  "devops-engineering": {
    cohortLabel: "Modern delivery systems path",
    targetRole: "DevOps/Platform Engineer",
    duration: "12 weeks",
    weeklyCommitment: "7-9 hrs/week",
    delivery: "Mentor-led labs + deployment practice",
    projectCount: "3 applied infrastructure projects",
    promise: "Master Linux, containers, CI/CD, Kubernetes, cloud basics, and observability.",
    tools: ["Linux", "Bash", "Docker", "Kubernetes", "Helm", "GitHub Actions", "AWS", "GCP", "Prometheus", "Grafana"],
    support: ["Weekly mentor sessions", "Project reviews", "Portfolio & career help"],
  },
  "frontend-development": {
    cohortLabel: "Framework-specialized frontend path",
    targetRole: "Frontend Developer",
    duration: "10 weeks",
    weeklyCommitment: "5-7 hrs/week",
    delivery: "Mentor-led + project builds",
    projectCount: "3 portfolio-ready interfaces",
    promise: "Build responsive UIs and specialize in the framework that fits your career goal.",
    tools: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React / Next.js / Angular / Vue / SvelteKit", "Tailwind CSS", "Vite", "Vercel"],
    support: ["Weekly mentor sessions", "Project reviews", "Portfolio & career help"],
  },
  "backend-development": {
    cohortLabel: "Server-side systems path",
    targetRole: "Backend Developer",
    duration: "12 weeks",
    weeklyCommitment: "6-8 hrs/week",
    delivery: "Mentor-led + system design builds",
    projectCount: "3 API and systems projects",
    promise: "Learn to build scalable APIs, data layers, integrations, and secure backend services.",
    tools: ["Node.js", "Express / FastAPI / Gin / Spring / Rails", "PostgreSQL", "MongoDB", "Prisma", "Redis", "Docker", "Postman"],
    support: ["Weekly mentor sessions", "Project reviews", "Portfolio & career help"],
  },
  "custom-learning-path": {
    cohortLabel: "Fully personalized track",
    targetRole: "Your Target Role",
    duration: "Flexible",
    weeklyCommitment: "Custom",
    delivery: "Fully personalized",
    projectCount: "Custom scope",
    promise: "A path designed around your exact goals.",
    tools: ["Personalized to your stack"],
    support: ["Custom mentor", "Tailored milestones", "Direct advisor support"],
  },
};

export function getCourseCareerSignal(slug: string) {
  return courseCareerSignals[slug] ?? courseCareerSignals["custom-learning-path"];
}

function createModules(
  courseId: string,
  titles: string[],
  previewCount = 2,
) {
  return titles.map((title, index) => {
    const moduleId = `${courseId}-module-${index + 1}`;
    return {
      id: moduleId,
      course_id: courseId,
      title,
      position: index + 1,
      lessons: [
        {
          id: `${moduleId}-lesson-1`,
          course_id: courseId,
          module_id: moduleId,
          title,
          position: 1,
          mux_asset_id: null,
          mux_playback_id: null,
          content_md: `${title} with guided explanations, mentor context, and practical exercises.`,
          is_preview: index < previewCount,
          duration_seconds: 900,
          attachment_url: null,
        },
      ],
    };
  });
}

function defineCourse(course: CourseDetail) {
  return course;
}

export const fallbackCourseDetails: CourseDetail[] = [
  defineCourse({
    id: "course-ai-ml-001",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    category: "AI Engineering",
    level: "beginner",
    description: "From Python basics to deploying your own ML models and working with Large Language Models - build AI literacy that the industry actually demands.",
    featured: true,
    published: true,
    tagline: "The AI course that takes you from zero to job-ready",
    price_cents: 0,
    thumbnail_url: null,
    instructor_id: mentorProfile.id,
    created_at: "2026-04-01T00:00:00.000Z",
    total_lessons: 5,
    duration_seconds: 4500,
    average_rating: 0,
    review_count: 0,
    instructor: mentorProfile,
    outcomes: [
      "Write clean Python for data manipulation and model training",
      "Understand and apply core ML algorithms with scikit-learn",
      "Fine-tune and deploy Large Language Models",
      "Build end-to-end AI pipelines ready for production",
    ],
    modules: createModules("course-ai-ml-001", [
      "Python & Data Foundations",
      "Machine Learning Fundamentals",
      "Deep Learning Basics",
      "Large Language Models",
      "Deployment & MLOps",
    ]),
    preview_lessons: [],
    reviews: [],
    tools: ["Python", "NumPy", "Pandas", "scikit-learn", "PyTorch", "LangChain", "HuggingFace", "Docker"],
  }),
  defineCourse({
    id: "course-devops-002",
    slug: "devops-engineering",
    title: "DevOps Engineering",
    category: "DevOps",
    level: "intermediate",
    description: "Master the tools and workflows that power modern software delivery - from Linux fundamentals to Kubernetes orchestration and full CI/CD pipelines.",
    featured: true,
    published: true,
    tagline: "Ship faster, break less, sleep better",
    price_cents: 0,
    thumbnail_url: null,
    instructor_id: mentorProfile.id,
    created_at: "2026-04-02T00:00:00.000Z",
    total_lessons: 6,
    duration_seconds: 5400,
    average_rating: 0,
    review_count: 0,
    instructor: mentorProfile,
    outcomes: [
      "Navigate Linux systems and shell scripting with confidence",
      "Containerize applications with Docker and orchestrate with Kubernetes",
      "Build automated CI/CD pipelines with GitHub Actions",
      "Provision and manage cloud infrastructure on AWS/GCP",
    ],
    modules: createModules("course-devops-002", [
      "Linux & Shell Mastery",
      "Docker & Containers",
      "Kubernetes",
      "CI/CD Pipelines",
      "Cloud Platforms",
      "Monitoring & Observability",
    ]),
    preview_lessons: [],
    reviews: [],
    tools: ["Linux", "Bash", "Docker", "Kubernetes", "Helm", "GitHub Actions", "AWS", "GCP", "Prometheus", "Grafana"],
  }),
  defineCourse({
    id: "course-frontend-003",
    slug: "frontend-development",
    title: "Frontend Development",
    category: "Web Development",
    level: "beginner",
    description: "Build beautiful, performant user interfaces from scratch. Choose your framework path - React, Next.js, Angular, Vue, or SvelteKit - and get Tailwind CSS as a free bonus alongside every track.",
    featured: true,
    published: true,
    tagline: "One course. Your framework. Infinite possibilities.",
    price_cents: 0,
    thumbnail_url: null,
    instructor_id: mentorProfile.id,
    created_at: "2026-04-03T00:00:00.000Z",
    total_lessons: 5,
    duration_seconds: 4500,
    average_rating: 0,
    review_count: 0,
    instructor: mentorProfile,
    outcomes: [
      "Build responsive, accessible UIs with HTML, CSS, and JavaScript",
      "Master your chosen framework: React, Next.js, Angular, Vue, or SvelteKit",
      "Style production-quality interfaces with Tailwind CSS (included free)",
      "Deploy frontend applications with Vercel, Netlify, or similar",
    ],
    modules: createModules("course-frontend-003", [
      "Web Foundations",
      "JavaScript Essentials",
      "Your Framework Deep Dive",
      "Tailwind CSS Mastery (Bonus)",
      "Build & Deploy",
    ]),
    preview_lessons: [],
    reviews: [],
    tools: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React / Next.js / Angular / Vue / SvelteKit", "Tailwind CSS", "Vite", "Vercel"],
    frameworkOptions: ["React", "Next.js", "Angular", "Vue.js", "SvelteKit"],
    bonusAddon: "Tailwind CSS - included free with every frontend track",
  }),
  defineCourse({
    id: "course-backend-004",
    slug: "backend-development",
    title: "Backend Development",
    category: "Web Development",
    level: "beginner",
    description: "Learn to architect and build robust server-side systems. Choose your stack - Node.js/Express, Python/FastAPI, Go, or Java/Spring - and build APIs that scale.",
    featured: false,
    published: true,
    tagline: "APIs, databases, and systems that hold up under pressure",
    price_cents: 0,
    thumbnail_url: null,
    instructor_id: mentorProfile.id,
    created_at: "2026-04-04T00:00:00.000Z",
    total_lessons: 6,
    duration_seconds: 5400,
    average_rating: 0,
    review_count: 0,
    instructor: mentorProfile,
    outcomes: [
      "Design and build RESTful and GraphQL APIs",
      "Model databases, write migrations, and optimize queries",
      "Implement authentication, authorization, and security best practices",
      "Deploy and monitor backend services in production",
    ],
    modules: createModules("course-backend-004", [
      "Backend Fundamentals",
      "Your Framework Track",
      "Databases & ORMs",
      "Authentication & Security",
      "APIs & Integrations",
      "Deployment & Scaling",
    ]),
    preview_lessons: [],
    reviews: [],
    tools: ["Node.js", "Express / FastAPI / Gin / Spring / Rails", "PostgreSQL", "MongoDB", "Prisma", "Redis", "Docker", "Postman"],
    frameworkOptions: ["Node.js + Express", "Python + FastAPI", "Go + Gin", "Java + Spring Boot", "Ruby on Rails"],
  }),
  defineCourse({
    id: "course-custom-005",
    slug: "custom-learning-path",
    title: "Custom Learning Path",
    category: "Custom",
    level: "beginner",
    description: "Can't find what you're looking for, or want to combine multiple skills? Build your own path. Select any combination of courses, topics, or goals - we'll design a tailored roadmap just for you.",
    featured: false,
    published: true,
    tagline: "Your goals. Your pace. Your curriculum.",
    price_cents: 0,
    thumbnail_url: null,
    instructor_id: mentorProfile.id,
    created_at: "2026-04-05T00:00:00.000Z",
    total_lessons: 5,
    duration_seconds: 4500,
    average_rating: 0,
    review_count: 0,
    instructor: mentorProfile,
    outcomes: [
      "A personalized roadmap built around your exact career goal",
      "Mix and match topics across AI, DevOps, Frontend, and Backend",
      "Dedicated mentor matching based on your chosen stack",
      "Flexible schedule and checkpoint milestones",
    ],
    modules: createModules("course-custom-005", [
      "Discovery & Goal Setting",
      "Custom Curriculum Design",
      "Flexible Module Selection",
      "Dedicated Mentor Assignment",
      "Progress & Checkpoints",
    ]),
    preview_lessons: [],
    reviews: [],
    tools: ["Any from our catalogue", "Custom stack", "Personalized toolset"],
    isCustom: true,
    customFlowDescription: "After clicking Enroll, you'll be able to select from our available courses and topics. You can add multiple tracks to your cart-style selector. We'll reach out to confirm your custom plan within 24 hours.",
  }),
].map((course) => ({
  ...course,
  preview_lessons: course.modules.flatMap((module) => module.lessons).filter((lesson) => lesson.is_preview),
}));

export const fallbackCourses: CourseSummary[] = fallbackCourseDetails.map((course) => ({
  id: course.id,
  slug: course.slug,
  title: course.title,
  description: course.description,
  price_cents: 0,
  thumbnail_url: course.thumbnail_url,
  category: course.category,
  level: course.level,
  featured: course.featured,
  published: course.published,
  instructor_id: course.instructor_id,
  created_at: course.created_at,
  total_lessons: course.total_lessons,
  duration_seconds: course.duration_seconds,
  average_rating: 0,
  review_count: 0,
  instructor: course.instructor,
  tagline: course.tagline,
  tools: course.tools,
  frameworkOptions: course.frameworkOptions,
  bonusAddon: course.bonusAddon,
  isCustom: course.isCustom,
  customFlowDescription: course.customFlowDescription,
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
    title: "How to Choose the Right Tech Stack for Your Career in 2025",
    description: "A practical guide to choosing between frontend, backend, DevOps, and AI paths based on demand, strengths, and long-term growth.",
    category: "Career Guides",
    author: "Augment Skills Academy",
    readingTime: "6 min read",
    publishedAt: "2026-04-10",
    featured: true,
    excerpt: "Choosing a stack is easier when you compare job reality, learning curve, and the kind of work you want to do every day.",
  },
  {
    slug: "from-notes-to-portfolio",
    title: "How to Build a Portfolio That Gets You Hired (Without Fake Projects)",
    description: "How to create real portfolio proof with practical projects, clean GitHub repos, and stronger case studies.",
    category: "Career Guides",
    author: "Augment Skills Academy",
    readingTime: "5 min read",
    publishedAt: "2026-04-12",
    excerpt: "A hiring-ready portfolio focuses less on visual polish alone and more on proof, clarity, tradeoffs, and consistency.",
  },
];

export const fallbackDashboardOverview: DashboardOverview = {
  studentName: "Learner",
  activeCourses: 0,
  completedCourses: 0,
  certificateCount: 0,
  bookmarkedLessons: 0,
  notesCount: 0,
  courses: [],
  notifications: [],
};
