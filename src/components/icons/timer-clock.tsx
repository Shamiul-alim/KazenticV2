import * as React from "react"

import { cn } from "@/lib/utils"

type TimerClockIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const TimerClockIcon = React.forwardRef<SVGSVGElement, TimerClockIconProps>(
    ({ size = 16, className, ...props }, ref) => (
        <svg
            ref={ref}
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("shrink-0", className)}
            {...props}
        >
            <path
                d="M13.8327 8.83333C13.8327 12.0533 11.2193 14.6667 7.99935 14.6667C4.77935 14.6667 2.16602 12.0533 2.16602 8.83333C2.16602 5.61333 4.77935 3 7.99935 3C11.2193 3 13.8327 5.61333 13.8327 8.83333Z"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 5.33337V8.66671"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 1.33337H10"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
)

TimerClockIcon.displayName = "TimerClockIcon"
export default TimerClockIcon
