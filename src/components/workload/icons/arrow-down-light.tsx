import React from 'react'

interface ArrowDownLightProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function ArrowDownLight({ className, ...props }: ArrowDownLightProps) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M4.24266 6.06056L7.27297 9.09087L10.3033 6.06056"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}