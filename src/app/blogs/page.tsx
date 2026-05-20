import React from "react";
import BlogListClient from "./blog-list-client";
import { getBlogPosts } from "@/lib/mdx";

export const metadata = {
  title: "博客 | 个人作品集",
  description: "技术文章、教程和更新。",
};

export default function BlogPage() {
  const posts = getBlogPosts()
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .map((post) => ({
      slug: post.slug,
      metadata: post.metadata,
      wordCount: post.content.split(/\s+/).length,
    }));

  return <BlogListClient posts={posts} />;
}
