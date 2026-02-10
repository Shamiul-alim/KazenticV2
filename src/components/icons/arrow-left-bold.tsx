import React from 'react'

interface ArrowLeftBoldIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function ArrowLeftBoldIcon({ className, ...props }: ArrowLeftBoldIconProps) {
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
                d="M10.5469 4.05326L10.5469 8.20659L10.5469 11.9466C10.5469 12.5866 9.77354 12.9066 9.32021 12.4533L5.86688 8.99992C5.31354 8.44659 5.31354 7.54659 5.86688 6.99326L7.18021 5.67992L9.32021 3.53992C9.77354 3.09326 10.5469 3.41326 10.5469 4.05326Z"
                fill="currentColor"
            />
        </svg>
    )
}