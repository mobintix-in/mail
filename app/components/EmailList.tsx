"use client";

import { Star, Square, Archive, Trash2, Mail, Clock } from "lucide-react";

interface EmailListProps {
  title?: string;
}

export default function EmailList({ title = "Inbox" }: EmailListProps) {
  const emails = [
    {
      id: 1,
      sender: "Google Play",
      subject: "Receipt for your recent purchase",
      snippet: "You've made a purchase on Google Play. Thank you for...",
      time: "9:42 AM",
      read: false,
    },
    {
      id: 2,
      sender: "Dribbble",
      subject: "10 new design jobs for you",
      snippet: "Check out the latest design opportunities tailored for you...",
      time: "Jan 24",
      read: true,
    },
    {
      id: 3,
      sender: "Notion",
      subject: "New features: AI Q&A and more",
      snippet: "We just released a bunch of new features to help you write...",
      time: "Jan 22",
      read: true,
    },
    {
      id: 4,
      sender: "Linear",
      subject: "Linear 2025.1 Release",
      snippet: "Introducing the new cycles view, improved insights, and...",
      time: "Jan 20",
      read: false,
    },
    {
      id: 5,
      sender: "Figma Team",
      subject: "Comments on 'Mobile App Redesign'",
      snippet: "Sara mentioned you in a comment: @Antigravity can we update...",
      time: "Jan 18",
      read: true,
    },
  ];

  return (
    <div className="email-list-container glass-panel">
      <div className="toolbar">
        <button className="icon-btn tool"><Square size={18} /></button>
        <button className="icon-btn tool"><Archive size={18} /></button>
        <button className="icon-btn tool"><Trash2 size={18} /></button>
        <button className="icon-btn tool"><Mail size={18} /></button>
        <button className="icon-btn tool"><Clock size={18} /></button>
      </div>

      <div className="list">
        {emails.map((email) => (
          <div key={email.id} className={`email-row ${!email.read ? "unread" : ""}`}>
            <div className="actions">
              <button className="checkbox"><Square size={18} /></button>
              <button className="star"><Star size={18} /></button>
            </div>

            <div className="sender">{email.sender}</div>

            <div className="content">
              <span className="subject">{email.subject}</span>
              <span className="separator">-</span>
              <span className="snippet">{email.snippet}</span>
            </div>

            <div className="time">{email.time}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .email-list-container {
          flex: 1;
          margin: 0 1rem 1rem 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-top-left-radius: 16px; /* Matches sidebar aesthetic */
          border-top-right-radius: 16px;
        }

        .toolbar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--card-border);
        }

        .tool {
          padding: 0.5rem;
          color: rgba(237, 237, 237, 0.7);
          border-radius: 4px;
        }
        
        .tool:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .list {
          flex: 1;
          overflow-y: auto;
        }

        .email-row {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: background 0.1s;
          font-size: 0.95rem;
        }

        .email-row:hover {
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 1px 0 0 var(--card-border), inset -1px 0 0 var(--card-border); /* Subtle border effect */
          z-index: 1;
        }

        .unread {
          background: rgba(255, 255, 255, 0.02);
          font-weight: 700;
          color: white;
        }
        
        .unread .sender, .unread .subject {
           font-weight: 700;
        }
        
        .sender {
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          opacity: 0.9;
        }

        .content {
          flex: 1;
          display: flex;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: 1rem;
        }

        .subject {
          margin-right: 0.5rem;
        }

        .separator {
          margin-right: 0.5rem;
          opacity: 0.5;
        }

        .snippet {
          opacity: 0.6;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .time {
          font-size: 0.8rem;
          font-weight: 600;
          opacity: 0.7;
          width: 70px;
          text-align: right;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
          margin-right: 1rem;
          color: rgba(237, 237, 237, 0.3);
        }
        
        .checkbox:hover, .star:hover {
          color: rgba(237, 237, 237, 0.8);
        }

        button {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
