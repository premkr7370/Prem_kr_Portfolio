"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDocker,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiExpress,
  SiZod,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiPostman,
  SiVitest,
  SiCloudinary,
  SiVercel,
  SiNetlify,
  SiRender,
} from "react-icons/si";
import {
  Wind,
  Terminal,
  Database,
  Smartphone,
  Plug,
  Shield,
  KeyRound,
  ShieldCheck,
  Code2,
  BookOpen,
  Boxes,
  Monitor,
  Network,
  Cloud,
  Brain,
  Link as LinkIcon,
  FileSearch,
  Cuboid,
  Theater,
} from "lucide-react";
import SectionParticles from "@/components/ui/section-particles";

interface SkillItem {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface SkillCategory {
  key: string;
  label: string;
  color: string;
  skills: SkillItem[];
}

const categories: SkillCategory[] = [
  {
    key: "languages",
    label: "Programming Languages",
    color: "#3178C6",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "C++", icon: Wind, color: "#00599C" },
      { name: "C", icon: Terminal, color: "#A8B9CC" },
      { name: "SQL", icon: Database, color: "#336791" },
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    color: "#7C3AED",
    skills: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Responsive Design", icon: Smartphone, color: "#7C3AED" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    color: "#22C55E",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#68A063" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "REST APIs", icon: Plug, color: "#F59E0B" },
      { name: "JWT Auth", icon: Shield, color: "#EF4444" },
      { name: "OAuth", icon: KeyRound, color: "#22C55E" },
      { name: "RBAC", icon: ShieldCheck, color: "#3B82F6" },
      { name: "Zod", icon: SiZod, color: "#3E67B1" },
    ],
  },
  {
    key: "databases",
    label: "Databases & ORM",
    color: "#06B6D4",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Mongoose", icon: Database, color: "#880000" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Prisma ORM", icon: SiPrisma, color: "#2D3748" },
      { name: "SQL", icon: Database, color: "#336791" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    key: "tools",
    label: "Tools & Testing",
    color: "#F05032",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#333333" },
      { name: "Docker", icon: FaDocker, color: "#2496ED" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Vitest", icon: SiVitest, color: "#6E9F18" },
      { name: "Playwright", icon: Theater, color: "#2EAD33" },
      { name: "Cloudinary", icon: SiCloudinary, color: "#3448C5" },
      { name: "Vercel", icon: SiVercel, color: "#000000" },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
      { name: "Render", icon: SiRender, color: "#46E3B7" },
      { name: "VS Code", icon: Code2, color: "#007ACC" },
    ],
  },
  {
    key: "cs_fundamentals",
    label: "CS Fundamentals",
    color: "#F59E0B",
    skills: [
      { name: "DSA", icon: BookOpen, color: "#F59E0B" },
      { name: "OOP", icon: Boxes, color: "#7C3AED" },
      { name: "OS", icon: Monitor, color: "#22C55E" },
      { name: "Networks", icon: Network, color: "#3B82F6" },
      { name: "DBMS", icon: Database, color: "#06B6D4" },
      { name: "Cloud", icon: Cloud, color: "#FF6B6B" },
    ],
  },
  {
    key: "ai_llm",
    label: "AI & LLM Tools",
    color: "#8B5CF6",
    skills: [
      { name: "LLMs", icon: Brain, color: "#8B5CF6" },
      { name: "LangChain", icon: LinkIcon, color: "#1C3C3C" },
      { name: "RAG", icon: FileSearch, color: "#F59E0B" },
      { name: "Vector DBs", icon: Cuboid, color: "#06B6D4" },
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="skills" className="section-padding relative scroll-mt-28">
      <SectionParticles variant="mint" />
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-primary text-[14px] font-semibold uppercase tracking-[0.2em] block mb-4">
            What I Know
          </span>
          <h2 className="mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        {/* Categories Stack */}
        <div className="flex flex-col gap-12 md:gap-14">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.08, duration: 0.5 }}
              className="rounded-[30px] bg-dark-card border border-dark-border shadow-sm p-7 sm:p-9 md:p-11 neon-border transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-dark-border/60">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <motion.span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{
                      background: cat.color,
                      boxShadow: `0 0 12px ${cat.color}80`,
                    }}
                    animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: catIdx * 0.25,
                      ease: "easeInOut",
                    }}
                  />
                  <h3 className="text-xl sm:text-2xl font-bold text-dark-text tracking-tight">
                    {cat.label}
                  </h3>
                </div>

                <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary shrink-0 shadow-2xs">
                  {cat.skills.length} {cat.skills.length === 1 ? "skill" : "skills"}
                </span>
              </div>

              {/* Skills Grid — Standardized Responsive 6-column Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-5.5 items-stretch">
                {cat.skills.map((skill, i) => {
                  const IconComp = skill.icon;
                  const isPureBlack = skill.color === "#000000";
                  const isVeryDark = skill.color === "#333333" || skill.color === "#2D3748";
                  const isLangChain = skill.color === "#1C3C3C";

                  const iconColor = isLangChain
                    ? "#2DD4BF"
                    : (isPureBlack || isVeryDark) && isDark
                    ? "#F8FAFC"
                    : (isPureBlack || isVeryDark)
                    ? "#2B2B2B"
                    : skill.color;

                  const glowColor = isLangChain
                    ? "#2DD4BF"
                    : (isPureBlack || isVeryDark) && isDark
                    ? "#FFFFFF"
                    : (isPureBlack || isVeryDark)
                    ? "#555555"
                    : skill.color;

                  const iconBg = isLangChain
                    ? "rgba(45, 212, 191, 0.12)"
                    : (isPureBlack || isVeryDark) && isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : (isPureBlack || isVeryDark)
                    ? "rgba(43, 43, 43, 0.08)"
                    : `${skill.color}15`;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: catIdx * 0.06 + i * 0.02, duration: 0.3 }}
                      whileHover={{ y: -4, scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative rounded-2xl bg-white dark:bg-dark-card border border-dark-border hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-default p-4 sm:p-4.5 flex flex-col items-center justify-center text-center shadow-xs overflow-hidden h-[132px] sm:h-[136px] w-full min-w-0"
                    >
                      {/* Centered Icon */}
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5 mx-auto transition-transform duration-300 group-hover:scale-110 shadow-2xs shrink-0"
                        style={{
                          background: iconBg,
                          color: iconColor,
                        }}
                      >
                        <IconComp size={22} className="transition-transform duration-300 group-hover:rotate-6" />
                      </div>

                      {/* Centered Label */}
                      <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-dark-text tracking-wide text-center line-clamp-2 leading-snug max-w-full block w-full px-1.5">
                        {skill.name}
                      </span>

                      {/* Hover Glow Effect */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl pointer-events-none"
                        style={{ background: `${glowColor}15` }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
