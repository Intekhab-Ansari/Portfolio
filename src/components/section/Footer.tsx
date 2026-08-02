import React, { useRef } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";
import {
    Mail,
    Heart,
    ArrowUp,
    Code2,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { containerVariants, itemVariants } from "../../utils/helper";

const Footer: React.FC = () => {
    const { isDarkMode } = useTheme();
    const footerRef = useRef<HTMLElement | null>(null);

    const isInView = useInView(footerRef, {
        once: true,
        margin: "-50px",
    });

    const { scrollYProgress } = useScroll();
    const scrollY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const email = "ansariintekhab47@gmail.com";
    const subject = "Contact from Portfolio";
    const body =
        "Hi Intekhab,\n\nI would like to connect with you regarding your work.\n\nThanks!";
    const mailToLink = `mailto:${email}?subject=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;

    const socialLinks = [
        {
            name: "GitHub",
            icon: FiGithub,
            url: "https://github.com/Intekhab-Ansari",
            color: "hover:text-gray-400",
        },
        {
            name: "LinkedIn",
            icon: FiLinkedin,
            url: "https://www.linkedin.com/in/intekhab-ansari-5a6934281",
            color: "hover:text-blue-400",
        },
        {
            name: "Twitter",
            icon: FiTwitter,
            url: "https://twitter.com",
            color: "hover:text-sky-400",
        },
        {
            name: "Email",
            icon: Mail,
            url: mailToLink,
            color: "hover:text-blue-400",
        },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const AnimatedGradientLine: React.FC = () => {
        return (
            <div className="absolute top-0 left-0 w-full h-px overflow-hidden pointer-events-none">
                <motion.div
                    className={`h-px bg-gradient-to-r ${isDarkMode
                        ? "from-transparent via-blue-500 to-transparent"
                        : "from-transparent via-blue-600 to-transparent"
                        }`}
                    initial={{ width: "0%", opacity: 0 }}
                    animate={
                        isInView ? { width: "100%", opacity: 1 } : {}
                    }
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className={`absolute top-0 h-px w-32 bg-gradient-to-r ${isDarkMode
                        ? "from-blue-400 via-purple-500 to-blue-400"
                        : "from-blue-500 via-purple-600 to-blue-500"
                        } blur-sm`}
                    animate={{
                        x: ["-50%", "calc(100vw + 50%)"],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: "linear",
                        delay: 1,
                    }}
                />
            </div>
        );
    };

    return (
        <footer
            ref={footerRef}
            className={`relative overflow-hidden transition-colors duration-500 ${isDarkMode
                ? "bg-slate-950 text-white"
                : "bg-slate-50/90 text-gray-900"
                }`}
        >
            {/* Gradient Line */}
            <AnimatedGradientLine />

            {/* Background Glow */}
            <motion.div
                style={{ y: scrollY }}
                className="absolute inset-0 pointer-events-none"
            >
                <div
                    className={`absolute bottom-10 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-5 ${isDarkMode
                        ? "bg-blue-500"
                        : "bg-blue-400"
                        }`}
                />
                <div
                    className={`absolute top-10 right-1/3 w-48 h-48 rounded-full blur-3xl opacity-5 ${isDarkMode
                        ? "bg-purple-500"
                        : "bg-purple-400"
                        }`}
                />
            </motion.div>

            <div className="relative z-10 px-6 pt-16 pb-32 md:pb-16">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="text-center space-y-8"
                    >
                        {/* Logo */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-4"
                        >
                            <motion.div
                                className="inline-flex items-center gap-2 text-2xl font-medium"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="text-blue-500"
                                >
                                    <Code2 size={28} />
                                </motion.div>
                                <span>Intekhab Ansari</span>
                            </motion.div>

                            <p
                                className={`text-sm max-w-md mx-auto ${isDarkMode
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                    }`}
                            >
                                Crafting digital experiences with passion,
                                precision, and creativity.
                            </p>
                        </motion.div>

                        {/* Social Icons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex justify-center gap-6"
                        >
                            {socialLinks.map((social, index) => {
                                const isEmail = social.name === "Email";
                                const IconComponent = social.icon;

                                return (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        aria-label={social.name}
                                        {...(!isEmail && {
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                        })}
                                        className={`p-3 rounded-full transition-all duration-300 ${isDarkMode
                                            ? "bg-slate-900/60 hover:bg-slate-800 text-gray-400 border border-slate-800"
                                            : "bg-white/80 hover:bg-slate-100 text-gray-600 border border-slate-200"
                                            } ${social.color}`}
                                        whileHover={{
                                            scale: 1.1,
                                            y: -2,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{
                                            delay: index * 0.1 + 0.5,
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <IconComponent size={20} />
                                    </motion.a>
                                );
                            })}
                        </motion.div>

                        {/* Divider */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center gap-4"
                        >
                            <div className="h-px w-16 bg-slate-700/50" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="text-red-500"
                            >
                                <Heart size={16} fill="currentColor" />
                            </motion.div>
                            <div className="h-px w-16 bg-slate-700/50" />
                        </motion.div>

                        {/* Copyright */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-2"
                        >
                            <p className="text-sm text-gray-500">
                                © {new Date().getFullYear()} Intekhab Ansari. All rights reserved.
                            </p>
                            <p className="text-xs text-gray-500">
                                Built with React, TypeScript & Framer Motion
                            </p>
                        </motion.div>

                        {/* Back to Top */}
                        <motion.div variants={itemVariants}>
                            <motion.button
                                onClick={scrollToTop}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${isDarkMode
                                    ? "bg-slate-900/60 hover:bg-slate-800 text-gray-300 border-slate-800"
                                    : "bg-white/80 hover:bg-slate-100 text-gray-700 border-slate-200"
                                    }`}
                                whileHover={{
                                    y: -2,
                                    scale: 1.05,
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowUp size={16} />
                                Back to top
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
