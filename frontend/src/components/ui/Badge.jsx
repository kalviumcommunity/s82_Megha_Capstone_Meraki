import React from "react"
import { cn } from "../../lib/utils"

function Badge({ className, variant = "default", ...props }) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                {
                    "border-transparent bg-primary text-white": variant === "default",
                    "border-transparent bg-secondary text-white": variant === "secondary",
                    "border-transparent bg-accent text-white": variant === "accent",
                    "text-slate-900 border-slate-200": variant === "outline",
                    "border-transparent bg-green-500 text-white": variant === "success",
                    "border-transparent bg-yellow-500 text-white": variant === "warning",
                },
                className
            )}
            {...props}
        />
    )
}

export { Badge }
