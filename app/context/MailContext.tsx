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
    sendEmail: (email: Omit<Email, 'id' | 'time' | 'read' | 'starred' | 'labels'>) => void;
    toggleStar: (id: number) => void;
    toggleRead: (id: number) => void;
    deleteEmail: (id: number) => void;
}

const MailContext = createContext<MailContextType | undefined>(undefined);

export function MailProvider({ children }: { children: ReactNode }) {
    const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
    const [selectedCategory, setSelectedCategory] = useState("inbox");
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);

    // Actions
    const sendEmail = (newEmail: Omit<Email, 'id' | 'time' | 'read' | 'starred' | 'labels'>) => {
        const email: Email = {
            ...newEmail,
            id: Date.now(),
            time: "Just now",
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
                sendEmail,
                toggleStar,
                toggleRead,
                deleteEmail,
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
