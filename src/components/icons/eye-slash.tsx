import * as React from "react"
import { cn } from "@/lib/utils"

type EyeSlashIconProps = React.SVGProps<SVGSVGElement> & {
    size?: number
}

const EyeSlashIcon = React.forwardRef<SVGSVGElement, EyeSlashIconProps>(
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
                d="M9.68661 6.31328L6.31328 9.68661C5.87995 9.25328 5.61328 8.65995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C8.65995 5.61328 9.25328 5.87995 9.68661 6.31328Z"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.88 3.84669C10.7134 2.96669 9.38002 2.48669 8.00002 2.48669C5.64668 2.48669 3.45335 3.87336 1.92668 6.27336C1.32668 7.21336 1.32668 8.79336 1.92668 9.73336C2.45335 10.56 3.06668 11.2734 3.73335 11.8467"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.61328 13.02C6.37328 13.34 7.17995 13.5133 7.99995 13.5133C10.3533 13.5133 12.5466 12.1266 14.0733 9.72662C14.6733 8.78662 14.6733 7.20662 14.0733 6.26662C13.8533 5.91995 13.6133 5.59329 13.3666 5.28662"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.34 8.46667C10.1666 9.40667 9.39996 10.1733 8.45996 10.3467"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.31337 9.68665L1.33337 14.6666"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6666 1.33337L9.68665 6.31337"
                stroke="currentColor"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
)

EyeSlashIcon.displayName = "EyeSlashIcon"
export default EyeSlashIcon