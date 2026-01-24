export function ProgressRing({ value, className, color }: { value: number, className?: string, color?: string }) {
    const radius = 14
    const stroke = 3
    const normalizedRadius = radius - stroke * 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset =
        circumference - (value / 100) * circumference

    return (
        <svg height={32} width={32} className={className}>
            <circle
                stroke="currentColor"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={16}
                cy={16}
                className="opacity-30"
            />
            <circle
                stroke="currentColor"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={16}
                cy={16}
            />
        </svg>
    )
}
