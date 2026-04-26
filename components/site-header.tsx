"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/92 shadow-[0_2px_24px_rgba(0,0,0,0.07)] backdrop-blur-2xl"
          : "border-b border-transparent bg-background/50 backdrop-blur-lg"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
        <Link href="/" className="group flex items-center gap-3">
          <div className="logo-pill flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_10px_26px_rgba(17,136,232,0.10)]">
            <Image src="/brand-mark.png" alt="Augment Skills Academy" width={32} height={32} priority />
          </div>
          <div className="hidden sm:block leading-none">
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-accent/75">Augment Skills</p>
            <p className="text-[13px] font-black tracking-tight text-foreground">Academy</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[13px] font-semibold text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/courses"
            className="rounded-full border border-border/80 px-4 py-2 text-[13px] font-bold text-foreground transition-all hover:border-accent/50 hover:bg-accent/5"
          >
            Courses
          </Link>
          <Link
            href="/contact"
            className="shimmer-btn inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-black text-white"
          >
            Contact <ArrowRight size={13} />
          </Link>
        </div>

        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-full p-2 text-foreground transition-colors hover:bg-accent/10 md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`overflow-hidden transition-all duration-300 lg:hidden ${mobileOpen ? "max-h-105" : "max-h-0"}`}>
        <div className="border-t border-border bg-background/98 px-6 py-5 backdrop-blur-2xl">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-muted transition-all hover:bg-accent/8 hover:text-foreground"
              >
                {link.label}
                <ArrowRight size={14} className="text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
