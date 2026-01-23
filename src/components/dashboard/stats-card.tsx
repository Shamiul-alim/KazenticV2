import { cn } from "@/lib/utils"

type Stat = {
    value: string
    label: string
    color?: string
}

export function StatsCard({
    title,
    icon,
    left,
    right,
}: {
    title: string
    icon?: React.ReactNode
    left: Stat
    right?: Stat
}) {
    return (
        <div className="rounded-xl border border-border bg-background p-4">
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                    {title}
                </p>
                {icon}
            </div>

            {/* Content */}
            <div
                className={cn(
                    "grid text-left",
                    right ? "grid-cols-2 divide-x divide-border" : "grid-cols-1"
                )}
            >
                {/* Left */}
                <div className="space-y-1 pr-3">
                    <p className={cn("text-sm font-medium", left.color)}>
                        {left.value}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">
                        {left.label}
                    </p>
                </div>

                {/* Right */}
                {right && (
                    <div className="space-y-1 pl-3">
                        <p className={cn("text-sm font-medium", right.color)}>
                            {right.value}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground">
                            {right.label}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
