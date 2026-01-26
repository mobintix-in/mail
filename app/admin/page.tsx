"use client";

import { motion } from "framer-motion";
import { Activity, Globe, Users, Database, ArrowUpRight, ArrowDownRight, TrendingUp, Cpu } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { cn } from "../../lib/utils";

const stats = [
    { label: "Total Emails", value: "1.2M", trend: "+12.5%", color: "text-blue-500", icon: Activity },
    { label: "Active Domains", value: "8", trend: "+2", color: "text-purple-500", icon: Globe },
    { label: "Total Users", value: "24", trend: "+5", color: "text-green-500", icon: Users },
    { label: "Storage Used", value: "128GB", trend: "78%", color: "text-orange-500", icon: Database },
];

export default function AdminDashboard() {
    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">Consolidated Dashboard</h1>
                    <p className="text-white/50 mt-1 text-sm">System performance and management overview across all domains.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 bg-white/[0.03] border border-white/10 rounded-3xl relative overflow-hidden group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className={cn("p-4 rounded-2xl bg-white/5 shadow-inner", stat.color)}>
                                    <stat.icon size={24} />
                                </div>
                                <div className={cn(
                                    "flex items-center text-[10px] font-bold px-2 py-1 rounded-lg",
                                    stat.trend.startsWith("+") ? "bg-green-500/10 text-green-500" : "bg-white/10 text-white/50"
                                )}>
                                    {stat.trend}
                                    {stat.trend.startsWith("+") ? <ArrowUpRight size={10} className="ml-1" /> : <ArrowDownRight size={10} className="ml-1" />}
                                </div>
                            </div>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>

                            {/* Subtle Gradient Accent */}
                            <div className={cn("absolute bottom-0 right-0 w-24 h-1 bg-gradient-to-l opacity-20", stat.color === "text-blue-500" ? "from-blue-500 to-transparent" : stat.color === "text-purple-500" ? "from-purple-500 to-transparent" : stat.color === "text-green-500" ? "from-green-500 to-transparent" : "from-orange-500 to-transparent")} />
                        </motion.div>
                    ))}
                </div>

                {/* Charts / Detailed View Mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-panel p-8 bg-white/[0.02] border border-white/10 rounded-[40px] shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <TrendingUp size={20} className="text-primary" />
                                Network Traffic
                            </h2>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 text-white">Daily</button>
                                <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white/40 hover:bg-white/5 hover:text-white transition-all">Weekly</button>
                            </div>
                        </div>

                        {/* Mock Chart Visualization */}
                        <div className="h-64 flex items-end justify-between gap-1 px-2 border-b border-white/5">
                            {[40, 70, 45, 90, 65, 80, 50, 95, 30, 60, 85, 45, 75, 55, 90].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.05, duration: 1 }}
                                    className="flex-1 bg-primary/20 rounded-t-lg relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-primary/40 to-transparent" />
                                    <div className="absolute bottom-0 inset-x-0 h-1 bg-primary shadow-[0_0_15px_rgba(59,130,246,1)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel p-8 bg-white/[0.02] border border-white/10 rounded-[40px] shadow-2xl">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <Cpu size={20} className="text-orange-500" />
                            Service Status
                        </h2>
                        <div className="space-y-6">
                            {[
                                { name: "SMTP Protocol", status: "Healthy", ping: "42ms" },
                                { name: "IMAP Server", status: "Healthy", ping: "28ms" },
                                { name: "DNS Resolver", status: "Stable", ping: "12ms" },
                                { name: "Spam Filter", status: "Learning", ping: "156ms" },
                                { name: "Web API", status: "Healthy", ping: "84ms" },
                            ].map((service, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                        <div>
                                            <p className="text-sm font-semibold group-hover:text-primary transition-colors">{service.name}</p>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest">{service.status}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-white/20 group-hover:text-white/60">{service.ping}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
