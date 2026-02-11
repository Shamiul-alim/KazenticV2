import * as React from "react"
import { cn } from "@/lib/utils"

type PinIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
}

const PinIcon = React.forwardRef<SVGSVGElement, PinIconProps>(
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
        d="M2 14L5.08667 10.9127M5.09 10.9093L3.23667 9.05599C2.60067 8.42066 3.24067 7.05866 4.11 7.00399C4.89533 6.95399 6.71333 7.23866 7.318 6.63399L8.978 4.97399C9.38933 4.56199 9.128 3.64066 9.10133 3.13266C9.06267 2.45533 10.14 1.61866 10.7113 2.18999L13.8093 5.28866C14.3827 5.86066 13.5427 6.93466 12.8673 6.89866C12.3593 6.87199 11.4373 6.61066 11.0253 7.02199L9.36533 8.68199C8.76133 9.28666 9.04533 11.104 8.996 11.8893C8.94133 12.7593 7.57933 13.3993 6.94267 12.7627L5.09 10.9093Z"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
)

PinIcon.displayName = "PinIcon"
export default PinIcon