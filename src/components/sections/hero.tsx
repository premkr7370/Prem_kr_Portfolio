"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Download, Sparkles, Rocket, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/theme-provider";

const HeroScene = dynamic(() => import("@/components/ui/hero-scene"), {
  ssr: false,
});

const roles = [
  "Full Stack AI Developer",
  "Full Stack Developer",
  "Backend Developer",
  "MERN Stack Developer",
];

const floatingBadgesData = [
  { label: "React", lightColor: "#61DAFB", darkColor: "#61DAFB", delay: 0, position: { top: "-4%", right: "8%" } },
  { label: "Node.js", lightColor: "#68A063", darkColor: "#68A063", delay: 1.2, position: { top: "16%", left: "-4%" } },
  { label: "MongoDB", lightColor: "#47A248", darkColor: "#47A248", delay: 2.4, position: { bottom: "12%", left: "-2%" } },
  { label: "TypeScript", lightColor: "#3178C6", darkColor: "#3178C6", delay: 3.6, position: { top: "42%", right: "-4%" } },
  { label: "Express.js", lightColor: "#2B2B2B", darkColor: "#F5F5F5", delay: 4.8, position: { bottom: "-4%", right: "10%" } },
];

const socialLinks = [
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
  {
    icon: Mail,
    href: "mailto:kumarmehta7370@gmail.com",
    label: "Email",
    lightColor: "#7B2FF7",
    darkColor: "#7B2FF7",
  },
];

const floatingCodeIcons = [
  { symbol: "⚛️", top: "15%", left: "8%", duration: 7, rotate: 10 },
  { symbol: "{ }", top: "70%", left: "5%", duration: 9, rotate: -5 },
  { symbol: "</>", top: "25%", right: "6%", duration: 8, rotate: 8 },
  { symbol: "λ", top: "80%", right: "10%", duration: 10, rotate: -12 },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 30;
      const y = (e.clientY - rect.top - rect.height / 2) / 30;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentRole) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    if (isDeleting && displayText === "") {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 400);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-28"
    >
      {/* Three.js Background */}
      <HeroScene />

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-bg" />

        {/* Animated Gradient Blobs — purple/mint */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] w-[500px] h-[500px] rounded-full opacity-25 blur-[120px]"
          style={{ background: "radial-gradient(circle, #7B2FF7, transparent)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-[15%] w-[420px] h-[420px] rounded-full opacity-20 blur-[110px]"
          style={{ background: "radial-gradient(circle, #BDF2D5, transparent)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, #A66DFA, transparent)" }}
        />

        {/* Shooting Stars */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`star-${i}`}
            className={i % 2 === 0 ? "shooting-star" : "shooting-star-2"}
            style={{
              top: `${12 + i * 20}%`,
              left: `${-10 + i * 15}%`,
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${2.2 + i * 0.6}s`,
            }}
          />
        ))}

        {/* Floating Code Icons */}
        {floatingCodeIcons.map((icon, i) => (
          <motion.div
            key={`code-icon-${i}`}
            className="absolute text-2xl md:text-3xl opacity-[0.08] pointer-events-none select-none"
            style={{
              top: icon.top,
              left: icon.left,
              right: (icon as { right?: string }).right,
            }}
            animate={{ y: [0, -25, 0], rotate: [0, icon.rotate, 0] }}
            transition={{
              duration: icon.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
          >
            {icon.symbol}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div
        className="section-container relative z-10 w-full pt-[140px] pb-[100px] sm:pt-[150px] sm:pb-[110px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Left Column — Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-dark-card/80 border border-dark-border mb-8 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mint" />
              </span>
              <span className="text-[14px] font-medium text-dark-text-secondary">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p
                className="text-dark-text-secondary font-medium text-[20px] sm:text-[22px] mb-3"
              >
                Hi, I&apos;m
              </p>
              <h1 className="mb-6">
                <span className="gradient-text-hero">Prem Kumar</span>
              </h1>
            </motion.div>

            {/* Animated Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-7 min-h-[34px]"
            >
              <span className="text-[20px] font-mono font-semibold text-purple">
                &lt;
              </span>
              <span className="text-[20px] font-mono text-dark-text min-h-[30px] font-semibold">
                {displayText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-6 bg-purple inline-block"
              />
              <span className="text-[20px] font-mono font-semibold text-purple">
                /&gt;
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-dark-text-secondary mx-auto lg:mx-0 text-[18px] sm:text-[19px] leading-[1.8] max-w-[620px] mb-10"
            >
              Full Stack AI Developer building intelligent applications, scalable
              backend systems, and modern digital experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 mb-11"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                <Sparkles size={16} />
                <span>Explore My Work</span>
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download="Prem-Kumar-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline neon-border"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="flex items-center justify-center lg:justify-start gap-3.5"
            >
              {socialLinks.map((social, i) => {
                const hoverColor = isDark ? social.darkColor : social.lightColor;
                return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.08 }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[46px] h-[46px] rounded-2xl bg-dark-card/80 border border-dark-border flex items-center justify-center text-dark-text-muted transition-all duration-300 shadow-sm"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = hoverColor;
                    el.style.borderColor = `${hoverColor}50`;
                    el.style.boxShadow = `0 0 25px ${hoverColor}25`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "";
                    el.style.borderColor = "";
                    el.style.boxShadow = "";
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={19} />
                </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column — Cartoon Workspace with Floating Badges & Parallax */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex items-center justify-center order-1 lg:order-2"
            style={{ x: springX, y: springY }}
          >
            {/* Background Glow */}
            <div
              className="absolute w-[350px] h-[350px] md:w-[460px] md:h-[460px] rounded-full blur-[100px] opacity-30"
              style={{
                background:
                  "radial-gradient(circle, #7B2FF7 0%, #BDF2D5 50%, transparent 70%)",
              }}
            />

            {/* Orbiting Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] md:w-[530px] md:h-[530px] rounded-full border border-dashed border-dark-border/30 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[600px] md:h-[600px] rounded-full border border-dotted border-dark-border/20 pointer-events-none"
            />

            {/* Workspace Image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[260px] h-[260px] min-[380px]:w-[310px] min-[380px]:h-[310px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] max-w-full"
            >
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden"
                animate={{ scale: [1, 1.015, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/images/cartoon-workspace.png"
                  alt="Prem Kumar - Developer Workspace"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Floating Tech Badges */}
              {floatingBadgesData.map((badge, i) => {
                const badgeColor = isDark ? badge.darkColor : badge.lightColor;
                return (
                <motion.div
                  key={badge.label}
                  animate={{
                    y: [0, -12, 0],
                    x: [0, i % 2 === 0 ? 5 : -5, 0],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: badge.delay * 0.25,
                    ease: "easeInOut",
                  }}
                  className="absolute z-10 px-3.5 py-2 rounded-xl text-[13px] font-semibold glass-strong border shadow-lg backdrop-blur-xl pointer-events-none select-none"
                  style={{
                    ...badge.position,
                    color: badgeColor,
                    borderColor: `${badgeColor}30`,
                    boxShadow: `0 0 20px ${badgeColor}15, 0 4px 12px rgba(0,0,0,0.25)`,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shadow-sm"
                      style={{ background: badgeColor }}
                    />
                    {badge.label}
                  </span>
                </motion.div>
                );
              })}

              {/* Floating Rocket */}
              <motion.div
                animate={{
                  y: [0, -90],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, -6, -12],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 6,
                  ease: "easeOut",
                }}
                className="absolute top-6 right-2 text-2xl pointer-events-none"
              >
                <Rocket size={24} className="text-purple-light" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-dark-text-muted font-medium">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-dark-text-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
