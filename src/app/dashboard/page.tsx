"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, FolderKanban, FileText, MessageSquare, TrendingUp, ArrowUpRight, Clock } from "lucide-react";

interface Analytics {
  totalViews: number;
  totalVisitors: number;
  totalProjects: number;
  totalBlogs: number;
  totalContacts: number;
}

const recentActivity = [
  { action: "New contact message from Dev Community", time: "2 hours ago", type: "contact" },
  { action: "Blog post 'DSA Journey' published", time: "1 day ago", type: "blog" },
  { action: "QuickHammer project updated", time: "3 days ago", type: "project" },
  { action: "New user registered: Admin User", time: "1 week ago", type: "user" },
];

export default function DashboardOverview() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/analytics").then((r) => r.json()).then(setData);
  }, []);

  const stats = data
    ? [
        { label: "Total Views", value: data.totalViews.toLocaleString(), icon: Eye, color: "#6366F1", change: "+12.5%" },
        { label: "Projects", value: data.totalProjects, icon: FolderKanban, color: "#22C55E", change: "+2" },
        { label: "Blog Posts", value: data.totalBlogs, icon: FileText, color: "#F59E0B", change: "+1" },
        { label: "Messages", value: data.totalContacts, icon: MessageSquare, color: "#06B6D4", change: "+3" },
      ]
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-text">Dashboard Overview</h1>
        <p className="text-dark-text-secondary text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats Grid */}
      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15`, color: stat.color }}>
                  <stat.icon size={20} />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-success">
                  <TrendingUp size={12} />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-dark-text">{stat.value}</p>
              <p className="text-xs text-dark-text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-5 rounded-2xl bg-dark-card border border-dark-border">
              <div className="skeleton h-10 w-10 rounded-xl mb-3" />
              <div className="skeleton h-7 w-20 mb-2" />
              <div className="skeleton h-4 w-24" />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-dark-card border border-dark-border"
        >
          <h3 className="text-sm font-semibold text-dark-text mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" /> Page Views Trend
          </h3>
          <div className="flex items-end gap-2 h-40">
            {[820, 1050, 1340, 1580, 1920, 2100, 1850, 2200, 2450, 2780, 3100, 3500].map((val, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(val / 3500) * 100}%` }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary/80 relative group cursor-pointer"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-dark-bg border border-dark-border text-[10px] text-dark-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {val}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m) => (
              <span key={m} className="text-[10px] text-dark-text-muted flex-1 text-center">{m}</span>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-dark-card border border-dark-border"
        >
          <h3 className="text-sm font-semibold text-dark-text mb-4 flex items-center gap-2">
            <Clock size={16} className="text-accent" /> Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-start gap-3 group"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-dark-text-secondary group-hover:text-dark-text transition-colors">{item.action}</p>
                  <p className="text-xs text-dark-text-muted">{item.time}</p>
                </div>
                <ArrowUpRight size={14} className="text-dark-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
