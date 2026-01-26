"use client";

import { useEffect, useState } from "react";
import EmailList from "./components/EmailList";
import { getEmails, Email } from "../lib/data";
import { useMail } from "./context/MailContext";

export default function Home() {
  const { selectedAccount, selectedCategory } = useMail();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEmails(selectedCategory, selectedAccount.email)
      .then(setEmails)
      .finally(() => setLoading(false));
  }, [selectedCategory, selectedAccount]);

  return (
    <div className="h-full">
      <EmailList emails={emails} isLoading={loading} />
    </div>
  );
}
