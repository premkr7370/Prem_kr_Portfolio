"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FileText, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  published: boolean;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs").then(r => r.json()).then(d => { setBlogs(d); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark-text flex items-center gap-2">
            <FileText className="text-primary" size={24} /> Blog Management
          </h1>
          <p className="text-dark-text-secondary text-sm mt-1">Create and manage blog posts</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm">
          <Plus size={16} /> New Post
        </motion.button>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>
      ) : (
        <div className="rounded-2xl bg-dark-card border border-dark-border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-dark-border text-xs font-semibold text-dark-text-muted uppercase tracking-wider">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Actions</div>
          </div>
          {blogs.map((blog, i) => (
            <motion.div key={blog.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 gap-4 p-4 border-b border-dark-border last:border-b-0 items-center hover:bg-dark-bg/50 transition-colors">
              <div className="col-span-5">
                <p className="text-sm font-medium text-dark-text truncate">{blog.title}</p>
                <p className="text-xs text-dark-text-muted truncate">{blog.excerpt}</p>
              </div>
              <div className="col-span-2">
                <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">{blog.category}</span>
              </div>
              <div className="col-span-2">
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md ${
                  blog.published ? "bg-success/10 text-success" : "bg-dark-text-muted/10 text-dark-text-muted"
                }`}>
                  {blog.published ? <Eye size={12} /> : <EyeOff size={12} />}
                  {blog.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-dark-text-muted">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="col-span-1 flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-dark-bg text-dark-text-muted hover:text-warning transition-all"><Edit size={14} /></button>
                <button className="p-1.5 rounded-lg hover:bg-dark-bg text-dark-text-muted hover:text-error transition-all"><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
