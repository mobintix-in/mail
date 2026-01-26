"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
                <AlertCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
            <p className="text-white/40 mb-8 max-w-md">
                We encountered an error while loading your mail. This might be a temporary connection issue.
            </p>
            <button
                onClick={() => reset()}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20"
            >
                <RefreshCw size={18} />
                <span>Try Again</span>
            </button>
        </div>
    );
}
