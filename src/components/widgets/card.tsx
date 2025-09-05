import * as React from "react"

import { cn } from "@/lib/utils"

function BaseCard({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="widget-card"
            className={cn(
                "bg-card text-card-foreground rounded-lg p-3 gap-3 flex flex-col transition-colors",
                className
            )}
            {...props}
        />
    )
}

export default function WidgetCard(props: React.ComponentProps<"div">) {
    return <BaseCard {...props} />
}

export function WidgetCardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="widget-card-content"
            className={cn("px-0", className)}
            {...props}
        />
    )
}

export function WidgetCardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="widget-card-header"
            className={cn("px-0", className)}
            {...props}
        />
    )
}

export function WidgetCardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="widget-card-title"
            className={cn("text-base font-semibold leading-tight", className)}
            {...props}
        />
    )
}


