import type { Metadata } from "next";
import { Geist, Manrope, Outfit } from "next/font/google";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Augment Skills Academy",
    template: "%s | Augment Skills Academy",
  },
  description:
    "Mentor-led career paths for engineers, operators, and ambitious learners who want job-ready skills and visible proof of work.",
  openGraph: {
    title: "Augment Skills Academy",
    description:
      "Outcome-first learning with mentor feedback, applied projects, career support, and modern technical specializations.",
    siteName: "Augment Skills Academy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        geist.variable,
        manrope.variable,
        outfit.variable,
      )}
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
