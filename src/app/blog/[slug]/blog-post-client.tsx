"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface BlogPost {
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
}

export default function BlogPostClient({ post }: { post: BlogPost | null }) {
  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-dark-text-muted hover:text-primary text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <span className="inline-block text-xs px-3 py-1 rounded-full font-medium bg-primary/10 text-primary mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-dark-text mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-dark-text-muted mb-8 pb-8 border-b border-dark-border">
              <span className="flex items-center gap-1"><User size={14} />{post.author}</span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="flex items-center gap-1"><Clock size={14} />5 min read</span>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {post.content.split("\n").map((paragraph, i) => {
                if (paragraph.startsWith("# ")) {
                  return <h1 key={i} className="text-2xl font-bold text-dark-text mt-8 mb-4">{paragraph.replace("# ", "")}</h1>;
                }
                if (paragraph.startsWith("## ")) {
                  return <h2 key={i} className="text-xl font-bold text-dark-text mt-6 mb-3">{paragraph.replace("## ", "")}</h2>;
                }
                if (paragraph.startsWith("```")) return null;
                if (paragraph.trim() === "") return <div key={i} className="h-4" />;
                return <p key={i} className="text-dark-text-secondary leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-dark-border">
              <p className="text-sm text-dark-text-muted mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border text-dark-text-secondary">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </>
  );
}
