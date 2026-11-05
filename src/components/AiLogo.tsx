'use client';

import React from 'react';

interface AiLogoProps {
    size?: number;
    className?: string;
    isDarkMode?: boolean;
}

export const AiLogo: React.FC<AiLogoProps> = ({ size = 28, className = '' }) => {
    return (
        <div
            className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
            style={{ width: size, height: size }}
        >
            <img
                src="/portfolio-logo.svg"
                alt="Intekhab AI Favicon"
                width={size}
                height={size}
                className="w-full h-full object-contain select-none pointer-events-none drop-shadow-sm"
                loading="eager"
            />
        </div>
    );
};

export default AiLogo;
