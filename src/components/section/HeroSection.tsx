import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    Variants,
} from "framer-motion";
import {
    ArrowDown,
    Mail
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

import PROFILE_PIC from '../../assets/images/profile-img.jpg';
import { containerVariants, itemVariants } from "../../utils/helper";
import BackgroundPattern from "../BackgroundPattern";

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
                className="min-h-[85vh] lg:min-h-screen flex items-center justify-center relative px-6 pt-12 lg:pt-10 z-10"
            >
                <div className="max-w-7xl mx-auto w-full z-10 mt-8 lg:mt-20">
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
                                            src={PROFILE_PIC}
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
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lg"
                                >
                                    Hire Me / Free Quote
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => scrollToSection("work")}
                                    className={`border ${isDarkMode
                                            ? "border-slate-700 hover:border-slate-600 text-gray-300"
                                            : "border-slate-300 hover:border-slate-400 text-gray-700"
                                        } px-6 py-3 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300`}
                                >
                                    View Work
                                </motion.button>
                            </motion.div>

                            {/* Social Links - Mobile */}
                            <motion.div
                                variants={itemVariants}
                                className="flex justify-center space-x-6 mb-4"
                            >
                                {[
                                    { icon: FiGithub, href: "https://github.com/Intekhab-Ansari", label: "GitHub" },
                                    { icon: FiLinkedin, href: "https://www.linkedin.com/in/intekhab-ansari-5a6934281", label: "LinkedIn" },
                                    { icon: Mail, href: mailLink, label: "Email" },
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        className={`p-3 rounded-full transition-colors ${isDarkMode
                                                ? "text-gray-400 hover:text-white hover:bg-slate-800"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-slate-200"
                                            }`}
                                    >
                                        <social.icon size={20} />
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
                    <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
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
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                Available for Freelance & Contract Projects
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl xl:text-6xl font-light mb-6 leading-tight"
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
                                className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-10 font-light leading-relaxed max-w-lg`}
                            >
                                I build fast, responsive React web applications, custom WordPress e-commerce websites, and robust full-stack solutions to grow your business.
                            </motion.p>

                            {/* CTA Button - Desktop */}
                            <motion.div variants={itemVariants} className="flex gap-4 mb-8">
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => scrollToSection("contact")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-sm uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl cursor-pointer"
                                >
                                    Hire Me / Free Quote
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => scrollToSection("work")}
                                    className={`border ${isDarkMode
                                            ? "border-slate-700 hover:border-slate-600 text-gray-300"
                                            : "border-slate-300 hover:border-slate-400 text-gray-700"
                                        } px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer`}
                                >
                                    View Portfolio
                                </motion.button>
                            </motion.div>

                            {/* Social Links - Desktop */}
                            <motion.div
                                variants={itemVariants}
                                className="flex space-x-6 mb-12"
                            >
                                {[
                                    { icon: FiGithub, href: "https://github.com/Intekhab-Ansari", label: "GitHub" },
                                    { icon: FiLinkedin, href: "https://www.linkedin.com/in/intekhab-ansari-5a6934281", label: "LinkedIn" },
                                    { icon: Mail, href: mailLink, label: "Email" },
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        className={`p-3 rounded-full transition-colors ${isDarkMode
                                                ? "text-gray-400 hover:text-white hover:bg-slate-800"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-slate-200"
                                            }`}
                                    >
                                        <social.icon size={20} />
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
                                        src={PROFILE_PIC}
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
