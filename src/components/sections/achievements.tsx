"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code2, Trophy, Briefcase, Clock, Rocket } from "lucide-react";
import SectionParticles from "@/components/ui/section-particles";

interface AchievementItem {
  icon: typeof Code2;
  label: string;
  value: number | string;
  suffix: string;
  color: string;
}

const achievements: AchievementItem[] = [
  { icon: Code2, label: "LeetCode Problems", value: 260, suffix: "+", color: "#FFA116" },
  { icon: Trophy, label: "GFG Problems", value: 500, suffix: "+", color: "#2F8D46" },
  { icon: Briefcase, label: "Projects", value: 5, suffix: "+", color: "#7C3AED" },
  { icon: Clock, label: "Internship", value: 3, suffix: " Months", color: "#A66DFA" },
  { icon: Rocket, label: "Developer", value: "Full Stack AI", suffix: "", color: "#7B2FF7" },
];

function AnimatedCounter({
  value,
  suffix = "",
  inView,
}: {
  value: number | string;
  suffix?: string;
  inView: boolean;
}) {
  const isNumeric = typeof value === "number";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const target = isNumeric ? value : 100;
      const controls = animate(count, target, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value, isNumeric]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  if (!isNumeric) {
    return (
      <span>
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="achievements" className="section-padding relative scroll-mt-28">
      <SectionParticles variant="mixed" />
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
            Milestones
          </span>
          <h2 style={{ marginBottom: 24 }}>
            My <span className="gradient-text">Achievements</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" style={{ gap: 20 }}>
          {achievements.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.04 }}
              className={`group relative rounded-[24px] bg-dark-card border border-dark-border text-center transition-all hover:border-primary/30 neon-border overflow-hidden ${
                i === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
              style={{ padding: "32px 16px" }}
            >
              {/* Icon Container with Glow */}
              <div
                className="rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: 52,
                  height: 52,
                  background: `${item.color}15`,
                  color: item.color,
                  marginBottom: 20,
                  boxShadow: `0 0 20px ${item.color}15`,
                }}
              >
                <item.icon size={24} />
              </div>

              {/* Animated Counter */}
              <p className="font-bold gradient-text text-xl min-[400px]:text-2xl sm:text-3xl break-words" style={{ lineHeight: 1.2, marginBottom: 8 }}>
                <AnimatedCounter value={item.value} suffix={item.suffix} inView={isInView} />
              </p>

              {/* Label */}
              <p className="text-[13px] text-dark-text-muted font-medium" style={{ lineHeight: 1.4 }}>
                {item.label}
              </p>

              {/* Hover Ambient Glow */}
              <div
                className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
                style={{ background: `${item.color}10` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
