"use client";

import SplashScreen from "@/components/sections/splash-screen";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Education from "@/components/sections/education";
import Achievements from "@/components/sections/achievements";
import Contact from "@/components/sections/contact";
import Footer from "@/components/layout/footer";
import CursorGlow from "@/components/ui/cursor-glow";
import { MusicAutoplayPrompt } from "@/components/ui/music-player";

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <CursorGlow />
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Achievements />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <MusicAutoplayPrompt />
    </>
  );
}
