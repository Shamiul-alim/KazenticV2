import * as React from "react"

import { cn } from "@/lib/utils"

type Grid5OutlinedIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const Grid5OutlinedIcon = React.forwardRef<SVGSVGElement, Grid5OutlinedIconProps>(
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
                d="M5.99967 14.6667H9.99967C13.333 14.6667 14.6663 13.3334 14.6663 10V6.00004C14.6663 2.66671 13.333 1.33337 9.99967 1.33337H5.99967C2.66634 1.33337 1.33301 2.66671 1.33301 6.00004V10C1.33301 13.3334 2.66634 14.6667 5.99967 14.6667Z"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66699 1.33337V14.6667"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66699 8H14.667"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
)

Grid5OutlinedIcon.displayName = "Grid5OutlinedIcon"
export default Grid5OutlinedIcon
