import Link from "next/link";
import { ArrowRight, Mail, Globe, Share2, ExternalLink } from "lucide-react";
import { logoCloud } from "@/lib/demo-data";

const footerNav = [
  {
    title: "Explore",
    links: [
      { href: "/courses",  label: "Programs" },
      { href: "/blog",     label: "Resources" },
      { href: "/about",    label: "About us" },
      { href: "/contact",  label: "Career call" },
    ],
  },
  {
    title: "Learners",
    links: [
      { href: "/signup",                        label: "Apply" },
      { href: "/login",                         label: "Login" },
      { href: "/dashboard",                     label: "Dashboard" },
      { href: "/certificates/cert_demo_0001",   label: "Certificates" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:advisor@augmentskills.academy", label: "advisor@augmentskills.academy" },
      { href: "/contact",                             label: "Enterprise cohorts" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">

      {/* ── CTA strip ── */}
      <div className="relative overflow-hidden bg-[#0b1928] px-6 py-16 text-white">
        {/* Orbs */}
        <div
          aria-hidden
          className="absolute -top-16 -left-12 h-52 w-52 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #e36a2f, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-12 right-10 h-44 w-44 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #0f7f78, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-[32px] bg-white/[0.04] border border-white/[0.06] p-8 text-center md:p-12 backdrop-blur-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-accent-3 mb-3">
              Start your journey
            </p>
            <h2 className="text-3xl font-black text-balance md:text-4xl lg:text-5xl">
              Join a mentor-led path built<br />
              to turn learning into a career.
            </h2>
            <p className="mt-5 text-white/55 leading-8 text-base">
              Structured paths · Mentor reviews · Portfolio-ready projects · Career support
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-black text-white shadow-[0_8px_28px_rgba(227,106,47,0.50)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(227,106,47,0.65)] transition-all duration-300"
              >
                Apply now <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white/75 hover:bg-white/8 hover:border-white/30 transition-all"
              >
                Talk to an advisor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Links grid ── */}
      <div className="bg-background px-6 pt-14 pb-8">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <p className="text-base font-black tracking-tight text-foreground">
              Augment Skills Academy
            </p>
            <p className="mt-3 text-sm leading-7 text-muted max-w-xs">
              Outcome-first programs for modern engineering, product,
              growth, and AI careers.
            </p>

            {/* Partner pills */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {logoCloud.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border px-3 py-1 text-[10px] font-semibold text-muted/70"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Social icons */}
            <div className="mt-6 flex gap-2">
              {[
                { href: "#", icon: <Globe      size={15} />, label: "Website" },
                { href: "#", icon: <Share2     size={15} />, label: "Share" },
                { href: "#", icon: <ExternalLink size={15} />, label: "Links" },
                { href: "mailto:advisor@augmentskills.academy", icon: <Mail size={15} />, label: "Email" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted hover:border-accent/40 hover:bg-accent/8 hover:text-accent transition-all"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted/70">
                {col.title}
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                  >
                    <ArrowRight size={11} className="opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 text-accent transition-all duration-200" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mx-auto max-w-7xl mt-12 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted/60">
            © 2026 Augment Skills Academy · Built for learners who want proof of work and momentum.
          </p>
          <div className="flex gap-5 text-xs text-muted/50">
            <Link href="#" className="hover:text-muted transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-muted transition-colors">Terms</Link>
            <Link href="#" className="hover:text-muted transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
