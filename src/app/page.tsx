import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/section/HeroSection';
import SkillsSection from '../components/section/SkillsSection';
import ProjectsSection from '../components/section/ProjectsSection';
import AboutSection from '../components/section/AboutSection';
import ContactSection from '../components/section/ContactSection';
import Footer from '../components/section/Footer';

export default function Home() {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
