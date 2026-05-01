import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cookie, FileText, Globe, LayoutGrid, Mail, ShieldCheck, Share2 } from "lucide-react";

const footerNav = [
  // {
  //   title: "Explore",
  //   icon: Globe,
  //   links: [
  //     { href: "/courses", label: "Courses" },
  //     { href: "/blog", label: "Resources" },
  //     { href: "/about", label: "About" },
  //     { href: "/contact", label: "Contact" },
  //   ],
  // },
  {
    title: "Programs",
    icon: LayoutGrid,
    links: [
      { href: "/courses?category=ai", label: "AI" },
      { href: "/courses?category=devops", label: "DevOps" },
      { href: "/courses?category=frontend", label: "Frontend" },
      { href: "/courses?category=backend", label: "Backend" },
    ],
  },
  {
    title: "Contact",
    icon: Mail,
    links: [
      { href: "mailto:augmentskillacademy@gmail.com", label: "augmentskillacademy@gmail.com" },
      { href: "tel:7389445447", label: "738-944-5447" },
    ],
  },
];

const footerPolicies = [
  // { href: "#", label: "Privacy", Icon: ShieldCheck },
  { href: "#", label: "Terms", Icon: FileText },
  // { href: "#", label: "Cookies", Icon: Cookie },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="bg-background px-6 pb-8 pt-14">
        <div className="mx-auto flex justify-between gap-8 flex-wrap max-w-7xl">
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

          <div className="flex gap-10 flex-wrap">
            {footerNav.map((column) => (
              <div key={column.title}>
                <div className="flex items-center gap-2 text-muted/70">
                  <column.icon size={14} className="text-accent" />
                  <p className="text-[10px] font-black uppercase tracking-[0.22em]">{column.title}</p>
                </div>
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
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <div className="flex gap-4 text-xs text-muted/50">
            {footerPolicies.map(({ href, label, Icon }) => (
              <Link key={label} href={href} className="flex items-center gap-2 transition-colors hover:text-muted">
                <Icon size={12} className="text-accent" />
                {label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted/60">(c) 2026 Augment Skills Academy</p>
        </div>
      </div>
    </footer>
  );
}
