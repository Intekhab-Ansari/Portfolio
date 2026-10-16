'use client';

import React from "react";

interface TextInputProps {
    isDarkMode: boolean;
    value: string;
    handleInputChange: (val: string) => void;
    textarea?: boolean;
    label: string;
}

const TextInput: React.FC<TextInputProps> = ({ isDarkMode, value, handleInputChange, textarea, label }) => {
    return (
        <div className="relative">
            {textarea ? (
                <textarea
                    rows={4}
                    className={`w-full px-4 pt-6 pb-2 border rounded-xl transition-all duration-300 outline-none resize-none ${
                        isDarkMode
                            ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500 focus:bg-slate-800/70"
                            : "bg-white/80 border-slate-300 text-gray-900 focus:border-blue-500 focus:bg-white"
                    }`}
                    value={value}
                    onChange={({ target }) => handleInputChange(target.value)}
                />
            ) : (
                <input
                    type="text"
                    className={`w-full px-4 pt-6 pb-2 border rounded-xl transition-all duration-300 outline-none resize-none ${
                        isDarkMode
                            ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500 focus:bg-slate-800/70"
                            : "bg-white/80 border-slate-300 text-gray-900 focus:border-blue-500 focus:bg-white"
                    }`}
                    value={value}
                    onChange={({ target }) => handleInputChange(target.value)}
                />
            )}
            <label className={`text-xs absolute left-4 top-2 pointer-events-none origin-left ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
                {label}
            </label>
        </div>
    );
};

export default TextInput;
