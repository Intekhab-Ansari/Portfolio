import React from "react";
import { motion, Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { Project } from "../utils/types";

interface ProjectCardsProps {
    project: Project;
    index: number;
    isDarkMode: boolean;
}

const ProjectCards: React.FC<ProjectCardsProps> = ({ project, index, isDarkMode }) => {
    const cardVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="group relative"
        >
            <div
                className={`rounded-2xl overflow-hidden transition-all duration-500 border ${
                    isDarkMode
                        ? "bg-slate-900/60 border-slate-800 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
                        : "bg-white/90 border-slate-200 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/10"
                } backdrop-blur-md`}
            >
                {/* Project Images Container - Height increased to h-64 sm:h-72 lg:h-80 */}
                <div className="relative overflow-hidden h-64 sm:h-72 lg:h-80 bg-slate-900/10">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Mobile View Overlay */}
                    {project.mobileImage && (
                        <div className="absolute right-4 bottom-3 w-[95px] h-[180px] sm:w-[110px] sm:h-[210px] rounded-2xl border-[3px] border-neutral-950 overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 z-10 bg-neutral-950">
                            {/* Simulated Phone Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-neutral-950 rounded-b-md z-20" />
                            <img
                                src={project.mobileImage}
                                alt={`${project.title} mobile view`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Feature Badge */}
                    {project.featured && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                                Featured
                            </span>
                        </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-10">
                        <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                                isDarkMode
                                    ? "bg-slate-900/80 text-gray-300 border border-slate-700/50"
                                    : "bg-white/90 text-gray-700 border border-slate-200"
                            } backdrop-blur-md shadow-sm`}
                        >
                            {project.category}
                        </span>
                    </div>

                    {/* Hover Overlay with CTA Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center space-x-4 z-20"
                    >
                        <motion.a
                            href={project.liveUrl}
                            initial={{ y: 20, opacity: 1, scale: 1.05 }}
                            whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full flex items-center space-x-2 text-sm font-medium transition-colors shadow-lg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink size={16} />
                            <span>Visit Site</span>
                        </motion.a>

                        {project.githubUrl && project.githubUrl !== "#" && (
                            <motion.a
                                href={project.githubUrl}
                                initial={{ y: 20, opacity: 1, scale: 1.05 }}
                                whileHover={{ y: 0, opacity: 1, scale: 1.05 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-5 py-2.5 rounded-full flex items-center space-x-2 text-sm font-medium transition-all shadow-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FiGithub size={16} />
                                <span>GitHub</span>
                            </motion.a>
                        )}
                    </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                    <h3 className="text-xl font-medium mb-3 group-hover:text-blue-500 transition-colors">
                        {project.title}
                    </h3>

                    <p
                        className={`text-sm leading-relaxed mb-4 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                        {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
                                className={`text-xs px-3 py-1 rounded-full ${
                                    isDarkMode
                                        ? "bg-slate-800/80 text-gray-300 border border-slate-700/50"
                                        : "bg-slate-100 text-gray-700 border border-slate-200/50"
                                }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCards;
