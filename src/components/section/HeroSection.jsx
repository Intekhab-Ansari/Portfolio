import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import {
    ArrowDown,
    Mail,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

import PROFILE_PIC from "../../assets/images/profile-img.jpg";
import { containerVariants, itemVariants } from "../../utils/helper";

const HeroSection = () => {
    const { isDarkMode } = useTheme();

    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, -100]);

    //  EMAIL 
    const email = "ansariintekhab47@gmail.com";
    const subject = "Contact from Portfolio";
    const body =
        "Hi Intekhab,\n\nI would like to connect with you regarding your work.\n\nThanks!";

    const mailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const imageVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 1, ease: "easeOut", delay: 0.5 },
        },
    };

    const socialLinks = [
        {
            icon: FiGithub,
            href: "https://github.com/Intekhab-Ansari",
        },
        {
            icon: FiLinkedin,
            href: "https://www.linkedin.com/in/intekhab-ansari-5a6934281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        },
        {
            icon: Mail,
            href: mailLink,
        },
    ];

    return (
        <div
            className={`min-h-screen transition-all duration-500 ${
                isDarkMode
                    ? "bg-gray-950 text-white"
                    : "bg-gray-50 text-gray-900"
            }`}
        >
            <motion.section
                id="home"
                style={{ y: heroY }}
                className="min-h-screen flex items-center justify-center relative px-6 pt-10"
            >
                {/* Background blobs */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${
                            isDarkMode ? "bg-blue-500" : "bg-blue-400"
                        }`}
                    />
                    <motion.div
                        animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className={`absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10 ${
                            isDarkMode ? "bg-purple-500" : "bg-purple-400"
                        }`}
                    />
                </div>

                <div className="max-w-7xl mx-auto w-full z-10 mt-20">
                    {/* MOBILE */}
                    <div className="block lg:hidden text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.h1
                                variants={itemVariants}
                                className="text-3xl font-light mb-6"
                            >
                                Building{" "}
                                <span className="text-blue-500 font-medium">
                                    experiences
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className={`mb-8 ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                Full Stack Developer crafting modern web
                                applications.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="flex justify-center gap-6 mb-8"
                            >
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        className={`p-3 rounded-full ${
                                            isDarkMode
                                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                                        }`}
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* DESKTOP */}
                    <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.h1
                                variants={itemVariants}
                                className="text-6xl font-light mb-8"
                            >
                                Building digital{" "}
                                <span className="text-blue-500 font-medium">
                                    experiences
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className={`mb-10 max-w-lg ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                I build scalable, modern web applications using
                                React, Java, and modern tools.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="flex gap-6 mb-10"
                            >
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => scrollToSection("work")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full"
                                >
                                    View Work
                                </motion.button>

                                <motion.button
                                    whileHover={{ y: -2 }}
                                    onClick={() => scrollToSection("contact")}
                                    className={`border px-8 py-4 rounded-full ${
                                        isDarkMode
                                            ? "border-gray-700 text-gray-300"
                                            : "border-gray-300 text-gray-700"
                                    }`}
                                >
                                    Get in Touch
                                </motion.button>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex gap-6"
                            >
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        className={`p-3 rounded-full ${
                                            isDarkMode
                                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                                        }`}
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={imageVariants}
                            className="flex justify-end"
                        >
                            <div className="w-80 h-96 rounded-3xl overflow-hidden border shadow-2xl">
                                <img
                                    src={PROFILE_PIC}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <ArrowDown
                        size={20}
                        className={
                            isDarkMode ? "text-gray-600" : "text-gray-400"
                        }
                    />
                </motion.div>
            </motion.section>
        </div>
    );
};

export default HeroSection;
