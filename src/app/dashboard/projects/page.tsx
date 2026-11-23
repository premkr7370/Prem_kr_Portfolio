"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FolderKanban, ExternalLink, Plus, Edit, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  status: string;
  repoUrl: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(d => { setProjects(d); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark-text flex items-center gap-2">
            <FolderKanban className="text-primary" size={24} /> Project Management
          </h1>
          <p className="text-dark-text-secondary text-sm mt-1">Manage your portfolio projects</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all">
          <Plus size={16} /> Add Project
        </motion.button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-primary/20 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-dark-text">{project.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      project.status === "active" ? "bg-success/10 text-success" : project.status === "in-progress" ? "bg-warning/10 text-warning" : "bg-dark-text-muted/10 text-dark-text-muted"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-dark-text-secondary mb-3 line-clamp-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border text-dark-text-muted">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-dark-bg text-dark-text-muted hover:text-primary transition-all">
                    <ExternalLink size={16} />
                  </a>
                  <button className="p-2 rounded-lg hover:bg-dark-bg text-dark-text-muted hover:text-warning transition-all">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-dark-bg text-dark-text-muted hover:text-error transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
