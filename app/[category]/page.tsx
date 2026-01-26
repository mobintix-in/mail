"use client";

import { use, useEffect, useState } from "react";
import EmailList from "../components/EmailList";
import { getEmails, Email } from "../../lib/data";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Unwrap params using use() hook for Next 15+
  const resolvedParams = use(params);
  const category = resolvedParams.category;

  // Basic capitalization
  const title = category.charAt(0).toUpperCase() + category.slice(1);

  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    getEmails(category).then(setEmails);
  }, [category]);

  return (
    <>
      <EmailList title={title} emails={emails} />
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
