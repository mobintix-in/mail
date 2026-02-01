"use client";

import { use, useEffect, useState } from "react";
import EmailList from "../components/EmailList";
import EmailDetail from "../components/EmailDetail";
import { Email } from "../../lib/data";
import { useMail } from "../context/MailContext";
import { AnimatePresence } from "framer-motion";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const category = resolvedParams.category;

  const { selectedAccount, setSelectedCategory, searchQuery, emails: contextEmails, selectedEmail } = useMail();
  const [loading, setLoading] = useState(true);

  // Sync the context state with the URL category for components that rely on context
  useEffect(() => {
    setSelectedCategory(category);
  }, [category, setSelectedCategory]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter emails based on category/account/search
  const filteredEmails = contextEmails.filter(email => {
    // 1. Account Filter
    if (email.account !== selectedAccount.email) return false;

    // 2. Category/Label Filter
    const normalizedCategory = category.toLowerCase();
    let matchesCategory = false;

    if (normalizedCategory === 'starred') {
      matchesCategory = email.starred;
    } else if (normalizedCategory === 'inbox') {
      matchesCategory = email.category === 'inbox';
    } else {
      matchesCategory = email.category === normalizedCategory || email.labels.includes(normalizedCategory);
    }

    if (!matchesCategory) return false;

    // 3. Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        email.subject.toLowerCase().includes(query) ||
        email.sender.toLowerCase().includes(query) ||
        email.snippet.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <div className="h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {selectedEmail ? (
          <EmailDetail key="detail" />
        ) : (
          <EmailList
            key="list"
            emails={filteredEmails}
            isLoading={loading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

