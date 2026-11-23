"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import SectionParticles from "@/components/ui/section-particles";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
  scoreLabel?: string;
}

const educationData: EducationItem[] = [
  {
    degree: "B.Tech CSE (Cyber Security)",
    institution: "IES College of Technology, Bhopal",
    location: "Bhopal, Madhya Pradesh",
    duration: "2022 - 2026",
    score: "CGPA: 7.6",
    scoreLabel: "Cumulative GPA",
  },
  {
    degree: "Class XII Science",
    institution: "Guru Govind Singh Public School, Bokaro",
    location: "Bokaro, Jharkhand",
    duration: "2020 - 2022",
    score: "77%",
    scoreLabel: "Board Percentage",
  },
  {
    degree: "Class X",
    institution: "DAV Public School, Dhori",
    location: "Dhori, Jharkhand",
    duration: "2019 - 2020",
    score: "71%",
    scoreLabel: "Board Percentage",
  },
];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="education" className="section-padding relative scroll-mt-28">
      <SectionParticles variant="mixed" />
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-primary text-[14px] font-semibold uppercase tracking-[0.2em] block mb-4">
            Academic Journey
          </span>
          <h2 className="mb-6">
            My <span className="gradient-text">Education</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Animated vertical timeline gradient line */}
          <motion.div
            className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[3px] -translate-x-1/2 origin-top rounded-full"
            style={{
              background: "linear-gradient(to bottom, #7B2FF7, #A66DFA, #BDF2D5)",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <div className="flex flex-col gap-14 md:gap-16">
            {educationData.map((item, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={item.degree + item.institution}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  className="relative flex items-start md:justify-between"
                >
                  {/* Timeline Node Icon/Dot */}
                  <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 top-6 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 300, damping: 20 }}
                      className="w-11 h-11 rounded-full bg-dark-card border-[3px] border-purple flex items-center justify-center text-purple shadow-[0_0_20px_rgba(123,47,247,0.35)]"
                    >
                      <GraduationCap size={18} />
                    </motion.div>
                  </div>

                  {/* Card Container */}
                  <div
                    className={`flex-1 min-w-0 ml-[52px] sm:ml-[60px] md:ml-0 md:flex-initial md:w-[calc(50%-40px)] ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.015 }}
                      className="group relative rounded-[28px] bg-dark-card border border-dark-border shadow-md hover:border-primary/40 transition-all neon-border p-7 sm:p-9 md:p-10"
                    >
                      {/* Top Accent Line */}
                      <div
                        className="absolute top-0 left-8 right-8 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: "linear-gradient(90deg, transparent, #7B2FF7, #BDF2D5, transparent)",
                        }}
                      />

                      {/* Header with Degree & Institution */}
                      <div className="flex items-start gap-4 sm:gap-5 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-hover:scale-105 p-2.5">
                          <GraduationCap size={24} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[19px] sm:text-[21px] font-bold text-dark-text group-hover:text-primary transition-colors">
                            {item.degree}
                          </h3>
                          <p className="text-[14.5px] sm:text-[15.5px] font-medium text-dark-text-secondary mt-1.5">
                            {item.institution}
                          </p>
                        </div>
                      </div>

                      {/* Meta Information (Duration & Location) */}
                      <div className="flex flex-wrap items-center gap-3.5 text-[13.5px] mb-6">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text font-medium">
                          <Calendar size={13} className="text-primary shrink-0" />
                          {item.duration}
                        </span>
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-dark-bg border border-dark-border text-dark-text font-medium">
                          <MapPin size={13} className="text-primary shrink-0" />
                          {item.location}
                        </span>
                      </div>

                      {/* Score Highlight with Award Icon */}
                      <div className="flex items-center justify-between pt-5 border-t border-dark-border/60">
                        <span className="text-[13.5px] text-dark-text-muted font-semibold uppercase tracking-wider">
                          {item.scoreLabel || "Score"}
                        </span>
                        <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-primary/10 border border-primary/25 text-primary font-bold text-[15px] shadow-sm">
                          <Award size={16} />
                          <span>{item.score}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
