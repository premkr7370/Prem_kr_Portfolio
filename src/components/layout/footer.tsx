"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, ArrowUp, ExternalLink, Download, Code2 } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { useTheme } from "@/components/theme-provider";

const socialLinksData = [
  {
    icon: FaGithub,
    href: "https://github.com/premkr7370",
    label: "GitHub",
    lightColor: "#333333",
    darkColor: "#E6EDF3",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/prem-kumar-079100244/",
    label: "LinkedIn",
    lightColor: "#0A66C2",
    darkColor: "#0A66C2",
  },
  {
    icon: SiLeetcode,
    href: "https://leetcode.com/u/averageCoder7370/",
    label: "LeetCode",
    lightColor: "#FFA116",
    darkColor: "#FFA116",
  },
  {
    icon: SiGeeksforgeeks,
    href: "https://www.geeksforgeeks.org/profile/premkrma",
    label: "GFG",
    lightColor: "#2F8D46",
    darkColor: "#2F8D46",
  },
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-dark-border bg-dark-bg-secondary/40 overflow-hidden"
      ref={ref}
    >
      {/* Top gradient highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple/40 to-transparent" />

      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[160px] opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #7B2FF7, #BDF2D5, transparent)",
        }}
      />

      <div
        className="section-container relative pt-24 pb-14"
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 mb-16"
        >
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div
              className="flex items-center gap-4 mb-5"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple via-purple-light to-mint flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-purple/20">
                P
              </div>
              <span className="font-bold text-xl tracking-tight">
                Prem <span className="gradient-text">Kumar</span>
              </span>
            </div>

            <div
              className="inline-flex items-center text-xs font-mono font-medium text-purple bg-purple/10 border border-purple/20 px-3.5 py-1.5 rounded-full gap-2 mb-5"
            >
              <Code2 size={14} className="text-purple" />
              <span>Full Stack AI Developer</span>
            </div>

            <p
              className="text-dark-text-secondary text-[15.5px] leading-[1.8] mb-8 max-w-[460px]"
            >
              Passionate about building scalable full-stack web applications,
              crafting elegant APIs, solving complex algorithmic challenges, and
              delivering modern digital experiences.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3.5">
              {socialLinksData.map((social, i) => {
                const hoverColor = isDark ? social.darkColor : social.lightColor;
                return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-dark-card hover:bg-dark-card-hover border border-dark-border flex items-center justify-center text-dark-text-secondary transition-all duration-300"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = hoverColor;
                    (e.currentTarget as HTMLElement).style.borderColor =
                      `${hoverColor}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 0 15px ${hoverColor}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={19} />
                </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3
              className="font-semibold text-[13px] uppercase tracking-[0.18em] text-dark-text-muted mb-6"
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-dark-text-secondary hover:text-purple text-[15.5px] inline-flex items-center transition-colors group gap-2 py-0.5"
                  >
                    <ExternalLink
                      size={13}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Resume — NO PHONE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3
              className="font-semibold text-[13px] uppercase tracking-[0.18em] text-dark-text-muted mb-6"
            >
              Contact Info
            </h3>
            <div
              className="flex flex-col gap-5 text-[14.5px] text-dark-text-secondary"
            >
              <div>
                <span className="text-[11px] uppercase tracking-wider text-dark-text-muted block">
                  Location
                </span>
                <p className="text-dark-text font-medium mt-1">
                  Bangalore, India
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-dark-text-muted block">
                  Email
                </span>
                <a
                  href="mailto:kumarmehta7370@gmail.com"
                  className="text-dark-text hover:text-purple font-medium transition-colors break-all mt-1 block"
                >
                  kumarmehta7370@gmail.com
                </a>
              </div>

              {/* Resume Download */}
              <div className="pt-2">
                <a
                  href="/resume.pdf"
                  download="Prem_Kumar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4.5 py-3 rounded-xl bg-purple/10 border border-purple/20 text-purple text-[14px] font-medium hover:bg-purple/20 hover:border-purple/40 transition-all duration-300 shadow-sm"
                >
                  <Download size={15} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between border-t border-dark-border pt-8 mt-4 gap-4"
        >
          <p
            className="text-dark-text-muted text-[14px] flex items-center flex-wrap gap-1.5"
          >
            <span>&copy; {currentYear} Prem Kumar. Crafted with</span>
            <Heart size={14} className="text-red-500 fill-red-500 mx-0.5 inline shrink-0" />
            <span>and modern web technologies.</span>
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl bg-dark-card hover:bg-dark-card-hover border border-dark-border text-dark-text-secondary hover:text-purple transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
