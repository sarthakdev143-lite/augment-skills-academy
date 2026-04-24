insert into courses (id, slug, title, description, price_cents, category, level, featured, published)
values
  ('11111111-1111-1111-1111-111111111111', 'ai-machine-learning', 'AI & Machine Learning', 'From Python basics to deploying your own ML models and working with Large Language Models - build AI literacy that the industry actually demands.', 0, 'AI Engineering', 'beginner', true, true),
  ('22222222-2222-2222-2222-222222222222', 'devops-engineering', 'DevOps Engineering', 'Master the tools and workflows that power modern software delivery - from Linux fundamentals to Kubernetes orchestration and full CI/CD pipelines.', 0, 'DevOps', 'intermediate', true, true),
  ('33333333-3333-3333-3333-333333333333', 'frontend-development', 'Frontend Development', 'Build beautiful, performant user interfaces from scratch. Choose your framework path - React, Next.js, Angular, Vue, or SvelteKit - and get Tailwind CSS as a free bonus alongside every track.', 0, 'Web Development', 'beginner', true, true),
  ('44444444-4444-4444-4444-444444444444', 'backend-development', 'Backend Development', 'Learn to architect and build robust server-side systems. Choose your stack - Node.js/Express, Python/FastAPI, Go, or Java/Spring - and build APIs that scale.', 0, 'Web Development', 'beginner', false, true),
  ('55555555-5555-5555-5555-555555555555', 'custom-learning-path', 'Custom Learning Path', 'Can''t find what you''re looking for, or want to combine multiple skills? Build your own path. Select any combination of courses, topics, or goals - we''ll design a tailored roadmap just for you.', 0, 'Custom', 'beginner', false, true)
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
  ('77777777-7777-7777-7777-777777777771', 'ship-full-stack-skill-systems', 'How to Choose the Right Tech Stack for Your Career in 2025', 'A practical guide to choosing between frontend, backend, DevOps, and AI paths based on strengths, demand, and long-term growth.', 'Career Guides', 'Augment Skills Academy', '6 min read', '2026-04-10', true),
  ('77777777-7777-7777-7777-777777777772', 'from-notes-to-portfolio', 'How to Build a Portfolio That Gets You Hired (Without Fake Projects)', 'A practical guide to building meaningful projects, clean GitHub repos, and portfolio proof that stands up in interviews.', 'Career Guides', 'Augment Skills Academy', '5 min read', '2026-04-12', true),
  ('77777777-7777-7777-7777-777777777773', 'ai-ml-career-roadmap', 'The Complete AI/ML Career Roadmap for Beginners in 2025', 'A step-by-step guide to learning Python, data, machine learning, deep learning, and LLM workflows for entry-level AI careers.', 'AI Engineering', 'Augment Skills Academy', '8 min read', '2026-04-14', true),
  ('77777777-7777-7777-7777-777777777774', 'devops-vs-cloud-engineer', 'DevOps vs Cloud Engineer: What''s the Difference and Which Should You Become?', 'A clear comparison of DevOps and cloud engineering roles, skills, tools, pay direction, and transition paths.', 'DevOps', 'Augment Skills Academy', '6 min read', '2026-04-16', true),
  ('77777777-7777-7777-7777-777777777775', 'frontend-framework-comparison-2025', 'React vs Next.js vs Vue vs Angular vs SvelteKit: Which Should You Learn in 2025?', 'An honest comparison of major frontend frameworks based on demand, learning curve, use cases, and career goals.', 'Web Development', 'Augment Skills Academy', '7 min read', '2026-04-18', true)
on conflict (id) do nothing;
