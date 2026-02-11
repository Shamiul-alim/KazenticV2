import { cn } from "@/lib/utils"

interface ProgressRingProps extends React.SVGProps<SVGSVGElement> {
    value: number
    color?: string
    strokeWidth?: number
}

export function ProgressRing({ value, className, color, strokeWidth = 3, ...props }: ProgressRingProps) {
    const radius = 14
    const stroke = strokeWidth
    const normalizedRadius = radius - stroke * 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset =
        circumference - (value / 100) * circumference

    return (
        <svg height={32} width={32} className={
            cn("text-primary", className)
        } style={{ color }} {...props}>
            <circle
                stroke="currentColor"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset: 0 }}
                r={normalizedRadius}
                cx={16}
                cy={16}
                className="opacity-20"
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
