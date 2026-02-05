import React from 'react'

interface ArrowRightBoldIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function ArrowRightBoldIcon({ className, ...props }: ArrowRightBoldIconProps) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M5.45313 4.05326L5.45313 8.20659L5.45313 11.9466C5.45313 12.5866 6.22646 12.9066 6.67979 12.4533L10.1331 8.99992C10.6865 8.44659 10.6865 7.54659 10.1331 6.99326L8.81979 5.67993L6.67979 3.53992C6.22646 3.09326 5.45313 3.41326 5.45313 4.05326Z"
                fill="currentColor"
            />
        </svg>
    )
}