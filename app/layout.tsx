import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ComposeContainer from "./components/ComposeContainer";
import { MailProvider } from "./context/MailContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Mail",
  description: "A premium mail app for custom domains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MailProvider>
          <div className="app-container h-screen flex flex-col overflow-hidden">
            <Header />
            <div className="main-body flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="content-area flex-1 relative overflow-hidden bg-black/20">
                {children}
              </main>
            </div>
            <ComposeContainer />
          </div>
        </MailProvider>
      </body>
    </html>
  );
}
