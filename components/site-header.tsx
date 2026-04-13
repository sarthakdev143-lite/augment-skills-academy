import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand-mark.svg"
            alt="Augment Skills Academy"
            width={40}
            height={40}
            priority
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              Augment Skills Academy
            </p>
            <p className="text-xs text-muted">Production-first tech education</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden text-sm text-muted hover:text-foreground md:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="hidden rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_32px_rgba(91,77,247,0.35)] md:inline-flex"
          >
            Get Started
          </Link>
          <Link
            href="/signup"
            className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-white md:hidden"
          >
            Start
          </Link>
        </div>
      </div>
    </header>
  );
}
