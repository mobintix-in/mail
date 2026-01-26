"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Github, Chrome, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../../lib/utils";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            window.location.href = "/";
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0a]">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse-glow" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[440px] z-10"
            >
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-primary/40 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        <span className="text-3xl font-bold text-white relative z-10">M</span>
                    </motion.div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
                    <p className="text-white/50 text-center">Enter your credentials to access your premium workspace</p>
                </div>

                {/* Login Card */}
                <div className="glass-panel p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white/10 focus:border-primary/50 transition-all text-white placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2 ml-1">
                                <label className="text-sm font-medium text-white/70">Password</label>
                                <button type="button" className="text-xs text-primary hover:text-primary-hover font-semibold transition-colors">
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:bg-white/10 focus:border-primary/50 transition-all text-white placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group relative overflow-hidden mt-2"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#121212] px-4 text-white/30 font-medium tracking-widest">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 py-3 rounded-2xl transition-all text-sm font-semibold text-white/80">
                            <Chrome size={18} />
                            <span>Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 py-3 rounded-2xl transition-all text-sm font-semibold text-white/80">
                            <Github size={18} />
                            <span>GitHub</span>
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-center text-white/40 text-sm">
                    Don't have an account?{" "}
                    <button className="text-white font-bold hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary">
                        Create account
                    </button>
                </p>

                {/* Features Bottom */}
                <div className="mt-12 flex items-center justify-center gap-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-primary" />
                        <span>Secure Encryption</span>
                    </div>
                    <div className="w-1 h-1 bg-white/10 rounded-full" />
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-primary" />
                        <span>Custom Domains</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
