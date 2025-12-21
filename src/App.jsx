import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './components/section/HeroSection'
import SkillsSection from './components/section/SkillsSection'
import ProjectsSection from './components/section/ProjectsSection'
import AboutSection from './components/section/AboutSection'
import ContactSection from './components/section/ContactSection'
import Footer from './components/section/Footer'

const App = () => {
  return (
    <>
      <ThemeProvider>
        <div>
          <Navbar/>
          <HeroSection/>
          <SkillsSection/>
          <ProjectsSection/>
          <AboutSection/>
          <ContactSection/>
          <Footer/>
        </div>
      </ThemeProvider>
    </>
    
  )
}

export default App
