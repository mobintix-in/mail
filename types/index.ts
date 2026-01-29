import { ElementType } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'owner';
    avatar?: string;
}

export interface Account {
    name: string;
    email: string;
    color: string;
}

export interface Email {
    id: number;
    sender: string;
    subject: string;
    snippet: string;
    time: string;
    read: boolean;
    starred: boolean;
    labels: string[];
    category: EmailCategory;
    account: string;
}

export type EmailCategory =
    | "inbox"
    | "social"
    | "updates"
    | "promotions"
    | "spam"
    | "trash"
    | "drafts"
    | "sent"
    | "snoozed"
    | "scheduled";

export interface NavItem {
    id: string;
    icon: ElementType;
    label: string;
    count?: number;
    href: string;
}
