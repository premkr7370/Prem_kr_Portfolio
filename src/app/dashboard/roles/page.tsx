"use client";

import { motion } from "framer-motion";
import { Shield, Check, X } from "lucide-react";

const roles = [
  {
    name: "Owner",
    description: "Full access to all features and settings",
    permissions: ["all"],
    color: "#6366F1",
  },
  {
    name: "Admin",
    description: "Manage content, projects, and view analytics",
    permissions: ["manage_content", "manage_projects", "view_analytics"],
    color: "#8B5CF6",
  },
  {
    name: "Editor",
    description: "Create blogs, edit projects, upload content",
    permissions: ["create_blogs", "edit_projects", "upload_content"],
    color: "#06B6D4",
  },
  {
    name: "Viewer",
    description: "Read-only access to dashboard",
    permissions: ["read_only"],
    color: "#64748B",
  },
];

const allPermissions = [
  "manage_content",
  "manage_projects",
  "view_analytics",
  "create_blogs",
  "edit_projects",
  "upload_content",
  "manage_users",
  "manage_roles",
  "read_only",
];

export default function RolesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-text flex items-center gap-2">
          <Shield className="text-primary" size={24} /> Role Management
        </h1>
        <p className="text-dark-text-secondary text-sm mt-1">Configure roles and permissions</p>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {roles.map((role, i) => (
          <motion.div key={role.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-primary/20 transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${role.color}15`, color: role.color }}>
              <Shield size={20} />
            </div>
            <h3 className="font-semibold text-dark-text mb-1">{role.name}</h3>
            <p className="text-xs text-dark-text-secondary leading-relaxed">{role.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Permission Matrix */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="rounded-2xl bg-dark-card border border-dark-border overflow-x-auto">
        <div className="p-4 border-b border-dark-border">
          <h3 className="text-sm font-semibold text-dark-text">Permission Matrix</h3>
        </div>
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left p-4 text-xs font-semibold text-dark-text-muted uppercase tracking-wider">Permission</th>
              {roles.map(r => (
                <th key={r.name} className="text-center p-4 text-xs font-semibold uppercase tracking-wider" style={{ color: r.color }}>{r.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPermissions.map((perm) => (
              <tr key={perm} className="border-b border-dark-border last:border-b-0 hover:bg-dark-bg/50 transition-colors">
                <td className="p-4 text-sm text-dark-text-secondary capitalize">{perm.replace(/_/g, " ")}</td>
                {roles.map(role => {
                  const has = role.permissions.includes("all") || role.permissions.includes(perm);
                  return (
                    <td key={role.name} className="text-center p-4">
                      {has ? (
                        <span className="inline-flex w-6 h-6 rounded-full bg-success/10 items-center justify-center">
                          <Check size={14} className="text-success" />
                        </span>
                      ) : (
                        <span className="inline-flex w-6 h-6 rounded-full bg-dark-bg items-center justify-center">
                          <X size={14} className="text-dark-text-muted" />
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
