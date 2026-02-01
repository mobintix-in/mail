import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "./AppShell";

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var rgb = localStorage.getItem('theme-rgb');
                  if (rgb) {
                    document.documentElement.style.setProperty('--primary-rgb', rgb);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
