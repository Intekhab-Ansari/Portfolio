'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Radio,
    MessageSquare,
    Lock,
    ShieldCheck,
    QrCode,
    ExternalLink,
    Zap,
    Copy,
    Check,
    Laptop,
    Smartphone,
    Sparkles,
    RefreshCw,
    Flame,
    ArrowRight,
    X,
    Wifi,
    Eye,
    Shield,
    CheckCircle2,
    Layers,
    Share2,
} from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { TOOLS_DATA } from '../../utils/data';
import { containerVariants, itemVariants } from '../../utils/helper';

interface ToolsSectionProps {
    isDarkMode: boolean;
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ isDarkMode }) => {
    // Mode tab state: 'intekdrop' | 'intekchat' | 'preview'
    const [activeTab, setActiveTab] = useState<'intekdrop' | 'intekchat' | 'preview'>('intekdrop');

    // IntekDrop Transfer Simulation State
    const [isTransferring, setIsTransferring] = useState<boolean>(false);
    const [transferProgress, setTransferProgress] = useState<number>(0);
    const [transferSpeed, setTransferSpeed] = useState<number>(48.2);
    const [transferDone, setTransferDone] = useState<boolean>(false);

    // IntekChat View-Once Simulation State
    const [viewOnceState, setViewOnceState] = useState<'unopened' | 'opened' | 'destroyed'>('unopened');
    const [countdown, setCountdown] = useState<number>(5);

    // QR Modal and Copy Link states
    const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    // Helper for image src
    const getImageSrc = (img: any) => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        return img.src || img;
    };

    // Run simulated P2P file transfer
    const handleStartTransfer = () => {
        if (isTransferring) return;
        setIsTransferring(true);
        setTransferDone(false);
        setTransferProgress(0);

        let current = 0;
        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 18) + 12;
            const jitter = (Math.random() * 6 - 3).toFixed(1);
            setTransferSpeed(parseFloat((48.2 + parseFloat(jitter)).toFixed(1)));

            if (current >= 100) {
                setTransferProgress(100);
                setIsTransferring(false);
                setTransferDone(true);
                clearInterval(interval);
            } else {
                setTransferProgress(current);
            }
        }, 320);
    };

    const handleResetTransfer = () => {
        setIsTransferring(false);
        setTransferProgress(0);
        setTransferDone(false);
    };

    // Handle View-Once Click & Self-Destruct
    const handleOpenViewOnce = () => {
        if (viewOnceState !== 'unopened') return;
        setViewOnceState('opened');
        setCountdown(5);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (viewOnceState === 'opened' && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (viewOnceState === 'opened' && countdown === 0) {
            setViewOnceState('destroyed');
        }
        return () => clearTimeout(timer);
    }, [viewOnceState, countdown]);

    const handleResetViewOnce = () => {
        setViewOnceState('unopened');
        setCountdown(5);
    };

    // Copy Invite link
    const handleCopyLink = () => {
        navigator.clipboard.writeText(TOOLS_DATA.flagship.liveUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div id="tools" className="relative scroll-mt-24">
            {/* Header */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="text-center mb-16"
            >
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                    </span>
                    <Zap size={14} className="text-cyan-400" />
                    <span>Featured Developer Tools</span>
                </motion.div>

                <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-5xl font-light mb-4"
                >
                    Web &amp; P2P <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent font-semibold">Tools</span>
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className={`text-base md:text-lg ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    } max-w-2xl mx-auto font-light`}
                >
                    High-performance browser-native tools built for zero-knowledge privacy, direct WebRTC streaming, and instant local device discovery.
                </motion.p>
            </motion.div>

            {/* Flagship Hero Showcase: IntekChat & IntekDrop */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`relative rounded-3xl overflow-hidden border transition-all duration-500 mb-16 ${
                    isDarkMode
                        ? "bg-slate-900/80 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.12)]"
                        : "bg-white/95 border-slate-200 shadow-2xl shadow-blue-500/10"
                } backdrop-blur-xl`}
            >
                {/* Glowing Top Neon Gradient Line */}
                <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />

                {/* Card Top Bar */}
                <div className={`p-4 sm:p-6 border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    isDarkMode ? "border-slate-800 bg-slate-950/60" : "border-slate-100 bg-slate-50/80"
                }`}>
                    {/* Brand & Status */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
                            <Radio size={20} className="animate-pulse" />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    intek<span className="text-cyan-400">chat</span>
                                </h3>
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                                    IntekDrop P2P
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">
                                Direct WebRTC File Transfer &amp; Private Encrypted Room Chat
                            </p>
                        </div>
                    </div>

                    {/* Mode Tabs */}
                    <div className={`flex items-center p-1 rounded-xl border ${
                        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    }`}>
                        <button
                            type="button"
                            onClick={() => setActiveTab('intekdrop')}
                            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                activeTab === 'intekdrop'
                                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
                                    : isDarkMode
                                        ? "text-gray-400 hover:text-white"
                                        : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Radio size={14} />
                            <span>IntekDrop Radar</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('intekchat')}
                            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                activeTab === 'intekchat'
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                                    : isDarkMode
                                        ? "text-gray-400 hover:text-white"
                                        : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Lock size={14} />
                            <span>IntekChat E2EE</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('preview')}
                            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                activeTab === 'preview'
                                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                                    : isDarkMode
                                        ? "text-gray-400 hover:text-white"
                                        : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Eye size={14} />
                            <span>UI Preview</span>
                        </button>
                    </div>
                </div>

                {/* Main Interactive Showcase Body */}
                <div className="p-6 md:p-8">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        {/* Left Simulator Display (7 Cols) */}
                        <div className="lg:col-span-7">
                            <AnimatePresence mode="wait">
                                {activeTab === 'intekdrop' && (
                                    <motion.div
                                        key="tab-intekdrop"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-2xl p-6 bg-slate-950 border border-slate-800/80 relative overflow-hidden"
                                    >
                                        {/* Radar Header */}
                                        <div className="flex items-center justify-between mb-4 z-10 relative">
                                            <div className="flex items-center space-x-2 text-xs font-medium text-cyan-400">
                                                <Wifi size={14} className="animate-pulse" />
                                                <span>Nearby P2P Radar Active</span>
                                            </div>
                                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                                2 Devices Found
                                            </span>
                                        </div>

                                        {/* Radar Canvas with Scanning Beam */}
                                        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-full border border-cyan-500/20 bg-gradient-to-b from-slate-900/60 to-slate-950 flex items-center justify-center overflow-hidden my-4 shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]">
                                            {/* Concentric Range Rings */}
                                            <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20 pointer-events-none" />
                                            <div className="absolute w-32 h-32 rounded-full border border-cyan-500/20 pointer-events-none" />
                                            <div className="absolute w-16 h-16 rounded-full border border-cyan-500/25 pointer-events-none" />

                                            {/* Radar Crosshairs */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-full h-[1px] bg-cyan-500/15" />
                                                <div className="h-full w-[1px] bg-cyan-500/15 absolute" />
                                            </div>

                                            {/* Rotating Radar Sweep Beam */}
                                            <div
                                                className="absolute inset-0 pointer-events-none origin-center"
                                                style={{
                                                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(6, 182, 212, 0.4) 0deg, rgba(6, 182, 212, 0) 60deg)',
                                                    animation: 'spin 4s linear infinite',
                                                }}
                                            />

                                            {/* Center Node: Host (You) */}
                                            <div className="relative z-20 flex flex-col items-center">
                                                <div className="w-11 h-11 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/50">
                                                    <Laptop size={18} className="text-cyan-300" />
                                                </div>
                                                <span className="text-[10px] font-bold text-cyan-300 mt-1 bg-slate-900/90 px-1.5 py-0.5 rounded border border-cyan-500/30">
                                                    You (Host)
                                                </span>
                                            </div>

                                            {/* Discovered Device 1: Mobile Phone (Top-Right) */}
                                            <div className="absolute top-10 right-10 z-20 flex flex-col items-center">
                                                <motion.div
                                                    animate={{
                                                        scale: isTransferring ? [1, 1.15, 1] : 1,
                                                        boxShadow: isTransferring
                                                            ? ["0 0 0 rgba(168,85,247,0)", "0 0 20px rgba(168,85,247,0.8)", "0 0 0 rgba(168,85,247,0)"]
                                                            : "0 0 0 rgba(0,0,0,0)",
                                                    }}
                                                    transition={{ repeat: Infinity, duration: 1.2 }}
                                                    className="w-9 h-9 rounded-full bg-purple-950/90 border border-purple-400 flex items-center justify-center"
                                                >
                                                    <Smartphone size={16} className="text-purple-300" />
                                                </motion.div>
                                                <span className="text-[9px] text-purple-200 mt-0.5 bg-slate-900/80 px-1 rounded">
                                                    Mobile Peer
                                                </span>
                                            </div>

                                            {/* Discovered Device 2: Laptop (Bottom-Left) */}
                                            <div className="absolute bottom-10 left-10 z-20 flex flex-col items-center opacity-75">
                                                <div className="w-8 h-8 rounded-full bg-slate-900 border border-blue-400 flex items-center justify-center">
                                                    <Laptop size={14} className="text-blue-300" />
                                                </div>
                                                <span className="text-[9px] text-gray-300 mt-0.5 bg-slate-900/80 px-1 rounded">
                                                    MacBook M3
                                                </span>
                                            </div>

                                            {/* Simulated Transfer Beam Particles */}
                                            {isTransferring && (
                                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                                                    <line
                                                        x1="50%"
                                                        y1="50%"
                                                        x2="78%"
                                                        y2="22%"
                                                        stroke="#00f2fe"
                                                        strokeWidth="2.5"
                                                        strokeDasharray="6 4"
                                                        strokeLinecap="round"
                                                        className="animate-pulse"
                                                    />
                                                </svg>
                                            )}
                                        </div>

                                        {/* Transfer Progress Bar & Stats */}
                                        <div className="mt-4 pt-4 border-t border-slate-800">
                                            <div className="flex items-center justify-between text-xs mb-2">
                                                <span className="text-gray-300 font-medium">
                                                    {isTransferring
                                                        ? "Transferring confidential-deck.zip..."
                                                        : transferDone
                                                            ? "✅ Transfer Complete (Direct P2P)"
                                                            : "Ready to test direct WebRTC transfer"}
                                                </span>
                                                <span className="text-cyan-400 font-mono font-bold">
                                                    {isTransferring ? `${transferSpeed} MB/s` : transferDone ? "100%" : "0%"}
                                                </span>
                                            </div>

                                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                                    style={{ width: `${transferProgress}%` }}
                                                    transition={{ ease: "easeOut" }}
                                                />
                                            </div>

                                            {/* Simulation Trigger Button */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] text-gray-400">
                                                    Zero server storage • 100% Client-to-Client
                                                </span>
                                                {transferDone ? (
                                                    <button
                                                        type="button"
                                                        onClick={handleResetTransfer}
                                                        className="flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-gray-200 transition"
                                                    >
                                                        <RefreshCw size={12} />
                                                        <span>Reset Demo</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={handleStartTransfer}
                                                        disabled={isTransferring}
                                                        className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition disabled:opacity-50"
                                                    >
                                                        <Sparkles size={13} />
                                                        <span>{isTransferring ? "Streaming Packets..." : "Test P2P Transfer"}</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'intekchat' && (
                                    <motion.div
                                        key="tab-intekchat"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-2xl p-6 bg-slate-950 border border-slate-800/80 relative overflow-hidden"
                                    >
                                        {/* Chat Room Header */}
                                        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                                            <div className="flex items-center space-x-2.5">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                                    <Shield size={16} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-bold text-white">#room-8492</span>
                                                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">
                                                            AES-GCM
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] text-gray-400">
                                                        End-to-End Encrypted • Zero Server Logs
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                Anonymous
                                            </span>
                                        </div>

                                        {/* Simulated Chat Messages */}
                                        <div className="space-y-3 mb-4">
                                            {/* Incoming message */}
                                            <div className="flex items-start space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-800 text-[10px] flex items-center justify-center text-gray-300 font-bold">
                                                    P1
                                                </div>
                                                <div className="bg-slate-900 border border-slate-800 text-gray-200 text-xs p-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                                                    <p>Here is the confidential project mock. Opening it triggers the single-view self-destruct.</p>
                                                </div>
                                            </div>

                                            {/* Ephemeral View-Once Card */}
                                            <div className="flex items-start space-x-2">
                                                <div className="w-6 h-6" />
                                                <div className="w-full max-w-[85%]">
                                                    {viewOnceState === 'unopened' && (
                                                        <button
                                                            type="button"
                                                            onClick={handleOpenViewOnce}
                                                            className="w-full text-left p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/30 hover:border-amber-400 transition-all group flex items-center justify-between"
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
                                                                    <Flame size={18} />
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs font-bold text-amber-300 block">
                                                                        💣 View-Once Photo
                                                                    </span>
                                                                    <span className="text-[10px] text-gray-400">
                                                                        Tap to reveal • Disappears after viewing
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold tracking-wide">
                                                                Open
                                                            </span>
                                                        </button>
                                                    )}

                                                    {viewOnceState === 'opened' && (
                                                        <div className="p-3.5 rounded-2xl bg-slate-900 border-2 border-red-500/80 relative overflow-hidden animate-pulse">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                                                                    <Flame size={14} className="animate-bounce" />
                                                                    Viewing Ephemeral Photo
                                                                </span>
                                                                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono font-bold text-xs">
                                                                    Self-destruct in {countdown}s
                                                                </span>
                                                            </div>
                                                            <div className="h-32 rounded-lg bg-gradient-to-br from-cyan-900/40 via-purple-900/40 to-slate-900 border border-slate-700 flex flex-col items-center justify-center text-center p-3">
                                                                <ShieldCheck size={28} className="text-cyan-400 mb-1" />
                                                                <span className="text-xs font-semibold text-white">Private Security Document</span>
                                                                <span className="text-[10px] text-gray-400 mt-1">
                                                                    Single-session in-memory decrypt
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {viewOnceState === 'destroyed' && (
                                                        <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-8 h-8 rounded-lg bg-slate-800 text-gray-500 flex items-center justify-center">
                                                                    <Flame size={16} />
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs font-medium text-gray-400 line-through">
                                                                        View-Once Photo
                                                                    </span>
                                                                    <span className="text-[10px] text-emerald-400 block font-mono">
                                                                        💥 Disposed &amp; Purged from Memory
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={handleResetViewOnce}
                                                                className="text-[11px] px-2 py-1 rounded bg-slate-800 text-gray-300 hover:text-white flex items-center gap-1"
                                                            >
                                                                <RefreshCw size={11} />
                                                                <span>Try Again</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Outgoing reply */}
                                            <div className="flex items-start justify-end space-x-2">
                                                <div className="bg-blue-600 text-white text-xs p-3 rounded-2xl rounded-tr-sm max-w-[85%]">
                                                    <p>Received! No traces left in browser memory.</p>
                                                    <span className="text-[9px] text-blue-200 mt-1 block text-right flex items-center justify-end gap-1">
                                                        <span>E2EE</span>
                                                        <CheckCircle2 size={11} />
                                                    </span>
                                                </div>
                                                <div className="w-6 h-6 rounded-full bg-blue-500 text-[10px] flex items-center justify-center text-white font-bold">
                                                    Me
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[11px] text-gray-400 text-center">
                                            Keys are generated on-device with the Web Crypto API. Zero server retention.
                                        </p>
                                    </motion.div>
                                )}

                                {activeTab === 'preview' && (
                                    <motion.div
                                        key="tab-preview"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800"
                                    >
                                        <div className="h-7 bg-slate-900 border-b border-slate-800 flex items-center px-3 space-x-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                            <span className="text-[11px] text-gray-400 font-mono ml-3">
                                                intekchat.vercel.app
                                            </span>
                                        </div>
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={getImageSrc(TOOLS_DATA.flagship.image)}
                                                alt="IntekChat and IntekDrop Interface"
                                                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Column: Breakdown, Value Proposition & Actions (5 Cols) */}
                        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                            <div>
                                <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase mb-2">
                                    <Radio size={14} />
                                    <span>Peer-to-Peer Architecture</span>
                                </div>

                                <h4 className={`text-2xl md:text-3xl font-bold tracking-tight mb-3 ${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                }`}>
                                    AirDrop for the Web, <br />
                                    <span className="text-blue-500">Encrypted Chat</span> for Everyone.
                                </h4>

                                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed mb-6 font-light`}>
                                    {TOOLS_DATA.flagship.description}
                                </p>

                                {/* Performance & Architecture Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {TOOLS_DATA.flagship.metrics.map((metric, i) => (
                                        <div
                                            key={i}
                                            className={`p-3 rounded-xl border ${
                                                isDarkMode
                                                    ? "bg-slate-950/60 border-slate-800 hover:border-cyan-500/40"
                                                    : "bg-slate-50 border-slate-200 hover:border-blue-400"
                                            } transition-colors`}
                                        >
                                            <div className="text-base md:text-lg font-bold text-cyan-400 font-mono">
                                                {metric.value}
                                            </div>
                                            <div className={`text-xs font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                                {metric.label}
                                            </div>
                                            <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                                                {metric.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {TOOLS_DATA.flagship.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${
                                                isDarkMode
                                                    ? "bg-slate-800/80 text-gray-300 border border-slate-700/60"
                                                    : "bg-slate-100 text-gray-700 border border-slate-200"
                                            }`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action CTA Buttons */}
                            <div className="space-y-3 pt-2">
                                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                                    {/* Primary CTA: Launch Live */}
                                    <a
                                        href={TOOLS_DATA.flagship.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95"
                                    >
                                        <span>Launch IntekChat Live</span>
                                        <ExternalLink size={16} />
                                    </a>

                                    {/* Secondary CTA: Pair via QR */}
                                    <button
                                        type="button"
                                        onClick={() => setIsQrModalOpen(true)}
                                        className={`inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all duration-300 active:scale-95 ${
                                            isDarkMode
                                                ? "bg-slate-800/80 border-slate-700 text-gray-200 hover:bg-slate-700 hover:text-white"
                                                : "bg-white border-slate-300 text-gray-700 hover:bg-slate-100"
                                        }`}
                                    >
                                        <QrCode size={16} className="text-cyan-400" />
                                        <span>Pair QR</span>
                                    </button>
                                </div>

                                <div className="flex items-center space-x-3 text-xs">
                                    {/* GitHub Link */}
                                    <a
                                        href={TOOLS_DATA.flagship.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center space-x-1.5 transition-colors ${
                                            isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                        }`}
                                    >
                                        <FiGithub size={14} />
                                        <span>Source Code</span>
                                    </a>

                                    <span className="text-gray-500">•</span>

                                    {/* Copy Link Button */}
                                    <button
                                        type="button"
                                        onClick={handleCopyLink}
                                        className={`inline-flex items-center space-x-1.5 transition-colors ${
                                            copied
                                                ? "text-emerald-400"
                                                : isDarkMode
                                                    ? "text-gray-400 hover:text-white"
                                                    : "text-gray-600 hover:text-gray-900"
                                        }`}
                                    >
                                        {copied ? <Check size={13} /> : <Copy size={13} />}
                                        <span>{copied ? "Link Copied!" : "Copy Share Link"}</span>
                                    </button>

                                    <span className="text-gray-500">•</span>

                                    <span className="text-gray-400">
                                        Free &amp; Open Web Tool
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Complementary Tools Suite Teaser Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`p-6 rounded-2xl border transition-all ${
                    isDarkMode
                        ? "bg-slate-900/40 border-slate-800/80 hover:border-slate-700"
                        : "bg-slate-50 border-slate-200"
                } flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
            >
                <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <Layers size={20} />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h4 className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                {TOOLS_DATA.upcoming.title}
                            </h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-semibold border border-blue-500/30">
                                {TOOLS_DATA.upcoming.status}
                            </span>
                        </div>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"} mt-0.5 max-w-xl font-light`}>
                            {TOOLS_DATA.upcoming.description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 self-end md:self-center">
                    {TOOLS_DATA.upcoming.tags.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-gray-400 border border-slate-700/50">
                            {t}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Authentic Device Pairing QR Code Modal */}
            <AnimatePresence>
                {isQrModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl relative ${
                                isDarkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-gray-900"
                            }`}
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setIsQrModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-gray-400 hover:text-white transition"
                                aria-label="Close modal"
                            >
                                <X size={18} />
                            </button>

                            {/* Modal Header */}
                            <div className="text-center mb-5">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-3">
                                    <QrCode size={24} />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Scan to Connect Phone
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">
                                    Instantly join IntekChat &amp; IntekDrop without installing any apps.
                                </p>
                            </div>

                            {/* QR Code Container */}
                            <div className="bg-white p-4 rounded-2xl shadow-inner mx-auto w-56 h-56 flex items-center justify-center border border-slate-200">
                                <img
                                    src={getImageSrc(TOOLS_DATA.flagship.qrImage)}
                                    alt="IntekChat Pairing QR Code"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Steps */}
                            <div className="mt-5 space-y-2 text-xs text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[11px]">1</span>
                                    <span>Open your phone's native Camera or QR scanner.</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[11px]">2</span>
                                    <span>Scan the QR code to open the live room.</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-[11px]">3</span>
                                    <span>Drop files or chat directly between phone and PC!</span>
                                </div>
                            </div>

                            {/* Action footer */}
                            <div className="mt-6 flex items-center space-x-3">
                                <a
                                    href={TOOLS_DATA.flagship.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center transition flex items-center justify-center space-x-1.5"
                                >
                                    <span>Open IntekChat Direct</span>
                                    <ExternalLink size={13} />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setIsQrModalOpen(false)}
                                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold transition"
                                >
                                    Done
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
