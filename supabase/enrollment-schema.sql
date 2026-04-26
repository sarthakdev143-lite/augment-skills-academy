create extension if not exists "uuid-ossp";

create table if not exists enrollment_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  course_slug text not null,
  course_name text not null,
  selected_track text,
  background_level text not null,
  preferred_start_date text,
  additional_info text,
  created_at timestamptz not null default now()
);

alter table enrollment_requests enable row level security;

create policy "admin full access enrollment_requests"
on enrollment_requests for all
using (true);

create table if not exists contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_submissions add column if not exists phone text;
update contact_submissions
set phone = 'Not provided'
where phone is null;
alter table contact_submissions alter column phone set not null;

alter table contact_submissions enable row level security;

create policy "admin full access contact_submissions"
on contact_submissions for all
using (true);
