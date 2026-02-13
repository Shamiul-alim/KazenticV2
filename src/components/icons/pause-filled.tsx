import * as React from "react"

import { cn } from "@/lib/utils"

type PauseFilledIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const PauseFilledIcon = React.forwardRef<SVGSVGElement, PauseFilledIconProps>(
    ({ size = 10, className, ...props }, ref) => (
        <svg
            ref={ref}
            width={size}
            height={size}
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("shrink-0", className)}
            {...props}
        >
            <path
                d="M2.50195 7.91634H4.16862V2.08301H2.50195V7.91634ZM5.83529 2.08301V7.91634H7.50195V2.08301H5.83529Z"
                fill="currentColor"
            />
        </svg>
    )
)

PauseFilledIcon.displayName = "PauseFilledIcon"
export default PauseFilledIcon
