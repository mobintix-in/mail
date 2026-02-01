export interface Email {
    id: number;
    sender: string;
    senderEmail: string;
    subject: string;
    snippet: string;
    body: string;
    time: string;
    date: string;
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
        senderEmail: "noreply@googleplay.com",
        subject: "Receipt for your recent purchase",
        snippet: "You've made a purchase on Google Play. Thank you for your support.",
        body: `Dear Customer,

Thank you for your recent purchase on Google Play!

Order Details:
- App: Premium Productivity Suite
- Price: $4.99
- Order ID: GPA.3371-5893-2847-26473

Your payment has been processed successfully. The app has been added to your library and is ready for download.

If you have any questions about this purchase, please visit our Help Center or contact our support team.

Best regards,
The Google Play Team`,
        time: "9:42 AM",
        date: "February 1, 2026",
        read: false,
        starred: false,
        labels: ["inbox", "updates"],
        category: "inbox",
        account: "aryan@mobintix.app"
    },
    {
        id: 2,
        sender: "Dribbble",
        senderEmail: "jobs@dribbble.com",
        subject: "10 new design jobs for you",
        snippet: "Check out the latest design opportunities tailored for you in San Francisco and Remote.",
        body: `Hi there,

We found 10 new design jobs that match your skills and preferences!

Featured Opportunities:

1. Senior Product Designer at Stripe (Remote) - $180k-$220k
2. UI/UX Designer at Airbnb (San Francisco) - $150k-$190k
3. Design Lead at Figma (San Francisco) - $200k-$250k
4. Mobile Designer at Discord (Remote) - $140k-$180k
5. Brand Designer at Notion (San Francisco) - $130k-$170k

And 5 more positions waiting for you...

These roles are actively hiring and looking for talented designers like you. Don't miss out on your dream job!

Apply now on Dribbble Jobs →

Happy designing,
The Dribbble Team`,
        time: "Jan 24",
        date: "January 24, 2026",
        read: true,
        starred: true,
        labels: ["inbox", "social"],
        category: "inbox",
        account: "aryan@mobintix.app"
    },
    {
        id: 3,
        sender: "Notion",
        senderEmail: "updates@notion.so",
        subject: "New features: AI Q&A and more",
        snippet: "We just released a bunch of new features to help you write faster and better.",
        body: `Hey there,

Exciting news! We just shipped some powerful new features to make your Notion experience even better.

What's New:

🤖 AI Q&A
Ask questions about your workspace and get instant answers. Our AI reads through your pages, databases, and documents to find exactly what you need.

✍️ Improved Writing Assistant
- Better grammar and style suggestions
- Tone adjustment (professional, casual, friendly)
- Auto-summarization for long documents

📊 Enhanced Databases
- New gallery view layouts
- Improved filtering with OR conditions
- Bulk edit improvements

🔗 Better Integrations
- Slack notifications now include previews
- GitHub sync improvements
- New Zapier triggers

Update your app to get all these features today!

Happy building,
The Notion Team`,
        time: "Jan 22",
        date: "January 22, 2026",
        read: true,
        starred: false,
        labels: ["inbox", "updates"],
        category: "inbox",
        account: "aryan@mobintix.app"
    },
    {
        id: 4,
        sender: "Linear",
        senderEmail: "changelog@linear.app",
        subject: "Linear 2025.1 Release",
        snippet: "Introducing the new cycles view, improved insights, and better performance.",
        body: `Linear 2025.1 Release Notes

We're thrilled to announce our biggest update yet! Here's everything new in Linear 2025.1:

🔄 New Cycles View
Visualize your sprint progress with our redesigned cycles view. Track velocity, burndown, and team capacity at a glance.

📈 Improved Insights
- Real-time productivity metrics
- Team performance dashboards
- Customizable reports and exports

⚡ Performance Improvements
- 40% faster load times
- Improved offline support
- Reduced memory usage

🎨 Design Updates
- Refreshed UI components
- New dark mode variations
- Better accessibility support

🔧 Developer Experience
- New GraphQL API endpoints
- Improved webhook reliability
- Better GitHub/GitLab integration

Try it now at linear.app

- The Linear Team`,
        time: "Jan 20",
        date: "January 20, 2026",
        read: false,
        starred: true,
        labels: ["inbox", "updates"],
        category: "inbox",
        account: "aryan@techflecks.com"
    },
    {
        id: 5,
        sender: "Figma Team",
        senderEmail: "notifications@figma.com",
        subject: "Comments on 'Mobile App Redesign'",
        snippet: "Sara mentioned you in a comment: @Antigravity can we update the header color?",
        body: `You have new comments on your design file.

File: Mobile App Redesign
Team: Product Design

Sara Chen mentioned you:
"@Antigravity can we update the header color? I think we should try a gradient from our primary to secondary brand colors. What do you think?"

View context →

---

Other recent comments:

Mike Johnson:
"Love the new navigation! The animations feel really smooth."

Emma Wilson:
"The onboarding flow looks great. Quick question - should we add a skip button on the second screen?"

Open in Figma to respond →

Best,
The Figma Team`,
        time: "Jan 18",
        date: "January 18, 2026",
        read: true,
        starred: false,
        labels: ["inbox"],
        category: "inbox",
        account: "aryan@techflecks.com"
    },
    {
        id: 6,
        sender: "Boss",
        senderEmail: "michael.chen@mobintix.app",
        subject: "Project Deadline",
        snippet: "Just a reminder that the project deadline is coming up next week.",
        body: `Hi,

Just a friendly reminder that the project deadline is coming up next week (February 7th).

Here's what we need to finalize:
- Complete the final UI review
- Run performance testing
- Prepare deployment documentation
- Schedule the demo with stakeholders

Please let me know if you're on track or if you need any support from the team. We can schedule a quick sync if needed.

Also, great work on the recent updates! The client feedback has been very positive.

Best,
Michael`,
        time: "Jan 15",
        date: "January 15, 2026",
        read: true,
        starred: true,
        labels: ["work"],
        category: "inbox",
        account: "aryan@mobintix.app"
    },
    {
        id: 7,
        sender: "Newsletter",
        senderEmail: "weekly@technews.io",
        subject: "Weekly Tech Round-up",
        snippet: "Here are the top stories in tech this week: AI advancements, new gadgets, and more.",
        body: `📰 Weekly Tech Round-up
January 10, 2026

This week's top stories:

🤖 AI & Machine Learning
OpenAI announces GPT-5 with breakthrough reasoning capabilities. Early tests show significant improvements in complex problem-solving and reduced hallucinations.

📱 Mobile
Apple's AR glasses enter production phase. Expected launch in Q3 2026 with revolutionary spatial computing features.

💻 Software
GitHub Copilot X gets real-time debugging assistance. New feature can identify bugs before you even run your code.

🎮 Gaming
NVIDIA unveils RTX 5090 with incredible ray-tracing performance. Early benchmarks show 70% improvement over previous generation.

🚀 Space Tech
SpaceX successfully tests Starship rapid reusability. Same vehicle completed two orbital flights in 24 hours.

📊 Markets
Tech stocks rally as Fed signals rate cuts. NASDAQ up 3% this week.

Until next week,
Tech News Team`,
        time: "Jan 10",
        date: "January 10, 2026",
        read: false,
        starred: false,
        labels: ["updates"],
        category: "updates",
        account: "aryan@techflecks.com"
    },
    {
        id: 8,
        sender: "Spam Bot",
        senderEmail: "prize@totallylegit-winners.com",
        subject: "You won a million dollars!",
        snippet: "Click here to claim your prize instantly. No strings attached.",
        body: `CONGRATULATIONS!!! 🎉🎉🎉

YOU HAVE BEEN SELECTED AS THE WINNER OF $1,000,000 USD!!!

Dear Lucky Winner,

Your email was randomly selected from millions of entries in our INTERNATIONAL MEGA LOTTERY PROMOTION!

To claim your prize, simply:
1. Send us your full name and address
2. Provide your bank account details
3. Pay a small processing fee of $99.99

ACT NOW! This offer expires in 24 hours!!!

CLICK HERE TO CLAIM YOUR PRIZE →

This is 100% LEGITIMATE and NOT A SCAM! Trust us!

Best regards,
Dr. Prince Nigerian McMillionaire
Chief Prize Distribution Officer`,
        time: "Jan 01",
        date: "January 1, 2026",
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
