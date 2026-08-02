import React, { useState, useRef, FormEvent } from "react";
import {
    motion,
    useInView,
} from "framer-motion";
import { Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { CONTACT_INFO } from "../../utils/data";
import { containerVariants, itemVariants } from "../../utils/helper";
import TextInput from "../input/TextInput";
import SuccessModel from "../SuccessModel";
import BackgroundPattern from "../BackgroundPattern";

const ContactSection: React.FC = () => {
    const { isDarkMode } = useTheme();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const handleInputChange = (key: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Sanitize string to prevent basic XSS script injection
    const sanitizeInput = (str: string): string => {
        return str.replace(/<[^>]*>?/gm, "").trim();
    };

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // SUBMIT WITH SECURITY VALIDATION + MAIL API
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const cleanName = sanitizeInput(formData.name);
        const cleanEmail = sanitizeInput(formData.email);
        const cleanMessage = sanitizeInput(formData.message);

        // Empty field validation
        if (!cleanName || !cleanEmail || !cleanMessage) {
            alert("Please fill in all fields with valid content.");
            return;
        }

        if (!validateEmail(cleanEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append(
                "access_key",
                "6cf28195-22fc-497e-81d4-e7a69eec5f85"
            );
            formDataToSend.append("name", cleanName);
            formDataToSend.append("email", cleanEmail);
            formDataToSend.append("message", cleanMessage);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataToSend,
            });

            const data = await response.json();

            if (data.success) {
                setShowSuccess(true);
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                alert(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to send message. Please check your internet connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className={`py-24 px-6 ${
                isDarkMode
                    ? "bg-slate-950 text-white"
                    : "bg-slate-50/90 text-gray-900"
            } relative overflow-hidden transition-colors duration-500`}
        >
            {/* Background Pattern & Dynamic Light Mesh */}
            <BackgroundPattern isDarkMode={isDarkMode} />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-20"
                >
                    <motion.p
                        variants={itemVariants}
                        className={`text-xs md:text-sm uppercase tracking-widest font-semibold mb-3 ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                    >
                        Let's Connect
                    </motion.p>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-5xl font-light mb-6"
                    >
                        Get In{" "}
                        <span className="text-blue-500 font-medium">
                            Touch
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className={`text-lg md:text-xl max-w-2xl mx-auto ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                        Ready to start your next project? Let's discuss how
                        we can bring your ideas to life.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* CONTACT FORM */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className={`p-8 rounded-2xl border ${
                                isDarkMode
                                    ? "bg-slate-900/60 border-slate-800 backdrop-blur-md"
                                    : "bg-white/80 border-slate-200 backdrop-blur-md"
                            }`}
                        >
                            <h3 className="text-2xl font-medium mb-8">
                                Send me a message
                            </h3>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <TextInput
                                        isDarkMode={isDarkMode}
                                        label="Your Name"
                                        value={formData.name}
                                        handleInputChange={(text) =>
                                            handleInputChange("name", text)
                                        }
                                    />
                                    <TextInput
                                        isDarkMode={isDarkMode}
                                        label="Email Address"
                                        value={formData.email}
                                        handleInputChange={(text) =>
                                            handleInputChange("email", text)
                                        }
                                    />
                                </div>

                                <TextInput
                                    isDarkMode={isDarkMode}
                                    label="Your Message"
                                    textarea
                                    value={formData.message}
                                    handleInputChange={(text) =>
                                        handleInputChange("message", text)
                                    }
                                />

                                <motion.button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        !formData.name.trim() ||
                                        !formData.email.trim() ||
                                        !formData.message.trim()
                                    }
                                    whileHover={{ y: -2, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white py-4 rounded-xl uppercase tracking-wider text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 1,
                                                    ease: "linear",
                                                }}
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>

                    {/* CONTACT INFO */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-medium mb-6">
                                Contact Information
                            </h3>
                            {CONTACT_INFO.map((info) => {
                                const IconComponent = info.icon;
                                return (
                                    <motion.a
                                        key={info.label}
                                        href={info.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ x: 4 }}
                                        className={`group flex items-center gap-4 p-4 mb-4 rounded-xl border transition-all duration-300 ${
                                            isDarkMode
                                                ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900/80 text-white"
                                                : "bg-white/60 border-slate-200/60 hover:bg-white text-gray-900"
                                        }`}
                                    >
                                        <IconComponent
                                            size={20}
                                            className="text-blue-500 shrink-0"
                                        />
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider">
                                                {info.label}
                                            </p>
                                            <p className="font-medium group-hover:text-blue-500 transition-colors">
                                                {info.value}
                                            </p>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <SuccessModel
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                isDarkMode={isDarkMode}
            />
        </section>
    );
};

export default ContactSection;
