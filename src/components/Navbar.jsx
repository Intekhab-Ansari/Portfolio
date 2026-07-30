import { useState, useEffect } from 'react';
import{
    motion,
    useScroll,
    AnimatePresence,
} from "framer-motion";
import {
    Code2,
    Sun,
    Moon,
    Menu,
    X,
    Code,
    Home,
    Layers,
    Briefcase,
    User,
    Mail,
} from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const {isDarkMode, toggleDarkMode} = useTheme();
    const [activeSection, setActiveSection] = useState("home");

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if(element){
            element.scrollIntoView({behavior:"smooth"});
        }
    };

    useEffect(() => {
        const sections = ["home", "work", "skills", "about", "contact"];
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200; // offset for better detection
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Trigger initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                style={{opacity: 1}}
                className={`fixed top-0 w-full z-50 px-6 py-4 ${
                    isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"
                } backdrop-blur-md border-b ${
                    isDarkMode ? "border-gray-800" : "border-gray-200"
                }`}
            >
                <div className='max-w-7xl mx-auto flex items-center justify-between'>
                    <motion.div
                        whileHover={{scale:1.05}}
                        className=''
                    >
                        <Code2 size={24} className='text-blue-500'/>{" "}
                        <span className={`p-2 rounded-full transition-colors ${
                                isDarkMode
                                    ?"text-gray-400 hover:text-white hover:bg-gray-800"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                            }`}>Time to Program</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-8'>
                        {["Home", "Work", "Skills", "About", "Contact"].map((item)=>(
                            <motion.button
                                key={item}
                                whileHover={{y:-2}}
                                onClick={()=>scrollToSection(item.toLowerCase())}
                                className={`text-sm uppercase tracking-wider transition-colors ${
                                    isDarkMode
                                        ?"text-gray-400 hover:text-white"
                                        :"text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {item}
                            </motion.button>
                        ))}
                        <motion.button
                            whileHover={{scale:1.05}}
                            whileTap={{scale:0.95}}
                            onClick={() => toggleDarkMode(isDarkMode? "light" : "dark")}
                            className={`p-2 rounded-full transition-colors ${
                                isDarkMode
                                    ?"text-gray-400 hover:text-white hover:bg-gray-800"
                                    :"text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                            }`}
                        >
                            {isDarkMode ? <Sun size={18}/> : <Moon size={18}/> }
                        </motion.button>
                    </div>

                    {/* Mobile Dark Mode Button Only (No hamburger) */}
                    <div className='md:hidden flex items-center space-x-4'>
                        <motion.button
                            whileHover={{scale:1.05}}
                            whileTap={{scale:0.95}}
                            onClick={()=> toggleDarkMode(isDarkMode ? "light" : "dark")}
                            className={`p-2 rounded-full transition-colors ${
                                isDarkMode
                                    ?"text-gray-400 hover:text-white hover:bg-gray-800"
                                    :"text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                            }`}
                        >
                            {isDarkMode ? <Sun size={18}/> : <Moon size={18}/>}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Bottom Navigation Bar */}
            <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 border-t ${
                isDarkMode
                    ? "bg-gray-950/90 border-gray-800 text-gray-400"
                    : "bg-white/90 border-gray-200 text-gray-600"
            } backdrop-blur-md flex items-center justify-around px-2`}>
                {[
                    { label: "Home", id: "home", icon: Home },
                    { label: "Services", id: "skills", icon: Layers },
                    { label: "Portfolio", id: "work", icon: Briefcase },
                    { label: "About", id: "about", icon: User },
                    { label: "Contact", id: "contact", icon: Mail },
                ].map((tab) => {
                    const isActive = activeSection === tab.id;
                    const IconComponent = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => scrollToSection(tab.id)}
                            className="relative flex flex-col items-center justify-center w-16 h-full transition-colors active:scale-95"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute top-0 w-12 h-[3px] bg-teal-500 rounded-b-md"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <IconComponent
                                size={20}
                                className={`transition-colors duration-300 ${
                                    isActive
                                        ? (isDarkMode ? "text-teal-400" : "text-teal-600")
                                        : "text-inherit hover:text-blue-500"
                                }`}
                            />
                            <span
                                className={`text-[10px] font-bold tracking-wider mt-1 transition-colors duration-300 ${
                                    isActive
                                        ? (isDarkMode ? "text-teal-400" : "text-teal-600")
                                        : "text-inherit"
                                }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </>
    );
};

export default Navbar;