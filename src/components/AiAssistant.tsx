'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Send,
    X,
    RotateCcw,
    User,
    ExternalLink,
    ArrowUpRight,
    Lock,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AiLogo } from './AiLogo';
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
    const lines = text.split('\n');

    const renderLine = (rawLine: string, index: number) => {
        // Check if line is a bullet point (starts with •, -, or *)
        const bulletMatch = rawLine.match(/^\s*([•\-\*])\s*(.*)$/);
        const isBullet = Boolean(bulletMatch);
        const lineContent = isBullet && bulletMatch ? bulletMatch[2] : rawLine;

        // Parse markdown links [text](url)
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(lineContent)) !== null) {
            if (match.index > lastIndex) {
                parts.push(lineContent.substring(lastIndex, match.index));
            }

            const label = match[1];
            const url = match[2];

            parts.push(
                <a
                    key={`link-${index}-${match.index}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 hover:border-cyan-400 hover:text-cyan-200 transition-all shadow-sm my-0.5 mx-0.5 align-middle"
                >
                    <span>{label}</span>
                    <ExternalLink size={11} className="shrink-0" />
                </a>
            );

            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < lineContent.length) {
            parts.push(lineContent.substring(lastIndex));
        }

        // Parse **bold** inside text parts
        const parseBold = (content: React.ReactNode[]): React.ReactNode[] => {
            return content.flatMap((item, itemIdx) => {
                if (typeof item !== 'string') return item;
                const boldParts = item.split(/\*\*(.*?)\*\*/g);
                return boldParts.map((subPart, subIdx) => {
                    if (subIdx % 2 === 1) {
                        return (
                            <strong
                                key={`bold-${index}-${itemIdx}-${subIdx}`}
                                className={isDarkMode ? 'text-white font-semibold' : 'text-gray-950 font-semibold'}
                            >
                                {subPart}
                            </strong>
                        );
                    }
                    return subPart;
                });
            });
        };

        const parsedContent = parseBold(parts.length > 0 ? parts : [lineContent]);

        // Render clean bullet item with custom glowing dot
        if (isBullet) {
            return (
                <div key={index} className="flex items-start gap-2.5 my-1.5 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shrink-0 mt-2 shadow-sm shadow-cyan-400/60" />
                    <div className="flex-1 leading-relaxed text-xs sm:text-sm">{parsedContent}</div>
                </div>
            );
        }

        // Empty line separator
        if (!rawLine.trim()) {
            return <div key={index} className="h-1.5" />;
        }

        return (
            <p key={index} className="leading-relaxed my-1 text-xs sm:text-sm">
                {parsedContent}
            </p>
        );
    };

    return <div className="space-y-0.5">{lines.map(renderLine)}</div>;
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
        text: `Hi! 👋 I'm **Intekhab's AI Assistant**.

Ask me anything about Intekhab's:
• **Browser Tools:** IntekEdit & IntekChat
• **Client Websites:** Tiffin Wales, SalvageReef, Quantorra
• **Achievements:** #1 Google Ranking in USA
• **Technical Skills:** React, Next.js 15, Java, Spring Boot, WordPress
• **Hiring & Quotes:** Freelance rates & direct contact`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: INITIAL_SUGGESTIONS,
    };

    const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setTimeout(() => inputRef.current?.focus(), 250);
        }
    }, [isOpen, messages, isTyping]);

    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(false), 9000);
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
        }, 500);
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
            {/* --- Floating Action Button (Bottom-Right) --- */}
            <div className="fixed right-4 md:right-6 bottom-20 md:bottom-6 z-50 flex items-center">
                {/* Floating Callout Pill */}
                <AnimatePresence>
                    {showTooltip && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className={`mr-3 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-2xl backdrop-blur-xl cursor-pointer group transition-all ${
                                isDarkMode
                                    ? 'bg-slate-900/90 border-cyan-500/30 text-gray-200 hover:border-cyan-400 hover:shadow-cyan-500/20'
                                    : 'bg-white/95 border-blue-400/40 text-gray-800 hover:border-blue-500 hover:shadow-blue-500/20'
                            }`}
                            onClick={() => {
                                setIsOpen(true);
                                setShowTooltip(false);
                            }}
                        >
                            <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-sm shadow-cyan-400" />
                            </span>
                            <span className="text-xs font-semibold tracking-wide flex items-center gap-1.5">
                                <span>Ask Intekhab&apos;s AI</span>
                                <Sparkles size={13} className="text-cyan-400" />
                            </span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTooltip(false);
                                }}
                                className="p-0.5 hover:text-gray-400 text-gray-500 transition ml-1"
                                aria-label="Dismiss tooltip"
                            >
                                <X size={12} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Celestial Holographic AI Trigger Button */}
                <motion.button
                    type="button"
                    onClick={() => {
                        setIsOpen((prev) => !prev);
                        setShowTooltip(false);
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative group p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/40 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all duration-300 focus:outline-none cursor-pointer overflow-hidden backdrop-blur-xl"
                    aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
                >
                    {/* Glowing Radial Halo */}
                    <span className="absolute -inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-30 group-hover:opacity-70 blur-md transition-opacity duration-300" />

                    {/* Button Icon Container */}
                    <div className="relative z-10 flex items-center justify-center">
                        {isOpen ? (
                            <div className="w-7 h-7 flex items-center justify-center text-cyan-300">
                                <X size={22} className="transition-transform duration-300 group-hover:rotate-90" />
                            </div>
                        ) : (
                            <AiLogo size={28} animated={false} />
                        )}
                    </div>

                    {/* Active Status Badge Dot */}
                    {!isOpen && (
                        <span className="absolute top-1.5 right-1.5 flex h-3 w-3 z-20">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950 shadow-sm shadow-emerald-400" />
                        </span>
                    )}
                </motion.button>
            </div>

            {/* --- AI Chat Window Drawer --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 25 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 25 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className={`fixed right-3 sm:right-6 bottom-24 sm:bottom-24 z-50 w-[calc(100vw-1.5rem)] sm:w-[430px] h-[590px] max-h-[calc(100vh-8rem)] rounded-3xl border shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl ring-1 ${
                            isDarkMode
                                ? 'bg-slate-950/95 border-slate-800/90 text-gray-100 shadow-cyan-500/10 ring-cyan-500/20'
                                : 'bg-white/95 border-slate-200 text-gray-900 shadow-blue-500/15 ring-blue-500/15'
                        }`}
                    >
                        {/* Top Ambient Glow Line */}
                        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />

                        {/* Header */}
                        <div
                            className={`px-4 py-3.5 border-b flex items-center justify-between shrink-0 backdrop-blur-md ${
                                isDarkMode
                                    ? 'border-slate-800/80 bg-slate-900/60'
                                    : 'border-slate-100 bg-slate-50/80'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-950 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/20 p-1.5">
                                        <AiLogo size={24} />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-sm shadow-emerald-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm tracking-wide bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                                            Intekhab AI
                                        </h3>
                                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            Online
                                        </span>
                                    </div>
                                    <p className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Instant Portfolio Intelligence
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={resetChat}
                                    title="Reset Conversation"
                                    className={`p-2 rounded-xl transition cursor-pointer ${
                                        isDarkMode
                                            ? 'hover:bg-slate-800 text-gray-400 hover:text-white'
                                            : 'hover:bg-slate-200 text-gray-600 hover:text-gray-900'
                                    }`}
                                    aria-label="Reset Conversation"
                                >
                                    <RotateCcw size={15} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    title="Close Assistant"
                                    className={`p-2 rounded-xl transition cursor-pointer ${
                                        isDarkMode
                                            ? 'hover:bg-slate-800 text-gray-400 hover:text-white'
                                            : 'hover:bg-slate-200 text-gray-600 hover:text-gray-900'
                                    }`}
                                    aria-label="Close Assistant"
                                >
                                    <X size={17} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages Feed with Sleek Custom Scrollbar */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
                            {messages.map((msg) => (
                                <div key={msg.id} className="space-y-2.5">
                                    <div
                                        className={`flex gap-2.5 ${
                                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        {msg.sender === 'assistant' && (
                                            <div className="w-7 h-7 rounded-xl bg-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-cyan-500/20">
                                                <AiLogo size={18} />
                                            </div>
                                        )}

                                        <div
                                            className={`max-w-[88%] rounded-2xl p-4 shadow-sm ${
                                                msg.sender === 'user'
                                                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white rounded-tr-sm shadow-md shadow-blue-500/20'
                                                    : isDarkMode
                                                    ? 'bg-slate-900/90 border border-slate-800 text-gray-200 rounded-tl-sm backdrop-blur-md shadow-inner'
                                                    : 'bg-slate-100/90 border border-slate-200/90 text-gray-900 rounded-tl-sm shadow-sm'
                                            }`}
                                        >
                                            <FormattedText text={msg.text} isDarkMode={isDarkMode} />
                                            <div
                                                className={`text-[10px] mt-2 text-right font-medium opacity-50 ${
                                                    msg.sender === 'user' ? 'text-cyan-100' : 'text-gray-400'
                                                }`}
                                            >
                                                {msg.timestamp}
                                            </div>
                                        </div>

                                        {msg.sender === 'user' && (
                                            <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                                <User size={14} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Compact & Sleek Follow-up Suggestion Chips */}
                                    {msg.suggestions && msg.suggestions.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pl-9 pt-1">
                                            {msg.suggestions.map((suggestion, sIdx) => (
                                                <button
                                                    key={`sug-${msg.id}-${sIdx}`}
                                                    type="button"
                                                    onClick={() => handleSendMessage(suggestion)}
                                                    className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 group text-left cursor-pointer ${
                                                        isDarkMode
                                                            ? 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-950/30 hover:shadow-sm hover:shadow-cyan-500/20'
                                                            : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50'
                                                    }`}
                                                >
                                                    <span className="leading-snug">{suggestion}</span>
                                                    <ArrowUpRight
                                                        size={12}
                                                        className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-cyan-400 shrink-0"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Futuristic Typing Indicator */}
                            {isTyping && (
                                <div className="flex items-center gap-2.5 text-xs text-gray-400 pl-1">
                                    <div className="w-7 h-7 rounded-xl bg-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center shrink-0">
                                        <AiLogo size={18} />
                                    </div>
                                    <div
                                        className={`px-3.5 py-2 rounded-2xl border flex items-center gap-2 ${
                                            isDarkMode
                                                ? 'bg-slate-900/90 border-slate-800'
                                                : 'bg-slate-100 border-slate-200'
                                        }`}
                                    >
                                        <div className="flex gap-1 items-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                                        </div>
                                        <span className="text-[11px] font-medium text-cyan-300/80">Synthesizing response...</span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Footer */}
                        <div
                            className={`p-3 border-t shrink-0 backdrop-blur-md ${
                                isDarkMode ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-100 bg-slate-50'
                            }`}
                        >
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                                className="flex items-center gap-2"
                            >
                                <div className="relative flex-1">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask about projects, tools, skills, hiring..."
                                        className={`w-full text-xs sm:text-sm pl-4 pr-3 py-2.5 rounded-full border outline-none transition-all ${
                                            isDarkMode
                                                ? 'bg-slate-900/90 border-slate-700/80 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/25'
                                                : 'bg-white border-slate-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25'
                                        }`}
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-2.5 sm:px-4 sm:py-2.5 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                                        inputValue.trim() && !isTyping
                                            ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-cyan-500/25 cursor-pointer'
                                            : 'bg-slate-800/80 text-gray-500 opacity-50 cursor-not-allowed'
                                    }`}
                                    aria-label="Send message"
                                >
                                    <Send size={14} />
                                    <span className="hidden sm:inline">Send</span>
                                </motion.button>
                            </form>

                            <div className="mt-2 text-center flex items-center justify-center gap-1 text-[10px] text-gray-500 font-medium">
                                <Lock size={10} className="text-cyan-400/70" />
                                <span>100% On-Device &amp; Private • Instant Answers</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AiAssistant;
