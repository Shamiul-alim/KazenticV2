type Props = {
    value: number
    label: string
    color?: "blue" | "green" | "orange" | "red" | "purple"
}

const colorStyles = {
    blue: "text-blue-600",
    green: "text-emerald-600",
    orange: "text-orange-500",
    red: "text-red-500",
    purple: "text-purple-600"
}

export function StatItem({ value, label, color = "blue" }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <span className={`text-sm font-semibold ${colorStyles[color]}`}>
                {value}
            </span>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    )
}
