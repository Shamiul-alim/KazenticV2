import * as React from "react"

import { cn } from "@/lib/utils"

type Grid5IconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const Grid5Icon = React.forwardRef<SVGSVGElement, Grid5IconProps>(
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
                d="M4.875 14.0296C3.95455 13.9706 3.26873 13.6646 2.80176 13.1976C2.28045 12.6762 1.95801 11.8822 1.95801 10.7933V5.20638C1.95806 4.11749 2.2804 3.32344 2.80176 2.80208C3.26875 2.33509 3.95451 2.02811 4.875 1.96908V14.0296Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1.25}
            />
            <path
                d="M10.793 1.95833C11.882 1.95833 12.6768 2.28068 13.1982 2.80208C13.7195 3.32345 14.0419 4.1176 14.042 5.20638V6.87533H7.125V1.95833H10.793Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1.25}
            />
            <path
                d="M14.042 9.125V10.793C14.042 11.882 13.7196 12.6768 13.1982 13.1982C12.6768 13.7196 11.882 14.042 10.793 14.042H7.125V9.125H14.042Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1.25}
            />
        </svg>
    )
)

Grid5Icon.displayName = "Grid5Icon"
export default Grid5Icon
