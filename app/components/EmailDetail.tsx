"use client";

import { ArrowLeft, Star, Archive, Trash2, Mail, MailOpen, Reply, ReplyAll, Forward, MoreVertical, Printer, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useMail } from "../context/MailContext";
import { cn } from "../../lib/utils";

export default function EmailDetail() {
    const { selectedEmail, closeEmail, toggleStar, toggleRead, deleteEmail } = useMail();

    if (!selectedEmail) return null;

    const handleDelete = () => {
        deleteEmail(selectedEmail.id);
    };

    const handleToggleRead = () => {
        toggleRead(selectedEmail.id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full flex flex-col bg-black/40 backdrop-blur-md lg:rounded-tl-3xl overflow-hidden shadow-2xl"
        >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={closeEmail}
                        className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors"
                        title="Back to inbox"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={() => deleteEmail(selectedEmail.id)}
                        className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
                        title="Archive"
                    >
                        <Archive size={20} />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-white/40 hover:text-red-400 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={20} />
                    </button>
                    <button
                        onClick={handleToggleRead}
                        className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
                        title={selectedEmail.read ? "Mark as unread" : "Mark as read"}
                    >
                        {selectedEmail.read ? <Mail size={20} /> : <MailOpen size={20} />}
                    </button>
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors hidden sm:block">
                        <Printer size={20} />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors hidden sm:block">
                        <ExternalLink size={20} />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 md:p-8 max-w-4xl mx-auto">
                    {/* Subject */}
                    <h1 className="text-xl md:text-2xl font-bold text-white mb-6">
                        {selectedEmail.subject}
                    </h1>

                    {/* Sender Info */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                {selectedEmail.sender.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-white">
                                        {selectedEmail.sender}
                                    </span>
                                    <span className="text-white/40 text-sm truncate">
                                        &lt;{selectedEmail.senderEmail}&gt;
                                    </span>
                                </div>
                                <div className="text-white/50 text-sm mt-0.5">
                                    to me
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-white/40 text-sm hidden sm:block">
                                {selectedEmail.date}
                            </span>
                            <button
                                onClick={() => toggleStar(selectedEmail.id)}
                                className={cn(
                                    "p-2 rounded-lg transition-colors",
                                    selectedEmail.starred
                                        ? "text-yellow-400 hover:bg-yellow-500/20"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Star size={20} fill={selectedEmail.starred ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>

                    {/* Email Body */}
                    <div className="prose prose-invert max-w-none">
                        <div className="text-white/80 leading-relaxed whitespace-pre-wrap text-[0.95rem]">
                            {selectedEmail.body}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reply Footer */}
            <div className="p-4 md:p-6 border-t border-white/10 bg-black/20 shrink-0">
                <div className="flex items-center gap-2 md:gap-3 max-w-4xl mx-auto">
                    <button className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 hover:text-white transition-all">
                        <Reply size={18} />
                        <span className="text-sm font-medium">Reply</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 hover:text-white transition-all hidden sm:flex">
                        <ReplyAll size={18} />
                        <span className="text-sm font-medium">Reply All</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 hover:text-white transition-all">
                        <Forward size={18} />
                        <span className="text-sm font-medium">Forward</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
