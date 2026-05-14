import React from "react";
import BlogListClient from "./blog-list-client";

export const metadata = {
  title: "博客 | 个人作品集",
  description: "技术文章、教程和更新。",
};

export default function BlogPage() {
  const posts: never[] = [];

  return <BlogListClient posts={posts} />;
}
