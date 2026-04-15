import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser, getSafeRedirectPath } from "@/lib/auth";

type PageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const [user, params] = await Promise.all([getCurrentUser(), searchParams]);
  const next = getSafeRedirectPath(params.next, "/dashboard");

  if (user) {
    redirect(next);
  }

  return (
    <main className="mx-auto w-full max-w-lg">
      <LoginForm next={next} initialMessage={params.error} />
    </main>
  );
}
