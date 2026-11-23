"use client";

import { motion } from "framer-motion";

interface SectionParticlesProps {
  variant?: "purple" | "mint" | "mixed";
}

// Fixed positions (no Math.random) to satisfy react-hooks/purity
const orbs = [
  { x: "10%", y: "15%", size: 280, delay: 0 },
  { x: "75%", y: "60%", size: 350, delay: 1.5 },
  { x: "50%", y: "80%", size: 240, delay: 3 },
  { x: "85%", y: "20%", size: 300, delay: 2 },
  { x: "25%", y: "50%", size: 200, delay: 4 },
];

const colorMap = {
  purple: ["rgba(123, 47, 247, 0.04)", "rgba(166, 109, 250, 0.03)"],
  mint: ["rgba(189, 242, 213, 0.06)", "rgba(139, 228, 176, 0.04)"],
  mixed: ["rgba(123, 47, 247, 0.04)", "rgba(189, 242, 213, 0.05)"],
};

export default function SectionParticles({ variant = "mixed" }: SectionParticlesProps) {
  const colors = colorMap[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${colors[i % colors.length]} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
