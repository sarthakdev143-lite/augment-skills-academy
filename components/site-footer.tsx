import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.8fr_1fr_1fr]">
        <div className="max-w-md">
          <p className="text-lg font-semibold">
            Build skills that survive real production constraints.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            The academy combines structured learning, modern tooling, and
            delivery-minded engineering practices for individuals and teams.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <Link href="/courses">Catalogue</Link>
            <Link href="/blog">Resources</Link>
            <Link href="/about">About</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Support
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <Link href="/contact">Contact</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Create account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
