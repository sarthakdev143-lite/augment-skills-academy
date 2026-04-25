import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { listBlogPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export default async function BlogPage() {
  const posts = await listBlogPosts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="max-w-3xl">
          <Badge>Resources</Badge>
          <h1 className="mt-4 text-5xl font-black text-balance">Learning Resources & Career Guides</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Practical guides, career roadmaps, and tech deep-dives to help you make smarter decisions about your learning path.
          </p>
        </div>
        <Reveal delay={0.08}>
          <div className="gradient-border-card overflow-hidden rounded-[34px] p-4">
            <Image
              src="/article-cover-illustration.svg"
              alt="Editorial illustration for academy resources"
              width={1200}
              height={680}
              className="h-auto w-full rounded-[26px]"
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-6">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.04}>
            <Card className="rounded-[28px]">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <Badge>{post.category}</Badge>
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{post.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                {post.description}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-muted">{post.author}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent"
                >
                  Read article <ArrowRight size={16} />
                </Link>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
