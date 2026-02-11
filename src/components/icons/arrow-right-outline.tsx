import * as React from "react"
import { cn } from "@/lib/utils"

type ArrowRightIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const ArrowRightIcon = React.forwardRef<SVGSVGElement, ArrowRightIconProps>(
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
                d="M3.99999 7.99995V9.77995C3.99999 11.9866 5.56666 12.8933 7.47999 11.7866L9.01999 10.8933L10.56 9.99995C12.4733 8.89329 12.4733 7.08662 10.56 5.97995L9.01999 5.08662L7.47999 4.19329C5.56666 3.10662 3.99999 4.00662 3.99999 6.21995V7.99995Z"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
)

ArrowRightIcon.displayName = "ArrowRightIcon"
export default ArrowRightIcon