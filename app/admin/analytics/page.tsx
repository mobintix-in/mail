"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart3, PieChart, Users, Mail, ArrowUpRight, Calendar, Download } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import { cn } from "../../../lib/utils";

export default function AnalyticsPage() {
    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
                        <p className="text-white/50 mt-1 text-sm">Deep dive into your mail infrastructure performance and user engagement.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl font-semibold transition-all border border-white/5">
                            <Calendar size={18} />
                            <span>Last 30 Days</span>
                        </button>
                        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-primary/20">
                            <Download size={18} />
                            <span>Export Report</span>
                        </button>
                    </div>
                </header>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2 glass-panel p-8 bg-white/[0.02] border border-white/10 rounded-[40px] shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <TrendingUp size={20} className="text-primary" />
                                Email Traffic Volume
                            </h2>
                        </div>
                        {/* Mock Chart */}
                        <div className="h-72 flex items-end justify-between gap-2 px-2">
                            {[30, 45, 60, 25, 80, 55, 90, 40, 70, 35, 85, 50, 65, 95, 20, 75, 40, 85, 60, 90].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.03, duration: 1 }}
                                    className="flex-1 bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-lg relative group"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}k
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                            <span>Jan 01</span>
                            <span>Jan 15</span>
                            <span>Jan 30</span>
                        </div>
                    </div>

                    <div className="glass-panel p-8 bg-white/[0.02] border border-white/10 rounded-[40px] shadow-2xl">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <PieChart size={20} className="text-purple-500" />
                            Domain Distribution
                        </h2>
                        <div className="space-y-6">
                            {[
                                { name: "mobintix.app", share: "58%", color: "bg-primary" },
                                { name: "techflecks.com", share: "24%", color: "bg-purple-500" },
                                { name: "aryanbhimani.in", share: "12%", color: "bg-blue-500" },
                                { name: "Others", share: "6%", color: "bg-white/20" },
                            ].map((domain, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>{domain.name}</span>
                                        <span className="text-white/40">{domain.share}</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: domain.share }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className={cn("h-full rounded-full", domain.color)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Delivery Rate", value: "99.2%", icon: Mail, trend: "+0.4%", color: "text-green-500" },
                        { label: "Open Rate", value: "42.8%", icon: Users, trend: "+2.1%", color: "text-blue-500" },
                        { label: "Bounce Rate", value: "0.8%", icon: BarChart3, trend: "-0.1%", color: "text-red-500" },
                        { label: "Spam Reports", value: "0.02%", icon: PieChart, trend: "0%", color: "text-orange-500" },
                    ].map((stat, i) => (
                        <div key={i} className="glass-panel p-6 bg-white/[0.03] border border-white/10 rounded-3xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={cn("p-2 rounded-xl bg-white/5", stat.color)}>
                                    <stat.icon size={18} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{stat.label}</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                                <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", stat.trend.startsWith("+") ? "bg-green-500/10 text-green-500" : stat.trend.startsWith("-") ? "bg-red-500/10 text-red-500" : "bg-white/5 text-white/40")}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
