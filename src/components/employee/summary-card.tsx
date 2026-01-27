type SummaryCardProps = {
    icon: React.ReactNode
    label: string
    value: number | string
    className?: string
    iconClassName?: string
}

import { cn } from "@/lib/utils"

export function SummaryCard({
    icon,
    label,
    value,
    className,
    iconClassName
}: SummaryCardProps) {
    return (
        <div className={cn("flex items-center gap-3 sm:gap-4 rounded-xl border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3", className)}>
            {/* Icon */}
            <div
                className={cn(
                    "flex p-2 sm:p-3 items-center justify-center rounded-lg border shrink-0",
                    iconClassName
                )}
            >
                {icon}
            </div>

            {/* Content */}
            <div className="space-y-0.5 min-w-0 flex-1">
                <p className="font-medium text-foreground text-xs truncate">
                    {label}
                </p>
                <p className="font-medium text-muted-foreground text-xs truncate">
                    {value}
                </p>
            </div>
        </div>
    )
}
