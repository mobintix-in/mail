"use client";

import { Search, Menu, Settings, HelpCircle, Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="header glass-panel">
      <div className="left-section">
        <button className="icon-btn">
          <Menu size={24} />
        </button>
        <div className="logo">
          <span className="logo-icon">M</span>
          <span className="logo-text">ail</span>
        </div>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <button className="search-btn">
            <Search size={20} />
          </button>
          <input type="text" placeholder="Search mail" />
        </div>
      </div>

      <div className="right-section">
        <button className="icon-btn">
          <HelpCircle size={22} />
        </button>
        <button className="icon-btn">
          <Settings size={22} />
        </button>
        <button className="icon-btn">
          <Bell size={22} />
        </button>
        <div className="avatar">
          <User size={20} />
        </div>
      </div>

      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1rem;
          height: 64px;
          position: sticky;
          top: 0;
          z-index: 50;
          border-radius: 0;
          border-left: none;
          border-right: none;
          border-top: none;
          background: rgba(10, 10, 10, 0.7); /* Slightly more opaque */
        }

        .left-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 240px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 1.4rem;
          color: var(--foreground);
          cursor: pointer;
        }

        .logo-icon {
          color: var(--primary);
          font-weight: bold;
          font-size: 1.6rem;
        }

        .search-section {
          flex: 1;
          max-width: 720px;
          margin: 0 2rem;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 0.5rem 1rem;
          transition: background 0.2s, box-shadow 0.2s;
        }

        .search-bar:focus-within {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 0 0 2px rgba(255,255,255,0.05);
        }

        .search-bar input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--foreground);
          width: 100%;
          margin-left: 0.5rem;
          font-size: 1rem;
          font-family: inherit;
        }
        
        .search-bar input::placeholder {
          color: rgba(237, 237, 237, 0.5);
        }

        .search-btn {
          background: none;
          border: none;
          color: rgba(237, 237, 237, 0.6);
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .icon-btn {
          background: none;
          border: none;
          color: var(--foreground);
          opacity: 0.7;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          opacity: 1;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.5rem;
          cursor: pointer;
        }
      `}</style>
    </header>
  );
}
