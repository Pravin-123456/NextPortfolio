'use client'

import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { SectionId } from "@/types";
import { useState, useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load components that are not critical for initial paint
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="min-h-screen animate-pulse bg-gray-900/20" />
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="min-h-screen animate-pulse bg-gray-900/20" />
});
const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="min-h-screen animate-pulse bg-gray-900/20" />
});
const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="min-h-screen animate-pulse bg-gray-900/20" />
});
const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => <div className="min-h-screen animate-pulse bg-gray-900/20" />
});

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.HOME);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection Observer to update active state on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible (better for tall sections)
        rootMargin: '-100px 0px -100px 0px' // Offset to trigger earlier
      }
    );

    const sections = Object.values(SectionId).map((id) => document.getElementById(id));
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);



  return (
    <main className="bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white">
      <Navbar activeSection={activeSection} scrollTo={scrollToSection} />

      <Hero id={SectionId.HOME} />
      <About id={SectionId.ABOUT} />
      <Skills id={SectionId.SKILLS} />
      <Projects id={SectionId.PROJECTS} />
      <Services id={SectionId.SERVICES} />
      <Contact id={SectionId.CONTACT} />

      <ScrollToTop />
    </main>
  );
}
