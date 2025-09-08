"use client";

import PopupProvider from "@/providers/popup-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { StoreProvider } from "@/providers/redux-provider";
import { NotificationWidget } from "@/components/widgets/notification-widget";


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
                <NotificationWidget />
            </ReactQueryProvider>
        </StoreProvider>
    );
}