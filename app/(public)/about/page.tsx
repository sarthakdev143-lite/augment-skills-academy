import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { marketingStats, testimonials } from "@/lib/demo-data";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl">
        <Badge>About</Badge>
        <h1 className="mt-4 text-5xl font-semibold">
          An academy designed around real delivery work
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          We build learning systems for engineers who want more than surface-level
          tutorials. That means stronger architecture, calmer onboarding, and
          sharper production instincts.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {marketingStats.map((item) => (
          <Card key={item.label}>
            <p className="text-3xl font-semibold">{item.value}</p>
            <p className="mt-2 text-sm text-muted">{item.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h2 className="text-2xl font-semibold">How we teach</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
            <p>We lead with systems thinking, not isolated tricks.</p>
            <p>
              We favor typed workflows, secure mutations, and deployment-ready
              choices.
            </p>
            <p>We keep the learner experience warm, clear, and confidence-building.</p>
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-semibold">What teams use us for</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
            <p>Platform onboarding for new hires.</p>
            <p>
              Internal upskilling on App Router, TypeScript, and AI product systems.
            </p>
            <p>
              Reusable architecture guidance that survives after the cohort ends.
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <Card key={item.name}>
            <p className="text-base leading-7">&ldquo;{item.quote}&rdquo;</p>
            <p className="mt-4 font-medium">{item.name}</p>
            <p className="text-sm text-muted">{item.role}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
