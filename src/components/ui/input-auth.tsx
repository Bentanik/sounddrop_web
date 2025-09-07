"use client";

import * as React from "react";

type InputAuthProps = React.InputHTMLAttributes<HTMLInputElement> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
};

export function InputAuth({
    leftIcon,
    rightIcon,
    onRightIconClick,
    className,
    type = "text",
    ...props
}: InputAuthProps) {
    return (
        <div className="relative group">
            {leftIcon ? (
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                    {leftIcon}
                </div>
            ) : null}
            <input
                type={type}
                className={[
                    "w-full h-12 rounded-xl px-4 text-base outline-none transition-all duration-200",
                    leftIcon ? "pl-12" : "",
                    rightIcon ? "pr-12" : "",
                    "bg-white/5 border border-white/10 text-white placeholder:text-white/60",
                    "focus:border-white/30 focus:bg-white/10",
                    className || "",
                ].join(" ")}
                {...props}
            />
            {rightIcon ? (
                <button
                    type="button"
                    onClick={onRightIconClick}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                >
                    {rightIcon}
                </button>
            ) : null}
        </div>
    );
}


