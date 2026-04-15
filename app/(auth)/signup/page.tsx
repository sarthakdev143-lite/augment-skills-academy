import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/auth/signup-form";
import { getCurrentUser, getSafeRedirectPath } from "@/lib/auth";

type PageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: PageProps) {
  const [user, params] = await Promise.all([getCurrentUser(), searchParams]);
  const next = getSafeRedirectPath(params.next, "/dashboard");

  if (user) {
    redirect(next);
  }

  return (
    <main className="mx-auto w-full max-w-lg">
      <SignUpForm next={next} />
    </main>
  );
}
