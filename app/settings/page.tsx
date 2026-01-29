"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Mail, ToggleRight, Moon, Monitor, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";

const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Privacy", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
];


export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <div className="h-full bg-[#050505] text-white p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
                    <p className="text-white/50">Manage your account preferences and workspace settings.</p>
                </header>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                                        activeTab === tab.id
                                            ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-primary/30"
                                            : "text-white/60 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <Icon size={18} />
                                    <span>{tab.label}</span>
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 space-y-6">
                        {/* Example Section 1: Preferences */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 md:p-8 glass-panel bg-white/[0.03] border border-white/10 rounded-[32px]"
                        >
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Palette size={20} className="text-primary" />
                                Appearance
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <Moon size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Dark Mode</p>
                                            <p className="text-xs text-white/40">Adjust the appearance of the application</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/10">
                                        <button className="p-2 rounded-md bg-white/10 shadow-sm transition-all"><Moon size={16} /></button>
                                        <button className="p-2 rounded-md text-white/30 hover:text-white transition-all"><Monitor size={16} /></button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                            <Palette size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Accent Color</p>
                                            <p className="text-xs text-white/40">Personalize your workspace theme</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="w-6 h-6 rounded-full bg-blue-500 ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]" />
                                        <button className="w-6 h-6 rounded-full bg-purple-500 hover:ring-2 hover:ring-white/50 hover:ring-offset-2 hover:ring-offset-[#0a0a0a] transition-all" />
                                        <button className="w-6 h-6 rounded-full bg-green-500 hover:ring-2 hover:ring-white/50 hover:ring-offset-2 hover:ring-offset-[#0a0a0a] transition-all" />
                                        <button className="w-6 h-6 rounded-full bg-orange-500 hover:ring-2 hover:ring-white/50 hover:ring-offset-2 hover:ring-offset-[#0a0a0a] transition-all" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Example Section 2: Account */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 md:p-8 glass-panel bg-white/[0.03] border border-white/10 rounded-[32px]"
                        >
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Mail size={20} className="text-primary" />
                                Email Preferences
                            </h2>

                            <div className="space-y-1">
                                {[
                                    { label: "Smart Reply", desc: "Show suggested replies when available" },
                                    { label: "Desktop Notifications", desc: "Get notified when a new message arrives" },
                                    { label: "Keyboard Shortcuts", desc: "Enable advanced keyboard shortcuts" },
                                    { label: "External Images", desc: "Ask before displaying external images" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-2 rounded-xl transition-colors">
                                        <div>
                                            <p className="text-sm font-medium text-white/90">{item.label}</p>
                                            <p className="text-xs text-white/40">{item.desc}</p>
                                        </div>
                                        <button className="text-primary hover:text-primary-hover transition-colors">
                                            <ToggleRight size={32} className={i === 3 ? "text-white/20 rotate-180" : "text-primary"} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
