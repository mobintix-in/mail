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
                <div className="no-print">
                    <Header />
                </div>
                <div className="main-body flex flex-1 overflow-hidden">
                    <div className="no-print">
                        <Sidebar />
                    </div>
                    <main className="content-area flex-1 relative overflow-hidden bg-black/20">
                        {children}
                    </main>
                </div>
                <div className="no-print">
                    <ComposeContainer />
                </div>
            </div>
        </MailProvider>
    );
}
