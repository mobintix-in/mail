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
}

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
    }
];

export async function getEmails(category: string): Promise<Email[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const normalizedCategory = category.toLowerCase();

    if (normalizedCategory === 'starred') {
        return MOCK_EMAILS.filter(email => email.starred);
    }

    // Handle other special categories logic if needed, 
    // otherwise default to matching the 'category' field or label
    if (normalizedCategory === 'inbox' || !normalizedCategory) {
        return MOCK_EMAILS.filter(email => email.category === 'inbox');
    }

    return MOCK_EMAILS.filter(email => email.category === normalizedCategory || email.labels.includes(normalizedCategory));
}
