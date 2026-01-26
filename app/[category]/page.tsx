"use client";

import { use, useEffect, useState } from "react";
import EmailList from "../components/EmailList";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
    // In Next.js 15+, params is a Promise that needs to be unwrapped
    // We can use the React.use() hook to unwrap it
    const resolvedParams = use(params);

    // Basic capitalization
    const title = resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1);

    return (
        <>
            <EmailList title={title} />
            <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
        </>
    );
}
