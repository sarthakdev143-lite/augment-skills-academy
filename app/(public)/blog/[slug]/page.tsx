import type { Metadata } from "next";
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
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Badge>{frontmatter.category}</Badge>
      <h1 className="mt-4 text-balance text-5xl font-semibold">
        {frontmatter.title}
      </h1>
      <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted">
        <span>{frontmatter.author}</span>
        <span>{formatDate(frontmatter.publishedAt)}</span>
        <span>{frontmatter.readingTime}</span>
      </div>
      <p className="mt-6 text-lg leading-8 text-muted">{frontmatter.description}</p>

      <article className="prose-academy mt-12 max-w-none">
        <Content />
      </article>
    </main>
  );
}
