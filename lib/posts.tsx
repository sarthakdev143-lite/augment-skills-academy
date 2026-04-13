import type * as React from "react";
import { evaluate } from "@mdx-js/mdx";
import matter from "gray-matter";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import * as runtime from "react/jsx-runtime";
import { fallbackBlogPosts } from "@/lib/demo-data";
import type { BlogPostFrontmatter, BlogPostPreview } from "@/types";

const postsDirectory = path.join(process.cwd(), "content", "posts");

async function readPostFile(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

function normalizePostFrontmatter(
  slug: string,
  frontmatter: Partial<BlogPostFrontmatter>,
  excerpt: string,
) {
  return {
    slug,
    title: frontmatter.title ?? slug,
    description: frontmatter.description ?? excerpt,
    category: frontmatter.category ?? "Resources",
    author: frontmatter.author ?? "Augment Skills Academy",
    readingTime: frontmatter.readingTime ?? "5 min read",
    publishedAt: frontmatter.publishedAt ?? new Date().toISOString(),
    featured: frontmatter.featured ?? false,
  } satisfies BlogPostFrontmatter;
}

export const listBlogPosts = cache(async () => {
  try {
    const files = await fs.readdir(postsDirectory);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const source = await readPostFile(slug);
          const { data, content } = matter(source);
          const excerpt = content
            .trim()
            .split("\n")
            .slice(0, 3)
            .join(" ")
            .replace(/[#>*`]/g, "")
            .trim();

          return {
            ...normalizePostFrontmatter(
              slug,
              data as Partial<BlogPostFrontmatter>,
              excerpt,
            ),
            excerpt,
          } satisfies BlogPostPreview;
        }),
    );

    return posts.sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() -
        new Date(left.publishedAt).getTime(),
    );
  } catch {
    return fallbackBlogPosts;
  }
});

export const getBlogPost = cache(async (slug: string) => {
  try {
    const source = await readPostFile(slug);
    const { data, content } = matter(source);
    const frontmatter = normalizePostFrontmatter(
      slug,
      data as Partial<BlogPostFrontmatter>,
      content.trim().split("\n").slice(0, 3).join(" "),
    );

    const evaluatedPost = await evaluate(content, {
      ...runtime,
      useMDXComponents: () => ({
        h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
          <h2 className="mt-10 text-2xl font-semibold text-foreground" {...props} />
        ),
        p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
          <p
            className="mt-4 text-base leading-8 text-zinc-300 dark:text-zinc-300"
            {...props}
          />
        ),
        li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
          <li className="ml-5 list-disc text-zinc-300 dark:text-zinc-300" {...props} />
        ),
        strong: (props: React.HTMLAttributes<HTMLElement>) => (
          <strong className="font-semibold text-foreground" {...props} />
        ),
        code: (props: React.HTMLAttributes<HTMLElement>) => (
          <code
            className="rounded bg-zinc-900/80 px-1.5 py-0.5 text-sm text-violet-200"
            {...props}
          />
        ),
      }),
    });

    return {
      frontmatter,
      Content: evaluatedPost.default,
    };
  } catch {
    const fallback = fallbackBlogPosts.find((post) => post.slug === slug);
    if (!fallback) {
      return null;
    }

    return {
      frontmatter: fallback,
      Content: () => (
        <>
          <p>{fallback.excerpt}</p>
          <p>
            This starter keeps blog content in local MDX files so the marketing
            surface can ship independently from the database.
          </p>
        </>
      ),
    };
  }
});
