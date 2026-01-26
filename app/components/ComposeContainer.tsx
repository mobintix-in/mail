"use client";

import { useMail } from "../context/MailContext";
import ComposeMail from "./ComposeMail";

export default function ComposeContainer() {
    const { isComposeOpen, setIsComposeOpen } = useMail();

    return (
        <ComposeMail
            isOpen={isComposeOpen}
            onClose={() => setIsComposeOpen(false)}
        />
    );
}
