"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Bell, User, Cpu, Globe, Key, Save, ChevronRight } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import { cn } from "../../../lib/utils";

const sections = [
    { id: "general", label: "General Settings", icon: Settings, desc: "Manage your panel name, logo and base URL." },
    { id: "security", label: "Security & Auth", icon: Shield, desc: "Configure 2FA, session timeouts and API keys." },
    { id: "notifications", label: "Notifications", icon: Bell, desc: "Set up system alerts and email notifications." },
    { id: "users", label: "Admin Profiles", icon: User, desc: "Add or manage additional administrator accounts." },
    { id: "infra", label: "Infrastructure", icon: Cpu, desc: "Connect your SMTP gateway and storage providers." },
];

export default function SettingsPage() {
    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
                        <p className="text-white/50 mt-1 text-sm">Configure your consolidated mail environment and administrative preferences.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20">
                        <Save size={20} />
                        <span>Save Changes</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    {/* Navigation */}
                    <div className="xl:col-span-4 space-y-4">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    className="w-full flex items-start gap-4 p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all text-left group"
                                >
                                    <div className="p-3 rounded-2xl bg-white/5 text-white/40 group-hover:text-primary transition-colors">
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[0.95rem] mb-1">{section.label}</h3>
                                        <p className="text-xs text-white/40 leading-relaxed">{section.desc}</p>
                                    </div>
                                    <ChevronRight size={18} className="mt-1 text-white/10 group-hover:text-white transition-colors" />
                                </button>
                            );
                        })}
                    </div>

                    {/* Form Content */}
                    <div className="xl:col-span-8">
                        <div className="glass-panel p-10 bg-white/[0.02] border border-white/10 rounded-[40px] shadow-2xl space-y-10">
                            <section>
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <Globe size={22} className="text-primary" />
                                    Primary Configuration
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Panel Name</label>
                                        <input
                                            type="text"
                                            defaultValue="Aryan's Mail Services"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-primary transition-all text-[0.95rem]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Main Domain</label>
                                        <input
                                            type="text"
                                            defaultValue="mobintix.app"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-primary transition-all text-[0.95rem]"
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-white/5" />

                            <section>
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <Key size={22} className="text-orange-500" />
                                    API Keys & Secrets
                                </h2>
                                <div className="space-y-6">
                                    <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold mb-1">Production Client Key</p>
                                            <p className="text-xs font-mono text-white/30 truncate max-w-[300px]">mbx_live_51P2cXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                                        </div>
                                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all uppercase tracking-widest border border-white/5">
                                            Rotate Key
                                        </button>
                                    </div>
                                    <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold mb-1">System Webhook Secret</p>
                                            <p className="text-xs font-mono text-white/30 truncate max-w-[300px]">whsec_9b2dXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                                        </div>
                                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all uppercase tracking-widest border border-white/5">
                                            Rotate Secret
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-white/5" />

                            <section>
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-red-400">
                                    <AlertCircleIcon size={22} />
                                    Danger Zone
                                </h2>
                                <div className="p-8 rounded-[32px] bg-red-500/5 border border-red-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h3 className="font-bold text-red-400 mb-10 md:mb-1">Purge Inactive Accounts</h3>
                                        <p className="text-xs text-red-500/60 leading-relaxed">Permanently delete all user accounts and data for users who haven't logged in for 365+ days. This action is irreversible.</p>
                                    </div>
                                    <button className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-2xl font-bold transition-all text-xs uppercase tracking-widest border border-red-500/20 whitespace-nowrap">
                                        Purge Data
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function AlertCircleIcon({ size }: { size: number }) {
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}
