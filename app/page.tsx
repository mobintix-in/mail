"use client";

import EmailList from "./components/EmailList";

export default function Home() {
  return (
    <>
      <EmailList title="Inbox" />
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
