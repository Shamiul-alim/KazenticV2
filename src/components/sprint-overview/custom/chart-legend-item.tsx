export function LegendItem({
    color,
    label,
}: {
    color: string
    label: string
}) {
    return (
        <div className="flex items-center gap-1.5 sm:gap-2">
            <span
                className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full shrink-0"
                style={{ backgroundColor: color }}
            />
            <span className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">{label}</span>
        </div>
    )
}
