'use client'

import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollToTop from "@/components/ScrollToTop";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import { SectionId } from "@/types";
import { useState, useEffect } from "react";

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
