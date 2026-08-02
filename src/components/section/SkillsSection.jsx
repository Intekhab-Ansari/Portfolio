import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import { useTheme } from '../../context/ThemeContext';
import { SKILLS_CATEGORY, STATS, TECH_STACK } from "../../utils/data";
import { containerVariants, itemVariants } from '../../utils/helper';
import BackgroundPattern from '../BackgroundPattern';

const SkillsSection = () => {

  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skillBarVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (level) => ({
      width: `${level}%`,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3,
      },
    }),
  };

  return <section
    ref={sectionRef}
    id='skills'
    className={`py-16 md:py-24 px-6 ${isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50/90 text-gray-900"
      } relative overflow-hidden transition-colors duration-500`}
  >
    {/* Background Pattern & Animation */}
    <BackgroundPattern isDarkMode={isDarkMode} />

    <div className='max-w-6xl mx-auto relative z-10'>

      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className='text-center mb-10 md:mb-16'
      >
        <motion.div
          variants={itemVariants}
          className={`text-xs md:text-sm uppercase tracking-widest font-semibold ${isDarkMode ? "text-blue-400" : "text-blue-600"
            } mb-3`}
        >
          Technical Expertise
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className='text-3xl md:text-5xl font-light mb-6'
        >
          Skills &
          <span className='text-blue-500 font-medium ml-2'>Technologies</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className={`text-base md:text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto font-light`}
        >
          A comprehensive toolkit for building modern, scalable web
          applications from concept to deployment.
        </motion.p>
      </motion.div>

      {/* CMS & Hosting - Full Width Top Highlight Card */}
      {SKILLS_CATEGORY.length > 0 && (
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-6 md:mb-8"
        >
          {(() => {
            const category = SKILLS_CATEGORY[0];
            return (
              <motion.div
                variants={itemVariants}
                className={`p-5 md:p-8 rounded-2xl border ${isDarkMode
                  ? "bg-slate-900/60 border-slate-800 backdrop-blur-md hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5"
                  : "bg-white/80 border-slate-200 backdrop-blur-md hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/5"
                  } transition-all duration-300`}
              >
                {/* Category Header */}
                <div className="flex items-center mb-4 md:mb-6">
                  <div
                    className={`p-2.5 md:p-3 rounded-xl ${isDarkMode ? "bg-slate-800 text-blue-400" : "bg-blue-50 text-blue-600"
                      } mr-3 md:mr-4 flex items-center justify-center border ${isDarkMode ? "border-slate-700/50" : "border-blue-100"}`}
                  >
                    <category.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-medium mb-0.5 md:mb-1">{category.title}</h3>
                    <p
                      className={`text-xs md:text-sm leading-tight ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills - Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs md:text-sm font-medium">{skill.name}</span>
                        <span
                          className={`text-[11px] md:text-xs font-semibold ${isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className={`h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-slate-200/80"
                          }`}
                      >
                        <motion.div
                          variants={skillBarVariants}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          custom={skill.level}
                          className={`h-full ${skill.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </motion.div>
      )}

      {/* Vertical Grid Cards (Frontend, Backend, Database, DevOps & Tools) */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12"
      >
        {SKILLS_CATEGORY.slice(1).map((category) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            className={`p-5 md:p-8 rounded-2xl border ${isDarkMode
              ? "bg-slate-900/60 border-slate-800 backdrop-blur-md hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10"
              : "bg-white/80 border-slate-200 backdrop-blur-md hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/10"
              } transition-all duration-300`}
          >
            {/* Category Header */}
            <div className="flex items-center mb-4 md:mb-6">
              <div
                className={`p-2.5 md:p-3 rounded-xl ${isDarkMode ? "bg-slate-800 text-blue-400" : "bg-blue-50 text-blue-600"
                  } mr-3 md:mr-4 flex items-center justify-center border ${isDarkMode ? "border-slate-700/50" : "border-blue-100"}`}
              >
                <category.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="text-base md:text-xl font-medium mb-0.5 md:mb-1">{category.title}</h3>
                <p
                  className={`text-xs md:text-sm leading-tight ${isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                  {category.description}
                </p>
              </div>
            </div>

            {/* Vertical Skills List */}
            <div className="space-y-3 md:space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs md:text-sm font-medium">{skill.name}</span>
                    <span
                      className={`text-[11px] md:text-xs font-semibold ${isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  <div
                    className={`h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-slate-200/80"
                      }`}
                  >
                    <motion.div
                      variants={skillBarVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      custom={skill.level}
                      className={`h-full ${skill.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Skills */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className='mt-10 md:mt-16'
      >
        <motion.div variants={itemVariants} className='text-center mb-8'>
          <h3 className='text-xl font-medium mb-2'>Also Working With</h3>
          <p className={`text-xs md:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Tools, libraries, and utilities integrated into my workflow
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='grid grid-cols-3 gap-2 md:flex md:flex-wrap md:justify-center md:gap-3'
        >
          {TECH_STACK.map((tech, index) =>(
            <motion.span
              key={tech}
              whileHover={{y:-2, scale: 1.05}}
              className={`px-3 py-2 text-xs md:text-sm md:px-5 md:py-2.5 rounded-xl border transition-all duration-300 text-center flex items-center justify-center shadow-sm ${
                isDarkMode
                ? "bg-slate-900/80 border-slate-800 text-gray-300 hover:border-blue-500/50 hover:text-blue-400 hover:shadow-blue-500/10"
                : "bg-white/90 border-slate-200 text-gray-700 hover:border-blue-400/50 hover:text-blue-600 hover:shadow-blue-500/10"
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className='mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border backdrop-blur-md transition-colors duration-500 border-slate-200/50 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40'
      >
        {STATS.map((stat, index)=>(
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className='text-center'
          >
            <div className='text-2xl md:text-4xl font-light text-blue-500 mb-1 font-mono font-semibold'>
                {stat.number}
            </div>
            <div
              className={`text-xs md:text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div >
  </section >
};

export default SkillsSection;