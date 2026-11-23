"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

const certifications = [
  { title: "Full Stack Web Development", issuer: "A2Infotech Pvt. Ltd.", date: "March 2026", color: "#7C3AED" },
  { title: "MERN Stack Development", issuer: "Online Certification", date: "December 2025", color: "#2563EB" },
  { title: "Data Structures & Algorithms", issuer: "GeeksforGeeks", date: "August 2025", color: "#06B6D4" },
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-padding relative bg-dark-bg-secondary/30">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 64 }}
        >
          <span className="text-primary text-[14px] font-semibold uppercase tracking-[0.2em] block" style={{ marginBottom: 16 }}>
            Credentials
          </span>
          <h2 style={{ marginBottom: 24 }}>
            My <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto" style={{ gap: 24 }}>
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-[24px] bg-dark-card border border-dark-border hover:border-primary/30 transition-all neon-border overflow-hidden"
              style={{ padding: 32 }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
              />

              <motion.div
                className="w-[52px] h-[52px] rounded-xl group-hover:scale-110 flex items-center justify-center transition-all duration-300"
                style={{
                  background: `${cert.color}12`,
                  color: cert.color,
                  marginBottom: 20,
                }}
              >
                <Award size={24} />
              </motion.div>
              <h3 className="text-[17px] font-bold text-dark-text group-hover:text-primary transition-colors" style={{ marginBottom: 8 }}>
                {cert.title}
              </h3>
              <p className="text-[15px] text-dark-text-secondary" style={{ marginBottom: 8 }}>{cert.issuer}</p>
              <p className="text-[13px] text-dark-text-muted">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
