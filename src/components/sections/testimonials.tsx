"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Senior Developer",
    company: "A2Infotech Pvt. Ltd.",
    content:
      "Prem is an exceptional developer with a strong grasp of the MERN stack. His ability to quickly learn new technologies and deliver quality code made him a valuable member of our team.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Project Manager",
    company: "A2Infotech Pvt. Ltd.",
    content:
      "Working with Prem was a great experience. He consistently delivered features on time, wrote clean code, and was always eager to take on challenging tasks.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    role: "Fellow Intern",
    company: "A2Infotech Pvt. Ltd.",
    content:
      "Prem's problem-solving skills are outstanding. His DSA knowledge really shines through in the efficiency of his code. A great teammate and collaborator!",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="section-padding relative">
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
            What people say
          </span>
          <h2 style={{ marginBottom: 24 }}>
            <span className="gradient-text">Testimonials</span>
          </h2>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-2xl mx-auto relative">
          {/* Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-dark-text-secondary hover:text-primary hover:border-primary/30 transition-all"
            >
              <ChevronLeft size={18} />
            </motion.button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-dark-text-secondary hover:text-primary hover:border-primary/30 transition-all"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>

          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-[24px] bg-dark-card border border-dark-border text-center neon-border"
              style={{ padding: 40 }}
            >
              <Quote size={32} className="text-primary/30 mx-auto" style={{ marginBottom: 24 }} />

              <p className="text-dark-text-secondary italic" style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
                &quot;{testimonials[current].content}&quot;
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center" style={{ gap: 4, marginBottom: 24 }}>
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-warning fill-warning" />
                ))}
              </div>

              {/* Author */}
              <div
                className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg mx-auto shadow-lg shadow-primary/20"
                style={{ marginBottom: 16 }}
              />
              <h4 className="font-semibold text-dark-text text-[17px]" style={{ marginBottom: 4 }}>
                {testimonials[current].name}
              </h4>
              <p className="text-[14px] text-dark-text-secondary">
                {testimonials[current].role} at {testimonials[current].company}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center" style={{ gap: 8, marginTop: 32 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-primary shadow-lg shadow-primary/30" : "w-2 bg-dark-border hover:bg-dark-text-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
