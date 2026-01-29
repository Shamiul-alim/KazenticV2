export function LegendItem({
    color,
    label,
}: {
    color: string
    label: string
}) {
    return (
        <div className="flex items-center gap-2">
            <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
            />
            <span className="text-muted-foreground">{label}</span>
        </div>
    )
}
