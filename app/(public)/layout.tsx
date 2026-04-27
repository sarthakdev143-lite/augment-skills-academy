import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative">
      <SiteHeader />
      <div className="mx-auto w-full max-w-7xl sm:px-6">{children}</div>
      <SiteFooter />
    </div>
  );
}
