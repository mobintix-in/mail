"use client";

import { motion } from "framer-motion";
import { Bell, Shield, Mail, AlertTriangle, CheckCircle2, X, Clock } from "lucide-react";

const notifications = [
    {
        id: 1,
        title: "Security Alert",
        message: "New login detected from Mac OS X in San Francisco, CA.",
        time: "2 mins ago",
        type: "alert",
        read: false
    },
    {
        id: 2,
        title: "Storage Warning",
        message: "You have used 85% of your available storage space.",
        time: "1 hour ago",
        type: "warning",
        read: false
    },
    {
        id: 3,
        title: "Update Installed",
        message: "Mail App has been updated to version 2.4.0 successfully.",
        time: "1 day ago",
        type: "success",
        read: true
    },
    {
        id: 4,
        title: "Welcome to Premium",
        message: "Thank you for upgrading! Check out the new AI features.",
        time: "2 days ago",
        type: "info",
        read: true
    }
];

export default function NotificationsPage() {
    return (
        <div className="h-full bg-[#050505] text-white p-4 md:p-8 overflow-y-auto custom-scrollbar flex justify-center">
            <div className="w-full max-w-2xl">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Notifications</h1>
                        <p className="text-white/50">Stay updated with important alerts and activities.</p>
                    </div>
                    <button className="text-xs font-bold text-primary hover:text-primary-hover transition-colors bg-primary/10 px-4 py-2 rounded-lg">
                        Mark all as read
                    </button>
                </header>

                <div className="space-y-4">
                    {notifications.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-5 rounded-2xl border transition-all hover:bg-white/[0.02] group cursor-pointer ${item.read
                                    ? "bg-transparent border-white/5 opacity-60"
                                    : "bg-white/[0.03] border-white/10 shadow-lg shadow-black/20"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-full flex-shrink-0 ${item.type === 'alert' ? 'bg-red-500/10 text-red-500' :
                                        item.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                                            item.type === 'success' ? 'bg-green-500/10 text-green-500' :
                                                'bg-blue-500/10 text-blue-500'
                                    }`}>
                                    {item.type === 'alert' && <Shield size={20} />}
                                    {item.type === 'warning' && <AlertTriangle size={20} />}
                                    {item.type === 'success' && <CheckCircle2 size={20} />}
                                    {item.type === 'info' && <Bell size={20} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`text-sm font-bold ${!item.read ? 'text-white' : 'text-white/70'}`}>
                                            {item.title}
                                        </h3>
                                        <span className="text-[10px] text-white/30 font-medium bg-white/5 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <Clock size={10} />
                                            {item.time}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.message}</p>
                                </div>
                                {!item.read && (
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-pulse" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button className="text-sm text-white/30 hover:text-white transition-colors">
                        View older notifications
                    </button>
                </div>
            </div>
        </div>
    );
}
