import { ContactForm } from "@/components/contact/contact-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Badge>Contact</Badge>
          <h1 className="mt-4 text-5xl font-semibold">Get in touch with us</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Whether you have questions about a course, need guidance on which path suits you, or want to explore partnership opportunities - we're here.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              "Course guidance - not sure which track is right for you?",
              "Enrollment support - need help with the process?",
              "Partnerships & collaborations - let's work together",
            ].map((item) => (
              <Card key={item} className="rounded-[24px] p-5">
                <p className="text-sm text-muted">{item}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="rounded-[32px] p-6">
          <ContactForm />
        </Card>
      </div>
    </main>
  );
}
