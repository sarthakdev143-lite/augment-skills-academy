import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/courses", label: "Programs" },
  { href: "/#outcomes", label: "Outcomes" },
  { href: "/#mentors", label: "Mentors" },
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <>
      <div className="border-b border-white/8 bg-[#0f1b2e] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72">
          <p>Applications for the May 4, 2026 cohort are open</p>
          <div className="flex flex-wrap items-center gap-3 text-white/58">
            <span>Live cohorts</span>
            <span className="hidden md:inline">Mentor reviews</span>
            <span className="hidden md:inline">Portfolio-first outcomes</span>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 px-4 pt-4">
        <div className="glass-panel mx-auto max-w-7xl rounded-[30px] px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <Image
                src="/brand-mark.svg"
                alt="Augment Skills Academy"
                width={46}
                height={46}
                priority
              />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">
                  Augment Skills Academy
                </p>
                <p className="truncate text-sm font-semibold text-foreground">
                  Cohort-based careers, delivered with polish
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 xl:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden text-sm font-semibold text-muted hover:text-foreground md:inline-flex"
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="hidden rounded-full border border-border/80 bg-white/70 px-4 py-2.5 text-sm font-semibold text-foreground shadow-[0_12px_30px_rgba(19,34,56,0.08)] md:inline-flex"
              >
                Book a call
              </Link>
              <Link
                href="/signup"
                className="inline-flex rounded-full bg-[#132238] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(19,34,56,0.22)]"
              >
                Apply now
              </Link>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 xl:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full border border-border/75 bg-white/68 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
