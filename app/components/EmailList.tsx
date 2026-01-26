"use client";

import { Star, Square, Archive, Trash2, Mail, Clock } from "lucide-react";
import { Email } from "../../lib/data";

interface EmailListProps {
  title?: string;
  emails: Email[];
}

export default function EmailList({ title = "Inbox", emails }: EmailListProps) {
  return (
    <div className="email-list-container glass-panel">
      <div className="toolbar">
        <h2 className="toolbar-title">{title}</h2>
        <div className="toolbar-actions">
          <button className="icon-btn tool" aria-label="Select all"><Square size={18} /></button>
          <button className="icon-btn tool" aria-label="Archive"><Archive size={18} /></button>
          <button className="icon-btn tool" aria-label="Delete"><Trash2 size={18} /></button>
          <button className="icon-btn tool" aria-label="Mark as unread"><Mail size={18} /></button>
          <button className="icon-btn tool" aria-label="Snooze"><Clock size={18} /></button>
        </div>
      </div>

      <div className="list">
        {emails.length === 0 ? (
          <div className="empty-state">No emails in {title}</div>
        ) : (
          emails.map((email) => (
            <div key={email.id} className={`email-row ${!email.read ? "unread" : ""}`}>
              <div className="actions">
                <button className="checkbox" aria-label="Select"><Square size={18} /></button>
                <button className={`star ${email.starred ? "starred" : ""}`} aria-label="Star">
                  <Star size={18} fill={email.starred ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="sender">{email.sender}</div>

              <div className="content">
                <span className="subject">{email.subject}</span>
                <span className="separator">-</span>
                <span className="snippet">{email.snippet}</span>
              </div>

              <div className="time">{email.time}</div>
            </div>
          ))
        )}
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
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--card-border);
        }

        .toolbar-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--primary);
        }

        .toolbar-actions {
          display: flex;
          gap: 0.5rem;
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

        .empty-state {
            padding: 4rem;
            text-align: center;
            opacity: 0.5;
            font-size: 1.2rem;
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

        .star.starred {
            color: #facc15; /* Yellow/Gold for starred */
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
