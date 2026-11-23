"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bell, CheckCheck, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface Notification { id: string; title: string; message: string; type: string; read: boolean; createdAt: string; }

const typeIcons: Record<string, React.ElementType> = { info: Info, success: CheckCircle, warning: AlertTriangle, error: XCircle };
const typeColors: Record<string, string> = { info: "#3B82F6", success: "#22C55E", warning: "#F59E0B", error: "#EF4444" };

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications").then(r => r.json()).then(d => { setNotifications(d.notifications); setLoading(false); });
  }, []);

  const markAllRead = () => {
    fetch("/api/notifications", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ markAll: true }) });
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark-text flex items-center gap-2">
            <Bell className="text-primary" size={24} /> Notifications
          </h1>
          <p className="text-dark-text-secondary text-sm mt-1">
            {notifications.filter(n => !n.read).length} unread
          </p>
        </div>
        <button onClick={markAllRead}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-card border border-dark-border text-sm text-dark-text-secondary hover:text-primary hover:border-primary/30 transition-all">
          <CheckCheck size={16} /> Mark all read
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)}</div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n, i) => {
            const Icon = typeIcons[n.type] || Info;
            const color = typeColors[n.type] || "#3B82F6";
            return (
              <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-xl border transition-all ${n.read ? "bg-dark-card border-dark-border" : "bg-dark-card border-primary/20"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15`, color }}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-dark-text">{n.title}</h4>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <p className="text-xs text-dark-text-secondary mt-0.5">{n.message}</p>
                    <p className="text-[10px] text-dark-text-muted mt-1">
                      {new Date(n.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
