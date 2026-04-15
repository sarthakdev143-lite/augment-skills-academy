"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "/courses",   label: "Programs" },
  { href: "/#outcomes", label: "Outcomes" },
  { href: "/#mentors",  label: "Mentors" },
  { href: "/blog",      label: "Resources" },
  { href: "/about",     label: "About" },
];

export function SiteHeader() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="relative overflow-hidden bg-[#0d1e33] px-4 py-2.5 text-center text-xs font-bold text-white/80">
        <span className="shimmer-bar" aria-hidden />
        <span className="relative">
          🎉 Applications for the{" "}
          <span className="text-accent-3 font-black">May 4, 2026 cohort</span>
          {" "}are now open —{" "}
          <Link
            href="/signup"
            className="inline-flex items-center gap-1 text-white underline underline-offset-2 hover:no-underline hover:text-accent-3 transition-colors font-black"
          >
            Apply today <ArrowRight size={11} />
          </Link>
        </span>
      </div>

      {/* ── Main nav ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/70 bg-background/92 shadow-[0_2px_24px_rgba(0,0,0,0.07)] backdrop-blur-2xl"
            : "border-b border-transparent bg-background/50 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/brand-mark.svg"
                alt="Augment Skills Academy"
                width={38}
                height={38}
                priority
                className="relative drop-shadow-sm"
              />
            </div>
            <div className="hidden sm:block leading-none">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-muted/80">
                Augment Skills
              </p>
              <p className="text-[13px] font-black text-foreground tracking-tight">
                Academy
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative rounded-full px-4 py-2 text-[13px] font-semibold text-muted hover:text-foreground transition-colors group"
              >
                <span className="absolute inset-0 rounded-full scale-90 group-hover:scale-100 bg-accent/0 group-hover:bg-accent/8 transition-all duration-200" />
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="text-[13px] font-bold text-muted hover:text-foreground transition-colors px-2"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border/80 px-4 py-2 text-[13px] font-bold text-foreground hover:border-accent/50 hover:bg-accent/5 transition-all"
            >
              Book a call
            </Link>
            <Link
              href="/signup"
              className="shimmer-btn inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[13px] font-black text-white shadow-[0_4px_16px_rgba(227,106,47,0.38)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(227,106,47,0.50)] transition-all duration-200"
            >
              Apply now
            </Link>
          </div>

          {/* Mobile: Apply button + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/signup"
              className="inline-flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-xs font-black text-white shadow-[0_4px_12px_rgba(227,106,47,0.35)]"
            >
              Apply
            </Link>
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-full p-2 text-foreground hover:bg-accent/10 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Tablet: hamburger only */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="hidden md:flex lg:hidden rounded-full p-2 text-foreground hover:bg-accent/10 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-[600px]" : "max-h-0"
          }`}
        >
          <div className="border-t border-border bg-background/98 backdrop-blur-2xl px-6 py-5 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-muted hover:text-foreground hover:bg-accent/8 transition-all group"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 text-accent transition-opacity" />
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center rounded-xl py-3 text-sm font-bold border border-border text-muted hover:border-accent/40 hover:text-foreground transition-all"
              >
                Login
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="text-center rounded-xl py-3 text-sm font-bold border border-border text-muted hover:border-accent/40 hover:text-foreground transition-all"
              >
                Book a call
              </Link>
            </div>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="shimmer-btn flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black text-white bg-accent shadow-[0_4px_16px_rgba(227,106,47,0.40)] mt-2"
            >
              Apply now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
