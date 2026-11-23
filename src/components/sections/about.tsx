"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Briefcase,
  Code2,
  Heart,
} from "lucide-react";
import SectionParticles from "@/components/ui/section-particles";

const stats = [
  { label: "Projects Built", value: "5+", icon: Briefcase, color: "#7B2FF7" },
  { label: "Problems Solved", value: "760+", icon: Code2, color: "#7B2FF7" },
  { label: "Months Experience", value: "3+", icon: Calendar, color: "#A66DFA" },
];

const infoItems = [
  {
    icon: MapPin,
    color: "#7B2FF7",
    label: "Location",
    value: "Bangalore, India",
  },
  {
    icon: GraduationCap,
    color: "#7B2FF7",
    label: "Education",
    value: "B.Tech CSE Cyber Security — CGPA: 7.6",
  },
  {
    icon: Heart,
    color: "#A66DFA",
    label: "Passion",
    value: "Creating scalable web apps & solving DSA",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="about" className="section-padding relative scroll-mt-28">
      <SectionParticles variant="purple" />
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span
            className="text-purple text-[14px] font-semibold uppercase tracking-[0.2em] block mb-4"
          >
            Get to know me
          </span>
          <h2 className="mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-purple to-mint rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 items-stretch gap-8 lg:gap-12">
          {/* Left Column — Summary & Info (3/5) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-between"
          >
            {/* Bio Card */}
            <div className="rounded-[40px] bg-dark-card border border-dark-border shadow-md neon-border p-7 sm:p-9 md:p-11 mb-8">
              <div className="flex flex-col gap-6">
                <p className="text-[16.5px] sm:text-[17.5px] md:text-[18px] leading-[1.85] text-dark-text-secondary">
                  I am a <span className="font-bold text-dark-text">Full Stack AI Developer</span> pursuing my{" "}
                  <span className="font-semibold text-purple" style={{ textDecoration: "underline", textDecorationColor: "rgba(123,47,247,0.3)", textUnderlineOffset: "3px" }}>
                    B.Tech in Computer Science &amp; Engineering (Cyber Security)
                  </span>
                  , graduating in{" "}
                  <span className="font-bold text-purple">
                    2026
                  </span>
                  . I have a solid foundation in computer science fundamentals, secure system architecture, and modern full-stack engineering.
                </p>
                <p className="text-[16.5px] sm:text-[17.5px] md:text-[18px] leading-[1.85] text-dark-text-secondary">
                  With hands-on{" "}
                  <span className="font-semibold text-purple" style={{ textDecoration: "underline", textDecorationColor: "rgba(123,47,247,0.3)", textUnderlineOffset: "3px" }}>
                    Full Stack Developer internship experience
                  </span>
                  , I specialize in building scalable web applications using{" "}
                  <span className="font-semibold text-dark-text">React.js, Node.js, Express.js, and MongoDB</span>.
                  I have built multiple production-ready full-stack applications with{" "}
                  <span className="font-semibold text-dark-text">JWT auth, RBAC (Role-Based Access Control)</span>, and resilient database workflows,
                  as well as an end-to-end booking platform using{" "}
                  <span className="font-semibold text-purple">
                    Next.js, TypeScript, and PostgreSQL
                  </span>
                  .
                </p>
                <p className="text-[16.5px] sm:text-[17.5px] md:text-[18px] leading-[1.85] text-dark-text-secondary">
                  Passionate about competitive programming and efficient system design, I have solved over{" "}
                  <span className="font-bold text-purple">
                    760+ DSA problems
                  </span>
                  , including{" "}
                  <span className="font-semibold text-dark-text">260+ LeetCode</span> and{" "}
                  <span className="font-semibold text-dark-text">500+ GFG (GeeksforGeeks)</span> challenges.
                </p>
              </div>
            </div>

            {/* Info Cards — Standardized */}
            <div className="flex flex-col gap-4">
              {infoItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4.5 p-4.5 sm:p-5.5 rounded-2xl bg-dark-card border border-dark-border shadow-xs hover:border-purple/30 transition-all duration-300 group"
                >
                  <div
                    className="flex items-center justify-center rounded-xl transition-transform duration-300 shrink-0 group-hover:scale-105"
                    style={{
                      width: 48,
                      height: 48,
                      background: `${item.color}18`,
                      color: item.color,
                    }}
                  >
                    <item.icon size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] text-dark-text-muted font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-[15.5px] sm:text-[16.5px] font-semibold text-dark-text leading-snug">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Stat Cards (2/5) Vertically Aligned */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col lg:justify-between gap-5 h-full"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative rounded-[28px] bg-dark-card border border-dark-border hover:border-purple/30 shadow-md transition-all text-center group neon-border p-7 sm:p-8 md:p-10 flex-1 flex flex-col items-center justify-center"
              >
                <div
                  className="rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-105 mb-4"
                  style={{ width: 58, height: 58, background: `${stat.color}15`, color: stat.color }}
                >
                  <stat.icon size={25} />
                </div>
                <p className="font-bold gradient-text text-3xl sm:text-4xl md:text-[42px] mb-2 leading-none">
                  {stat.value}
                </p>
                <p className="text-[12.5px] text-dark-text-muted font-semibold uppercase tracking-[0.16em]">{stat.label}</p>

                <div
                  className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl pointer-events-none"
                  style={{ background: `${stat.color}08` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
