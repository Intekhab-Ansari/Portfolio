'use client';

import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    Variants,
} from "framer-motion";
import {
    ArrowDown,
    ArrowUpRight,
    Mail
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

import PROFILE_PIC from '../../assets/images/profile-img.jpg';
import { containerVariants, itemVariants } from "../../utils/helper";
import BackgroundPattern from "../BackgroundPattern";

const getImageSrc = (img: any) => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    return img.src || img;
};

const HeroSection: React.FC = () => {
    const { isDarkMode } = useTheme();

    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, -100]);

    const email = "ansariintekhab47@gmail.com";
    const subject = "Contact from Portfolio";
    const body =
        "Hi Intekhab,\n\nI would like to connect with you regarding your work.\n\nThanks!";

    const mailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;

    const socialLinks = [
        {
            icon: FiGithub,
            href: "https://github.com/Intekhab-Ansari",
            label: "GitHub",
            hoverClasses: "hover:text-gray-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-slate-500/10",
        },
        {
            icon: FiLinkedin,
            href: "https://www.linkedin.com/in/intekhab-ansari-5a6934281",
            label: "LinkedIn",
            hoverClasses: "hover:text-[#0A66C2] hover:border-[#0A66C2]/60 hover:shadow-[#0A66C2]/15",
        },
        {
            icon: Mail,
            href: mailLink,
            label: "Email",
            hoverClasses: "hover:text-blue-500 hover:border-blue-500/60 hover:shadow-blue-500/15",
        },
    ];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const textVariants: Variants = {
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

    const imageVariants: Variants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut" as const,
                delay: 0.5,
            },
        },
    };

    return (
        <div
            className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50/90 text-gray-900"
                } relative overflow-hidden`}
        >
            {/* Background Pattern & Dynamic Light Mesh */}
            <BackgroundPattern isDarkMode={isDarkMode} />

            {/* Hero Section */}
            <motion.section
                id="home"
                style={{ y: heroY }}
                className="min-h-[85vh] lg:min-h-screen flex items-center justify-center relative px-6 pt-12 lg:pt-8 z-10"
            >
                <div className="max-w-7xl mx-auto w-full z-10 mt-8 lg:mt-12 xl:mt-16">
                    {/* Mobile Layout-Centered */}
                    <div className="block lg:hidden">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="text-center"
                        >
                            {/* Profile Image-Mobile */}
                            <motion.div variants={imageVariants} className="mb-4 relative z-10">
                                <div className="w-32 h-32 mx-auto relative">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className={`w-full h-32 rounded-2xl overflow-hidden border-4 ${isDarkMode ? "border-slate-800" : "border-slate-300"
                                            } shadow-2xl`}
                                    >
                                        <img
                                            src={getImageSrc(PROFILE_PIC)}
                                            alt="Intekhab Ansari"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="absolute -inset-2 rounded-2xl border border-blue-500/20"
                                    />
                                </div>
                            </motion.div>

                            {/* Availability Badge - Mobile */}
                            <motion.div
                                variants={textVariants}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-3 border bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Available for Freelance Projects
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-3xl md:text-5xl font-light mb-3 leading-tight"
                            >
                                <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Full Stack
                                </span>
                                <span className="text-blue-500 font-medium ml-2">
                                    Web Developer
                                </span>
                                <br />
                                <span className={isDarkMode ? "text-white text-2xl md:text-3xl font-light" : "text-gray-900 text-2xl md:text-3xl font-light"}>
                                    & Software Engineer
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className={`text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"
                                    } mb-5 max-w-xl mx-auto font-light leading-relaxed`}
                            >
                                I craft fast, responsive React web applications, custom WordPress e-commerce storefronts, and full-stack solutions tailored to grow your business.
                            </motion.p>

                            {/* CTA Button - Mobile */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-row gap-3 justify-center items-center mb-4"
                            >
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => scrollToSection("contact")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md shadow-blue-500/25 cursor-pointer"
                                >
                                    Hire Me / Free Quote
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => scrollToSection("work")}
                                    className={`group inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer ${
                                        isDarkMode
                                            ? "bg-slate-900/90 hover:bg-slate-800 text-gray-100 border border-slate-700/80 hover:border-blue-500/60 hover:text-blue-400 hover:shadow-blue-500/10"
                                            : "bg-white/95 hover:bg-white text-gray-800 border border-slate-300/90 hover:border-blue-500/60 hover:text-blue-600 hover:shadow-blue-500/15"
                                    }`}
                                >
                                    <span>View Portfolio</span>
                                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </motion.button>
                            </motion.div>

                            {/* Social Links - Mobile */}
                            <motion.div
                                variants={itemVariants}
                                className="flex justify-center items-center gap-3.5 mb-5"
                            >
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        whileHover={{ y: -3, scale: 1.08 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`group relative flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-300 backdrop-blur-md border shadow-sm hover:shadow-md cursor-pointer ${
                                            isDarkMode
                                                ? "bg-slate-900/80 border-slate-800 text-gray-300 hover:bg-slate-800/90"
                                                : "bg-white/95 border-slate-200/90 text-gray-700 hover:bg-white"
                                        } ${social.hoverClasses}`}
                                    >
                                        <social.icon size={19} className="transition-transform duration-300 group-hover:scale-110" />
                                    </motion.a>
                                ))}
                            </motion.div>

                            {/* Tech Stack - Mobile */}
                            <motion.div
                                variants={itemVariants}
                                className="flex justify-center items-center space-x-3 text-xs uppercase tracking-widest"
                            >
                                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>React</span>
                                <span className={isDarkMode ? "text-gray-600" : "text-gray-400"}>.</span>
                                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Java</span>
                                <span className={isDarkMode ? "text-gray-600" : "text-gray-400"}>.</span>
                                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>JavaScript</span>
                                <span className={isDarkMode ? "text-gray-600" : "text-gray-400"}>.</span>
                                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>MySQL</span>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Desktop Layout - split */}
                    <div className="hidden lg:grid grid-cols-2 gap-12 xl:gap-16 items-center">
                        {/* Left Column - Content */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="text-left"
                        >
                            {/* Availability Badge - Desktop */}
                            <motion.div
                                variants={textVariants}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 xl:px-4 xl:py-2 rounded-full text-xs font-semibold mb-4 xl:mb-5 border bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                Available for Freelance & Contract Projects
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl xl:text-5xl 2xl:text-6xl font-light mb-4 xl:mb-5 leading-tight"
                            >
                                <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Full Stack
                                </span>
                                <span className="text-blue-500 font-medium ml-3">
                                    Web Developer
                                </span>
                                <br />
                                <span className={isDarkMode ? "text-white text-3xl xl:text-4xl font-light" : "text-gray-900 text-3xl xl:text-4xl font-light"}>
                                    & Software Engineer
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className={`text-base xl:text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-6 xl:mb-8 font-light leading-relaxed max-w-lg`}
                            >
                                I build fast, responsive React web applications, custom WordPress e-commerce websites, and robust full-stack solutions to grow your business.
                            </motion.p>

                            {/* CTA Button - Desktop */}
                            <motion.div variants={itemVariants} className="flex gap-4 mb-6 xl:mb-7">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => scrollToSection("contact")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-3.5 xl:px-8 xl:py-4 rounded-full text-xs xl:text-sm uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl shadow-blue-500/25 cursor-pointer"
                                >
                                    Hire Me / Free Quote
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => scrollToSection("work")}
                                    className={`group inline-flex items-center justify-center gap-2 px-7 py-3.5 xl:px-8 xl:py-4 rounded-full text-xs xl:text-sm uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl backdrop-blur-md ${
                                        isDarkMode
                                            ? "bg-slate-900/90 hover:bg-slate-800 text-gray-100 border border-slate-700/80 hover:border-blue-500/60 hover:text-blue-400 hover:shadow-blue-500/10"
                                            : "bg-white/95 hover:bg-white text-gray-800 border border-slate-300/90 hover:border-blue-500/60 hover:text-blue-600 hover:shadow-blue-500/15"
                                    }`}
                                >
                                    <span>View Portfolio</span>
                                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </motion.button>
                            </motion.div>

                            {/* Social Links - Desktop */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-3.5 mb-8"
                            >
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        whileHover={{ y: -3, scale: 1.08 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 backdrop-blur-md border shadow-sm hover:shadow-lg cursor-pointer ${
                                            isDarkMode
                                                ? "bg-slate-900/80 border-slate-800 text-gray-300 hover:bg-slate-800/90"
                                                : "bg-white/95 border-slate-200/90 text-gray-700 hover:bg-white"
                                        } ${social.hoverClasses}`}
                                    >
                                        <social.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />

                                        {/* Micro Tooltip */}
                                        <span
                                            className={`absolute -top-9 px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0 shadow-lg whitespace-nowrap z-30 ${
                                                isDarkMode
                                                    ? "bg-slate-800 text-gray-100 border border-slate-700/80 shadow-black/40"
                                                    : "bg-gray-900 text-white border border-gray-800 shadow-slate-400/20"
                                            }`}
                                        >
                                            {social.label}
                                        </span>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Profile Image */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={imageVariants}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative">
                                {/* Tech Stack - Desktop */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex items-center space-x-8 text-xs uppercase tracking-widest absolute -top-16 -left-28"
                                >
                                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>React</span>
                                    <span className={isDarkMode ? "text-gray-600" : "text-gray-400"}>.</span>
                                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Java</span>
                                    <span className={isDarkMode ? "text-gray-600" : "text-gray-400"}>.</span>
                                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>JavaScript</span>
                                    <span className={isDarkMode ? "text-gray-600" : "text-gray-400"}>.</span>
                                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>MySQL</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className={`w-80 h-96 rounded-3xl overflow-hidden border-4 ${isDarkMode ? "border-slate-800" : "border-slate-300"
                                        } shadow-2xl`}
                                >
                                    <img
                                        src={getImageSrc(PROFILE_PIC)}
                                        alt="Intekhab Ansari Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                {/* Decorative elements */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute -inset-4 rounded-3xl border border-blue-500/20 pointer-events-none"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute -inset-8 rounded-3xl border border-purple-500/10 pointer-events-none"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator*/}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <ArrowDown
                        size={20}
                        className={isDarkMode ? "text-gray-500" : "text-gray-400"}
                    />
                </motion.div>
            </motion.section>
        </div>
    );
};

export default HeroSection;
