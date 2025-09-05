"use client";

import { useEffect, useState } from "react";
import { AuthPopup } from "@/components/widgets";
import GenericPopup from "@/components/ui/generic-popup";

export default function PopupProvider() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthPopup />
            <GenericPopup />
        </>
    );
}
