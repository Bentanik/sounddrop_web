"use client";

import PopupProvider from "@/providers/popup-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { StoreProvider } from "@/providers/redux-provider";


export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <ReactQueryProvider>
                {children}
                <PopupProvider />
            </ReactQueryProvider>
        </StoreProvider>
    );
}