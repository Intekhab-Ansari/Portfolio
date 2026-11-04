'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    Zap,
    ExternalLink,
    QrCode,
    Sparkles,
    Shield,
    X,
    Radio,
    FileText,
    ArrowUpRight,
} from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { TOOLS } from '../../utils/data';
import { ToolItem } from '../../utils/types';
import { containerVariants, itemVariants } from '../../utils/helper';

interface ToolsSectionProps {
    isDarkMode: boolean;
}

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

const ToolsSection: React.FC<ToolsSectionProps> = ({ isDarkMode }) => {
    const [selectedQrTool, setSelectedQrTool] = useState<ToolItem | null>(null);

    const getImageSrc = (img: any) => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        return img.src || img;
    };

    return (
        <div id="tools" className="relative scroll-mt-24">
            {/* Section Header */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="text-center mb-16"
            >
                <motion.div
                    variants={itemVariants}
                    className={`text-xs md:text-sm uppercase tracking-widest font-semibold ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                    } mb-3`}
                >
                    Browser &amp; P2P Utilities
                </motion.div>

                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-5xl font-light mb-6"
                >
                    Personal
                    <span className="text-blue-500 font-medium ml-2">Tools</span>
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className={`text-base md:text-lg ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    } max-w-2xl mx-auto font-light`}
                >
                    A collection of client-side web tools, P2P utilities, and browser applications built for speed, privacy, and zero server storage.
                </motion.p>
            </motion.div>

            {/* Tools Grid (2-Column Responsive Grid matching Live Work) */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={containerVariants}
                className="grid md:grid-cols-2 gap-8"
            >
                {TOOLS.map((tool) => (
                    <motion.div
                        key={tool.id}
                        variants={cardVariants}
                        whileHover={{
                            y: -8,
                            transition: { duration: 0.3, ease: "easeOut" as const },
                        }}
                        className="group relative"
                    >
                        <div
                            className={`h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-500 border ${
                                isDarkMode
                                    ? "bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10"
                                    : "bg-white/90 border-slate-200 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/10"
                            } backdrop-blur-md`}
                        >
                            {/* Tool Preview Image Container */}
                            <div className="relative overflow-hidden h-64 sm:h-72 lg:h-80 bg-slate-900/20">
                                <img
                                    src={getImageSrc(tool.image)}
                                    alt={tool.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Category Badge (Top-Right) */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                                            isDarkMode
                                                ? "bg-slate-900/80 text-gray-300 border border-slate-700/50"
                                                : "bg-white/90 text-gray-700 border border-slate-200"
                                        } backdrop-blur-md shadow-sm`}
                                    >
                                        {tool.category}
                                    </span>
                                </div>

                                {/* Status / Feature Badge (Top-Left) */}
                                {tool.featured && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md flex items-center gap-1.5">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                            </span>
                                            <span>Featured Tool</span>
                                        </span>
                                    </div>
                                )}

                                {/* Hover Overlay with Action Buttons */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center space-x-3 z-20 px-4"
                                >
                                    {tool.liveUrl && tool.liveUrl !== "#" ? (
                                        <motion.a
                                            href={tool.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2.5 rounded-full flex items-center space-x-2 text-sm font-semibold transition-colors shadow-lg shadow-cyan-500/25"
                                        >
                                            <ExternalLink size={16} />
                                            <span>Launch Tool</span>
                                        </motion.a>
                                    ) : (
                                        <span className="bg-slate-800/90 text-gray-300 px-4 py-2 rounded-full text-xs font-medium border border-slate-700">
                                            In Development
                                        </span>
                                    )}

                                    {/* Pair via QR Modal Trigger */}
                                    {tool.qrImage && (
                                        <motion.button
                                            type="button"
                                            onClick={() => setSelectedQrTool(tool)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-white/20 hover:bg-white text-white hover:text-slate-900 border border-white/40 px-4 py-2.5 rounded-full flex items-center space-x-2 text-sm font-medium transition-all shadow-lg backdrop-blur-md"
                                        >
                                            <QrCode size={16} />
                                            <span>Pair QR</span>
                                        </motion.button>
                                    )}

                                    {/* GitHub Source Button */}
                                    {tool.githubUrl && tool.githubUrl !== "#" && (
                                        <motion.a
                                            href={tool.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 p-2.5 rounded-full flex items-center justify-center transition-all shadow-lg"
                                            aria-label="GitHub Repository"
                                        >
                                            <FiGithub size={16} />
                                        </motion.a>
                                    )}
                                </motion.div>
                            </div>

                            {/* Tool Card Content */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    {/* Badge / Tagline */}
                                    {tool.badge && (
                                        <div className="mb-3">
                                            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm">
                                                {tool.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-xl font-medium mb-2">
                                        {tool.liveUrl && tool.liveUrl !== "#" ? (
                                            <a
                                                href={tool.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/title inline-flex items-center justify-between w-full hover:text-blue-500 transition-colors cursor-pointer"
                                                title={`Open ${tool.title}`}
                                            >
                                                <span className="group-hover/title:text-blue-500 transition-colors">
                                                    {tool.title}
                                                </span>
                                                <ArrowUpRight
                                                    size={20}
                                                    className="opacity-70 group-hover:opacity-100 group-hover/title:opacity-100 text-blue-500 transition-all group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 shrink-0 ml-2"
                                                />
                                            </a>
                                        ) : (
                                            <span className="group-hover:text-blue-500 transition-colors">
                                                {tool.title}
                                            </span>
                                        )}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className={`text-sm leading-relaxed mb-4 ${
                                            isDarkMode ? "text-gray-400" : "text-gray-600"
                                        }`}
                                    >
                                        {tool.description}
                                    </p>
                                </div>

                                <div>
                                    {/* Tech Stack Tags */}
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/40">
                                        {tool.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className={`text-xs px-3 py-1 rounded-full ${
                                                    isDarkMode
                                                        ? "bg-slate-800 text-gray-300"
                                                        : "bg-slate-100 text-gray-700"
                                                }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* QR Pairing Modal */}
            <AnimatePresence>
                {selectedQrTool && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl relative ${
                                isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-gray-900"
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedQrTool(null)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-gray-400 hover:text-white transition"
                                aria-label="Close modal"
                            >
                                <X size={18} />
                            </button>

                            <div className="text-center mb-5">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-3">
                                    <QrCode size={24} />
                                </div>
                                <h3 className="text-xl font-bold">
                                    {selectedQrTool.title}
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">
                                    Scan with your mobile camera to instantly open and connect without downloading any apps.
                                </p>
                            </div>

                            <div className="bg-white p-4 rounded-2xl shadow-inner mx-auto w-56 h-56 flex items-center justify-center border border-slate-200">
                                <img
                                    src={getImageSrc(selectedQrTool.qrImage)}
                                    alt={`${selectedQrTool.title} Pairing QR`}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="mt-5 space-y-2 text-xs text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[11px]">1</span>
                                    <span>Open your phone's native camera.</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[11px]">2</span>
                                    <span>Point at the QR code to open the live room.</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[11px]">3</span>
                                    <span>Share files or chat directly between your devices!</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center space-x-3">
                                <a
                                    href={selectedQrTool.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center transition flex items-center justify-center space-x-1.5"
                                >
                                    <span>Open Web App</span>
                                    <ExternalLink size={13} />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setSelectedQrTool(null)}
                                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold transition"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToolsSection;
