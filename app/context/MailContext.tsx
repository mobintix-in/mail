"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ACCOUNTS, MOCK_EMAILS, Email } from "../../lib/data";

interface MailContextType {
    selectedAccount: typeof ACCOUNTS[0];
    setSelectedAccount: (account: typeof ACCOUNTS[0]) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    isComposeOpen: boolean;
    setIsComposeOpen: (isOpen: boolean) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    emails: Email[];
    selectedEmail: Email | null;
    openEmail: (email: Email) => void;
    closeEmail: () => void;
    sendEmail: (email: Omit<Email, 'id' | 'time' | 'date' | 'read' | 'starred' | 'labels'>) => void;
    toggleStar: (id: number) => void;
    toggleRead: (id: number) => void;
    deleteEmail: (id: number) => void;
    refreshEmails: () => void;
    markAllRead: () => void;
}

const MailContext = createContext<MailContextType | undefined>(undefined);

export function MailProvider({ children }: { children: ReactNode }) {
    const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
    const [selectedCategory, setSelectedCategory] = useState("inbox");
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

    // Actions
    const openEmail = (email: Email) => {
        // Mark email as read when opened
        setEmails((prev) => prev.map(e =>
            e.id === email.id ? { ...e, read: true } : e
        ));
        // Set selected email with updated read status
        setSelectedEmail({ ...email, read: true });
    };

    const closeEmail = () => {
        setSelectedEmail(null);
    };

    const sendEmail = (newEmail: Omit<Email, 'id' | 'time' | 'date' | 'read' | 'starred' | 'labels'>) => {
        const email: Email = {
            ...newEmail,
            id: Date.now(),
            time: "Just now",
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            read: true,
            starred: false,
            labels: ["sent"],
        };
        setEmails((prev) => [email, ...prev]);
    };

    const toggleStar = (id: number) => {
        setEmails((prev) => prev.map(email =>
            email.id === id ? { ...email, starred: !email.starred } : email
        ));
        // Update selected email if it's the one being toggled
        if (selectedEmail?.id === id) {
            setSelectedEmail(prev => prev ? { ...prev, starred: !prev.starred } : null);
        }
    };

    const toggleRead = (id: number) => {
        setEmails((prev) => prev.map(email =>
            email.id === id ? { ...email, read: !email.read } : email
        ));
    };

    const deleteEmail = (id: number) => {
        setEmails((prev) => prev.map(email =>
            email.id === id ? { ...email, category: "trash", labels: email.labels.filter(l => l !== 'inbox') } : email
        ));
        // Close email detail if deleted email was open
        if (selectedEmail?.id === id) {
            setSelectedEmail(null);
        }
    };

    const refreshEmails = () => {
        // Simulate refresh delay
        setTimeout(() => {
            setEmails([...MOCK_EMAILS]);
        }, 500);
    };

    const markAllRead = () => {
        setEmails((prev) => prev.map(email => ({ ...email, read: true })));
    };

    return (
        <MailContext.Provider
            value={{
                selectedAccount,
                setSelectedAccount,
                selectedCategory,
                setSelectedCategory,
                isComposeOpen,
                setIsComposeOpen,
                isSidebarOpen,
                setIsSidebarOpen,
                searchQuery,
                setSearchQuery,
                emails,
                selectedEmail,
                openEmail,
                closeEmail,
                sendEmail,
                toggleStar,
                toggleRead,
                deleteEmail,
                refreshEmails,
                markAllRead,
            }}
        >
            {children}
        </MailContext.Provider>
    );
}

export function useMail() {
    const context = useContext(MailContext);
    if (context === undefined) {
        throw new Error("useMail must be used within a MailProvider");
    }
    return context;
}

