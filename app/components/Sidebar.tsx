"use client";

import { Inbox, Star, Clock, Send, File, ChevronDown, Plus, CalendarDays, AlertOctagon, Trash2, X } from "lucide-react";
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
  const { selectedCategory, setSelectedCategory, setIsComposeOpen, isSidebarOpen, setIsSidebarOpen } = useMail();

  const SidebarContent = (
    <div className="w-full h-full flex flex-col py-4">
      <div className="flex items-center justify-between px-4 mb-4 lg:mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsComposeOpen(true);
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
          }}
          className={cn(
            "flex items-center gap-3 bg-[#c2e7ff] hover:bg-[#b3d7ef] text-[#001d35] rounded-2xl font-semibold shadow-lg transition-all",
            isSidebarOpen ? "px-6 py-4 w-fit" : "p-4 mx-auto"
          )}
        >
          <Plus size={24} />
          {isSidebarOpen && <span>Compose</span>}
        </motion.button>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="p-2 hover:bg-white/10 rounded-full lg:hidden"
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
              {isSidebarOpen && item.count && (
                <span className={cn(
                  "text-[0.75rem] px-2 py-0.5 rounded-full font-bold",
                  isActive ? "bg-primary/20" : "bg-white/10"
                )}>
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {isSidebarOpen && (
        <div className="mt-4 pt-4 border-t border-white/5 px-4">
          <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 pl-2">Labels</h3>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-[0.925rem] text-white/70 hover:bg-white/5 rounded-full group">
              <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
              <span className="truncate">Work</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-[0.925rem] text-white/70 hover:bg-white/5 rounded-full group">
              <div className="w-2 h-2 rounded-full bg-pink-500 group-hover:scale-150 transition-transform" />
              <span className="truncate">Design</span>
            </button>
          </div>
        </div>
      )}
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
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-neutral-900 border-r border-white/10 z-[70]"
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
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
