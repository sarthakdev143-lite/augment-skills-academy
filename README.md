# Augment Skills Academy

Marketing site and lightweight course operations app built with Next.js 16, Supabase, Tailwind CSS v4, Resend, Razorpay, Mux, MDX, and React PDF.

## What is in this repo

- Public pages for home, courses, course details, contact, about, blog, and enrollment
- Admin area protected by a simple password flow
- Supabase-backed enrollment, contact, certificate, and admin data flows
- Optional integrations for Razorpay, Mux, Resend, and Google OAuth
- Local MDX blog content in `content/posts`
- SQL schema and seed files under `supabase/`

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- Supabase SSR + `@supabase/supabase-js`
- Zod + React Hook Form
- Resend + React Email
- Razorpay and Mux integration helpers

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.examples` to `.env.local`.
3. Set the required Supabase values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Optional but recommended:
   - set `NEXT_PUBLIC_APP_URL=http://localhost:3000`
   - set `ADMIN_PASSWORD` for admin access
5. Apply the database scripts in Supabase:
   - `supabase/schema.sql`
   - `supabase/enrollment-schema.sql`
   - `supabase/seed.sql`
6. Start the app with `npm run dev`.

The app is designed to start with only the Supabase keys configured. Payment, video, and email features degrade when their providers are not configured.

## Environment variables

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Common optional values:

- `NEXT_PUBLIC_APP_URL`
- `ADMIN_PASSWORD`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `SUPPORT_EMAIL`
- `RAZORPAY_*`
- `MUX_*`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

See `.env.examples` for the full template.

## Integration notes

Supabase:

- Browser and server clients live in `lib/supabase/`.
- Contact and enrollment submissions are stored in Supabase.
- Certificates render from the Supabase-backed data model.

Resend:

- Enrollment confirmation email uses `emails/enrollment-confirmation.tsx`.
- Contact and enrollment actions attempt to send email, but fail silently when Resend is not configured.

Razorpay:

- Webhook handler lives at `app/api/razorpay/webhook/route.ts`.
- Add your key, secret, webhook secret, and plan IDs before enabling checkout flows.

Mux:

- Webhook handler lives at `app/api/mux/webhook/route.ts`.
- Add both API credentials and playback signing credentials before enabling protected video playback.

## Commands

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Project structure

- `app/(public)` public-facing routes
- `app/admin` admin pages and auth gate
- `app/api` webhook and API routes
- `components` shared UI and feature components
- `content/posts` MDX blog content
- `emails` transactional email templates
- `lib` integrations and domain helpers
- `supabase` SQL schema and seed files
