import React from 'react'

interface BriefcaseIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function BriefcaseIcon({ className, ...props }: BriefcaseIconProps) {
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
                d="M5.33338 14.6667H10.6667C13.3467 14.6667 13.8267 13.5933 13.9667 12.2867L14.4667 6.95333C14.6467 5.32667 14.18 4 11.3334 4H4.66671C1.82005 4 1.35338 5.32667 1.53338 6.95333L2.03338 12.2867C2.17338 13.5933 2.65338 14.6667 5.33338 14.6667Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.3335 3.99992V3.46659C5.3335 2.28659 5.3335 1.33325 7.46683 1.33325H8.5335C10.6668 1.33325 10.6668 2.28659 10.6668 3.46659V3.99992"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.33317 8.66667V9.33333C9.33317 9.34 9.33317 9.34 9.33317 9.34667C9.33317 10.0733 9.3265 10.6667 7.99984 10.6667C6.67984 10.6667 6.6665 10.08 6.6665 9.35333V8.66667C6.6665 8 6.6665 8 7.33317 8H8.6665C9.33317 8 9.33317 8 9.33317 8.66667Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.4335 7.33325C12.8935 8.45325 11.1335 9.11992 9.3335 9.34659"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.74658 7.51343C3.24658 8.54009 4.93992 9.16009 6.66658 9.35343"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}