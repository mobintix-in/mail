"use client";

import { Inbox, Star, Clock, Send, File, ChevronDown, Plus, CalendarDays, AlertOctagon, Trash2 } from "lucide-react";
import { useMail } from "../context/MailContext";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

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
  const { selectedCategory, setSelectedCategory, setIsComposeOpen } = useMail();

  return (
    <aside className="w-[260px] flex flex-col py-4 flex-shrink-0 z-40 border-r border-white/5 bg-black/5">
      <div className="px-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsComposeOpen(true)}
          className="flex items-center gap-3 bg-[#c2e7ff] hover:bg-[#b3d7ef] text-[#001d35] px-6 py-4 rounded-2xl font-semibold shadow-lg transition-all w-fit"
        >
          <Plus size={24} />
          <span>Compose</span>
        </motion.button>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedCategory === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 text-[0.925rem] font-medium rounded-full transition-all group",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon
                size={20}
                className={cn("transition-transform", isActive ? "scale-110" : "group-hover:scale-110")}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count && (
                <span className={cn(
                  "text-[0.75rem] px-2 py-0.5 rounded-full font-bold",
                  isActive ? "bg-primary/20" : "bg-white/10"
                )}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-6 pt-6 border-t border-white/5 px-4">
        <h3 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 pl-2">Labels</h3>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-[0.925rem] text-white/70 hover:bg-white/5 rounded-full group">
            <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
            <span>Work</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-[0.925rem] text-white/70 hover:bg-white/5 rounded-full group">
            <div className="w-2 h-2 rounded-full bg-pink-500 group-hover:scale-150 transition-transform" />
            <span>Design</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
