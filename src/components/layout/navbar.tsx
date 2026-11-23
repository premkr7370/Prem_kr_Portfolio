"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  Download,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import Link from "next/link";
import { MusicControls, MusicAudioElement } from "@/components/ui/music-player";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
      if (window.scrollY < 80) setActiveSection("home");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Hidden audio element */}
      <MusicAudioElement />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md shadow-md border-b border-dark-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] h-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-3 group relative z-10 shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-mint flex items-center justify-center font-bold text-white text-base shadow-md group-hover:shadow-purple/30 group-hover:shadow-lg transition-all duration-300">
              P
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple to-mint opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -z-10" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:flex items-center">
              <span className="text-dark-text">Prem</span>
              <span className="gradient-text ml-1.5">Kumar</span>
            </span>
          </Link>

          {/* Nav Links — Centered */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-7 2xl:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link-underline relative text-[14px] font-medium transition-all duration-300 text-glow-hover whitespace-nowrap py-1 ${
                    isActive
                      ? "text-purple active font-semibold"
                      : "text-dark-text-secondary hover:text-dark-text"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 relative z-10 shrink-0">
            {/* Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-medium text-dark-text-secondary hover:text-purple hover:bg-purple/10 border border-transparent hover:border-purple/20 transition-all duration-300"
              aria-label="Open Resume PDF"
            >
              <Download size={15} />
              <span>Resume</span>
            </a>

            {/* Music Controls */}
            <MusicControls />

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-dark-text-secondary hover:text-dark-text hover:bg-dark-card/60 border border-transparent hover:border-dark-border transition-all duration-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} className="text-warning" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} className="text-purple" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Hire Me CTA */}
            <a href="#contact" className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cta-nav animate-glow-pulse"
              >
                <Sparkles size={15} />
                <span>Hire Me</span>
              </motion.button>
            </a>

            {/* Mobile Hamburger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-dark-text-secondary hover:text-dark-text hover:bg-dark-card/60 border border-transparent hover:border-dark-border transition-all duration-300"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-[320px] max-w-[85vw] bg-dark-bg/95 backdrop-blur-2xl border-l border-dark-border z-50 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 border-b border-dark-border/50 h-[72px]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple to-mint flex items-center justify-center font-bold text-white text-sm">
                    P
                  </div>
                  <span className="font-bold text-base gradient-text">Menu</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-dark-text-secondary hover:text-dark-text hover:bg-dark-card transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Drawer Nav Links */}
              <div className="flex-1 overflow-y-auto py-5 px-4 space-y-1.5">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.04 }}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                        isActive
                          ? "bg-purple/15 text-purple border border-purple/25 font-semibold"
                          : "text-dark-text-secondary hover:text-dark-text hover:bg-dark-card/60"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-purple shadow-sm shadow-purple/50" />
                      )}
                    </motion.a>
                  );
                })}

                {/* Resume in mobile drawer */}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + navLinks.length * 0.04 }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium text-dark-text-secondary hover:text-purple hover:bg-purple/10 transition-all border border-dashed border-dark-border mt-3"
                >
                  <span className="flex items-center gap-2">
                    <Download size={16} className="text-purple" />
                    Resume (PDF)
                  </span>
                  <span className="text-[12px] uppercase tracking-wider text-purple font-semibold">View</span>
                </motion.a>
              </div>

              {/* Drawer Bottom Controls */}
              <div className="p-4 border-t border-dark-border/50 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-dark-border bg-dark-card/50 text-dark-text-secondary text-[13px] font-medium hover:text-dark-text hover:bg-dark-card transition-all"
                  >
                    {theme === "dark" ? <Sun size={15} className="text-warning" /> : <Moon size={15} className="text-purple" />}
                    <span>{theme === "dark" ? "Light" : "Dark"}</span>
                  </button>
                  <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-dark-border bg-dark-card/50 text-dark-text-secondary text-[13px] font-medium">
                    <MusicControls />
                  </div>
                </div>

                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  <button className="w-full btn-primary h-[46px]">
                    <Sparkles size={16} />
                    Hire Me
                  </button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
