"use client";

import { X, Maximize2, Minimize2, Send, Paperclip, Smile, MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { useMail } from "../context/MailContext";

interface ComposeMailProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ComposeMail({ isOpen, onClose }: ComposeMailProps) {
    const [isMaximized, setIsMaximized] = useState(false);
    const { sendEmail, selectedAccount } = useMail();
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (sending) return;

        if (!selectedAccount) {
            toast.error("Error: No account selected.");
            return;
        }

        setSending(true);

        try {
            // Simulate network delay for better UX
            await new Promise(resolve => setTimeout(resolve, 500));

            sendEmail({
                sender: "Me",
                senderEmail: selectedAccount.email,
                subject: subject || "No Subject",
                snippet: body.slice(0, 100) || "No content",
                body: body || "One attachment", // Fallback text
                category: "inbox",
                account: selectedAccount.email
            });

            // Reset and close
            setTo("");
            setSubject("");
            setBody("");
            onClose();
            toast.success("Email sent successfully");
        } catch (error) {
            console.error("Failed to send email:", error);
            toast.error("Failed to send email. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    // ... existing props ...
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
                    className={cn(
                        "fixed bottom-0 right-0 z-[9999] bg-neutral-900 border-t md:border border-white/10 md:rounded-t-2xl shadow-2xl overflow-hidden flex flex-col will-change-transform",
                        isMaximized ? "inset-0 md:top-8 md:left-8 md:right-8 md:bottom-8 h-full md:h-[calc(100%-4rem)] md:w-[calc(100%-4rem)]" : "md:bottom-0 md:right-8 w-full md:w-[600px] h-full sm:h-[80%] md:h-[600px]"
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 shrink-0 select-none cursor-default">
                        <span className="text-sm font-semibold">New Message</span>
                        <div className="flex items-center gap-1">
                            {/* ... buttons ... */}
                            <button
                                onClick={() => setIsMaximized(!isMaximized)}
                                className="p-1.5 hover:bg-white/10 rounded text-white/40 hover:text-white transition-colors hidden sm:block"
                            >
                                {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            </button>
                            <button
                                onClick={onClose}
                                className="p-1.5 hover:bg-white/10 rounded text-white/40 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSend}
                        className="flex-1 flex flex-col overflow-hidden"
                    >
                        <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
                            <div className="border-b border-white/5 pb-2 flex items-center gap-2 shrink-0">
                                <span className="text-white/40 text-sm w-12">To</span>
                                <input
                                    type="text"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="bg-transparent border-none outline-none flex-1 text-sm font-medium focus:ring-0"
                                    placeholder="Recipient"
                                />
                            </div>
                            <div className="border-b border-white/5 pb-2 flex items-center gap-2 shrink-0">
                                <span className="text-white/40 text-sm w-12">Subject</span>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="bg-transparent border-none outline-none flex-1 text-sm font-medium focus:ring-0"
                                    placeholder="Subject"
                                />
                            </div>
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none resize-none text-[0.95rem] leading-relaxed min-h-[200px] focus:ring-0"
                                placeholder="Write your message here..."
                            />
                        </div>

                        {/* Footer */}
                        <div className="p-4 flex items-center justify-between border-t border-white/10 bg-white/5 shrink-0 relative z-10">
                            <div className="flex items-center gap-1 md:gap-2">
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className={cn(
                                        "flex items-center gap-2 bg-primary hover:bg-primary-hover active:scale-95 text-white px-5 md:px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-primary/20",
                                        sending && "opacity-70 cursor-wait"
                                    )}
                                >
                                    <span>{sending ? 'Sending...' : 'Send'}</span>
                                    {!sending && <Send size={16} className="pointer-events-none" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toast("Attachments feature coming soon")}
                                    className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
                                >
                                    <Paperclip size={20} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toast("Link insertion feature coming soon")}
                                    className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors hidden xs:block"
                                >
                                    <LinkIcon size={20} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toast("Emoji picker coming soon")}
                                    className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors hidden xs:block"
                                >
                                    <Smile size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => toast("More options coming soon")}
                                    className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors"
                                >
                                    <MoreVertical size={20} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        toast("Discard message?", {
                                            action: {
                                                label: "Discard",
                                                onClick: () => {
                                                    setTo("");
                                                    setSubject("");
                                                    setBody("");
                                                    onClose();
                                                    toast.success("Message discarded");
                                                }
                                            }
                                        });
                                    }}
                                    className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function LinkIcon({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}
