import * as React from "react"
import { cn } from "@/lib/utils"

type ArrowLeftIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const ArrowLeftIcon = React.forwardRef<SVGSVGElement, ArrowLeftIconProps>(
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
                d="M12 7.99995V9.77995C12 11.9866 10.4333 12.8933 8.52001 11.7866L6.98001 10.8933L5.44 9.99995C3.52667 8.89329 3.52667 7.08662 5.44 5.97995L6.98001 5.08662L8.52001 4.19329C10.4333 3.10662 12 4.00662 12 6.21995V7.99995Z"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
)

ArrowLeftIcon.displayName = "ArrowLeftIcon"
export default ArrowLeftIcon