"use client";

import { Star, Square, Archive, Trash2, Mail, Clock, RefreshCw, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Email } from "../../lib/data";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface EmailListProps {
  emails: Email[];
  isLoading?: boolean;
}

export default function EmailList({ emails, isLoading }: EmailListProps) {
  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-md lg:rounded-tl-3xl border-t border-white/10 overflow-hidden shadow-2xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 md:px-6 py-2 md:py-3 border-b border-white/10">
        <div className="flex items-center gap-1 md:gap-4">
          <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
            <Square size={20} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
            <RefreshCw size={20} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors hidden xs:block">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-widest hidden xs:block">
            1-50 of 1,234
          </span>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="animate-spin text-primary" size={32} />
          </div>
        ) : emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/20">
            <Mail size={48} className="mb-4 opacity-20" />
            <span className="text-xl font-medium">No emails found</span>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {emails.map((email, index) => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "group flex flex-col sm:flex-row sm:items-center px-4 md:px-6 py-3 cursor-pointer transition-all hover:bg-white/[0.03] relative",
                  !email.read && "bg-white/[0.02]"
                )}
              >
                {!email.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[2px_0_10px_rgba(59,130,246,0.5)]" />
                )}

                <div className="flex items-center justify-between sm:justify-start mb-2 sm:mb-0 sm:mr-6 flex-shrink-0">
                  <div className="flex items-center gap-3 md:gap-4">
                    <button className="text-white/20 hover:text-white transition-colors">
                      <Square size={20} />
                    </button>
                    <button className={cn(
                      "transition-colors",
                      email.starred ? "text-yellow-400" : "text-white/20 hover:text-white"
                    )}>
                      <Star size={20} fill={email.starred ? "currentColor" : "none"} />
                    </button>
                    <div className={cn(
                      "sm:hidden truncate text-[0.95rem] max-w-[150px]",
                      !email.read ? "font-bold text-white" : "font-medium text-white/60"
                    )}>
                      {email.sender}
                    </div>
                  </div>
                  <span className={cn(
                    "text-xs font-bold sm:hidden",
                    !email.read ? "text-white" : "text-white/40"
                  )}>
                    {email.time}
                  </span>
                </div>

                <div className={cn(
                  "hidden sm:block w-40 md:w-48 lg:w-48 flex-shrink-0 truncate text-[0.95rem]",
                  !email.read ? "font-bold text-white" : "font-medium text-white/60"
                )}>
                  {email.sender}
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 truncate sm:pr-12">
                  <span className={cn(
                    "text-[0.95rem] truncate",
                    !email.read ? "font-bold text-white" : "text-white/90"
                  )}>
                    {email.subject}
                  </span>
                  <span className="hidden sm:inline text-white/40 text-[0.95rem]">-</span>
                  <span className="text-white/40 text-[0.9rem] sm:text-[0.95rem] truncate max-w-full sm:max-w-md">
                    {email.snippet}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-4 flex-shrink-0 ml-auto sm:ml-0">
                  {/* Hover Actions */}
                  <div className="hidden group-hover:flex items-center gap-1">
                    <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                      <Archive size={18} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                      <Mail size={18} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                      <Clock size={18} />
                    </button>
                  </div>

                  <span className={cn(
                    "text-xs font-bold w-16 text-right group-hover:hidden",
                    !email.read ? "text-white" : "text-white/40"
                  )}>
                    {email.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
