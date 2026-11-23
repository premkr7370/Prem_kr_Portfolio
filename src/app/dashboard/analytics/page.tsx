"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, Users, TrendingUp, Globe, BarChart3 } from "lucide-react";

interface AnalyticsData {
  totalViews: number;
  totalVisitors: number;
  viewsByPage: { page: string; views: number }[];
  viewsByMonth: { month: string; views: number }[];
  topReferrers: { source: string; visits: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  useEffect(() => { fetch("/api/analytics").then(r => r.json()).then(setData); }, []);

  if (!data) return (
    <div className="space-y-6">
      <div className="skeleton h-8 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-text flex items-center gap-2">
          <BarChart3 className="text-primary" size={24} /> Analytics
        </h1>
        <p className="text-dark-text-secondary text-sm mt-1">Detailed performance insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-dark-card border border-dark-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><Eye size={20} /></div>
            <div>
              <p className="text-xs text-dark-text-muted">Total Views</p>
              <p className="text-2xl font-bold text-dark-text">{data.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 rounded-2xl bg-dark-card border border-dark-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center"><Users size={20} /></div>
            <div>
              <p className="text-xs text-dark-text-muted">Total Visitors</p>
              <p className="text-2xl font-bold text-dark-text">{data.totalVisitors.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views by Month */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl bg-dark-card border border-dark-border">
          <h3 className="text-sm font-semibold text-dark-text mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" /> Monthly Views
          </h3>
          <div className="flex items-end gap-2 h-48">
            {data.viewsByMonth.map((m, i) => (
              <motion.div key={m.month} initial={{ height: 0 }} animate={{ height: `${(m.views / 3500) * 100}%` }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary/80 relative group cursor-pointer">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-dark-bg border border-dark-border text-[10px] text-dark-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {m.views}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {data.viewsByMonth.map((m) => (
              <span key={m.month} className="text-[10px] text-dark-text-muted flex-1 text-center">{m.month}</span>
            ))}
          </div>
        </motion.div>

        {/* Top Pages */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-2xl bg-dark-card border border-dark-border">
          <h3 className="text-sm font-semibold text-dark-text mb-4 flex items-center gap-2">
            <Globe size={16} className="text-accent" /> Top Pages
          </h3>
          <div className="space-y-3">
            {data.viewsByPage.map((p, i) => (
              <div key={p.page}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-dark-text-secondary">{p.page}</span>
                  <span className="text-dark-text font-medium">{p.views.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-dark-bg rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(p.views / data.viewsByPage[0].views) * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Referrers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-2xl bg-dark-card border border-dark-border lg:col-span-2">
          <h3 className="text-sm font-semibold text-dark-text mb-4">Traffic Sources</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {data.topReferrers.map((ref, i) => (
              <motion.div key={ref.source} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-4 rounded-xl bg-dark-bg border border-dark-border text-center">
                <p className="text-lg font-bold text-dark-text">{ref.visits.toLocaleString()}</p>
                <p className="text-xs text-dark-text-muted mt-1">{ref.source}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
