Build a production-ready, full-stack course selling website for a Tech & Programming education company. Follow all best practices listed below strictly.

---

TECH STACK:
- Framework: Next.js 14 (App Router, Server Components, Server Actions)
- Styling: Tailwind CSS + shadcn/ui
- Database + Auth + Storage: Supabase
  - PostgreSQL via Supabase (use Supabase client, not Prisma)
  - Supabase Auth (email/password + Google OAuth + magic link)
  - Supabase Storage for thumbnails, PDFs, and attachments
- Video hosting: Mux (upload, stream, signed playback URLs)
- Payments: Razorpay (one-time course purchase + monthly/annual all-access subscription)
- Email: Resend with React Email templates
- Certificate generation: React-PDF (@react-pdf/renderer)
- Form handling: React Hook Form + Zod validation
- Server state: Tanstack Query (React Query) for client-side data fetching
- Deployment: Vercel (with edge functions where applicable)

---

BEST PRACTICES TO FOLLOW:

Architecture:
- Use Next.js Server Components by default; use Client Components only where interactivity is needed
- Use Server Actions for all form submissions and mutations
- Colocate components with their routes under /app
- Keep business logic in /lib, not in components
- Use environment variables for all secrets — never hardcode
- Use Row Level Security (RLS) in Supabase for all tables
- Validate all inputs on both client (Zod + React Hook Form) and server (Zod in Server Actions)

Performance:
- Use Next.js Image component for all images
- Lazy load below-the-fold content
- Use ISR (revalidatePath / revalidateTag) for course catalogue pages
- Stream long server-rendered pages using React Suspense + loading.tsx
- Use Tanstack Query for client-side caching and background refetching

Security:
- Role-based access control: student, instructor, admin (stored in Supabase user metadata)
- Protect all /dashboard and /admin routes using Next.js middleware
- Use Mux signed playback URLs — never expose raw video URLs to students who haven't paid
- Rate-limit auth endpoints using Supabase's built-in rate limiting
- Sanitise all user-generated content (reviews, bios) before rendering

Code quality:
- TypeScript strictly throughout — no `any` types
- Define shared types in /types/index.ts
- Use absolute imports (@/components, @/lib, etc.)
- Consistent error handling — use try/catch in all Server Actions, return typed error objects
- Keep components small and single-responsibility

---

PAGES & FEATURES:

1. PUBLIC PAGES
   - Home: hero, featured courses, stats, testimonials, footer with newsletter signup
   - Course catalogue: search (full-text via Supabase), filter by category/level/price, sort
   - Course detail: curriculum accordion, instructor bio, reviews + ratings, enroll CTA, free preview lesson
   - Blog/Resources (MDX-based, good for SEO)
   - About & Contact pages
   - Dynamic sitemap.xml + robots.txt
   - Open Graph metadata per course page

2. AUTH (via Supabase Auth)
   - Sign up / Login / Magic link / Google OAuth
   - Email verification
   - Forgot password / Reset password
   - Middleware-protected routes

3. STUDENT DASHBOARD
   - My courses: enrolled, in-progress, completed
   - Course player:
     - Mux video player with signed playback token
     - Lesson sidebar with completion checkboxes
     - PDF/resource downloads per lesson
     - Code snippet display (syntax highlighted)
     - Notes per lesson (saved to Supabase)
     - Prev/Next navigation
   - Progress tracking per course and per module (stored in Supabase)
   - Certificate download on 100% completion (generated with React-PDF, unique ID stored in DB)
   - Bookmarks

4. PAYMENTS (Razorpay)
   - Buy individual course (one-time)
   - All-access subscription (monthly + annual with discount)
   - Razorpay Checkout session + webhook to unlock course on payment success
   - Subscription management portal (Razorpay)
   - Coupon / promo code support
   - Purchase receipt email via Resend

5. CERTIFICATES
   - Auto-generated with React-PDF on 100% course completion
   - Fields: student name, course name, completion date, unique certificate ID, company logo
   - Public verification page: /certificates/[id]
   - Downloadable as PDF

6. REVIEWS & RATINGS
   - Post review after completing at least 30% of a course
   - Star rating + written review
   - Average rating + count on course detail page
   - Admin moderation (approve / delete)

7. ADMIN PORTAL (/admin — role-gated via middleware)
   - Dashboard: KPI cards (total revenue, enrollments, active students, courses), revenue chart (Recharts)
   - Course management: create/edit/delete courses; add/reorder modules + lessons; upload video to Mux; attach PDFs
   - Student management: list, search, view enrollment history, manually enroll/unenroll
   - Revenue reports: filter by date range, export CSV
   - Review moderation
   - Coupon management: create discount codes (% or fixed), set expiry + usage limits
   - Email broadcast: send to all students or by course cohort via Resend

8. NOTIFICATIONS
   - In-app notification bell (Supabase real-time)
   - Email notifications via Resend + React Email:
     - Welcome email on signup
     - Purchase receipt
     - New lesson published (for enrolled students)
     - Certificate ready

---

DATABASE (Supabase PostgreSQL):
Tables with RLS policies:
- profiles (extends auth.users)
- courses
- modules
- lessons
- enrollments
- progress
- certificates
- reviews
- payments
- coupons
- notifications
- posts (for blog/MDX metadata)

Enable RLS on every table. Write policies for: public read on courses/lessons (free preview), authenticated read on enrolled content, admin full access.

---

FOLDER STRUCTURE:
/app
  /(public)         — home, catalogue, course detail, blog
  /(auth)           — login, signup, reset-password
  /dashboard        — student dashboard, player, certificates
  /admin            — admin portal
  /api              — Razorpay webhook, Mux webhook
/components
  /ui               — shadcn/ui base components
  /course           — course card, curriculum, player
  /dashboard        — progress bar, certificate card
  /admin            — data tables, charts
/lib
  /supabase         — client.ts, server.ts, middleware.ts
  /razorpay         — client.ts, webhooks.ts
  /mux              — client.ts, upload.ts, tokens.ts
  /resend           — client.ts, email templates
  /pdf              — certificate.tsx (React-PDF component)
/types
  index.ts          — all shared TypeScript types
/hooks              — custom React hooks
/emails             — React Email templates

---

DESIGN:
- Clean, modern UI inspired by Linear + Vercel aesthetic
- Dark mode support (next-themes)
- Fully responsive, mobile-first
- Inter font via next/font
- Primary color: Indigo/Violet; neutral: zinc grays
- Smooth page transitions with Framer Motion (subtle, not excessive)

---

DELIVERABLES:
- Complete working TypeScript codebase
- Supabase schema SQL file with RLS policies
- Supabase seed SQL with sample courses, lessons, users
- .env.example with every required variable documented
- README.md: local setup, Supabase config, Razorpay webhook setup, Mux setup, deployment to Vercel
- Razorpay webhook handler fully wired for checkout and subscription payment events
- Mux webhook handler (video.asset.ready)

---

Build order:
1. Project scaffold, dependencies, folder structure, TypeScript config
2. Supabase schema + RLS policies + seed data
3. Auth flows (signup, login, OAuth, middleware)
4. Public pages (home, catalogue, course detail)
5. Razorpay integration (checkout, webhooks, subscription portal)
6. Student dashboard + Mux video player
7. Progress tracking + certificates (React-PDF)
8. Admin portal
9. Email notifications (Resend + React Email)
10. SEO, performance optimisations, final polish