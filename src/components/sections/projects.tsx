"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, ChevronRight, X, Globe, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  category: string;
  slug: string;
  description: string;
  techStack: string[];
  features: string[];
  liveUrl: string;
  repoUrl: string;
  screenshot: string;
  accent: string;
}

const projects: Project[] = [
  {
    title: "QuickHammer",
    category: "Auction Bidding Platform",
    slug: "quickhammer",
    description:
      "Web application for running online auctions. Auctioneers list items, bidders place bids, super admin reviews commission proofs.",
    features: [
      "Auction item listing",
      "Real-time bidding",
      "Bidder/auctioneer roles",
      "Scheduling",
      "Leaderboard",
      "JWT auth",
      "Admin commission",
      "Email notifications",
    ],
    techStack: [
      "React.js",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Cloudinary",
      "Tailwind CSS",
    ],
    liveUrl: "https://quickhammer.netlify.app/",
    repoUrl: "https://github.com/premkr7370/Quick-Hammer",
    screenshot: "/images/projects/QuickHammer.jpg",
    accent: "#F59E0B",
  },
  {
    title: "AutoMate AI",
    category: "AI Agent Platform",
    slug: "automate-ai",
    description:
      "Full-stack AI productivity platform for creating/managing intelligent agents with AI model integrations, auth, payments.",
    features: [
      "AI agent creation",
      "AI conversations",
      "Groq/Gemini integration",
      "Vision",
      "Firebase auth",
      "OAuth",
      "Razorpay payments",
      "Integration management",
    ],
    techStack: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Groq API",
      "Gemini API",
      "Razorpay",
    ],
    liveUrl: "https://automate-ai-1-lbc2.onrender.com/",
    repoUrl: "https://github.com/premkr7370/Automate--ai",
    screenshot: "/images/projects/AutomateAI.jpg",
    accent: "#3B82F6",
  },
  {
    title: "QueueLess",
    category: "Services Booking & Queue Platform",
    slug: "queueless",
    description:
      "Smart local services marketplace with real-time virtual queues and appointment booking.",
    features: [
      "Business discovery",
      "Search/filtering",
      "Appointment booking",
      "Time-slot conflict detection",
      "Queue management",
      "Wait times",
      "Dashboards",
      "Commission tracking",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "Tailwind CSS",
      "Zod",
      "Vitest",
      "Playwright",
    ],
    liveUrl: "https://queueless-premkr.vercel.app/",
    repoUrl: "https://github.com/premkr7370/queueless",
    screenshot: "/images/projects/QueueLess.jpg",
    accent: "#22C55E",
  },
  {
    title: "ZeeCare",
    category: "Doctor Appointment System",
    slug: "zeecare",
    description:
      "Doctor appointment management with patient website, admin dashboard, and REST API.",
    features: [
      "Patient registration/login",
      "Doctor browsing",
      "Appointment booking",
      "Admin dashboard",
      "Doctor/appointment management",
      "Messaging",
    ],
    techStack: [
      "MERN Stack",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
    ],
    liveUrl: "https://doctor-appointment-prem.netlify.app/",
    repoUrl: "https://github.com/premkr7370/Zee-Health-Care",
    screenshot: "/images/projects/ZeeCare.jpg",
    accent: "#F43F5E",
  },
  {
    title: "Workbench RBAC Studio",
    category: "RBAC Platform",
    slug: "workbench-rbac-studio",
    description:
      "Modern RBAC management platform for creating/managing/visualizing user roles and permissions.",
    features: [
      "Custom role creation",
      "Permission builder",
      "Role assignment",
      "Multiple roles",
      "Permission resolution",
      "Visualization",
      "Admin dashboard",
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://the-internet-folks-assignment-pearl.vercel.app/",
    repoUrl: "https://github.com/premkr7370/The-Internet-Folks-Assignment",
    screenshot: "/images/projects/WorkBench.png",
    accent: "#7C3AED",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <section id="projects" className="section-padding relative scroll-mt-28">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-[14px] font-semibold uppercase tracking-[0.2em] block mb-4">
            My Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-dark-text">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        {/* Projects Grid — Equalized 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: "easeOut" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-haspopup="dialog"
              aria-label={`View details for ${project.title}`}
              className="tilt-card group cursor-pointer relative rounded-[28px] bg-dark-card border border-dark-border shadow-md overflow-hidden flex flex-col h-full w-full min-w-0 transition-all duration-300 hover:border-primary/40 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary"
            >
              {/* 1. Project Screenshot Container with consistent aspect ratio */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-dark-bg-secondary/40 shrink-0 border-b border-dark-border/40">
                <img
                  src={project.screenshot}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/cartoon-workspace.png";
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* 2. Category Badge — High Contrast */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/95 dark:bg-black/90 backdrop-blur-md border shadow-sm"
                    style={{
                      color: project.accent,
                      borderColor: `${project.accent}50`,
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* View Details hover prompt */}
                <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-xl text-white text-[13px] font-semibold px-4 py-2 shadow-lg transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: project.accent }}
                  >
                    View Details <ChevronRight size={15} />
                  </span>
                </div>
              </div>

              {/* Card Body — Structured Flexbox: Content (top/middle) + Footer (bottom) */}
              <div className="p-6 sm:p-7 md:p-8 flex flex-col flex-1 justify-between min-h-0 w-full">
                {/* 3 & 4. Title and Clamped Description */}
                <div>
                  <div className="flex items-center justify-between gap-2.5 mb-2.5">
                    <h3 className="min-w-0 flex-1 text-[21px] sm:text-[22px] font-bold text-dark-text group-hover:text-primary transition-colors tracking-tight leading-snug line-clamp-2">
                      {project.title}
                    </h3>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: project.accent }}
                      title={project.category}
                    />
                  </div>

                  <p className="text-[14.5px] sm:text-[15px] text-dark-text-secondary line-clamp-2 leading-[1.75] min-h-[48px] mb-4">
                    {project.description}
                  </p>
                </div>

                {/* 5. Technology Badges with proper wrapping */}
                <div className="pt-4 pb-4">
                  <div className="flex flex-wrap gap-2 min-h-[30px] items-center">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[12px] font-semibold rounded-lg bg-white dark:bg-dark-bg border border-dark-border text-dark-text px-3 py-1.5 shadow-2xs whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span
                        className="text-[12px] font-bold rounded-lg px-2.5 py-1.5 whitespace-nowrap"
                        style={{
                          backgroundColor: `${project.accent}18`,
                          color: project.accent,
                        }}
                      >
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* 6. Footer containing Live Demo and Source Code — pinned to bottom */}
                <div className="pt-5 border-t border-dark-border/60 flex items-center justify-between gap-3 mt-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[14px] text-primary hover:text-purple-hover font-semibold transition-colors shrink-0 py-1"
                  >
                    <Globe size={15} /> Live Demo <ExternalLink size={13} />
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[14px] text-dark-text hover:text-primary font-semibold transition-colors shrink-0 py-1"
                  >
                    <FaGithub size={15} /> Source Code <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Selected Project */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-project-title"
                className="neon-border bg-dark-card border border-dark-border rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Screenshot Banner */}
                <div className="relative h-[220px] sm:h-[280px] w-full overflow-hidden rounded-t-[23px] bg-dark-bg-secondary shrink-0">
                  <img
                    src={selectedProject.screenshot}
                    alt={`${selectedProject.title} full view`}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/cartoon-workspace.png";
                    }}
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider bg-white/95 dark:bg-black/90 backdrop-blur-md border shadow-md"
                      style={{
                        color: selectedProject.accent,
                        borderColor: `${selectedProject.accent}50`,
                      }}
                    >
                      {selectedProject.category}
                    </span>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/10 hover:scale-105"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-7 sm:p-9 md:p-10">
                  {/* Title and Category */}
                  <div className="mb-5">
                    <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-dark-text mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-[15px] text-primary font-semibold">
                      {selectedProject.category}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[15.5px] sm:text-[16.5px] text-dark-text-secondary leading-[1.8] mb-8">
                    {selectedProject.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-8">
                    <h4 className="text-[16.5px] font-bold text-dark-text mb-4">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="flex items-start gap-2.5 text-[14.5px] text-dark-text-secondary bg-dark-bg/60 border border-dark-border/60 rounded-xl p-3"
                        >
                          <ChevronRight
                            size={16}
                            className="shrink-0 mt-0.5"
                            style={{ color: selectedProject.accent }}
                          />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-9">
                    <h4 className="flex items-center gap-2 text-[16.5px] font-bold text-dark-text mb-4">
                      <Code2 size={16} className="text-primary" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[13px] font-semibold rounded-xl bg-dark-bg border border-dark-border text-dark-text px-3.5 py-2 flex items-center gap-2 shadow-xs"
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: selectedProject.accent }}
                          />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3.5 pt-4 border-t border-dark-border">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 justify-center font-semibold h-[52px]"
                    >
                      <Globe size={16} /> Live Demo <ExternalLink size={14} />
                    </a>
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex-1 justify-center font-semibold h-[52px]"
                    >
                      <FaGithub size={16} /> Source Code <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
