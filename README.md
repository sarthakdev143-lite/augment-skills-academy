# Augment Skills Academy

Production-ready course platform starter built with Next.js App Router, Supabase, Razorpay, Mux, Resend, React Email, and React-PDF.

## What is included

- Public marketing site with home, catalogue, course detail, about, contact, and MDX-backed resources pages
- Supabase-backed auth flows for email/password, Google OAuth, magic link, and password reset
- Middleware-style request protection using `proxy.ts` for `/dashboard` and `/admin`
- Student dashboard, course player shell, notifications API, and certificate verification page
- Admin overview with revenue, enrollments, reviews, and coupon snapshots
- Supabase SQL schema and seed files
- Razorpay and Mux webhook route handlers

## Stack

- Next.js 16 App Router with Server Components and Server Actions
- Tailwind CSS v4 and reusable UI primitives in `components/ui`
- Supabase for PostgreSQL, Auth, and Storage integration points
- Razorpay for checkout and billing webhooks
- Mux for uploads and signed playback token plumbing
- Resend + React Email for transactional email
- React Hook Form + Zod for client/server form validation
- TanStack Query for client-side notifications fetching

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill every required value.
3. Create a Supabase project and run:
   - `supabase/schema.sql`
   - `supabase/seed.sql`
4. In Supabase Auth:
   - enable Email/Password
   - enable Magic Link / OTP
   - enable Google OAuth and set the callback URL to `http://localhost:3000/auth/callback`
5. Start the app with `npm run dev`.

## Supabase notes

- `profiles`, `courses`, `modules`, `lessons`, `enrollments`, `progress`, `certificates`, `reviews`, `payments`, `coupons`, `notifications`, `posts`, `lesson_notes`, and `bookmarks` are defined in `supabase/schema.sql`.
- Row Level Security is enabled on every table.
- The app uses the SSR server client in `lib/supabase/server.ts` and request-syncing logic in `lib/supabase/middleware.ts`.
- The `auth` callback route exchanges OAuth and magic-link codes at `/auth/callback`.

## Razorpay setup

1. Create products and prices for:
   - one-time course purchase
   - monthly all-access subscription
   - annual all-access subscription
2. Add the resulting plan IDs to `.env.local`.
3. Forward Razorpay webhooks to `http://localhost:3000/api/razorpay/webhook`.
4. Make sure payment and subscription events are enabled for your use case.

## Mux setup

1. Create API credentials and a signing key in Mux.
2. Add both the API token pair and playback signing credentials to `.env.local`.
3. Point the Mux webhook to `http://localhost:3000/api/mux/webhook`.
4. Enable `video.asset.ready`.

## Email setup

- Configure Resend API credentials in `.env.local`.
- `emails/welcome-email.tsx` is used for signup email delivery.
- `app/(public)/contact/actions.ts` sends contact submissions to `SUPPORT_EMAIL`.

## Build and verification

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Deployment

1. Import the repo into Vercel.
2. Set all environment variables from `.env.example`.
3. Update Supabase, Razorpay, Google OAuth, and Mux callback/webhook URLs to the production domain.
4. Deploy with `next build`.

## Project structure

- `app/(public)` public-facing pages
- `app/(auth)` auth flows
- `app/dashboard` student experience
- `app/admin` admin experience
- `app/api` webhooks and client data endpoints
- `lib` business logic and integration helpers
- `components` UI and feature components
- `emails` transactional email templates
- `content/posts` local MDX resources
