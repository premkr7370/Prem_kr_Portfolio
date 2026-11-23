"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import SectionParticles from "@/components/ui/section-particles";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer Intern",
    company: "A2Infotech Pvt. Ltd.",
    duration: "January 2026 – March 2026",
    location: "Bhopal, Madhya Pradesh",
    description:
      "Worked as a Full Stack Web Developer Intern, developing scalable web applications and REST APIs using the MERN stack.",
    responsibilities: [
      "Developed and maintained responsive web applications using React.js, Node.js, Express.js, and MongoDB.",
      "Designed and integrated RESTful APIs.",
      "Built reusable React.js UI components.",
      "Optimized application performance.",
      "Debugged frontend and backend issues.",
      "Tested APIs using Postman and browser developer tools.",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="experience" className="section-padding relative scroll-mt-28">
      <SectionParticles variant="purple" />
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-primary text-[14px] font-semibold uppercase tracking-[0.2em] block mb-4">
            Where I&apos;ve Worked
          </span>
          <h2 className="mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        {/* Centered Experience Card Container */}
        <div className="relative max-w-4xl mx-auto w-full" style={{ padding: "0 8px" }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
              className="relative w-full"
            >
              {/* Experience Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="rounded-[32px] bg-dark-card border-2 border-dark-border shadow-lg hover:border-primary/40 transition-all duration-300 neon-border group relative overflow-hidden w-full p-8 sm:p-11 md:p-14"
              >
                {/* Top Accent Gradient Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: "linear-gradient(90deg, #7B2FF7, #A66DFA, #BDF2D5)",
                  }}
                />

                {/* Header: Company & Internship Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5 mb-8 pb-6 border-b border-dark-border/50">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0 shadow-xs p-3">
                      <Briefcase size={24} />
                    </div>
                    <span className="min-w-0 text-xl sm:text-2xl font-bold text-dark-text group-hover:text-primary transition-colors leading-snug">
                      {exp.company}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shadow-xs shrink-0 self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Internship
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold text-dark-text tracking-tight mb-4">
                  {exp.role}
                </h3>

                {/* Metadata: Duration & Location Chips */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 text-xs sm:text-sm mb-7">
                  <span className="inline-flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl border border-dark-border text-dark-text font-medium shadow-xs">
                    <Calendar size={14} className="text-primary shrink-0" />
                    <span>{exp.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 bg-dark-bg px-4 py-2 rounded-xl border border-dark-border text-dark-text font-medium shadow-xs">
                    <MapPin size={14} className="text-primary shrink-0" />
                    <span>{exp.location}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-dark-text-secondary text-sm sm:text-base md:text-[17px] leading-[1.8] font-normal mb-8">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-dark-text-muted mb-4 flex items-center gap-2">
                    Key Responsibilities & Contributions
                  </h4>
                  <ul className="flex flex-col gap-4 pl-1">
                    {exp.responsibilities.map((resp, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -12 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + j * 0.08, duration: 0.4 }}
                        className="flex items-start gap-3.5 text-sm sm:text-[15.5px] text-dark-text-secondary leading-relaxed group/item hover:text-dark-text transition-colors"
                      >
                        <CheckCircle2 size={17} className="text-primary mt-1 shrink-0 group-hover/item:scale-110 transition-transform" />
                        <span>{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="pt-7 border-t border-dark-border/60">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-dark-text-muted mb-4">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/25 hover:border-primary/50 hover:bg-primary/20 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
