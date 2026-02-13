import * as React from "react"

import { cn } from "@/lib/utils"

type ArrowUpRightIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const ArrowUpRightIcon = React.forwardRef<SVGSVGElement, ArrowUpRightIconProps>(
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
                d="M3.33333 12.6667L12 4M12 4V12.32M12 4H3.68"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
)

ArrowUpRightIcon.displayName = "ArrowUpRightIcon"
export default ArrowUpRightIcon
