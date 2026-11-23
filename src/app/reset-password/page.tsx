"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Lock, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirm) setDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg relative overflow-hidden px-4">
      <div className="dot-grid" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-dark-text-muted hover:text-primary text-sm mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Login
        </Link>
        <div className="p-8 rounded-2xl glass border border-dark-border">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-primary/20">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl font-bold text-dark-text">Reset Password</h1>
            <p className="text-dark-text-secondary text-sm mt-1">Create a new password</p>
          </div>

          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <CheckCircle size={48} className="text-success mx-auto mb-4" />
              <p className="text-dark-text-secondary text-sm mb-6">Your password has been reset successfully!</p>
              <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm">
                Sign In →
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-dark-text mb-2">New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text-muted" />
                  <input id="new-password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm placeholder:text-dark-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-text-muted hover:text-dark-text transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-dark-text mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text-muted" />
                  <input id="confirm-password" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm placeholder:text-dark-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all" placeholder="••••••••" />
                </div>
                {confirm && password !== confirm && (
                  <p className="text-error text-xs mt-1">Passwords do not match</p>
                )}
              </div>
              <motion.button type="submit" disabled={password !== confirm || !password} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:shadow-xl hover:shadow-primary/25 transition-all disabled:opacity-50">
                Reset Password
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
