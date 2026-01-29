"use client";

import { Search, Menu, Settings, HelpCircle, Bell, User, ChevronDown, Check, X, LogOut, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useMail } from "../context/MailContext";
import { ACCOUNTS } from "../../lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export default function Header() {
  const { selectedAccount, setSelectedAccount, isSidebarOpen, setIsSidebarOpen } = useMail();
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleLogout = () => {
    // Clear mock session cookie
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/login";
  };

  return (
    <header className="h-16 grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_minmax(auto,42rem)_1fr] items-center px-2 md:px-4 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 gap-2 md:gap-4">
      {/* Left section: Menu & Logo */}
      <div className={cn(
        "flex items-center gap-2 md:gap-4 justify-self-start",
        isSearchExpanded && "hidden sm:flex"
      )}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            M
          </div>
          <span className="text-xl font-bold tracking-tight hidden xs:block">Mail</span>
        </div>
      </div>

      {/* Center section: Search */}
      <div className={cn(
        "w-full transition-all duration-300",
        isSearchExpanded ? "absolute inset-x-0 px-4 z-50 bg-background h-16 flex items-center" : "relative col-span-1"
      )}>
        <div className="relative group w-full max-w-2xl mx-auto">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search mail"
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={() => setTimeout(() => setIsSearchExpanded(false), 200)}
            className={cn(
              "w-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-full py-3 pl-12 pr-28 outline-none transition-all duration-300 text-[0.95rem] placeholder:text-white/40 shadow-inner",
              "focus:bg-white/10 focus:border-primary/30 focus:ring-1 focus:ring-primary/20",
            )}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {!isSearchExpanded ? (
              <>
                <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/50 font-mono font-medium">
                  <span className="text-xs">⌘</span>K
                </div>
                <button className="p-1.5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                  <SlidersHorizontal size={16} />
                </button>
              </>
            ) : (
              <button
                className="p-1.5 hover:bg-white/10 rounded-full text-white/50 hover:text-white"
                onClick={() => setIsSearchExpanded(false)}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right section: Icons & Account */}
      <div className={cn(
        "flex items-center gap-1 md:gap-2 justify-self-end",
        isSearchExpanded && "hidden sm:flex"
      )}>
        <div className="hidden lg:flex items-center gap-1">
          <button className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
            <HelpCircle size={22} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
            <Settings size={22} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
            <Bell size={22} />
          </button>
        </div>

        <div className="relative ml-1 md:ml-2">
          <button
            onClick={() => setShowAccountSwitcher(!showAccountSwitcher)}
            className="flex items-center gap-2 p-1 md:pr-3 rounded-full hover:bg-white/10 transition-colors border border-white/5"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-inner flex-shrink-0"
              style={{ backgroundColor: selectedAccount.color }}
            >
              {selectedAccount.name[0]}
            </div>
            <span className="text-sm font-medium hidden md:block max-w-[120px] truncate">
              {selectedAccount.email.split('@')[0]}
            </span>
            <ChevronDown size={14} className={cn("transition-transform hidden xs:block", showAccountSwitcher && "rotate-180")} />
          </button>

          <AnimatePresence>
            {showAccountSwitcher && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-2 w-72 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-[100] backdrop-blur-xl"
              >
                <div className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Switch Account
                </div>
                {ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => {
                      setSelectedAccount(account);
                      setShowAccountSwitcher(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all mb-1 last:mb-0",
                      selectedAccount.email === account.email && "bg-white/5"
                    )}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
                      style={{ backgroundColor: account.color }}
                    >
                      {account.name[0]}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold">{account.name}</div>
                      <div className="text-xs text-white/60">{account.email}</div>
                    </div>
                    {selectedAccount.email === account.email && (
                      <Check size={16} className="text-primary" />
                    )}
                  </button>
                ))}

                <div className="h-px bg-white/5 my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all font-semibold text-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <LogOut size={18} />
                  </div>
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
