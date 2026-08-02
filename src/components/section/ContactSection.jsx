import { useState, useRef } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";
import { Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../utils/data";
import { containerVariants, itemVariants } from "../../utils/helper";
import TextInput from "../input/TextInput";
import SuccessModel from "../SuccessModel";
import BackgroundPattern from "../BackgroundPattern";

const ContactSection = () => {
    const { isDarkMode } = useTheme();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const handleInputChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // ✅ SUBMIT WITH VALIDATION + MAIL API
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Empty field validation
        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.message.trim()
        ) {
            alert("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append(
                "access_key",
                "6cf28195-22fc-497e-81d4-e7a69eec5f85"
            );
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("message", formData.message);

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
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to send message");
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
                        className={`text-sm uppercase tracking-widest mb-4 ${
                            isDarkMode ? "text-gray-500" : "text-gray-600"
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
                        className={`text-xl max-w-2xl mx-auto ${
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
                                    ? "bg-gray-800/50 border-gray-700"
                                    : "bg-gray-50/80 border-gray-200"
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
                                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white py-4 rounded-xl uppercase tracking-wider text-sm font-medium flex items-center justify-center gap-2"
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
                            {CONTACT_INFO.map((info) => (
                                <motion.a
                                    key={info.label}
                                    href={info.link}
                                    {...(info.label === "Location" && {
                                        target: "_blank",
                                        rel: "noopener noreferrer"
                                    })}
                                    whileHover={{ x: 4 }}
                                    className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                                        isDarkMode
                                            ? "bg-gray-800/40 hover:bg-gray-800/70 text-white"
                                            : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                                    }`}
                                >
                                    <info.icon
                                        size={20}
                                        className="text-blue-500 shrink-0"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {info.label}
                                        </p>
                                        <p className="font-medium group-hover:text-blue-500 transition-colors">
                                            {info.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
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
