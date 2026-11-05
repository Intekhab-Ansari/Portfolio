'use client';

import React from 'react';

interface AiLogoProps {
    size?: number;
    className?: string;
    animated?: boolean;
}

export const AiLogo: React.FC<AiLogoProps> = ({ size = 28, className = '', animated = false }) => {
    return (
        <div
            className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-full h-full ${animated ? 'animate-[spin_12s_linear_infinite]' : ''}`}
            >
                <defs>
                    {/* Primary Neural Gradient */}
                    <linearGradient id="aiPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="35%" stopColor="#38BDF8" />
                        <stop offset="70%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>

                    {/* Secondary Accent Gradient */}
                    <linearGradient id="aiAccentGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="50%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>

                    {/* Radial Glow Gradient */}
                    <radialGradient id="aiCoreGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                        <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.7" />
                        <stop offset="70%" stopColor="#6366F1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
                    </radialGradient>

                    {/* Outer Ring Gradient */}
                    <linearGradient id="aiRingGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.8" />
                    </linearGradient>
                </defs>

                {/* Soft Ambient Glow */}
                <circle cx="50" cy="50" r="42" fill="url(#aiCoreGlow)" opacity="0.6" />

                {/* Outer Orbital Ring with Dashed Accents */}
                <circle
                    cx="50"
                    cy="50"
                    r="44"
                    stroke="url(#aiRingGrad)"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    opacity="0.85"
                />

                {/* Inner Tilted Orbital Ellipse */}
                <ellipse
                    cx="50"
                    cy="50"
                    rx="40"
                    ry="20"
                    transform="rotate(-28 50 50)"
                    stroke="url(#aiAccentGrad)"
                    strokeWidth="1.8"
                    opacity="0.65"
                    strokeDasharray="4 6"
                />

                {/* Celestial 4-Point Primary AI Star */}
                <path
                    d="M 50 8
                       C 50 32, 68 50, 92 50
                       C 68 50, 50 68, 50 92
                       C 50 68, 32 50, 8 50
                       C 32 50, 50 32, 50 8 Z"
                    fill="url(#aiPrimaryGrad)"
                    filter="drop-shadow(0px 0px 8px rgba(0, 240, 255, 0.45))"
                />

                {/* Secondary Inverted Radiant Cross for High-Tech Depth */}
                <path
                    d="M 50 20
                       C 50 38, 62 50, 80 50
                       C 62 50, 50 62, 50 80
                       C 50 62, 38 50, 20 50
                       C 38 50, 50 38, 50 20 Z"
                    fill="url(#aiAccentGrad)"
                    opacity="0.9"
                />

                {/* Inner Prismatic Diamond Core */}
                <polygon
                    points="50,34 66,50 50,66 34,50"
                    fill="#FFFFFF"
                    opacity="0.85"
                />

                {/* Brilliant Center Specular Spark */}
                <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
                <circle cx="50" cy="50" r="9" fill="url(#aiCoreGlow)" />
            </svg>
        </div>
    );
};

export default AiLogo;

