import * as React from "react"

import { cn } from "@/lib/utils"

type ClockIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const ClockIcon = React.forwardRef<SVGSVGElement, ClockIconProps>(
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
                d="M14.6673 8.00004C14.6673 11.68 11.6807 14.6667 8.00065 14.6667C4.32065 14.6667 1.33398 11.68 1.33398 8.00004C1.33398 4.32004 4.32065 1.33337 8.00065 1.33337C11.6807 1.33337 14.6673 4.32004 14.6673 8.00004Z"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.4739 10.12L8.40724 8.88671C8.04724 8.67338 7.75391 8.16005 7.75391 7.74005V5.00671"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
)

ClockIcon.displayName = "ClockIcon"
export default ClockIcon
