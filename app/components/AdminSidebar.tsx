"use client";

import { LayoutDashboard, Globe, Users, Settings, LogOut, ShieldCheck, PieChart, Activity } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/admin" },
    { id: "domains", label: "Domains", icon: Globe, href: "/admin/domains" },
    { id: "users", label: "Users", icon: Users, href: "/admin/users" },
    { id: "analytics", label: "Analytics", icon: PieChart, href: "/admin/analytics" },
    { id: "health", label: "System Health", icon: Activity, href: "/admin/health" },
    { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        document.cookie = "admin_auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/admin/login";
    };

    return (
        <aside className="w-64 h-screen bg-[#0d0d0d] border-r border-white/10 flex flex-col z-50">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20">
                        A
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">Admin</h1>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Consolidated</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                    isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-white/50 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Icon size={18} className={cn("transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/5">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white transition-all mb-2"
                >
                    <ShieldCheck size={18} />
                    <span>Go to Mail</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all font-semibold"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
