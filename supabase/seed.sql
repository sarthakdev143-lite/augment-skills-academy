insert into courses (id, slug, title, description, price_cents, category, level, featured, published)
values
  ('11111111-1111-1111-1111-111111111111', 'nextjs-production', 'Next.js in Production', 'Build and deploy resilient Next.js products.', 9900, 'Web Development', 'intermediate', true, true),
  ('22222222-2222-2222-2222-222222222222', 'typescript-foundations', 'TypeScript Foundations', 'Type-safe engineering patterns for modern teams.', 7900, 'Programming', 'beginner', true, true),
  ('66666666-6666-6666-6666-666666666666', 'ai-product-systems', 'AI Product Systems', 'Design and ship AI features with evals, guardrails, and cost-aware workflows.', 12900, 'AI Engineering', 'advanced', true, true)
on conflict (id) do nothing;

insert into modules (id, course_id, title, position)
values
  ('33333333-3333-3333-3333-333333333331', '11111111-1111-1111-1111-111111111111', 'Foundation', 1),
  ('33333333-3333-3333-3333-333333333332', '11111111-1111-1111-1111-111111111111', 'Scaling the product', 2),
  ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Type system essentials', 1),
  ('33333333-3333-3333-3333-333333333334', '66666666-6666-6666-6666-666666666666', 'Architecture and quality', 1)
on conflict (id) do nothing;

insert into lessons (
  id,
  course_id,
  module_id,
  title,
  position,
  content_md,
  is_preview,
  duration_seconds,
  attachment_url
)
values
  ('44444444-4444-4444-4444-444444444441', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333331', 'Platform tour', 1, 'Map the system before shipping into it.', true, 420, null),
  ('44444444-4444-4444-4444-444444444443', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333331', 'App Router mental model', 2, 'Understand layouts, loading states, and route groups.', true, 780, null),
  ('44444444-4444-4444-4444-444444444442', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333332', 'Server actions and RLS', 1, 'Protect mutations and data access with typed server logic.', false, 780, null),
  ('44444444-4444-4444-4444-444444444445', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'Literal types and narrowing', 1, 'Use discriminated unions and safer state modeling.', true, 540, null),
  ('44444444-4444-4444-4444-444444444446', '66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333334', 'Eval loops that teams actually maintain', 1, 'Treat evals like product assets, not one-off demos.', true, 660, null)
on conflict (id) do nothing;

insert into posts (
  id,
  slug,
  title,
  description,
  category,
  author,
  reading_time,
  published_at,
  published
)
values
  ('77777777-7777-7777-7777-777777777771', 'ship-full-stack-skill-systems', 'Ship Skill Systems, Not Just Courses', 'How we design outcomes-first curricula that map directly to production work.', 'Curriculum', 'Aarav Menon', '6 min read', '2026-03-10', true),
  ('77777777-7777-7777-7777-777777777772', 'from-notes-to-portfolio', 'From Lesson Notes to Portfolio Evidence', 'A practical framework for turning notes into proof of work.', 'Career Growth', 'Naina Shah', '4 min read', '2026-03-24', true)
on conflict (id) do nothing;

insert into coupons (code, discount_type, discount_value, max_uses, active)
values
  ('WELCOME20', 'percent', 20, 500, true),
  ('SPRING500', 'fixed', 500, 200, true),
  ('ANNUAL1000', 'fixed', 1000, 120, true)
on conflict (code) do nothing;

-- To seed sample users and enrollments:
-- 1. Create learners through Supabase Auth.
-- 2. Insert matching rows into `profiles`.
-- 3. Add `enrollments`, `progress`, `lesson_notes`, and `bookmarks` for those profile IDs.
