import React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-primary text-white hover:bg-primary-dark": variant === "default",
                        "bg-secondary text-white hover:bg-secondary-dark": variant === "secondary",
                        "bg-accent text-white hover:bg-accent-dark": variant === "accent",
                        "border border-primary text-primary hover:bg-highlight/50": variant === "outline",
                        "hover:bg-highlight hover:text-primary": variant === "ghost",
                        "text-primary underline-offset-4 hover:underline": variant === "link",
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded-md px-3": size === "sm",
                        "h-11 rounded-md px-8": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
