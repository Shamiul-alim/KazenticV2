import React from 'react'

interface ClipboardTextIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function ClipboardTextIcon(props: ClipboardTextIconProps) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M5.3335 8.1333H10.0002" stroke="#697588" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.3335 10.8H8.2535" stroke="#697588" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.66683 3.99992H9.3335C10.6668 3.99992 10.6668 3.33325 10.6668 2.66659C10.6668 1.33325 10.0002 1.33325 9.3335 1.33325H6.66683C6.00016 1.33325 5.3335 1.33325 5.3335 2.66659C5.3335 3.99992 6.00016 3.99992 6.66683 3.99992Z" stroke="#697588" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.6667 2.67993C12.8867 2.79993 14 3.61993 14 6.6666V10.6666C14 13.3333 13.3333 14.6666 10 14.6666H6C2.66667 14.6666 2 13.3333 2 10.6666V6.6666C2 3.6266 3.11333 2.79993 5.33333 2.67993" stroke="#697588" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
