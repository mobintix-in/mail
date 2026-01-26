export interface Email {
    id: number;
    sender: string;
    subject: string;
    snippet: string;
    time: string;
    read: boolean;
    starred: boolean;
    labels: string[];
    category: "inbox" | "social" | "updates" | "promotions" | "spam" | "trash" | "drafts" | "sent" | "snoozed" | "scheduled";
    account: string;
}

export const ACCOUNTS = [
    { name: "Mobintix", email: "aryan@mobintix.app", color: "#3b82f6" },
    { name: "Techflecks", email: "aryan@techflecks.com", color: "#ec4899" },
];

export const MOCK_EMAILS: Email[] = [
    {
        id: 1,
        sender: "Google Play",
        subject: "Receipt for your recent purchase",
        snippet: "You've made a purchase on Google Play. Thank you for your support.",
        time: "9:42 AM",
        read: false,
        starred: false,
        labels: ["inbox", "updates"],
        category: "inbox",
        account: "aryan@mobintix.app"
    },
    {
        id: 2,
        sender: "Dribbble",
        subject: "10 new design jobs for you",
        snippet: "Check out the latest design opportunities tailored for you in San Francisco and Remote.",
        time: "Jan 24",
        read: true,
        starred: true,
        labels: ["inbox", "social"],
        category: "inbox",
        account: "aryan@mobintix.app"
    },
    {
        id: 3,
        sender: "Notion",
        subject: "New features: AI Q&A and more",
        snippet: "We just released a bunch of new features to help you write faster and better.",
        time: "Jan 22",
        read: true,
        starred: false,
        labels: ["inbox", "updates"],
        category: "inbox",
        account: "aryan@mobintix.app"
    },
    {
        id: 4,
        sender: "Linear",
        subject: "Linear 2025.1 Release",
        snippet: "Introducing the new cycles view, improved insights, and better performance.",
        time: "Jan 20",
        read: false,
        starred: true,
        labels: ["inbox", "updates"],
        category: "inbox",
        account: "aryan@techflecks.com"
    },
    {
        id: 5,
        sender: "Figma Team",
        subject: "Comments on 'Mobile App Redesign'",
        snippet: "Sara mentioned you in a comment: @Antigravity can we update the header color?",
        time: "Jan 18",
        read: true,
        starred: false,
        labels: ["inbox"],
        category: "inbox",
        account: "aryan@techflecks.com"
    },
    {
        id: 6,
        sender: "Boss",
        subject: "Project Deadline",
        snippet: "Just a reminder that the project deadline is coming up next week.",
        time: "Jan 15",
        read: true,
        starred: true,
        labels: ["work"],
        category: "inbox",
        account: "aryan@mobintix.app"
    },
    {
        id: 7,
        sender: "Newsletter",
        subject: "Weekly Tech Round-up",
        snippet: "Here are the top stories in tech this week: AI advancements, new gadgets, and more.",
        time: "Jan 10",
        read: false,
        starred: false,
        labels: ["updates"],
        category: "updates",
        account: "aryan@techflecks.com"
    },
    {
        id: 8,
        sender: "Spam Bot",
        subject: "You won a million dollars!",
        snippet: "Click here to claim your prize instantly. No strings attached.",
        time: "Jan 01",
        read: false,
        starred: false,
        labels: ["spam"],
        category: "spam",
        account: "aryan@mobintix.app"
    }
];

export async function getEmails(category: string, emailAccount?: string): Promise<Email[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    let filtered = MOCK_EMAILS;

    if (emailAccount) {
        filtered = filtered.filter(e => e.account === emailAccount);
    }

    const normalizedCategory = category.toLowerCase();

    if (normalizedCategory === 'starred') {
        return filtered.filter(email => email.starred);
    }

    if (normalizedCategory === 'inbox' || !normalizedCategory) {
        return filtered.filter(email => email.category === 'inbox');
    }

    return filtered.filter(email => email.category === normalizedCategory || email.labels.includes(normalizedCategory));
}
