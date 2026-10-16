'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { useTheme } from '../../context/ThemeContext';
import { PROJECTS, LIVE_PROJECTS } from "../../utils/data";
import BackgroundPattern from '../BackgroundPattern';
import ProjectCards from '../ProjectCards';
import { containerVariants, itemVariants } from '../../utils/helper';

const ProjectsSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id='work'
      ref={sectionRef}
      className={`py-24 px-6 ${
        isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50/90 text-gray-900"
      } relative overflow-hidden transition-colors duration-500`}
    >
      {/* Background Pattern & Dynamic Light Mesh */}
      <BackgroundPattern isDarkMode={isDarkMode} />

      <div className='max-w-7xl mx-auto relative z-10'>

        {/* --- Live Work Section Header --- */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className='text-center mb-16'
        >
          <motion.div
            variants={itemVariants}
            className={`text-xs md:text-sm uppercase tracking-widest font-semibold ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            } mb-3`}
          >
            Deployed Client Sites
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className='text-3xl md:text-5xl font-light mb-6'
          >
            Live
            <span className='text-blue-500 font-medium ml-2'>Work</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-base md:text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto font-light`}
          >
            A selection of active client websites built, optimized, and maintained by me.
          </motion.p>
        </motion.div>

        {/* Live Work Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className='grid md:grid-cols-2 gap-8 mb-24'
        >
          {LIVE_PROJECTS.map((project, index) => (
            <ProjectCards key={`live-${project.id}`} project={project} index={index} isDarkMode={isDarkMode} />
          ))}
        </motion.div>

        <hr className={`border-t mb-24 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`} />

        {/* --- Recent Projects Section Header --- */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className='text-center mb-16'
        >
          <motion.div
            variants={itemVariants}
            className={`text-xs md:text-sm uppercase tracking-widest font-semibold ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            } mb-3`}
          >
            Featured Personal Work
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className='text-3xl md:text-5xl font-light mb-6'
          >
            Recent
            <span className='text-blue-500 font-medium ml-2'>Projects</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-base md:text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto font-light`}
          >
            A collection of projects that showcase my experience in building modern web applications and solving complex problems.
          </motion.p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {PROJECTS.map((project, index) => (
            <ProjectCards key={project.id} project={project} index={index} isDarkMode={isDarkMode} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsSection;
