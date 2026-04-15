import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { getCurrentUser, getSafeRedirectPath } from "@/lib/auth";

type PageProps = {
  searchParams: Promise<{
    mode?: string;
    next?: string;
  }>;
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const [user, params] = await Promise.all([getCurrentUser(), searchParams]);
  const recoveryMode = params.mode === "recovery";
  const next = getSafeRedirectPath(params.next, "/dashboard");

  if (user && !recoveryMode) {
    redirect(next);
  }

  return (
    <main className="mx-auto w-full max-w-lg">
      <ResetPasswordForm mode={recoveryMode ? "recovery" : "request"} next={next} />
    </main>
  );
}
