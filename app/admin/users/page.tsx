"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Shield, ShieldAlert, Key, MoreVertical, Mail, Ghost } from "lucide-react";
import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { cn } from "../../../lib/utils";

const users = [
    { id: 1, name: "Aryan Bhimani", email: "aryan@mobintix.app", domain: "mobintix.app", role: "Owner", lastActive: "Just now" },
    { id: 2, name: "John Doe", email: "john@techflecks.com", domain: "techflecks.com", role: "Admin", lastActive: "2h ago" },
    { id: 3, name: "Jane Smith", email: "jane@mobintix.app", domain: "mobintix.app", role: "User", lastActive: "1d ago" },
    { id: 4, name: "Sam Wilson", email: "sam@aryanbhimani.in", domain: "aryanbhimani.in", role: "User", lastActive: "5m ago" },
];

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
            <AdminSidebar />

            <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                        <p className="text-white/50 mt-1 text-sm">Control access and permissions for all users across your domains.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 shrink-0">
                        <UserPlus size={20} />
                        <span>Create User</span>
                    </button>
                </header>

                {/* Search & Filters */}
                <div className="flex gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email or domain..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all shadow-xl"
                        />
                    </div>
                    <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                        <span>Filter</span>
                        <Ghost size={16} />
                    </button>
                </div>

                {/* Users List */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {users.map((user) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-panel p-6 bg-white/[0.03] border border-white/10 rounded-[32px] hover:bg-white/[0.05] transition-all group relative overflow-hidden"
                        >
                            {/* Card Accent */}
                            <div className={cn(
                                "absolute top-0 right-0 w-32 h-32 blur-[80px] -z-10 transition-opacity opacity-20 group-hover:opacity-40",
                                user.role === "Owner" ? "bg-primary" : user.role === "Admin" ? "bg-purple-500" : "bg-blue-500"
                            )} />

                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold shadow-inner flex-shrink-0">
                                        {user.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{user.name}</h3>
                                        <p className="text-white/50 text-sm flex items-center gap-1.5 mt-0.5">
                                            <Mail size={14} className="text-primary/70" />
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                        user.role === "Owner" ? "bg-primary/20 text-primary" : "bg-white/10 text-white/60"
                                    )}>
                                        {user.role}
                                    </span>
                                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/30 hover:text-white">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div>
                                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">Domain</p>
                                        <p className="text-sm font-semibold flex items-center gap-1.5">
                                            <Shield size={14} className="text-green-500/70" />
                                            {user.domain}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">Last Active</p>
                                        <p className="text-sm font-semibold text-white/70">{user.lastActive}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all title='Security Settings'">
                                        <Key size={18} className="text-white/40" />
                                    </button>
                                    <button className="p-3 bg-red-500/5 hover:bg-red-500/10 rounded-xl transition-all title='Suspended User'">
                                        <ShieldAlert size={18} className="text-red-500/40 hover:text-red-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
