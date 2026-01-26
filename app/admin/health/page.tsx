"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Server, Database, Wifi, Cpu, AlertTriangle, CheckCircle2 } from "lucide-react";
import AdminSidebar from "../../components/AdminSidebar";
import { cn } from "../../../lib/utils";

const services = [
    { name: "Primary Mail Server", status: "Operational", uptime: "99.99%", load: "14%", icon: Server },
    { name: "Database Cluster", status: "Operational", uptime: "100%", load: "22%", icon: Database },
    { name: "DNS Resolver", status: "Operational", uptime: "99.95%", load: "4%", icon: Wifi },
    { name: "Spam Filter Engine", status: "Degraded", uptime: "98.2%", load: "89%", icon: ShieldCheck },
    { name: "Attachment Storage", status: "Operational", uptime: "100%", load: "45%", icon: Database },
    { name: "API Gateway", status: "Operational", uptime: "99.99%", load: "8%", icon: Cpu },
];

export default function HealthPage() {
    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
                    <p className="text-white/50 mt-1 text-sm">Real-time status monitoring of your infrastructure and core services.</p>
                </header>

                {/* Global Status Banner */}
                <div className="glass-panel p-6 bg-green-500/5 border border-green-500/20 rounded-[32px] mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                            <CheckCircle2 size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">All Systems Nominal</h2>
                            <p className="text-green-500/70 text-sm">6 services are operational. 1 service is experiencing high load.</p>
                        </div>
                    </div>
                    <button className="px-6 py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-500 rounded-xl font-bold transition-all text-sm uppercase tracking-widest">
                        Incidents History
                    </button>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 bg-white/[0.03] border border-white/10 rounded-3xl group hover:bg-white/[0.05] transition-all"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 rounded-2xl bg-white/5 text-primary group-hover:scale-110 transition-transform">
                                    <service.icon size={24} />
                                </div>
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                    service.status === "Operational" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                                )}>
                                    {service.status}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold mb-4">{service.name}</h3>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">Uptime</p>
                                    <p className="text-sm font-semibold">{service.uptime}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">Current Load</p>
                                    <p className={cn(
                                        "text-sm font-semibold text-right",
                                        parseInt(service.load) > 80 ? "text-red-500" : "text-white"
                                    )}>{service.load}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Live Logs / Events Area */}
                <div className="glass-panel bg-white/[0.02] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
                    <div className="px-8 py-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-3">
                            <Activity size={16} className="text-primary" />
                            Recent System Events
                        </h2>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    </div>
                    <div className="p-4 space-y-2 font-mono text-[11px]">
                        {[
                            { time: "00:28:42", type: "INFO", msg: "Outbound queue processed 1,420 messages successfully." },
                            { time: "00:26:15", type: "WARN", msg: "Spam Filter high CPU usage detected (88%). Scaling instance..." },
                            { time: "00:22:10", type: "INFO", msg: "New domain 'techflecks.com' DNS records verified." },
                            { time: "00:15:04", type: "INFO", msg: "Database cleanup routine completed. 1.2GB reclaimed." },
                            { time: "00:08:33", type: "ERR", msg: "IMAP connection timeout from IP 192.168.1.4. Retrying..." },
                        ].map((log, i) => (
                            <div key={i} className="flex gap-4 p-2 rounded hover:bg-white/5 transition-colors group">
                                <span className="text-white/20 shrink-0">{log.time}</span>
                                <span className={cn(
                                    "font-bold shrink-0",
                                    log.type === "INFO" ? "text-blue-500" : log.type === "WARN" ? "text-yellow-500" : "text-red-500"
                                )}>[{log.type}]</span>
                                <span className="text-white/60 group-hover:text-white transition-colors">{log.msg}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
