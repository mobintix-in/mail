"use client";

import { use, useEffect, useState } from "react";
import EmailList from "../components/EmailList";
import { getEmails, Email } from "../../lib/data";
import { useMail } from "../context/MailContext";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const category = resolvedParams.category;

  const { selectedAccount, setSelectedCategory } = useMail();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync the context state with the URL category for components that rely on context
  useEffect(() => {
    setSelectedCategory(category);
  }, [category, setSelectedCategory]);

  useEffect(() => {
    setLoading(true);
    getEmails(category, selectedAccount.email)
      .then(setEmails)
      .finally(() => setLoading(false));
  }, [category, selectedAccount]);

  return (
    <div className="h-full overflow-hidden">
      <EmailList emails={emails} isLoading={loading} />
    </div>
  );
}
