import { dataStore } from "@/lib/data-store";
import BlogPostClient from "./blog-post-client";

export async function generateStaticParams() {
  const posts = dataStore.getBlogPosts(true);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = dataStore.getBlogPostBySlug(slug);

  if (!post) {
    return <BlogPostClient post={null} />;
  }

  return <BlogPostClient post={post} />;
}
