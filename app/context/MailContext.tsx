"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ACCOUNTS } from "../../lib/data";

interface MailContextType {
    selectedAccount: typeof ACCOUNTS[0];
    setSelectedAccount: (account: typeof ACCOUNTS[0]) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    isComposeOpen: boolean;
    setIsComposeOpen: (isOpen: boolean) => void;
}

const MailContext = createContext<MailContextType | undefined>(undefined);

export function MailProvider({ children }: { children: ReactNode }) {
    const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
    const [selectedCategory, setSelectedCategory] = useState("inbox");
    const [isComposeOpen, setIsComposeOpen] = useState(false);

    return (
        <MailContext.Provider
            value={{
                selectedAccount,
                setSelectedAccount,
                selectedCategory,
                setSelectedCategory,
                isComposeOpen,
                setIsComposeOpen,
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
