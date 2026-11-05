'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    Sparkles,
    Send,
    X,
    RotateCcw,
    User,
    ExternalLink,
    ChevronRight,
    MessageSquare,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
    ChatMessage,
    INITIAL_SUGGESTIONS,
    getAiResponse,
} from '../utils/aiKnowledge';

interface FormattedTextProps {
    text: string;
    isDarkMode: boolean;
}

const FormattedText: React.FC<FormattedTextProps> = ({ text, isDarkMode }) => {
    // Helper to render bold, bullet points, and markdown links
    const lines = text.split('\n');

    const renderLine = (line: string, index: number) => {
        // Parse markdown links [text](url)
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                parts.push(line.substring(lastIndex, match.index));
            }

            const label = match[1];
            const url = match[2];

            parts.push(
                <a
                    key={`link-${index}-${match.index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 decoration-cyan-400/50 hover:decoration-cyan-300 transition-colors mx-0.5"
                >
                    <span>{label}</span>
                    <ExternalLink size={12} className="shrink-0" />
                </a>
            );

            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < line.length) {
            parts.push(line.substring(lastIndex));
        }

        // Parse **bold** inside text
        const parseBold = (content: React.ReactNode[]): React.ReactNode[] => {
            return content.flatMap((item, itemIdx) => {
                if (typeof item !== 'string') return item;
                const boldParts = item.split(/\*\*(.*?)\*\*/g);
                return boldParts.map((subPart, subIdx) => {
                    if (subIdx % 2 === 1) {
                        return (
                            <strong
                                key={`bold-${index}-${itemIdx}-${subIdx}`}
                                className={isDarkMode ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}
                            >
                                {subPart}
                            </strong>
                        );
                    }
                    return subPart;
                });
            });
        };

        const parsedContent = parseBold(parts.length > 0 ? parts : [line]);

        // Check if line is a bullet point
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            return (
                <div key={index} className="flex items-start gap-2 my-1 pl-1">
                    <span className="text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                    <div className="flex-1 leading-relaxed">{parsedContent}</div>
                </div>
            );
        }

        // Empty line
        if (!line.trim()) {
            return <div key={index} className="h-2" />;
        }

        return (
            <p key={index} className="leading-relaxed my-1">
                {parsedContent}
            </p>
        );
    };

    return <div className="space-y-0.5 text-xs sm:text-sm">{lines.map(renderLine)}</div>;
};

const AiAssistant: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    const initialBotMessage: ChatMessage = {
        id: 'welcome-msg',
        sender: 'assistant',
        text: `Hi there! 👋 I'm **Intekhab's AI Assistant**.

Ask me anything about Intekhab's:
• **Browser Tools:** IntekEdit & IntekChat
• **Client Projects:** Tiffin Wales, SalvageReef, Quantorra
• **Achievements:** #1 Google Ranking in USA
• **Technical Skills:** React, Next.js, Java, Spring Boot, WordPress
• **Hiring & Quotes:** Freelance availability & contact details`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: INITIAL_SUGGESTIONS,
    };

    const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll chat feed
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setTimeout(() => inputRef.current?.focus(), 250);
        }
    }, [isOpen, messages, isTyping]);

    // Hide tooltip after a few seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    const handleSendMessage = (textToSend?: string) => {
        const messageText = (textToSend || inputValue).trim();
        if (!messageText || isTyping) return;

        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            sender: 'user',
            text: messageText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Realistic typing simulation delay
        setTimeout(() => {
            const { response, suggestions } = getAiResponse(messageText);

            const botMsg: ChatMessage = {
                id: `bot-${Date.now()}`,
                sender: 'assistant',
                text: response,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                suggestions,
            };

            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 550);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const resetChat = () => {
        setMessages([initialBotMessage]);
    };

    return (
        <>
            {/* --- Floating Trigger Button (Bottom-Right) --- */}
            <div className="fixed right-4 md:right-6 bottom-20 md:bottom-6 z-50 flex items-center">
                {/* Floating Tooltip Callout */}
                <AnimatePresence>
                    {showTooltip && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={`mr-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl border shadow-xl backdrop-blur-md cursor-pointer ${
                                isDarkMode
                                    ? 'bg-slate-900/90 border-slate-700/80 text-gray-200 hover:border-cyan-500/50'
                                    : 'bg-white/95 border-slate-200 text-gray-800 hover:border-blue-400'
                            }`}
                            onClick={() => {
                                setIsOpen(true);
                                setShowTooltip(false);
                            }}
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                            </span>
                            <span className="text-xs font-semibold tracking-wide">
                                Chat with Intekhab&apos;s AI
                            </span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTooltip(false);
                                }}
                                className="p-0.5 hover:text-gray-400 text-gray-500 transition"
                                aria-label="Dismiss tooltip"
                            >
                                <X size={12} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Floating Button */}
                <motion.button
                    type="button"
                    onClick={() => {
                        setIsOpen((prev) => !prev);
                        setShowTooltip(false);
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative group p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 focus:outline-none cursor-pointer"
                    aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
                >
                    {/* Pulsing ring aura */}
                    <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 opacity-40 blur-sm group-hover:opacity-75 transition-opacity" />

                    {/* Button Icon */}
                    <div className="relative z-10 flex items-center justify-center">
                        {isOpen ? (
                            <X size={24} className="transition-transform duration-200" />
                        ) : (
                            <div className="relative">
                                <Bot size={24} className="transition-transform duration-200 group-hover:rotate-6" />
                                <Sparkles size={12} className="absolute -top-1 -right-1 text-amber-300 animate-pulse" />
                            </div>
                        )}
                    </div>

                    {/* Active Status Dot */}
                    {!isOpen && (
                        <span className="absolute top-0 right-0 flex h-3.5 w-3.5 z-20">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900" />
                        </span>
                    )}
                </motion.button>
            </div>

            {/* --- Chat Window Drawer --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 25 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 25 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className={`fixed right-3 sm:right-6 bottom-24 sm:bottom-24 z-50 w-[calc(100vw-1.5rem)] sm:w-[420px] h-[580px] max-h-[calc(100vh-8rem)] rounded-3xl border shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl ${
                            isDarkMode
                                ? 'bg-slate-950/95 border-slate-800 text-gray-100 shadow-cyan-500/10'
                                : 'bg-white/95 border-slate-200 text-gray-900 shadow-blue-500/15'
                        }`}
                    >
                        {/* Header */}
                        <div
                            className={`p-4 border-b flex items-center justify-between shrink-0 ${
                                isDarkMode
                                    ? 'border-slate-800 bg-slate-900/60'
                                    : 'border-slate-100 bg-slate-50/80'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                                        <Bot size={22} />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="font-bold text-sm tracking-wide">Intekhab AI</h3>
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                                            Online
                                        </span>
                                    </div>
                                    <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Instant Portfolio Knowledge
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={resetChat}
                                    title="Reset Conversation"
                                    className={`p-2 rounded-xl transition ${
                                        isDarkMode
                                            ? 'hover:bg-slate-800 text-gray-400 hover:text-white'
                                            : 'hover:bg-slate-200 text-gray-600 hover:text-gray-900'
                                    }`}
                                    aria-label="Reset Conversation"
                                >
                                    <RotateCcw size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    title="Close Assistant"
                                    className={`p-2 rounded-xl transition ${
                                        isDarkMode
                                            ? 'hover:bg-slate-800 text-gray-400 hover:text-white'
                                            : 'hover:bg-slate-200 text-gray-600 hover:text-gray-900'
                                    }`}
                                    aria-label="Close Assistant"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages Feed */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
                            {messages.map((msg) => (
                                <div key={msg.id} className="space-y-2">
                                    <div
                                        className={`flex gap-2.5 ${
                                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        {msg.sender === 'assistant' && (
                                            <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                                                <Bot size={15} />
                                            </div>
                                        )}

                                        <div
                                            className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm ${
                                                msg.sender === 'user'
                                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-sm'
                                                    : isDarkMode
                                                    ? 'bg-slate-900 border border-slate-800/80 text-gray-200 rounded-tl-sm'
                                                    : 'bg-slate-100 border border-slate-200/80 text-gray-800 rounded-tl-sm'
                                            }`}
                                        >
                                            <FormattedText text={msg.text} isDarkMode={isDarkMode} />
                                            <div
                                                className={`text-[10px] mt-1.5 text-right font-medium opacity-60 ${
                                                    msg.sender === 'user' ? 'text-cyan-100' : 'text-gray-400'
                                                }`}
                                            >
                                                {msg.timestamp}
                                            </div>
                                        </div>

                                        {msg.sender === 'user' && (
                                            <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                                <User size={15} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Follow-up / Initial Suggestion Chips */}
                                    {msg.suggestions && msg.suggestions.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pl-9 pt-1">
                                            {msg.suggestions.map((suggestion, sIdx) => (
                                                <button
                                                    key={`sug-${msg.id}-${sIdx}`}
                                                    type="button"
                                                    onClick={() => handleSendMessage(suggestion)}
                                                    className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1 group text-left cursor-pointer ${
                                                        isDarkMode
                                                            ? 'bg-slate-900/70 border-slate-700/80 text-gray-300 hover:border-cyan-500/60 hover:text-cyan-300 hover:bg-slate-800'
                                                            : 'bg-white border-slate-200 text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    <span>{suggestion}</span>
                                                    <ChevronRight
                                                        size={12}
                                                        className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing Animation Indicator */}
                            {isTyping && (
                                <div className="flex items-center gap-2.5 text-xs text-gray-400 pl-1">
                                    <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                                        <Bot size={15} />
                                    </div>
                                    <div
                                        className={`px-3 py-2 rounded-2xl border flex items-center gap-1.5 ${
                                            isDarkMode
                                                ? 'bg-slate-900 border-slate-800'
                                                : 'bg-slate-100 border-slate-200'
                                        }`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                                        <span className="text-[11px] ml-1 font-medium">Formulating answer...</span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Footer */}
                        <div
                            className={`p-3 border-t shrink-0 ${
                                isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
                            }`}
                        >
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask anything about Intekhab, projects, tools..."
                                    className={`flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-full border outline-none transition ${
                                        isDarkMode
                                            ? 'bg-slate-900 border-slate-700/80 text-white placeholder-gray-500 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40'
                                            : 'bg-white border-slate-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40'
                                    }`}
                                />

                                <motion.button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-2.5 sm:px-4 sm:py-2.5 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                                        inputValue.trim() && !isTyping
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-cyan-500/25 cursor-pointer'
                                            : 'bg-slate-800 text-gray-500 opacity-60 cursor-not-allowed'
                                    }`}
                                    aria-label="Send message"
                                >
                                    <Send size={15} />
                                    <span className="hidden sm:inline">Send</span>
                                </motion.button>
                            </form>

                            <div className="mt-2 text-center">
                                <span className="text-[10px] text-gray-500 font-medium">
                                    💡 Instant on-device portfolio intelligence • 100% Private
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AiAssistant;

