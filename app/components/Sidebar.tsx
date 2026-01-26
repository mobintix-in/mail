"use client";

import { Inbox, Star, Clock, Send, File, ChevronDown, Plus, CalendarDays, AlertOctagon, Trash2 } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { icon: <Inbox size={20} />, label: "Inbox", active: true, count: 12 },
    { icon: <Star size={20} />, label: "Starred", count: null },
    { icon: <Clock size={20} />, label: "Snoozed", count: null },
    { icon: <Send size={20} />, label: "Sent", count: null },
    { icon: <CalendarDays size={20} />, label: "Scheduled", count: null },
    { icon: <File size={20} />, label: "Drafts", count: 2 },
    { icon: <ChevronDown size={20} />, label: "More", count: null },
    { icon: <AlertOctagon size={20} />, label: "Spam", count: null },
    { icon: <Trash2 size={20} />, label: "Trash", count: null },
  ];

  return (
    <aside className="sidebar">
      <div className="compose-wrapper">
        <button className="compose-btn">
          <Plus size={24} />
          <span>Compose</span>
        </button>
      </div>

      <nav className="nav-list">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`nav-item ${item.active ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
            {item.count && <span className="count">{item.count}</span>}
          </div>
        ))}
      </nav>

      <div className="labels-section">
        <h3>Labels</h3>
        <div className="nav-item">
          <span className="label-icon blue"></span>
          <span className="label">Work</span>
        </div>
        <div className="nav-item">
          <span className="label-icon pink"></span>
          <span className="label">Design</span>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: calc(100vh - 64px);
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .user-info {
          padding: 0 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .login-link {
          font-size: 0.9rem;
          color: var(--foreground);
          opacity: 0.8;
          cursor: pointer;
        }

        .admin-text {
          font-size: 0.85rem;
          color: var(--foreground);
          line-height: 1.4;
        }

        .highlight {
          color: var(--primary);
          font-weight: 500;
        }

        .compose-wrapper {
          padding: 0 1rem 1rem 1rem;
        }

        .compose-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #c2e7ff;
          color: #001d35;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 16px;
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: box-shadow 0.2s, background 0.2s;
        }

        .compose-btn:hover {
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15);
          background: #b3d7ef; 
        }

        .nav-list {
          display: flex;
          flex-direction: column;
          padding-right: 1rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem 0.5rem 1.5rem;
          cursor: pointer;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          color: var(--foreground);
          opacity: 0.8;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.08);
          opacity: 1;
        }

        .nav-item.active {
          background: rgba(59, 130, 246, 0.25); /* Primary color low opacity */
          color: var(--primary);
          opacity: 1;
          font-weight: 700;
        }

        .icon {
          margin-right: 1rem;
        }

        .label {
          flex: 1;
        }

        .count {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .labels-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .labels-section h3 {
          padding-left: 1.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          opacity: 0.6;
        }

        .label-icon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 1.25rem;
        }
        
        .blue { background: #3b82f6; }
        .pink { background: #ec4899; }
      `}</style>
    </aside>
  );
}
