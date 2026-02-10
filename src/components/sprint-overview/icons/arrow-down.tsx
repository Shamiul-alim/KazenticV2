import React from 'react'

interface ArrowDownIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function ArrowDownIcon(props: ArrowDownIconProps) {
    return (
        <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9334 6.81689L9.7417 6.81689L5.0667 6.81689C4.2667 6.81689 3.8667 7.78356 4.43337 8.35023L8.75003 12.6669C9.4417 13.3586 10.5667 13.3586 11.2584 12.6669L12.9 11.0252L15.575 8.35023C16.1334 7.78356 15.7334 6.81689 14.9334 6.81689Z" fill="currentColor" />
        </svg>

    )
}
