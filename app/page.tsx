"use client";

import { useEffect, useState } from "react";
import EmailList from "./components/EmailList";
import { getEmails, Email } from "../lib/data";

export default function Home() {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    getEmails("inbox").then(setEmails);
  }, []);

  return (
    <>
      <EmailList title="Inbox" emails={emails} />
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

