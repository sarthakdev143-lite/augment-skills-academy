import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Mail, Share2 } from "lucide-react";

const footerNav = [
  {
    title: "Explore",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/blog", label: "Resources" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Learners",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:augmentskillacademy@gmail.com", label: "augmentskillacademy@gmail.com" },
      { href: "https://augmentskillacademy.in", label: "augmentskillacademy.in" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#081a34_0%,#0d2546_58%,#0b4e88_100%)] px-6 py-16 text-white">
        <div className="relative mx-auto max-w-7xl rounded-[32px] border border-white/[0.06] bg-white/[0.04] p-8 text-center backdrop-blur-sm md:p-12">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.26em] text-accent-3">Start your journey</p>
          <h2 className="text-3xl font-black md:text-4xl lg:text-5xl">Build real skills for a real career.</h2>
          <p className="mt-5 text-base leading-8 text-white/55">
            Structured paths, mentor reviews, placement support, and a community that stays with you.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/courses" className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-black text-white">
              Explore Courses <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white/75 transition-all hover:bg-white/8">
              Talk to us
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-background px-6 pb-8 pt-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="logo-pill flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_10px_26px_rgba(17,136,232,0.10)]">
                <Image src="/brand-mark.png" alt="Augment Skills Academy" width={30} height={30} />
              </div>
              <p className="text-base font-black tracking-tight text-foreground">Augment Skills Academy</p>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-7 text-muted">
              Mentor-led learning paths for AI, DevOps, frontend, backend, and custom career tracks.
            </p>
            <div className="mt-6 flex gap-2">
              <Link href="https://augmentskillacademy.in" aria-label="Website" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent/40 hover:bg-accent/8 hover:text-accent">
                <Globe size={15} />
              </Link>
              <Link href="mailto:augmentskillacademy@gmail.com" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent/40 hover:bg-accent/8 hover:text-accent">
                <Mail size={15} />
              </Link>
              <Link href="/contact" aria-label="Contact" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent/40 hover:bg-accent/8 hover:text-accent">
                <Share2 size={15} />
              </Link>
            </div>
          </div>

          {footerNav.map((column) => (
            <div key={column.title}>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-muted/70">{column.title}</p>
              <div className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className="group flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground">
                    <ArrowRight size={11} className="text-accent" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted/60">(c) 2026 Augment Skills Academy</p>
          <div className="flex gap-5 text-xs text-muted/50">
            <Link href="#" className="transition-colors hover:text-muted">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-muted">Terms</Link>
            <Link href="#" className="transition-colors hover:text-muted">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
