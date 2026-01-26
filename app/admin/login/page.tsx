"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, ArrowRight, Server, Key, ShieldAlert } from "lucide-react";
import { cn } from "../../../lib/utils";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Setting a separate admin session cookie
        document.cookie = "admin_auth_session=true; path=/; max-age=3600; SameSite=Lax";

        setTimeout(() => {
            window.location.href = "/admin";
        }, 1200);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
            {/* Dark Professional Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1e1b4b_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#312e81_0%,transparent_50%)]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[420px] z-10"
            >
                {/* Admin Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary shadow-2xl shadow-primary/40 mb-6 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                        <ShieldCheck size={40} className="text-white relative z-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Admin Access</h1>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em]">Consolidated Services</p>
                </div>

                {/* Login Form */}
                <div className="glass-panel p-8 bg-white/[0.02] border border-white/10 rounded-[40px] shadow-2xl backdrop-blur-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Admin Email</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                    <Server size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@mobintix.app"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Security Key</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                                    <Key size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-white"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Authenticate</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Alert */}
                    <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-3">
                        <ShieldAlert size={18} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-red-500/80 leading-relaxed font-bold uppercase tracking-wider">
                            Warning: Unauthorized access attempts are logged and monitored via infrastructure security.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => window.location.href = "/"}
                        className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                    >
                        Back to User Console
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
