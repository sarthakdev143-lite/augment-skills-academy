create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text not null default 'student' check (role in ('student', 'instructor', 'admin')),
  bio text,
  created_at timestamptz not null default now()
);

create table if not exists courses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text not null,
  price_cents integer not null default 0,
  thumbnail_url text,
  category text not null,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  featured boolean not null default false,
  published boolean not null default false,
  instructor_id uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists modules (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  position integer not null default 0
);

create table if not exists lessons (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references courses(id) on delete cascade,
  module_id uuid not null references modules(id) on delete cascade,
  title text not null,
  position integer not null default 0,
  mux_asset_id text,
  mux_playback_id text,
  content_md text,
  is_preview boolean not null default false,
  duration_seconds integer,
  attachment_url text
);

create table if not exists enrollments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  source text not null default 'purchase',
  created_at timestamptz not null default now(),
  unique(user_id, course_id)
);

create table if not exists progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

create table if not exists certificates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  completion_date date not null default current_date,
  pdf_url text,
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  body text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  course_id uuid references courses(id) on delete set null,
  stripe_session_id text unique not null,
  stripe_customer_id text,
  amount_cents integer not null default 0,
  currency text not null default 'usd',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists coupons (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  discount_type text not null check (discount_type in ('percent', 'fixed')),
  discount_value integer not null,
  max_uses integer,
  used_count integer not null default 0,
  expires_at timestamptz,
  active boolean not null default true
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text not null,
  category text not null default 'Resources',
  author text not null default 'Augment Skills Academy',
  reading_time text not null default '5 min read',
  published_at date not null default current_date,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists lesson_notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

create table if not exists bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

alter table profiles enable row level security;
alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table enrollments enable row level security;
alter table progress enable row level security;
alter table certificates enable row level security;
alter table reviews enable row level security;
alter table payments enable row level security;
alter table coupons enable row level security;
alter table notifications enable row level security;
alter table posts enable row level security;
alter table lesson_notes enable row level security;
alter table bookmarks enable row level security;

create index if not exists idx_courses_slug on courses (slug);
create index if not exists idx_courses_published_category on courses (published, category);
create index if not exists idx_modules_course_position on modules (course_id, position);
create index if not exists idx_lessons_course_position on lessons (course_id, position);
create index if not exists idx_reviews_course_approved on reviews (course_id, approved);
create index if not exists idx_progress_user_course on progress (user_id, course_id);
create index if not exists idx_notifications_user_created_at on notifications (user_id, created_at desc);
create index if not exists idx_lesson_notes_user_course on lesson_notes (user_id, course_id);
create index if not exists idx_bookmarks_user_course on bookmarks (user_id, course_id);

create policy "students view own profile"
on profiles for select
using (id = auth.uid());

create policy "students update own profile"
on profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "public can read published courses"
on courses for select
using (published = true);

create policy "public can read preview lessons"
on lessons for select
using (
  is_preview = true
  or exists (
    select 1 from enrollments e
    where e.user_id = auth.uid() and e.course_id = lessons.course_id
  )
);

create policy "students view own enrollments"
on enrollments for select
using (user_id = auth.uid());

create policy "students view own progress"
on progress for select
using (user_id = auth.uid());

create policy "students update own progress"
on progress for insert
with check (user_id = auth.uid());

create policy "students update own progress row"
on progress for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "students view own certificates"
on certificates for select
using (user_id = auth.uid());

create policy "public certificate verification"
on certificates for select
using (true);

create policy "public can read approved reviews"
on reviews for select
using (approved = true);

create policy "students can create reviews"
on reviews for insert
with check (user_id = auth.uid());

create policy "students can view own notifications"
on notifications for select
using (user_id = auth.uid());

create policy "students view own lesson notes"
on lesson_notes for select
using (user_id = auth.uid());

create policy "students create own lesson notes"
on lesson_notes for insert
with check (user_id = auth.uid());

create policy "students update own lesson notes"
on lesson_notes for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "students delete own lesson notes"
on lesson_notes for delete
using (user_id = auth.uid());

create policy "students view own bookmarks"
on bookmarks for select
using (user_id = auth.uid());

create policy "students create own bookmarks"
on bookmarks for insert
with check (user_id = auth.uid());

create policy "students delete own bookmarks"
on bookmarks for delete
using (user_id = auth.uid());

create policy "admin full access profiles"
on profiles for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access courses"
on courses for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access modules"
on modules for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access lessons"
on lessons for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access enrollments"
on enrollments for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access progress"
on progress for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access certificates"
on certificates for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access reviews"
on reviews for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access payments"
on payments for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access coupons"
on coupons for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access notifications"
on notifications for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access lesson notes"
on lesson_notes for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "admin full access bookmarks"
on bookmarks for all
using (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'))
with check (((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'));

create policy "public can read published posts"
on posts for select
using (published = true);
