import React from 'react'

interface Folder2IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function Folder2Icon({ className, ...props }: Folder2IconProps) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path d="M14.6663 7.33334V11.3333C14.6663 14 13.9997 14.6667 11.333 14.6667H4.66634C1.99967 14.6667 1.33301 14 1.33301 11.3333V4.66667C1.33301 2 1.99967 1.33334 4.66634 1.33334H5.66634C6.66634 1.33334 6.88634 1.62667 7.26634 2.13334L8.26634 3.46667C8.51967 3.8 8.66634 4 9.33301 4H11.333C13.9997 4 14.6663 4.66667 14.6663 7.33334Z" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" />
            <path d="M5.33301 1.33334H11.333C12.6663 1.33334 13.333 2 13.333 3.33334V4.25334" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
