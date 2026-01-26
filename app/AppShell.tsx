"use client";

import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ComposeContainer from "./components/ComposeContainer";
import { MailProvider } from "./context/MailContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname.startsWith("/admin");

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
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
    );
}
