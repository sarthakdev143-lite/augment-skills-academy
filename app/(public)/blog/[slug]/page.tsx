import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getBlogPost } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { Content, frontmatter } = post;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Badge>{frontmatter.category}</Badge>
      <h1 className="mt-4 text-balance text-5xl font-black">
        {frontmatter.title}
      </h1>
      <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted">
        <span>{frontmatter.author}</span>
        <span>{formatDate(frontmatter.publishedAt)}</span>
        <span>{frontmatter.readingTime}</span>
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{frontmatter.description}</p>

      <div className="gradient-border-card mt-10 overflow-hidden rounded-[34px] p-4">
        <Image
          src="/article-cover-illustration.svg"
          alt="Article cover illustration"
          width={1200}
          height={680}
          className="h-auto w-full rounded-[26px]"
        />
      </div>

      <article className="prose-academy mt-12 max-w-none">
        <Content />
      </article>
    </main>
  );
}
