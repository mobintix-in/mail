"use client";

import { useState } from "react";
import { Star, Square, CheckSquare, MinusSquare, Archive, Trash2, Mail, Clock, RefreshCw, MoreVertical, ChevronLeft, ChevronRight, MailOpen, ChevronDown } from "lucide-react";
import { Email } from "../../lib/data";
import { useMail } from "../context/MailContext";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface EmailListProps {
  emails: Email[];
  isLoading?: boolean;
}

export default function EmailList({ emails, isLoading }: EmailListProps) {
  const { toggleStar, toggleRead, deleteEmail, refreshEmails, markAllRead, openEmail } = useMail();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showSelectMenu, setShowSelectMenu] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<Set<number>>(new Set());

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshEmails();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const toggleSelectEmail = (id: number) => {
    setSelectedEmails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedEmails.size === emails.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(emails.map(e => e.id)));
    }
  };

  const selectNone = () => {
    setSelectedEmails(new Set());
    setShowSelectMenu(false);
  };

  const selectAll = () => {
    setSelectedEmails(new Set(emails.map(e => e.id)));
    setShowSelectMenu(false);
  };

  const selectRead = () => {
    setSelectedEmails(new Set(emails.filter(e => e.read).map(e => e.id)));
    setShowSelectMenu(false);
  };

  const selectUnread = () => {
    setSelectedEmails(new Set(emails.filter(e => !e.read).map(e => e.id)));
    setShowSelectMenu(false);
  };

  const selectStarred = () => {
    setSelectedEmails(new Set(emails.filter(e => e.starred).map(e => e.id)));
    setShowSelectMenu(false);
  };

  const selectUnstarred = () => {
    setSelectedEmails(new Set(emails.filter(e => !e.starred).map(e => e.id)));
    setShowSelectMenu(false);
  };

  const deleteSelectedEmails = () => {
    selectedEmails.forEach(id => deleteEmail(id));
    setSelectedEmails(new Set());
  };

  const isAllSelected = emails.length > 0 && selectedEmails.size === emails.length;
  const isSomeSelected = selectedEmails.size > 0 && selectedEmails.size < emails.length;
  const hasSelection = selectedEmails.size > 0;

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-md lg:rounded-tl-3xl overflow-hidden shadow-2xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 md:px-6 py-2 md:py-3 border-b border-white/10">
        <div className="flex items-center gap-1 md:gap-4">
          {/* Gmail-style Select Dropdown */}
          <div className="relative flex items-center">
            <button
              onClick={toggleSelectAll}
              className="p-2 hover:bg-white/5 rounded-l-lg text-white/40 hover:text-white transition-colors"
              title={isAllSelected ? "Deselect all" : "Select all"}
            >
              {isAllSelected ? (
                <CheckSquare size={20} className="text-primary" />
              ) : isSomeSelected ? (
                <MinusSquare size={20} className="text-primary" />
              ) : (
                <Square size={20} />
              )}
            </button>
            <button
              onClick={() => setShowSelectMenu(!showSelectMenu)}
              className="p-1 hover:bg-white/5 rounded-r-lg text-white/40 hover:text-white transition-colors border-l border-white/10"
              title="Select options"
            >
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {showSelectMenu && (
                <>
                  <div
                    className="fixed inset-0 z-[99]"
                    onClick={() => setShowSelectMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute left-0 top-full mt-2 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-2xl py-1 min-w-[140px] z-[100]"
                  >
                    <button onClick={selectAll} className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors">
                      All
                    </button>
                    <button onClick={selectNone} className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors">
                      None
                    </button>
                    <div className="border-t border-white/10 my-1" />
                    <button onClick={selectRead} className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors">
                      Read
                    </button>
                    <button onClick={selectUnread} className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors">
                      Unread
                    </button>
                    <div className="border-t border-white/10 my-1" />
                    <button onClick={selectStarred} className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors">
                      Starred
                    </button>
                    <button onClick={selectUnstarred} className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors">
                      Unstarred
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw size={20} className={cn(isRefreshing && "animate-spin")} />
          </button>

          {/* Trash button - shows when emails are selected */}
          {hasSelection && (
            <button
              onClick={deleteSelectedEmails}
              className="p-2 hover:bg-red-500/20 rounded-lg text-white/40 hover:text-red-400 transition-colors"
              title={`Delete ${selectedEmails.size} selected`}
            >
              <Trash2 size={20} />
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors hidden xs:block"
              title="More options"
            >
              <MoreVertical size={20} />
            </button>
            <AnimatePresence>
              {showMoreMenu && (
                <>
                  {/* Backdrop to close menu on outside click */}
                  <div
                    className="fixed inset-0 z-[99]"
                    onClick={() => setShowMoreMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute left-0 top-full mt-2 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-2xl py-1 min-w-[160px] z-[100]"
                  >
                    <button
                      onClick={() => { markAllRead(); setShowMoreMenu(false); }}
                      className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors"
                    >
                      Mark all as read
                    </button>
                    <button
                      onClick={() => { handleRefresh(); setShowMoreMenu(false); }}
                      className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 transition-colors"
                    >
                      Refresh inbox
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
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
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index < 10 ? index * 0.02 : 0,
                  duration: 0.2,
                  ease: "easeOut"
                }}
                className={cn(
                  "group flex flex-col sm:flex-row sm:items-center px-4 md:px-6 py-3 cursor-pointer transition-colors duration-150 hover:bg-white/[0.03] relative will-change-transform",
                  !email.read && "bg-white/[0.02]"
                )}
                onClick={() => openEmail(email)}
              >
                {!email.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[2px_0_10px_rgba(59,130,246,0.5)]" />
                )}

                <div className="flex items-center justify-between sm:justify-start mb-2 sm:mb-0 sm:mr-6 flex-shrink-0">
                  <div className="flex items-center gap-3 md:gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectEmail(email.id);
                      }}
                      className={cn(
                        "transition-colors",
                        selectedEmails.has(email.id) ? "text-primary" : "text-white/20 hover:text-white"
                      )}
                    >
                      {selectedEmails.has(email.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(email.id);
                      }}
                      className={cn(
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
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteEmail(email.id); }}
                      className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                      title="Archive"
                    >
                      <Archive size={18} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteEmail(email.id); }}
                      className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleRead(email.id); }}
                      className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                      title={email.read ? "Mark as unread" : "Mark as read"}
                    >
                      {email.read ? <Mail size={18} /> : <MailOpen size={18} />}
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
