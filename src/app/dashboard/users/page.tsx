"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, Plus, Edit, Trash2, Shield } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const roleColors: Record<string, string> = {
  owner: "#6366F1",
  admin: "#8B5CF6",
  editor: "#06B6D4",
  viewer: "#64748B",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(d => { setUsers(d); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark-text flex items-center gap-2">
            <Users className="text-primary" size={24} /> User Management
          </h1>
          <p className="text-dark-text-secondary text-sm mt-1">{users.length} registered users</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm">
          <Plus size={16} /> Add User
        </motion.button>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(2)].map((_, i) => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>
      ) : (
        <div className="rounded-2xl bg-dark-card border border-dark-border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-dark-border text-xs font-semibold text-dark-text-muted uppercase tracking-wider">
            <div className="col-span-1">Avatar</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Role</div>
            <div className="col-span-2">Joined</div>
            <div className="col-span-1">Actions</div>
          </div>
          {users.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 gap-4 p-4 border-b border-dark-border last:border-b-0 items-center hover:bg-dark-bg/50 transition-colors">
              <div className="col-span-1">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                  {u.name.charAt(0)}
                </div>
              </div>
              <div className="col-span-3">
                <p className="text-sm font-medium text-dark-text">{u.name}</p>
              </div>
              <div className="col-span-3">
                <p className="text-sm text-dark-text-secondary truncate">{u.email}</p>
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-medium capitalize"
                  style={{ background: `${roleColors[u.role] || "#64748B"}15`, color: roleColors[u.role] || "#64748B" }}>
                  <Shield size={10} /> {u.role}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-dark-text-muted">
                  {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
