"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useTheme } from "@/components/theme-provider";
import {
  LayoutDashboard, BarChart3, FolderKanban, FileText, MessageSquare,
  UserCircle, Bell, Shield, Users, LogOut, Menu, X, Sun, Moon,
  ChevronRight, Home,
} from "lucide-react";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Blogs", href: "/dashboard/blogs", icon: FileText },
  { label: "Contacts", href: "/dashboard/contacts", icon: MessageSquare },
  { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Roles", href: "/dashboard/roles", icon: Shield },
  { label: "Users", href: "/dashboard/users", icon: Users },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-dark-text-muted text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-dark-border bg-dark-bg transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-dark-border">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
            P
          </div>
          {!collapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-sm">
              <span className="text-dark-text">Prem</span>{" "}
              <span className="gradient-text">OS</span>
            </motion.span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-dark-text-secondary hover:text-dark-text hover:bg-dark-card"
                  }`}
                  title={collapsed ? link.label : undefined}
                >
                  <link.icon size={18} className="flex-shrink-0" />
                  {!collapsed && <span>{link.label}</span>}
                  {!collapsed && isActive && (
                    <ChevronRight size={14} className="ml-auto opacity-50" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-dark-border space-y-1">
          <Link href="/">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-dark-text-secondary hover:text-dark-text hover:bg-dark-card transition-all">
              <Home size={18} />
              {!collapsed && <span>View Site</span>}
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-dark-text-secondary hover:text-error hover:bg-error/10 transition-all w-full"
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-dark-bg border-r border-dark-border z-50 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-dark-border">
                <span className="font-bold"><span className="gradient-text">Dashboard</span></span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-dark-card">
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setSidebarOpen(false)}>
                      <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive ? "bg-primary/10 text-primary" : "text-dark-text-secondary hover:text-dark-text hover:bg-dark-card"
                      }`}>
                        <link.icon size={18} />
                        <span>{link.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-dark-border">
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-error hover:bg-error/10 transition-all w-full">
                  <LogOut size={18} /><span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 border-b border-dark-border flex items-center justify-between px-4 lg:px-6 bg-dark-bg/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-card text-dark-text-secondary"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-dark-card text-dark-text-secondary"
            >
              <Menu size={18} />
            </button>
            <div className="hidden sm:block">
              <p className="text-xs text-dark-text-muted">Welcome back,</p>
              <p className="text-sm font-medium text-dark-text">{user.name || user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl text-dark-text-secondary hover:text-dark-text hover:bg-dark-card transition-all">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/dashboard/notifications" className="relative p-2.5 rounded-xl text-dark-text-secondary hover:text-dark-text hover:bg-dark-card transition-all">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
            </Link>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              {(user.name || user.email).charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
