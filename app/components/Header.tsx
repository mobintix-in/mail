"use client";

import { Search, Menu, Settings, HelpCircle, Bell, User, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { useMail } from "../context/MailContext";
import { ACCOUNTS } from "../../lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export default function Header() {
  const { selectedAccount, setSelectedAccount } = useMail();
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);

  return (
    <header className="h-16 flex items-center justify-between px-4 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-4 min-w-[240px]">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            M
          </div>
          <span className="text-xl font-bold tracking-tight">Mail</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative group focus-within:scale-[1.01] transition-transform">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search mail"
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-2.5 pl-11 pr-4 outline-none focus:bg-white/10 focus:border-primary/50 transition-all text-[0.95rem]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
          <HelpCircle size={22} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
          <Settings size={22} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
          <Bell size={22} />
        </button>

        <div className="relative ml-2">
          <button
            onClick={() => setShowAccountSwitcher(!showAccountSwitcher)}
            className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full hover:bg-white/10 transition-colors border border-white/5"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-inner"
              style={{ backgroundColor: selectedAccount.color }}
            >
              {selectedAccount.name[0]}
            </div>
            <span className="text-sm font-medium hidden md:block">{selectedAccount.email}</span>
            <ChevronDown size={14} className={cn("transition-transform", showAccountSwitcher && "rotate-180")} />
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
