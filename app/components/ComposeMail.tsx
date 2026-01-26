"use client";

import { X, Maximize2, Minimize2, Send, Paperclip, Image, Smile, MoreVertical, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "../../lib/utils";

interface ComposeMailProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ComposeMail({ isOpen, onClose }: ComposeMailProps) {
    const [isMaximized, setIsMaximized] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    className={cn(
                        "fixed bottom-0 right-8 z-[100] bg-neutral-900 border border-white/10 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300",
                        isMaximized ? "w-[calc(100%-4rem)] h-[calc(100%-4rem)] top-8 left-8" : "w-[600px] h-[700px]"
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                        <span className="text-sm font-semibold">New Message</span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsMaximized(!isMaximized)}
                                className="p-1.5 hover:bg-white/10 rounded text-white/40 hover:text-white transition-colors"
                            >
                                {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            </button>
                            <button
                                onClick={onClose}
                                className="p-1.5 hover:bg-white/10 rounded text-white/40 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="flex-1 flex flex-col p-4 space-y-4">
                        <div className="border-b border-white/5 pb-2 flex items-center gap-2">
                            <span className="text-white/40 text-sm w-12">To</span>
                            <input type="text" className="bg-transparent border-none outline-none flex-1 text-sm" />
                        </div>
                        <div className="border-b border-white/5 pb-2 flex items-center gap-2">
                            <span className="text-white/40 text-sm w-12">Subject</span>
                            <input type="text" className="bg-transparent border-none outline-none flex-1 text-sm" />
                        </div>
                        <textarea
                            className="flex-1 bg-transparent border-none outline-none resize-none text-[0.95rem] leading-relaxed"
                            placeholder="Write your message here..."
                        />
                    </div>

                    {/* Footer */}
                    <div className="p-4 flex items-center justify-between border-t border-white/10 bg-white/5">
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-primary/20">
                                <span>Send</span>
                                <Send size={16} />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                                <Paperclip size={20} />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                                <LinkIcon size={20} />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                                <Smile size={20} />
                            </button>
                        </div>

                        <div className="flex items-center gap-1">
                            <button className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors">
                                <MoreVertical size={20} />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function LinkIcon({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}
