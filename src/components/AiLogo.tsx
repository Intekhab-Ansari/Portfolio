'use client';

import React from 'react';

interface AiLogoProps {
    size?: number;
    className?: string;
    isDarkMode?: boolean;
}

export const AiLogo: React.FC<AiLogoProps> = ({ size = 28, className = '', isDarkMode = true }) => {
    return (
        <div
            className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-md"
            >
                <defs>
                    {/* Loop 1: Cyan to Azure Blue */}
                    <linearGradient id="quantumGrad1" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#00F2FE" />
                        <stop offset="60%" stopColor="#00A8FF" />
                        <stop offset="100%" stopColor="#0066FF" />
                    </linearGradient>

                    {/* Loop 2: Electric Indigo to Royal Purple */}
                    <linearGradient id="quantumGrad2" x1="100" y1="20" x2="20" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#7F00FF" />
                        <stop offset="50%" stopColor="#9B51E0" />
                        <stop offset="100%" stopColor="#4A00E0" />
                    </linearGradient>

                    {/* Loop 3: Neon Rose to Violet */}
                    <linearGradient id="quantumGrad3" x1="60" y1="110" x2="60" y2="10" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FF007A" />
                        <stop offset="50%" stopColor="#E056FD" />
                        <stop offset="100%" stopColor="#00F2FE" />
                    </linearGradient>

                    {/* Inner Core Shimmer */}
                    <radialGradient id="quantumCore" cx="60" cy="60" r="30" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="#00F2FE" stopOpacity="0.75" />
                        <stop offset="70%" stopColor="#7F00FF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>

                    {/* Ambient Glow */}
                    <filter id="aiGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Soft Radiant Ambient Glow */}
                <circle cx="60" cy="60" r="46" fill="url(#quantumCore)" opacity={isDarkMode ? '0.45' : '0.3'} />

                {/* Outer Energy Field Ring */}
                <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke={isDarkMode ? 'url(#quantumGrad1)' : '#00A8FF'}
                    strokeWidth="1.75"
                    strokeDasharray="4 8"
                    strokeOpacity={isDarkMode ? '0.6' : '0.4'}
                />

                {/* Quantum Ribbon Loop 1 (Top-Right Node to Center) */}
                <path
                    d="M 60 16
                       C 82 16, 102 36, 102 60
                       C 102 75, 92 88, 78 94
                       C 68 76, 56 60, 42 46
                       C 48 28, 54 16, 60 16 Z"
                    fill="url(#quantumGrad1)"
                    opacity="0.92"
                />

                {/* Quantum Ribbon Loop 2 (Bottom-Left Node to Center) */}
                <path
                    d="M 18 60
                       C 18 36, 38 18, 60 18
                       C 75 18, 88 28, 94 42
                       C 76 52, 60 64, 46 78
                       C 28 72, 18 66, 18 60 Z"
                    fill="url(#quantumGrad2)"
                    opacity="0.88"
                />

                {/* Quantum Ribbon Loop 3 (Bottom-Right Inverted Harmonic Flow) */}
                <path
                    d="M 60 104
                       C 38 104, 18 84, 18 60
                       C 18 45, 28 32, 42 26
                       C 52 44, 64 60, 78 74
                       C 72 92, 66 104, 60 104 Z"
                    fill="url(#quantumGrad3)"
                    opacity="0.88"
                />

                {/* Central High-Dimensional Neural Nexus Diamond */}
                <polygon
                    points="60,38 78,60 60,82 42,60"
                    fill="#FFFFFF"
                    opacity={isDarkMode ? '0.9' : '0.85'}
                    filter="drop-shadow(0px 0px 4px rgba(0, 242, 254, 0.8))"
                />

                {/* Inner Dynamic Facets */}
                <polygon points="60,42 74,60 60,60" fill="url(#quantumGrad1)" opacity="0.85" />
                <polygon points="60,60 74,60 60,78" fill="url(#quantumGrad2)" opacity="0.85" />
                <polygon points="46,60 60,78 60,60" fill="url(#quantumGrad3)" opacity="0.85" />
                <polygon points="46,60 60,42 60,60" fill="#00F2FE" opacity="0.75" />

                {/* Intense Core Specular Spark */}
                <circle cx="60" cy="60" r="3.5" fill="#FFFFFF" />
                <circle cx="60" cy="60" r="7" fill="url(#quantumCore)" opacity="0.9" />

                {/* Ambient Orbiting Micro-Nodes */}
                <circle cx="60" cy="8" r="2.5" fill="#00F2FE" />
                <circle cx="106" cy="74" r="2" fill="#7F00FF" />
                <circle cx="14" cy="74" r="2" fill="#FF007A" />
            </svg>
        </div>
    );
};

export default AiLogo;
