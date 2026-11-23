"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2800);
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [show]);

  const subtitleLetters = "Full Stack AI Developer".split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #BDF2D5 0%, #E8FFF2 50%, #BDF2D5 100%)" }}
        >
          {/* Background circles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 200 + i * 100,
                  height: 200 + i * 100,
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  background: `radial-gradient(circle, ${
                    i % 2 === 0 ? "rgba(123,47,247,0.06)" : "rgba(189,242,213,0.15)"
                  } 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center">
            {/* Logo with rotating border */}
            <div className="relative mb-6">
              {/* Rotating border ring */}
              <motion.div
                className="absolute -inset-3 rounded-2xl"
                style={{
                  background: "conic-gradient(from 0deg, #7B2FF7, #A66DFA, #BDF2D5, #7B2FF7)",
                  opacity: 0.6,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-3 rounded-2xl"
                style={{ background: "linear-gradient(135deg, #BDF2D5, #E8FFF2)" }}
                initial={{ inset: "-12px" }}
              />

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple to-purple-light flex items-center justify-center shadow-2xl"
                style={{
                  boxShadow: "0 0 60px rgba(123,47,247,0.3), 0 0 120px rgba(189,242,213,0.15)",
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-black text-white"
                >
                  P
                </motion.span>
              </motion.div>
            </div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-3">
                <span className="gradient-text">Prem Kumar</span>
              </h1>

              {/* Staggered subtitle */}
              <div className="flex items-center justify-center gap-[1px]">
                {subtitleLetters.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.03, duration: 0.3 }}
                    className="text-sm tracking-widest uppercase"
                    style={{ color: "#7B2FF7" }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 w-48 h-1 rounded-full overflow-hidden"
              style={{ background: "#B5DDC8" }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1.4, ease: "easeInOut" }}
                className="h-full rounded-full bg-gradient-to-r from-purple via-mint to-purple-light"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
