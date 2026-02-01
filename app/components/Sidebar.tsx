"use client";

import { Inbox, Star, Clock, Send, File, ChevronDown, Plus, CalendarDays, AlertOctagon, Trash2, X, Shield, Settings, Bell } from "lucide-react";
import { useMail } from "../context/MailContext";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { id: "inbox", icon: Inbox, label: "Inbox", count: 12 },
  { id: "starred", icon: Star, label: "Starred" },
  { id: "snoozed", icon: Clock, label: "Snoozed" },
  { id: "sent", icon: Send, label: "Sent" },
  { id: "scheduled", icon: CalendarDays, label: "Scheduled" },
  { id: "drafts", icon: File, label: "Drafts", count: 2 },
  { id: "spam", icon: AlertOctagon, label: "Spam" },
  { id: "trash", icon: Trash2, label: "Trash" },
];

export default function Sidebar() {
  const { selectedCategory, setSelectedCategory, setIsComposeOpen, isSidebarOpen, setIsSidebarOpen, emails, selectedAccount } = useMail();

  const getCount = (id: string) => {
    if (id === 'inbox') return emails.filter(e => e.account === selectedAccount.email && e.category === 'inbox' && !e.read).length;
    if (id === 'drafts') return emails.filter(e => e.account === selectedAccount.email && e.category === 'drafts').length;
    if (id === 'spam') return emails.filter(e => e.account === selectedAccount.email && e.category === 'spam' && !e.read).length;
    return 0;
  };

  const SidebarContent = (
    <div className="w-full h-full flex flex-col py-4">
      <div className={cn("flex items-center mb-4 lg:mb-6", isSidebarOpen ? "justify-between px-4" : "justify-center px-2")}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsComposeOpen(true);
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
          }}
          className={cn(
            "flex items-center gap-3 bg-[#c2e7ff] hover:bg-[#b3d7ef] text-[#001d35] rounded-2xl font-semibold shadow-lg transition-all",
            isSidebarOpen ? "px-6 py-4 w-fit" : "p-3"
          )}
        >
          <Plus size={24} />
          {isSidebarOpen && <span>Compose</span>}
        </motion.button>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className={cn("p-2 hover:bg-white/10 rounded-full lg:hidden", !isSidebarOpen && "hidden")}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedCategory === item.id;
          const count = getCount(item.id);

          return (
            <Link
              key={item.id}
              href={`/${item.id}`}
              onClick={() => {
                setSelectedCategory(item.id);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-[0.925rem] font-medium rounded-full transition-all group",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
                !isSidebarOpen && "justify-center px-0"
              )}
              title={item.label}
            >
              <Icon
                size={20}
                className={cn("transition-transform flex-shrink-0", isActive ? "scale-110" : "group-hover:scale-110")}
              />
              {isSidebarOpen && <span className="flex-1 text-left truncate">{item.label}</span>}
              {isSidebarOpen && count > 0 && (
                <span className={cn(
                  "text-[0.75rem] px-2 py-0.5 rounded-full font-bold",
                  isActive ? "bg-primary/20" : "bg-white/10"
                )}>
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={cn(
        "hidden lg:flex gap-1 border-t border-white/5 mt-auto",
        isSidebarOpen ? "items-center px-4 py-2" : "flex-col items-center px-2 py-3"
      )}>
        {selectedAccount.email === 'aryan@mobintix.app' && (
          <a href="/admin" className="p-2 hover:bg-white/10 rounded-full text-blue-400 hover:text-blue-300 transition-colors" title="Admin Panel">
            <Shield size={20} />
          </a>
        )}
        <Link href="/notifications" className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Notifications">
          <Bell size={20} />
        </Link>
        <Link href="/settings" className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors" title="Settings">
          <Settings size={20} />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col flex-shrink-0 z-40 border-r border-white/5 bg-black/5 h-full transition-all duration-300",
          isSidebarOpen ? "w-[260px]" : "w-[72px]"
        )}
      >
        {SidebarContent}
      </aside>

      {/* Mobile/Tablet Sidebar (Drawer) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60]"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-neutral-900 border-r border-white/10 z-[70] will-change-transform"
            >
              {/* Force open mode for mobile drawer */}
              <div className="w-full h-full flex flex-col py-4">
                <div className="flex items-center justify-between px-4 mb-4">
                  <button
                    onClick={() => {
                      setIsComposeOpen(true);
                      setIsSidebarOpen(false);
                    }}
                    className="flex items-center gap-3 bg-[#c2e7ff] hover:bg-[#b3d7ef] text-[#001d35] px-6 py-4 rounded-2xl font-semibold shadow-lg transition-all"
                  >
                    <Plus size={24} />
                    <span>Compose</span>
                  </button>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto custom-scrollbar">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = selectedCategory === item.id;
                    return (
                      <Link
                        key={item.id}
                        href={`/${item.id}`}
                        onClick={() => {
                          setSelectedCategory(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-[0.925rem] font-medium rounded-full transition-all",
                          isActive ? "bg-primary/20 text-primary" : "text-white/70 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Icon size={20} className="flex-shrink-0" />
                        <span className="flex-1 text-left">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex items-center gap-1 px-4 py-3 border-t border-white/5 mt-auto">
                  {selectedAccount.email === 'aryan@mobintix.app' && (
                    <a
                      href="/admin"
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 hover:bg-white/10 rounded-full text-blue-400 hover:text-blue-300 transition-colors"
                      title="Admin Panel"
                    >
                      <Shield size={20} />
                    </a>
                  )}
                  <Link
                    href="/settings"
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
                  >
                    <Settings size={20} />
                  </Link>
                  <Link
                    href="/notifications"
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
                  >
                    <Bell size={20} />
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
