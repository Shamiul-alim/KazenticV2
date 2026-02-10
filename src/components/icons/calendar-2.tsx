import React from 'react'

interface Calendar2IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function Calendar2Icon({ className, ...props }: Calendar2IconProps) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M9.3335 1.16675L9.3335 2.91675"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.6665 1.16675L4.6665 2.91675"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.9585 5.30249L2.04183 5.30249"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.75 4.95842L1.75 9.91675C1.75 11.6667 2.625 12.8334 4.66667 12.8334L9.33333 12.8334C11.375 12.8334 12.25 11.6667 12.25 9.91675L12.25 4.95841C12.25 3.20841 11.375 2.04175 9.33333 2.04175L4.66667 2.04175C2.625 2.04175 1.75 3.20842 1.75 4.95842Z"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.00255 7.99162L6.99731 7.99162"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.16173 7.99162L9.15649 7.99162"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.16173 9.74162L9.15649 9.74162"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}