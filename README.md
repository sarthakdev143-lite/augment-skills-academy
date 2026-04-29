# Augment Skills Academy

Mentor-led academy site and lightweight operations app built with Next.js 16, Supabase, Tailwind CSS v4, Resend, MDX, and React PDF.

## What this repo contains

- Public marketing pages for home, courses, course details, about, contact, blog, and enrollment
- A simple password-protected admin area for enrollment requests and contact submissions
- Supabase-backed enrollment and contact flows
- Local MDX blog content in `content/posts`
- SQL schema and seed files under `supabase/`

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- Supabase SSR + `@supabase/supabase-js`
- Zod + React Hook Form
- Resend + React Email
- MDX blog content

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.examples` to `.env.local`.

3. Set the required values:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

4. Optional values:

- `ADMIN_PASSWORD`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `SUPPORT_EMAIL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

5. Apply the SQL files in Supabase:

- `supabase/schema.sql`
- `supabase/enrollment-schema.sql`
- `supabase/seed.sql`

6. Start the app:

```bash
npm run dev
```

## Environment variables

Required:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional:

- `ADMIN_PASSWORD`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `SUPPORT_EMAIL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

See [.env.examples](./.env.examples) for the current template.

## Product notes

- Public users do not have login, signup, or dashboard flows.
- Course enrollment happens through `/enroll` and writes to `enrollment_requests`.
- Contact form submissions write to `contact_submissions`.
- Admin access uses a simple password cookie flow under `/admin`.
- Resend is optional. Contact and enrollment emails fail silently if it is not configured.

## Commands

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Production launch checklist

1. Run `npm run lint`, `npm run typecheck`, and `npm run build` locally before deploying.
2. In Supabase SQL Editor, run:
   - `supabase/schema.sql`
   - `supabase/enrollment-schema.sql`
   - `supabase/seed.sql` only if you want the demo seed content
3. Set production environment variables on your host:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `SUPPORT_EMAIL` if you want email delivery and fallback routing
4. Verify these public flows in the deployed app:
   - `/admin/login` loads and `/admin` redirects there when signed out
   - `/contact` submits successfully
   - `/enroll?course=<slug>` submits successfully
   - submissions appear in `/admin`
5. If the admin page shows a schema warning, the website is not ready for launch yet. Apply the missing SQL in Supabase first.

## Project structure

- `app/(public)` public-facing routes
- `app/admin` admin auth and admin pages
- `app/api` minimal API routes
- `components` shared UI and feature components
- `content/posts` MDX blog content
- `emails` transactional email templates
- `lib` app helpers and Supabase utilities
- `supabase` SQL schema and seed files
