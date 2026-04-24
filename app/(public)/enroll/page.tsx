/* eslint-disable react/no-unescaped-entities */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitEnrollmentAction } from "@/app/(public)/enroll/actions";
import { fallbackCourses } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(10, "Enter at least 10 digits."),
  backgroundLevel: z.string().min(1, "Select your current background."),
  preferredStartDate: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const customSelectionOptions = fallbackCourses
  .filter((course) => !course.isCustom)
  .map((course) => ({
    slug: course.slug,
    title: course.title,
    topics: (course.tools ?? []).slice(0, 4),
  }));

export default function EnrollPage() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course") ?? "";
  const selectedTrack = searchParams.get("track") ?? "";
  const selectionQuery = searchParams.get("selections") ?? "";
  const selectedCourse = fallbackCourses.find((course) => course.slug === courseSlug) ?? null;
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [customSelections, setCustomSelections] = useState<string[]>(
    selectionQuery ? selectionQuery.split(",").filter(Boolean) : [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      backgroundLevel: "",
      preferredStartDate: "",
      additionalInfo: "",
    },
  });

  const customSelectionSummary = useMemo(
    () => customSelectionOptions.filter((option) => customSelections.includes(option.slug)).map((option) => option.title),
    [customSelections],
  );

  function toggleSelection(slug: string) {
    setCustomSelections((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  const onSubmit = form.handleSubmit((values) => {
    if (!selectedCourse) {
      setStatus("error");
      setMessage("Please choose a course first.");
      return;
    }

    startTransition(async () => {
      const result = await submitEnrollmentAction({
        name: values.name,
        email: values.email,
        phone: values.phone,
        courseSlug: selectedCourse.slug,
        courseName: selectedCourse.title,
        selectedTrack:
          selectedCourse.isCustom && customSelections.length
            ? customSelections.join(", ")
            : selectedTrack || undefined,
        backgroundLevel: values.backgroundLevel,
        preferredStartDate: values.preferredStartDate,
        additionalInfo: values.additionalInfo,
      });

      setStatus(result.status);
      setMessage(result.message ?? "");
      if (result.status === "success") {
        form.reset();
      }
    });
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[32px] border border-border bg-surface p-8">
          <Badge>Enrollment</Badge>
          <h1 className="mt-4 text-4xl font-black text-foreground">{selectedCourse?.title ?? "Choose your course"}</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            {selectedCourse?.tagline ?? "Pick a track from the course page and complete the form to request your seat."}
          </p>
          <div className="mt-6 space-y-3">
            {(selectedCourse?.tools ?? []).slice(0, 5).map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted">{item}</div>
            ))}
          </div>
          {selectedTrack ? (
            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">Selected track</p>
              <Badge className="mt-2">{selectedTrack}</Badge>
            </div>
          ) : null}
          {selectedCourse?.isCustom ? (
            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">Selected topics</p>
              <p className="mt-2 text-sm text-muted">
                {customSelectionSummary.length ? customSelectionSummary.join(", ") : "Choose from the checklist on the right."}
              </p>
            </div>
          ) : null}
        </div>

        <div className="rounded-[32px] border border-border bg-background p-8">
          {status === "success" ? (
            <div className="rounded-3xl bg-emerald-500/10 p-8 text-emerald-700 dark:text-emerald-300">
              <h2 className="text-2xl font-black">Enrollment received</h2>
              <p className="mt-4 text-base leading-8">{message}</p>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input {...form.register("name")} />
                  {form.formState.errors.name ? <p className="mt-1 text-sm text-rose-400">{form.formState.errors.name.message}</p> : null}
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" {...form.register("email")} />
                  {form.formState.errors.email ? <p className="mt-1 text-sm text-rose-400">{form.formState.errors.email.message}</p> : null}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input {...form.register("phone")} />
                  {form.formState.errors.phone ? <p className="mt-1 text-sm text-rose-400">{form.formState.errors.phone.message}</p> : null}
                </div>
                <div>
                  <label className="text-sm font-medium">Selected Course</label>
                  <div className="mt-2"><Badge>{selectedCourse?.title ?? "Choose a course"}</Badge></div>
                </div>
              </div>

              {selectedTrack ? (
                <div>
                  <label className="text-sm font-medium">Selected Track</label>
                  <div className="mt-2"><Badge>{selectedTrack}</Badge></div>
                </div>
              ) : null}

              {selectedCourse?.isCustom ? (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Choose topics for your custom path</label>
                  {customSelectionOptions.map((option) => (
                    <label key={option.slug} className="block rounded-2xl border border-border bg-surface p-4">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" checked={customSelections.includes(option.slug)} onChange={() => toggleSelection(option.slug)} className="mt-1" />
                        <div>
                          <p className="font-semibold text-foreground">{option.title}</p>
                          <p className="mt-2 text-sm text-muted">{option.topics.join(" · ")}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : null}

              <div>
                <label className="text-sm font-medium">Current Background / Experience Level</label>
                <Select {...form.register("backgroundLevel")} defaultValue="">
                  <option value="" disabled>Select your background</option>
                  <option value="Complete Beginner">Complete Beginner</option>
                  <option value="Some coding experience">Some coding experience</option>
                  <option value="Working professional switching careers">Working professional switching careers</option>
                  <option value="Developer upskilling">Developer upskilling</option>
                </Select>
                {form.formState.errors.backgroundLevel ? <p className="mt-1 text-sm text-rose-400">{form.formState.errors.backgroundLevel.message}</p> : null}
              </div>

              <div>
                <label className="text-sm font-medium">Preferred Start Date</label>
                <Input {...form.register("preferredStartDate")} placeholder="e.g. Immediately, Next month, June 2025" />
              </div>

              <div>
                <label className="text-sm font-medium">Anything else you'd like us to know</label>
                <Textarea {...form.register("additionalInfo")} />
              </div>

              {status === "error" && message ? <p className="text-sm text-rose-400">{message}</p> : null}

              <Button type="submit" disabled={isPending || !selectedCourse}>
                {isPending ? "Submitting..." : "Submit Enrollment"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
