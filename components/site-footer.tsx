import Link from "next/link";
import { logoCloud, marketingStats } from "@/lib/demo-data";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0f1b2e] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="ink-panel rounded-[40px] p-8 lg:p-10">
          <div className="academy-mesh opacity-40" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/58">
                Start your next chapter
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold text-balance lg:text-4xl">
                Join a mentor-led path built to turn learning into visible career momentum.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72">
                Choose a specialization, build applied projects, and get the
                structure ambitious learners need to keep moving.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {marketingStats.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="rounded-[28px] border border-white/10 bg-white/8 px-4 py-4"
                >
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-white/56">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#132238]"
            >
              Apply now
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white"
            >
              Talk to an advisor
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1fr]">
          <div className="max-w-md">
            <p className="text-lg font-semibold">Augment Skills Academy</p>
            <p className="mt-3 text-sm leading-7 text-white/72">
              Outcome-first programs for modern engineering, product, growth,
              and AI careers.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {logoCloud.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/60"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              Explore
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/72">
              <Link href="/courses">Programs</Link>
              <Link href="/blog">Resources</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Career Call</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              Learners
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/72">
              <Link href="/signup">Apply</Link>
              <Link href="/login">Login</Link>
              <Link href="/certificates/cert_demo_0001">Certificates</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              Contact
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/72">
              <p>advisor@augmentskills.academy</p>
              <p>Enterprise cohorts and private onboarding tracks available</p>
              <p>Mon-Sat, 10:00 to 19:00 IST</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/56">
          <p>Built for learners who want structure, proof of work, and momentum.</p>
        </div>
      </div>
    </footer>
  );
}
