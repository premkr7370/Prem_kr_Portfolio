"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const resumeUrl = "https://drive.google.com/file/d/1SbH8FFpKO0bm5HprseumKy2a2cotdDvi/view";
const embedUrl = "https://drive.google.com/file/d/1SbH8FFpKO0bm5HprseumKy2a2cotdDvi/preview";

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-dark-text-muted hover:text-primary text-sm mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  My <span className="gradient-text">Resume</span>
                </h1>
                <p className="text-dark-text-secondary">View or download my latest resume</p>
              </div>
              <div className="flex gap-3">
                <motion.a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/25 transition-all"
                >
                  <Download size={16} />
                  Download
                </motion.a>
                <motion.a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-card border border-dark-border text-dark-text font-medium text-sm hover:border-primary/30 transition-all"
                >
                  <ExternalLink size={16} />
                  Open in Drive
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-dark-border bg-dark-card"
          >
            <iframe
              src={embedUrl}
              className="w-full h-[80vh]"
              allow="autoplay"
              title="Prem Kumar Resume"
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
