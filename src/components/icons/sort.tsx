import * as React from "react"
import { cn } from "@/lib/utils"

type SortIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const SortIcon = React.forwardRef<SVGSVGElement, SortIconProps>(
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
                d="M2 4.66663H14"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
            />
            <path
                d="M4 8H12"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
            />
            <path
                d="M6.66663 11.3334H9.33329"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
            />
        </svg>
    )
)

SortIcon.displayName = "SortIcon"
export default SortIcon