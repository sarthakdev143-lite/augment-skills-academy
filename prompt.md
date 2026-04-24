You are working on a Next.js 16 App Router project called "Augment Skills Academy" located at the root of this repository. Your task is to do a full real-data migration, feature refactor, and cleanup pass. Read every file mentioned before touching it. Make all changes atomically — do not leave half-finished states.



## PART 1 — GLOBAL BRANDING & CLEANUP

### 1.1 Site identity
- Replace every occurrence of "augmentskills.academy", "advisor@augmentskills.academy", "augmentskillacademy.in" placeholder emails with: augmentskillacademy@gmail.com
- Set NEXT_PUBLIC_APP_URL references to: https://augmentskillacademy.in
- Copyright line: "© 2026 Augment Skill Academy" (note: "Skill" not "Skills" in legal copy but keep "Skills" in display name "Augment Skills Academy")
- In `components/site-footer.tsx`: update all email links, copyright, and domain references
- In `app/layout.tsx`: update metadata — title default "Augment Skills Academy", description to reflect the real academy
- In `components/site-header.tsx`: REMOVE the announcement bar entirely (the div with cohort dates). Do not show any dates or cohort labels anywhere on the public site.

### 1.2 Remove broken integrations from env and code
- In `lib/env.ts`: make RAZORPAY_*, MUX_*, GOOGLE_CLIENT_* all optional (wrap in `.optional()`) so the app does not crash without them. RESEND_API_KEY and RESEND_FROM_EMAIL should remain but also be optional with graceful fallback.
- Delete or stub out `lib/razorpay/`, `lib/mux/` — keep the files but make every exported function a no-op that logs "not configured" and returns null/false. This prevents import errors without deleting call sites yet.
- In `app/api/razorpay/webhook/route.ts` and `app/api/mux/webhook/route.ts`: return `Response.json({ disabled: true })` immediately.
- In `isRazorpayConfigured()` and `isMuxConfigured()` in `lib/env.ts`: always return false.



## PART 2 — REMOVE AUTHENTICATION SYSTEM COMPLETELY

The owner does not want any login, signup, dashboard, or auth for public users. Keep admin access only via a simple hardcoded password check (no Supabase auth for admin).

### 2.1 Remove public auth routes
- Delete: `app/(auth)/login/`, `app/(auth)/signup/`, `app/(auth)/reset-password/`, `app/(auth)/layout.tsx`
- Delete: `app/(auth)/actions.ts` — but keep a minimal stub so nothing breaks if imported (export empty async functions that return `{ status: "error", message: "Auth disabled" }`)
- Delete: `app/dashboard/` entirely
- Delete: `app/auth/callback/route.ts`
- Delete: `components/auth/` directory entirely
- Delete: `emails/welcome-email.tsx` — replace with a simple enrollment confirmation email template (see Part 5)

### 2.2 Remove auth from navigation
- In `components/site-header.tsx`: remove Login, Apply now, and Book a call links. Replace with two links: "Courses" (href="/courses") and "Contact" (href="/contact"). Keep mobile menu consistent.
- In `components/site-footer.tsx`: remove Login, Dashboard, Apply, Certificates links from the Learners column. Replace that column with: "Courses" → /courses, "About" → /about, "Blog" → /blog, "Contact" → /contact
- Remove `NotificationBell` component usage everywhere
- Remove `signOutAction` references from admin layout (admin gets its own simple auth — see Part 7)

### 2.3 Remove auth from lib
- In `lib/auth.ts`: keep `getSafeRedirectPath` utility. Remove `getCurrentUser`, `requireAuth`, `requireRole`. Export stubs for `requireAuth` and `requireRole` that redirect to "/" with a console warning, so admin layout still compiles.

### 2.4 Update all pages that redirect to /signup or /login
- In `app/(public)/page.tsx`: change all `href="/signup"` → `href="/courses"` and all `href="/login"` → `href="/contact"`. Change CTA button text from "Apply now" to "Explore Courses". Change "Start your application" to "Get Started".
- In `app/(public)/courses/[slug]/page.tsx`: the enroll panel — remove the two links to /signup and /login. Replace with a single "Enroll Now" button that scrolls to or links to the enrollment form at `/enroll?course={course.slug}`.
- Search entire codebase for `/signup`, `/login`, `/dashboard` hrefs and replace appropriately.



## PART 3 — HOMEPAGE REAL DATA OVERHAUL

### 3.1 Stats strip — remove fake numbers
In `app/(public)/page.tsx` and `lib/demo-data.ts`:

REMOVE entirely:
- "38,000+ Learners mentored" stat card
- "320+ Hiring teams engaged" stat card
- The entire logo cloud section (`<section>` containing "Our learners now work at" and the logoCloud pills)
- The placement marquee section (the full `<section>` with `<MarqueeRow>`)
- The `placementCards` array and all placement card UI in the hero right column
- The `logoCloud` export from `lib/demo-data.ts`

KEEP but update values:
- "Avg career jump" stat — keep the card, update value to "3×" and label to "Average career acceleration"
- "Learner satisfaction" stat — keep, update value to "4.9★" and label to "Learner satisfaction score"

ADD a third stat card (so you have 3 total in a grid-cols-3):
- Icon: Briefcase
- Value: "100%"
- Label: "Placement support provided"
- Color: "#8b5cf6"

### 3.2 Hero section cleanup
- Remove the floating badge cards in the right column (the mini placement cards showing "Ritika S." etc.)
- Replace the right column hero card with a clean "What you get" card showing 4 bullet points:
  1. Industry-expert mentors
  2. Hands-on project work
  3. Resume, mock interviews & referrals
  4. Lifetime community access
- Remove the "Next cohort — May 4" text and all cohort date references
- Update the hero eyebrow pill: change "38,000+ learners transformed" to "Real skills. Real careers."
- Update hero stat pips to only show: Career acceleration 3× | Satisfaction 4.9★ | Placement Support 100% (3 pips total, remove the others)
- Remove the floating badges (-right-5 -bottom-5 "Completion 97%" and "Rating 4.9★")

### 3.3 Mentors section — replace individual mentors
In `app/(public)/page.tsx` the MENTORS section (`id="mentors"`):
- Remove the grid of individual mentor cards entirely
- Replace with a single full-width "buzz" section containing:
  - Badge: "Our Mentors"
  - H2: "Learn from industry professionals who've been there"
  - 3 stat/feature tiles in a row (not individual people):
    1. Icon: Award — "Industry Veterans" — "Working professionals with 5–15 years in top product companies"
    2. Icon: Briefcase — "Real-World Experience" — "Every mentor has shipped production systems used by thousands"  
    3. Icon: Shield — "Privacy Respected" — "Our mentors guide you behind the scenes — your growth is what's front and center"
  - A short paragraph: "We partner with experienced engineers, product leads, and growth professionals who mentor you through structured paths. No celebrities — just people who do this work every day."
- Remove `mentorHighlights` from `lib/demo-data.ts` exports used in this section (keep the type if needed elsewhere)
- Remove mentorColors array from page.tsx

### 3.4 Testimonials section — make easily replaceable
In `lib/demo-data.ts`, restructure the `testimonials` array to have a clear comment above it:
```ts
// ─── REPLACE THESE WITH REAL STUDENT TESTIMONIALS ────────────────────────────
// Each entry: { name: string, role: string, quote: string }
// Add or remove items freely — the grid auto-adjusts.
export const testimonials = [
  { name: "Student Name", role: "Role at Company", quote: "Your testimonial here." },
  { name: "Student Name", role: "Role at Company", quote: "Your testimonial here." },
  { name: "Student Name", role: "Role at Company", quote: "Your testimonial here." },
];
```
Keep 3 placeholder entries so the UI renders. Do NOT use fake Indian names.

### 3.5 Learner journeys / success stories section
- Remove the entire "LEARNER TRANSFORMATIONS" section from homepage (it uses fake before/after data)
- Remove `learnerJourneys` from demo-data.ts

### 3.6 Pricing section — REMOVE ENTIRELY
- Remove the entire PRICING section from homepage
- Remove `pricingPlans` from demo-data.ts
- Do not show any pricing anywhere on the public site

### 3.7 Placement support card in hero area
After the 3 stats strip, add a "Placement Support" highlight card (full width, accent bg) that reads:
- Title: "We don't just teach — we help you land"
- Body: "Every learner gets resume review, mock interviews, referral connections, and career guidance until they reach their goal."
- Icons representing: Resume Help | Mock Interviews | Referrals | Career Connections



## PART 4 — COURSES OVERHAUL (5 REAL COURSES, NO PRICING)

### 4.1 Replace all course data in `lib/demo-data.ts`

Replace `fallbackCourseDetails` and `fallbackCourses` with exactly 5 courses. Remove price_cents display from all UI (set to 0 in data, hide from cards and detail pages). Here are the 5 courses with full content:



**Course 1 — AI & Machine Learning**
```
id: "course-ai-ml-001"
slug: "ai-machine-learning"
title: "AI & Machine Learning"
category: "AI Engineering"
level: "beginner" (to intermediate)
description: "From Python basics to deploying your own ML models and working with Large Language Models — build AI literacy that the industry actually demands."
featured: true
tagline: "The AI course that takes you from zero to job-ready"
outcomes:
  - "Write clean Python for data manipulation and model training"
  - "Understand and apply core ML algorithms with scikit-learn"
  - "Fine-tune and deploy Large Language Models"
  - "Build end-to-end AI pipelines ready for production"
modules:
  1. Python & Data Foundations — Variables, functions, NumPy, Pandas, data cleaning
  2. Machine Learning Fundamentals — Supervised/unsupervised learning, regression, classification, clustering
  3. Deep Learning Basics — Neural networks, backpropagation, CNNs, intro to PyTorch/TensorFlow
  4. Large Language Models — Prompt engineering, RAG systems, fine-tuning, LangChain basics
  5. Deployment & MLOps — Docker, API wrapping, HuggingFace, monitoring basics
tools: ["Python", "NumPy", "Pandas", "scikit-learn", "PyTorch", "LangChain", "HuggingFace", "Docker"]
```

**Course 2 — DevOps Engineering**
```
id: "course-devops-002"
slug: "devops-engineering"
title: "DevOps Engineering"
category: "DevOps"
level: "intermediate"
description: "Master the tools and workflows that power modern software delivery — from Linux fundamentals to Kubernetes orchestration and full CI/CD pipelines."
featured: true
tagline: "Ship faster, break less, sleep better"
outcomes:
  - "Navigate Linux systems and shell scripting with confidence"
  - "Containerize applications with Docker and orchestrate with Kubernetes"
  - "Build automated CI/CD pipelines with GitHub Actions"
  - "Provision and manage cloud infrastructure on AWS/GCP"
modules:
  1. Linux & Shell Mastery — Filesystem, bash scripting, process management, SSH, cron
  2. Docker & Containers — Images, volumes, networking, multi-stage builds, Docker Compose
  3. Kubernetes — Pods, deployments, services, ingress, Helm charts, cluster management
  4. CI/CD Pipelines — GitHub Actions, automated testing, deployment strategies, rollback
  5. Cloud Platforms — AWS EC2/S3/RDS/Lambda, GCP basics, IAM, cost management
  6. Monitoring & Observability — Prometheus, Grafana, log aggregation, alerting
tools: ["Linux", "Bash", "Docker", "Kubernetes", "Helm", "GitHub Actions", "AWS", "GCP", "Prometheus", "Grafana"]
```

**Course 3 — Frontend Development**
```
id: "course-frontend-003"
slug: "frontend-development"
title: "Frontend Development"
category: "Web Development"
level: "beginner"
description: "Build beautiful, performant user interfaces from scratch. Choose your framework path — React, Next.js, Angular, Vue, or SvelteKit — and get Tailwind CSS as a free bonus alongside every track."
featured: true
tagline: "One course. Your framework. Infinite possibilities."
outcomes:
  - "Build responsive, accessible UIs with HTML, CSS, and JavaScript"
  - "Master your chosen framework: React, Next.js, Angular, Vue, or SvelteKit"
  - "Style production-quality interfaces with Tailwind CSS (included free)"
  - "Deploy frontend applications with Vercel, Netlify, or similar"
frameworkOptions: ["React", "Next.js", "Angular", "Vue.js", "SvelteKit"]
bonusAddon: "Tailwind CSS — included free with every frontend track"
modules:
  1. Web Foundations — HTML5, CSS3, Flexbox, Grid, responsive design, accessibility
  2. JavaScript Essentials — ES6+, DOM manipulation, async/await, fetch API, modules
  3. Your Framework Deep Dive — [Chosen framework]: components, routing, state management, data fetching
  4. Tailwind CSS Mastery (Bonus) — Utility-first design, custom themes, dark mode, animations
  5. Build & Deploy — Bundling, optimization, environment config, CI/CD with Vercel
tools: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React / Next.js / Angular / Vue / SvelteKit", "Tailwind CSS", "Vite", "Vercel"]
```

**Course 4 — Backend Development**
```
id: "course-backend-004"
slug: "backend-development"
title: "Backend Development"
category: "Web Development"
level: "beginner"
description: "Learn to architect and build robust server-side systems. Choose your stack — Node.js/Express, Python/FastAPI, Go, or Java/Spring — and build APIs that scale."
featured: false
tagline: "APIs, databases, and systems that hold up under pressure"
outcomes:
  - "Design and build RESTful and GraphQL APIs"
  - "Model databases, write migrations, and optimize queries"
  - "Implement authentication, authorization, and security best practices"
  - "Deploy and monitor backend services in production"
frameworkOptions: ["Node.js + Express", "Python + FastAPI", "Go + Gin", "Java + Spring Boot", "Ruby on Rails"]
modules:
  1. Backend Fundamentals — HTTP, REST principles, request/response lifecycle, status codes
  2. Your Framework Track — [Chosen stack]: routing, middleware, controllers, error handling
  3. Databases & ORMs — PostgreSQL, MySQL, MongoDB; schema design, queries, migrations, Prisma/SQLAlchemy
  4. Authentication & Security — JWT, OAuth2, hashing, HTTPS, rate limiting, input validation
  5. APIs & Integrations — GraphQL, webhooks, third-party APIs, file uploads, queuing basics
  6. Deployment & Scaling — Docker, cloud hosting, environment management, load basics, caching
tools: ["Node.js", "Express / FastAPI / Gin / Spring / Rails", "PostgreSQL", "MongoDB", "Prisma", "Redis", "Docker", "Postman"]
```

**Course 5 — Custom Learning Path**
```
id: "course-custom-005"
slug: "custom-learning-path"
title: "Custom Learning Path"
category: "Custom"
level: "beginner"
description: "Can't find what you're looking for, or want to combine multiple skills? Build your own path. Select any combination of courses, topics, or goals — we'll design a tailored roadmap just for you."
featured: false
tagline: "Your goals. Your pace. Your curriculum."
outcomes:
  - "A personalized roadmap built around your exact career goal"
  - "Mix and match topics across AI, DevOps, Frontend, and Backend"
  - "Dedicated mentor matching based on your chosen stack"
  - "Flexible schedule and checkpoint milestones"
isCustom: true
customFlowDescription: "After clicking Enroll, you'll be able to select from our available courses and topics. You can add multiple tracks to your cart-style selector. We'll reach out to confirm your custom plan within 24 hours."
modules:
  1. Discovery & Goal Setting — 1:1 call to map your current skills and target role
  2. Custom Curriculum Design — We build a week-by-week roadmap just for you
  3. Flexible Module Selection — Pick topics from AI/ML, DevOps, Frontend, Backend
  4. Dedicated Mentor Assignment — Matched to your chosen tech stack
  5. Progress & Checkpoints — Custom milestones aligned to your goals
tools: ["Any from our catalogue", "Custom stack", "Personalized toolset"]
```

### 4.2 Update `getCourseCareerSignal` in demo-data.ts
Replace the 3-entry courseCareerSignals map with entries for all 5 slugs:
- "ai-machine-learning": targetRole "AI/ML Engineer", duration "14 weeks", weeklyCommitment "6–8 hrs/week", delivery "Mentor-led + project builds", projectCount "3 capstone projects", promise (use course description summary), tools (from course above), support ["Weekly mentor sessions", "Project reviews", "Portfolio & career help"]
- "devops-engineering": targetRole "DevOps/Platform Engineer", duration "12 weeks", weeklyCommitment "7–9 hrs/week", similar pattern
- "frontend-development": targetRole "Frontend Developer", duration "10 weeks", weeklyCommitment "5–7 hrs/week", similar
- "backend-development": targetRole "Backend Developer", duration "12 weeks", weeklyCommitment "6–8 hrs/week", similar
- "custom-learning-path": targetRole "Your Target Role", duration "Flexible", weeklyCommitment "Custom", delivery "Fully personalized", projectCount "Custom scope", promise "A path designed around your exact goals", tools ["Personalized to your stack"], support ["Custom mentor", "Tailored milestones", "Direct advisor support"]

### 4.3 Update `categoryStyles` in `components/course/course-card.tsx`
Add entries for "DevOps", "Custom" categories. Keep existing "Web Development", "Programming", "AI Engineering".

### 4.4 Course card UI — REMOVE PRICE
- In `components/course/course-card.tsx`: remove the entire price display block at the bottom (`<p className="text-2xl font-black">{formatCurrency(...)}</p>`). Replace the bottom section with just the "Know More" / "Enroll" button spanning full width.
- Change button text from "Enroll" to "Know More & Enroll →"

### 4.5 Course detail page — REMOVE PRICE, ADD FRAMEWORK SELECTOR, NEW ENROLL FLOW

In `app/(public)/courses/[slug]/page.tsx`:
- Remove the ink-panel enrollment snapshot card entirely (the right column dark card showing price, "one-time cohort fee", etc.)
- Replace the right column with a clean card showing:
  - "What's included" list (from signal.support)
  - For frontend and backend courses: a framework selector UI (radio buttons or pill selects) showing the framework options
  - For the custom course: show a multi-select of available courses/topics with checkboxes
  - An "Enroll Now" button that navigates to `/enroll?course={slug}` (and for frontend/backend, passes the selected framework as a query param: `?course={slug}&track={framework}`)
- Remove all `formatCurrency` and price_cents references from this page
- Remove `review_count` and `average_rating` display (these are all new courses with no reviews yet — just remove those lines)
- Keep the curriculum/modules section
- Keep the outcomes section
- For the instructor card: replace with "Industry Expert Mentor" generic card — title "Your Mentor", body "You'll be matched with an experienced industry professional specialized in this track. Our mentors are working professionals — not just teachers."

### 4.6 Courses catalogue page
- In `app/(public)/courses/page.tsx`: remove price from the signal card. Remove the sort by price options from the Select. Keep sort by newest and rating only. Update catalogSignals to remove price references.



## PART 5 — ENROLLMENT FLOW (NEW FEATURE)

### 5.1 Supabase table for enrollments
Create a new file `supabase/enrollment-schema.sql` with:
```sql
create table if not exists enrollment_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  course_slug text not null,
  course_name text not null,
  selected_track text, -- for frontend/backend framework choice or custom selections
  background_level text not null,
  preferred_start_date text,
  additional_info text,
  created_at timestamptz not null default now()
);
alter table enrollment_requests enable row level security;
create policy "admin full access enrollment_requests"
on enrollment_requests for all
using (true); -- admin client only, no public RLS needed
```

Also add to `supabase/enrollment-schema.sql` a table for contact form:
```sql
create table if not exists contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);
alter table contact_submissions enable row level security;
create policy "admin full access contact_submissions"
on contact_submissions for all
using (true);
```

### 5.2 Create enrollment page `app/(public)/enroll/page.tsx`
This page has a smooth two-panel layout:
- Left panel: shows the selected course summary (title, tagline, what's included, track selected if applicable, and for custom — the selected topics)
- Right panel: the enrollment form

Form fields (use React Hook Form + Zod):
1. Full Name (required)
2. Email (required, email validation)
3. Phone (required, min 10 digits)
4. Selected Course (pre-filled from query param, shown as read-only badge — not editable)
5. Selected Track (shown only for frontend/backend courses, pre-filled from query param, shown as read-only badge)
6. For custom course only: show a multi-select checklist of the other 4 courses with their subtopics, so the student can pick what they want bundled
7. Current Background / Experience Level (dropdown: "Complete Beginner" | "Some coding experience" | "Working professional switching careers" | "Developer upskilling")
8. Preferred Start Date (text input, placeholder "e.g. Immediately, Next month, June 2025")
9. Anything else you'd like us to know (textarea, optional)

On submit:
- Validate with Zod
- Insert into Supabase `enrollment_requests` table using the admin client (service role)
- Send confirmation email to student (see 5.3)
- Show a success state on the same page: "🎉 You're in! We've received your enrollment request. Our team will reach out to {email} within 24 hours."
- Do NOT redirect anywhere, just show the success state in place of the form

Create `app/(public)/enroll/actions.ts` as a server action for this.

### 5.3 Enrollment confirmation email
Create `emails/enrollment-confirmation.tsx`:
```tsx
type EnrollmentConfirmationProps = {
  studentName: string;
  courseName: string;
  selectedTrack?: string;
};
// Simple HTML email:
// Subject: "You're enrolled at Augment Skills Academy 🎉"  
// Body: Thank you {name}! We received your enrollment for {course} {track if present}.
//       Our team will reach out within 24 hours to confirm your spot and share next steps.
//       Reply to this email if you have questions.
//       Team at Augment Skills Academy | augmentskillacademy@gmail.com
```

In `app/(public)/enroll/actions.ts`, after saving to Supabase, attempt to send via Resend. If Resend is not configured, skip silently (try/catch). From: augmentskillacademy@gmail.com (or RESEND_FROM_EMAIL env var). To: student email.

### 5.4 Course detail page enroll button
Update the "Enroll Now" button in `app/(public)/courses/[slug]/page.tsx` to link to `/enroll?course={course.slug}`.



## PART 6 — CONTACT FORM OVERHAUL

### 6.1 Update contact form server action `app/(public)/contact/actions.ts`
- Remove Resend email sending entirely from this action
- Instead, save to Supabase `contact_submissions` table using admin client
- Return success message: "Thanks for reaching out! We'll get back to you at {email} within 24 hours."
- Attempt to send a simple confirmation email to the submitter via Resend (if configured): "We got your message! The Augment Skills Academy team will be in touch soon. — augmentskillacademy@gmail.com". Subject: "We received your message — Augment Skills Academy". If Resend fails, silently continue.

### 6.2 Update contact form fields `components/contact/contact-form.tsx`
- Remove "Company" field
- Keep: Name, Email, Message
- Message placeholder: "Tell us about your goals, which course you're interested in, or any questions you have..."
- Update Zod schema accordingly

### 6.3 Update contact page copy `app/(public)/contact/page.tsx`
- Title: "Get in touch with us"
- Subtitle: "Whether you have questions about a course, need guidance on which path suits you, or want to explore partnership opportunities — we're here."
- Remove the enterprise-focused card items. Replace with:
  1. "Course guidance — not sure which track is right for you?"
  2. "Enrollment support — need help with the process?"
  3. "Partnerships & collaborations — let's work together"



## PART 7 — ADMIN PANEL (SIMPLE, NO SUPABASE AUTH)

### 7.1 Simple admin auth
Create `app/admin/auth.ts`:
- Export `ADMIN_PASSWORD` = process.env.ADMIN_PASSWORD ?? "admin123" (to be changed via env)
- Export `isAdminAuthenticated(request: Request): boolean` — checks a cookie named "admin_session" equals a hashed value of ADMIN_PASSWORD
- Export `createAdminSession()` — returns a cookie string

Create `app/admin/login/page.tsx`:
- Simple centered form: Password input + "Enter Admin" button
- Server action that checks password against env var, sets an httpOnly cookie "admin_session" with a simple HMAC of the password, then redirects to /admin
- If wrong password, show error

Update `app/admin/layout.tsx`:
- Remove `requireRole` import and call
- Instead call `isAdminAuthenticated` — if false, redirect to /admin/login
- Remove sign out form (replace with a simple link: `<a href="/admin/logout">Sign out</a>`)

Create `app/admin/logout/route.ts`:
- GET handler that clears the admin_session cookie and redirects to /admin/login

### 7.2 Rebuild admin overview page `app/admin/page.tsx`

Remove ALL revenue, coupon, course catalogue display. Replace with 3 focused sections:

**Section 1 — Enrollment Requests** (most important, show first)
- Fetch all rows from `enrollment_requests` table, order by created_at DESC
- Show as a clean table/card list with columns: Name, Email, Phone, Course, Track, Background, Start Date, Notes, Submitted At
- Add a small badge showing total count: "X enrollment requests"
- Each row should show full data, not truncated
- If Supabase not configured, show a placeholder message

**Section 2 — Contact Submissions**
- Fetch all rows from `contact_submissions`, order by created_at DESC  
- Show as card list: Name, Email, Message preview (first 100 chars), Submitted At
- Clicking a card expands to show full message

**Section 3 — Student/Enrollment Summary**
- Show a simple summary: Total enrollments, courses breakdown (how many per course slug), most recent 5 enrollments
- Show this as a stat strip + small table

Remove KpiCard revenue/payment/coupon/review references entirely. Keep the KpiCard component but only use it for: "Total Enrollments", "Contact Messages", "This Week's Enrollments".

### 7.3 Admin layout cleanup
- Change header text from "Admin portal" to "Augment Skills Academy — Admin"
- Remove "Student view" nav link (no dashboard exists)
- Add nav links: "Enrollments", "Contact Messages"



## PART 8 — BLOG — REPLACE WITH REAL INFORMATIONAL CONTENT

Replace both MDX files in `content/posts/` with 5 new articles (keep MDX format). Keep the existing 2 but update them. Add 3 new ones:

**Keep & update:**
1. `content/posts/ship-full-stack-skill-systems.mdx` — Update to be genuinely informational: "How to Choose the Right Tech Stack for Your Career in 2025" — real advice on frontend vs backend vs DevOps vs AI paths, what industries hire for each, how to decide.

2. `content/posts/from-notes-to-portfolio.mdx` — Update to: "How to Build a Portfolio That Gets You Hired (Without Fake Projects)" — real advice on making portfolio projects meaningful, what recruiters look for, GitHub hygiene.

**Add 3 new:**
3. `content/posts/ai-ml-career-roadmap.mdx`
   - Title: "The Complete AI/ML Career Roadmap for Beginners in 2025"
   - Category: AI Engineering
   - Author: Augment Skills Academy
   - readingTime: 8 min read
   - Real content: Python → data → ML → DL → LLMs learning path, tools needed, job titles available, salary ranges in India, what companies hire for

4. `content/posts/devops-vs-cloud-engineer.mdx`
   - Title: "DevOps vs Cloud Engineer: What's the Difference and Which Should You Become?"
   - Category: DevOps
   - Author: Augment Skills Academy
   - readingTime: 6 min read
   - Real content: Roles comparison, skills overlap, career paths, tools each uses, which pays more, how to transition into either

5. `content/posts/frontend-framework-comparison-2025.mdx`
   - Title: "React vs Next.js vs Vue vs Angular vs SvelteKit: Which Should You Learn in 2025?"
   - Category: Web Development
   - Author: Augment Skills Academy
   - readingTime: 7 min read
   - Real content: Honest comparison of each framework, job market demand, learning curve, use cases, recommendation by career goal

Write REAL, substantive content for each article — not placeholder text. Minimum 400 words per article.

### 8.1 Update blog page copy `app/(public)/blog/page.tsx`
- Title: "Learning Resources & Career Guides"
- Subtitle: "Practical guides, career roadmaps, and tech deep-dives to help you make smarter decisions about your learning path."



## PART 9 — ABOUT PAGE CLEANUP

In `app/(public)/about/page.tsx`:
- Remove `mentorHighlights` import and the mentors/testimonials sections that use fake data
- Update hero title: "Building real careers through real skills"
- Update hero description: "Augment Skills Academy was built because we saw too many learners stuck between endless tutorials and actual employment. We bridge that gap with structured paths, hands-on projects, and mentors who've walked the same road."
- Keep the values section (update the values text to be genuine — remove "Production-grade learning" and replace with values that match a mentorship-first academy)
- Updated values:
  1. Outcome-first design (keep, reword body slightly)
  2. Mentor-led growth — "Every learner is guided by a real professional who reviews your work, answers your doubts, and helps you build a career strategy — not just finish a course."
  3. Portfolio-ready proof (keep)
  4. Community & accountability — "Learning alone is hard. Our cohorts keep you in a room with peers, mentors, and a support system that keeps you moving."
- Keep the "How we teach" card, update the bullet list to remove production-system-specific items and replace with mentor-focused ones
- Remove the "What teams use us for" card — replace with a "What you get" card listing: Resume help, Mock interviews, Referral network, Career guidance, Community
- Keep stats strip but use only: Career acceleration 3× | Satisfaction 4.9★ | Placement Support 100%
- Keep the CTA section at bottom



## PART 10 — FAQ UPDATE

In `lib/demo-data.ts`, replace `academyFaqs` with:
```ts
export const academyFaqs = [
  {
    question: "Who are these courses designed for?",
    answer: "Anyone who wants to build a real tech career — whether you're a complete beginner, someone switching fields, or a working professional looking to upskill. We have beginner-friendly paths and advanced tracks to match your starting point.",
  },
  {
    question: "Do I need prior coding experience?",
    answer: "For most of our courses, no. Our AI/ML, Frontend, and Backend tracks start from the very basics. DevOps assumes some familiarity with computers but no coding experience required. We guide you step by step.",
  },
  {
    question: "How does the mentorship work?",
    answer: "You'll be assigned a dedicated industry mentor who reviews your projects, answers questions, and holds regular check-ins throughout your course. This isn't automated — it's a real person invested in your progress.",
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
    answer: "If you want to combine topics across our courses — say, AI + Backend, or DevOps + Frontend — or if you have a very specific career goal, we'll design a personalized roadmap just for you. Select your topics during enrollment and our team will reach out to finalize your custom plan.",
  },
  {
    question: "How long do the courses take?",
    answer: "AI/ML and DevOps take about 12–14 weeks at 6–8 hours per week. Frontend and Backend take 10–12 weeks. The Custom path is fully flexible based on your goals and availability.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes. If you're not satisfied within the first 7 days of starting your course, we'll give you a full refund — no questions asked.",
  },
];
```



## PART 11 — CLEANUP & CONSISTENCY PASS

### 11.1 Remove unused imports and exports
After all changes:
- Remove `marketingStats` entries for "38k+" and "320+" from demo-data.ts (or comment out and update values)
- Remove `proofHighlights`, `contactHighlights`, `logoCloud` exports if no longer used
- Remove `pricingPlans` export entirely
- Remove `learnerJourneys` export entirely
- Clean up any unused imports in page files (ArrowRight, Users, Trophy, Briefcase, etc. that are no longer rendered)
- Remove `app/api/notifications/route.ts` or stub it to return `[]` (no auth, no notifications)
- Remove `components/dashboard/` directory entirely
- Remove `app/api/razorpay/` and `app/api/mux/` webhook handlers (stub to return disabled)

### 11.2 Middleware
Update `middleware.ts` (root level) — remove any auth redirects. It should only call `updateSession` from `lib/supabase/middleware.ts` for cookie refresh purposes but NOT redirect unauthenticated users anywhere. The only protected path is `/admin` which handles its own auth.

### 11.3 Update `lib/env.ts`
Make the schema: SUPABASE vars required (keep). ADMIN_PASSWORD optional. RESEND_API_KEY and RESEND_FROM_EMAIL optional (use `.optional()`). Remove RAZORPAY_*, MUX_*, GOOGLE_* from required fields — make all optional. Add: `ADMIN_PASSWORD: z.string().min(1).optional()`.

### 11.4 Course slug routing
Since we changed slugs, update the seed file `supabase/seed.sql` to use the new 5 courses with their correct slugs and data. Remove the old 3 courses from seed.

### 11.5 `generateStaticParams` or `revalidate`
In `app/(public)/courses/[slug]/page.tsx` add:
```ts
export async function generateStaticParams() {
  return [
    { slug: "ai-machine-learning" },
    { slug: "devops-engineering" },
    { slug: "frontend-development" },
    { slug: "backend-development" },
    { slug: "custom-learning-path" },
  ];
}
```

### 11.6 Navigation update
In `components/site-header.tsx` links array, remove `/#mentors` and `/#outcomes` anchors since those sections changed. Update to:
```ts
const links = [
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
```

### 11.7 `app/(public)/courses/[slug]/page.tsx` — framework/track UI
For the courses with framework choices (frontend-development, backend-development), add a `FrameworkSelector` client component that:
- Shows as a row of pill buttons
- Updates the URL query param `?track=react` without a page reload (use `useRouter` and `useSearchParams`)
- Passes selected track to the Enroll button href
- Defaults to first option if none selected

For custom-learning-path, show a `CustomCourseSelector` client component:
- Checkboxes for each of the other 4 courses
- Checkboxes for major subtopics from each
- Selected items are passed to `/enroll?course=custom-learning-path&selections=ai-machine-learning,frontend-development` etc.



## PART 12 — TYPES CLEANUP

In `types/index.ts`:
- Remove `PaymentRecord`, `Coupon` types if no longer used in admin
- Add new type:
```ts
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
  message: string;
  created_at: string;
};
```



## EXECUTION ORDER

1. Start with `lib/env.ts` — make all third-party env vars optional
2. Update `lib/demo-data.ts` — replace all course data, remove unused exports, update FAQs, testimonials
3. Update `lib/courses.ts` — ensure it still works with new course slugs
4. Remove auth: delete auth routes, update header/footer nav, update lib/auth.ts
5. Update homepage `app/(public)/page.tsx`
6. Update courses pages
7. Create enrollment page and action
8. Update contact form
9. Build admin panel
10. Update blog MDX files
11. Update about page
12. Final cleanup pass — unused imports, broken references, type errors

Run `npm run typecheck` after each major section. Fix all type errors before moving on. Do not leave `any` types.

After all changes, the site should run cleanly with only NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY set, with everything else gracefully degrading.
