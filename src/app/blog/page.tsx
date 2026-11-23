"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";

const allBlogs = [
  {
    title: "Building Scalable REST APIs with Node.js and Express",
    slug: "building-scalable-rest-apis",
    excerpt: "Learn the best practices for building production-ready REST APIs using Node.js and Express, including authentication, error handling, and database optimization.",
    category: "Backend",
    date: "Mar 15, 2025",
    readTime: "5 min read",
    color: "#22C55E",
  },
  {
    title: "Mastering React.js: From Hooks to Advanced Patterns",
    slug: "mastering-reactjs-hooks-patterns",
    excerpt: "A deep dive into React.js hooks, custom hooks, render patterns, and state management strategies for building complex applications.",
    category: "Frontend",
    date: "Apr 20, 2025",
    readTime: "7 min read",
    color: "#6366F1",
  },
  {
    title: "My Journey: 500+ DSA Problems and Counting",
    slug: "dsa-journey-500-problems",
    excerpt: "How solving 500+ problems on GeeksforGeeks and 260+ on LeetCode transformed my problem-solving skills and prepared me for technical interviews.",
    category: "Career",
    date: "May 10, 2025",
    readTime: "6 min read",
    color: "#F59E0B",
  },
];

const categories = ["All", "Backend", "Frontend", "Career"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = allBlogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || b.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-dark-text-muted hover:text-primary text-sm mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              The <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-dark-text-secondary max-w-2xl">
              Insights, tutorials, and stories about web development, problem solving, and my journey as a developer.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text-muted" />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-card border border-dark-border text-dark-text text-sm placeholder:text-dark-text-muted focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-dark-card border border-dark-border text-dark-text-secondary hover:text-dark-text hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blog, i) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Link href={`/blog/${blog.slug}`} className="block group h-full">
                  <div className="p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-primary/30 transition-all h-full flex flex-col">
                    <span className="inline-block text-xs px-3 py-1 rounded-full font-medium mb-4 w-fit" style={{ background: `${blog.color}15`, color: blog.color }}>
                      {blog.category}
                    </span>
                    <h3 className="text-lg font-bold text-dark-text mb-3 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-dark-text-secondary leading-relaxed mb-4 flex-1">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-dark-text-muted mt-auto">
                      <span className="flex items-center gap-1"><Calendar size={12} />{blog.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{blog.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-dark-text-muted text-lg">No posts found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
