"use client";

import { motion } from "framer-motion";
import { Plus, Globe, CheckCircle2, AlertCircle, MoreVertical, Shield, Server, RefreshCw } from "lucide-react";
import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { cn } from "../../../lib/utils";

const domains = [
    { id: 1, name: "mobintix.app", status: "Active", users: 12, health: "A+", provider: "Cloudflare" },
    { id: 2, name: "techflecks.com", status: "Pending", users: 5, health: "B", provider: "GoDaddy" },
    { id: 3, name: "aryanbhimani.in", status: "Active", users: 2, health: "A", provider: "Namecheap" },
];

export default function DomainsPage() {
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Custom Domains</h1>
                        <p className="text-white/50 mt-1 text-sm">Manage and verify domains for your consolidated mail services.</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        <span>Add New Domain</span>
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: "Total Domains", value: "8", icon: Globe, color: "text-blue-500" },
                        { label: "Active Users", value: "24", icon: Shield, color: "text-green-500" },
                        { label: "Server Load", value: "12%", icon: Server, color: "text-purple-500" },
                    ].map((stat, i) => (
                        <div key={i} className="glass-panel p-6 bg-white/5 border border-white/10 rounded-3xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn("p-3 rounded-2xl bg-white/5", stat.color)}>
                                    <stat.icon size={24} />
                                </div>
                                <RefreshCw size={16} className="text-white/20 hover:text-white cursor-pointer transition-colors" />
                            </div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Domains Table */}
                <div className="glass-panel bg-white/[0.02] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Domain</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Status</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Users</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Provider</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {domains.map((domain) => (
                                    <tr key={domain.id} className="hover:bg-white/[0.03] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                    <Globe size={20} />
                                                </div>
                                                <span className="font-semibold">{domain.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                                                domain.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                                            )}>
                                                {domain.status === "Active" ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                                {domain.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-medium text-white/70">{domain.users} Users</td>
                                        <td className="px-8 py-6 text-white/50 text-sm">{domain.provider}</td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                                <MoreVertical size={20} className="text-white/40" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Add Domain Modal Interface (Simplified) */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setShowAddModal(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-full max-w-lg glass-panel bg-neutral-900 border border-white/10 p-8 rounded-[32px] shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-6">Add Custom Domain</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-white/50 mb-2">Domain Name</label>
                                <input
                                    type="text"
                                    placeholder="example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-primary transition-all"
                                />
                            </div>
                            <div className="p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex gap-4">
                                <AlertCircle className="text-yellow-500 shrink-0" size={20} />
                                <p className="text-xs text-yellow-500/80 leading-relaxed font-medium">
                                    After adding the domain, you will need to set up MX and SPF records in your DNS provider to start receiving emails.
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 font-bold transition-all border border-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold transition-all shadow-lg shadow-primary/20"
                                >
                                    Connect Domain
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
