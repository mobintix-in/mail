"use client";

import { ArrowLeft, Star, Archive, Trash2, Mail, MailOpen, Reply, ReplyAll, Forward, MoreVertical, Printer, ExternalLink, ChevronDown, Type, Paperclip, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useMail } from "../context/MailContext";
import { cn } from "../../lib/utils";
import { Email } from "../../lib/data";

export default function EmailDetail() {
    const { selectedEmail, closeEmail, toggleStar, toggleRead, deleteEmail, setIsComposeOpen } = useMail();
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [threadMessages, setThreadMessages] = useState<Email[]>([]);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (selectedEmail) {
            setThreadMessages([selectedEmail]);
        }
    }, [selectedEmail?.id]);

    if (!selectedEmail) return null;

    const handleDelete = () => {
        deleteEmail(selectedEmail.id);
    };

    const handleToggleRead = () => {
        toggleRead(selectedEmail.id);
        setShowMoreMenu(false);
    };

    const handleToggleStar = () => {
        toggleStar(selectedEmail.id);
        setShowMoreMenu(false);
    };

    const handleReply = () => {
        setIsReplying(true);
        // timeout to scroll to bottom after render
        setTimeout(() => {
            const element = document.getElementById('reply-editor');
            element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleReplyAll = () => {
        setIsReplying(true);
    };

    const handleForward = () => {
        setIsComposeOpen(true);
    };

    const handleArchive = () => {
        deleteEmail(selectedEmail.id);
        setShowMoreMenu(false);
    };



    const handleSendReply = () => {
        if (!replyText.trim() || !selectedEmail) return;

        setIsSending(true);
        // Simulate network delay
        setTimeout(() => {
            const newMsg: Email = {
                ...selectedEmail,
                id: Date.now(),
                sender: "Me",
                senderEmail: "me@example.com",
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
                body: replyText,
                read: true,
                starred: false,
                labels: []
            };

            setThreadMessages(prev => [...prev, newMsg]);
            setIsSending(false);
            setIsReplying(false);
            setReplyText("");

            // Scroll new message into view mock
            setTimeout(() => {
                const container = document.querySelector('.custom-scrollbar');
                if (container) container.scrollTop = container.scrollHeight;
            }, 100);
        }, 1000);
    };

    const handleOpenNewWindow = () => {
        // In a real app, this would route to /mail/:id
        const newWindow = window.open('', '_blank', 'width=800,height=600');
        if (newWindow) {
            newWindow.document.write(`
                <html>
                    <head>
                        <title>${selectedEmail.subject}</title>
                        <style>
                            body { font-family: sans-serif; padding: 40px; color: #333; line-height: 1.6; }
                            h1 { font-size: 24px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
                            .meta { color: #666; font-size: 14px; margin-bottom: 30px; }
                            .body { white-space: pre-wrap; }
                        </style>
                    </head>
                    <body>
                        <h1>${selectedEmail.subject}</h1>
                        <div class="meta">
                            From: ${selectedEmail.sender} &lt;${selectedEmail.senderEmail}&gt;<br>
                            Date: ${selectedEmail.date}
                        </div>
                        <div class="body">${selectedEmail.body}</div>
                    </body>
                </html>
            `);
        }
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
                        onClick={handleArchive}
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

                <div className="flex items-center gap-1 md:gap-2 relative">
                    <button
                        onClick={() => window.print()}
                        className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors hidden sm:block"
                        title="Print"
                    >
                        <Printer size={20} />
                    </button>
                    <button
                        onClick={handleOpenNewWindow}
                        className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors hidden sm:block"
                        title="Open in new window"
                    >
                        <ExternalLink size={20} />
                    </button>
                    <button
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        className={cn(
                            "p-2 hover:bg-white/5 rounded-lg transition-colors relative z-50",
                            showMoreMenu ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                        )}
                        title="More options"
                    >
                        <MoreVertical size={20} />
                    </button>

                    {/* More Menu Dropdown */}
                    <AnimatePresence>
                        {showMoreMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowMoreMenu(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                                >
                                    <div className="py-1">
                                        <button
                                            onClick={handleToggleRead}
                                            className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            {selectedEmail.read ? <Mail size={16} /> : <MailOpen size={16} />}
                                            {selectedEmail.read ? "Mark as unread" : "Mark as read"}
                                        </button>
                                        <button
                                            onClick={handleToggleStar}
                                            className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <Star size={16} className={selectedEmail.starred ? "text-yellow-400 fill-current" : ""} />
                                            {selectedEmail.starred ? "Remove star" : "Star message"}
                                        </button>
                                        <div className="h-px bg-white/10 my-1" />
                                        <button
                                            onClick={() => {
                                                window.print();
                                                setShowMoreMenu(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <Printer size={16} />
                                            Print
                                        </button>
                                        <button
                                            onClick={handleArchive}
                                            className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <Archive size={16} />
                                            Archive
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-4 md:p-8 max-w-4xl mx-auto">
                    {/* Subject */}
                    <h1 className="text-xl md:text-2xl font-bold text-white mb-6">
                        {selectedEmail.subject}
                    </h1>

                    <div className="space-y-8 pb-12">
                        {threadMessages.map((msg, i) => (
                            <div key={msg.id} className={cn("transition-all duration-300", i > 0 && "pt-8 border-t border-white/10")}>
                                {/* Sender Info */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-start gap-4">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                            {msg.sender.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-semibold text-white">
                                                    {msg.sender === "Me" ? "Me" : msg.sender}
                                                </span>
                                                <span className="text-white/40 text-sm truncate">
                                                    &lt;{msg.senderEmail}&gt;
                                                </span>
                                            </div>
                                            <div className="text-white/50 text-sm mt-0.5">
                                                to {msg.sender === "Me" ? selectedEmail.sender : "me"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-white/40 text-sm hidden sm:block">
                                            {msg.date}
                                        </span>
                                        {msg.sender !== "Me" && (
                                            <button
                                                onClick={() => toggleStar(msg.id)}
                                                className={cn(
                                                    "p-2 rounded-lg transition-colors",
                                                    msg.starred
                                                        ? "text-yellow-400 hover:bg-yellow-500/20"
                                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                                )}
                                                title={msg.starred ? "Unstar" : "Star"}
                                            >
                                                <Star size={20} fill={msg.starred ? "currentColor" : "none"} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Email Body */}
                                <div className="prose prose-invert max-w-none">
                                    <div className="text-white/80 leading-relaxed whitespace-pre-wrap text-[0.95rem]">
                                        {msg.body}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>

            {/* Reply Footer / Editor */}
            <div className={cn(
                "border-t border-white/10 bg-[#1e1e1e] shrink-0 transition-all duration-300",
                isReplying ? "p-0" : "p-4 md:p-6 bg-black/20"
            )}>
                {isReplying ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="reply-editor"
                        className="flex flex-col h-full max-h-[50vh]"
                    >
                        <div className="flex items-start gap-3 p-4">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                                M
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                                    <button className="flex items-center gap-1 hover:text-white">
                                        <Reply size={14} />
                                        <span>{selectedEmail.sender}</span>
                                    </button>
                                    <div className="border-l border-white/20 h-3 mx-1" />
                                    <button className="hover:text-white">
                                        <ChevronDown size={14} />
                                    </button>
                                </div>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-white text-sm min-h-[120px] resize-none placeholder:text-white/50 disabled:opacity-50 leading-relaxed custom-scrollbar"
                                    placeholder="Type your reply here..."
                                    autoFocus
                                    disabled={isSending}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 border-t border-white/5">
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleSendReply}
                                    disabled={isSending || !replyText.trim()}
                                    className={cn(
                                        "bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2",
                                        isSending ? "opacity-70 cursor-wait" : "hover:bg-blue-600",
                                        !replyText.trim() && !isSending && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {isSending ? "Sending..." : "Send"}
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors">
                                    <Type size={18} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors">
                                    <Paperclip size={18} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors">
                                    <Smile size={18} />
                                </button>
                            </div>
                            <button
                                onClick={() => setIsReplying(false)}
                                className="p-2 hover:bg-white/10 rounded text-white/60 hover:text-red-400 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex items-center gap-2 md:gap-3 max-w-4xl mx-auto">
                        <button
                            onClick={handleReply}
                            className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 hover:text-white transition-all"
                        >
                            <Reply size={18} />
                            <span className="text-sm font-medium">Reply</span>
                        </button>
                        <button
                            onClick={handleReplyAll}
                            className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 hover:text-white transition-all hidden sm:flex"
                        >
                            <ReplyAll size={18} />
                            <span className="text-sm font-medium">Reply All</span>
                        </button>
                        <button
                            onClick={handleForward}
                            className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/80 hover:text-white transition-all"
                        >
                            <Forward size={18} />
                            <span className="text-sm font-medium">Forward</span>
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

