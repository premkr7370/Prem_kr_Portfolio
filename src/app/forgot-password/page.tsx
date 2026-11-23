"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
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
              <Mail size={24} />
            </div>
            <h1 className="text-2xl font-bold text-dark-text">Forgot Password</h1>
            <p className="text-dark-text-secondary text-sm mt-1">
              {sent ? "Check your email for a reset link" : "Enter your email to receive a reset link"}
            </p>
          </div>

          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <CheckCircle size={48} className="text-success mx-auto mb-4" />
              <p className="text-dark-text-secondary text-sm mb-6">
                If an account exists with <span className="text-dark-text font-medium">{email}</span>, you will receive a password reset link.
              </p>
              <Link href="/login" className="text-primary hover:text-primary-light text-sm font-medium transition-colors">
                Return to Login →
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-dark-text mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text-muted" />
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-bg border border-dark-border text-dark-text text-sm placeholder:text-dark-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:shadow-xl hover:shadow-primary/25 transition-all"
              >
                <Send size={16} /> Send Reset Link
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
