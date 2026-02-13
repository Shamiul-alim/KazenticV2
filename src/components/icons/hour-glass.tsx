import * as React from "react"

import { cn } from "@/lib/utils"

type HourGlassIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const HourGlassIcon = React.forwardRef<SVGSVGElement, HourGlassIconProps>(
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
                d="M10.1594 1.33337H5.83937C3.33271 1.33337 3.13937 3.58671 4.49271 4.81337L11.506 11.1867C12.8594 12.4134 12.666 14.6667 10.1594 14.6667H5.83937C3.33271 14.6667 3.13937 12.4134 4.49271 11.1867L11.506 4.81337C12.8594 3.58671 12.666 1.33337 10.1594 1.33337Z"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
)

HourGlassIcon.displayName = "HourGlassIcon"
export default HourGlassIcon
