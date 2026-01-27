type SummaryCardProps = {
    icon: React.ReactNode
    label: string
    value: number | string
    className?: string,
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
        <div className={cn("flex items-center gap-4 rounded-xl border border-border bg-background px-4 py-3", className)}>
            {/* Icon */}
            <div
                className={cn(
                    "flex p-3 items-center justify-center rounded-lg border",
                    iconClassName
                )}
            >
                {icon}
            </div>

            {/* Content */}
            <div className="space-y-0.5">
                <p className="font-medium text-foreground">
                    {label}
                </p>
                <p className="font-medium text-muted-foreground">
                    {value}
                </p>
            </div>
        </div>
    )
}
