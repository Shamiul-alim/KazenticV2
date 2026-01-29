import React from 'react'

export default function CheckedBoxIcon({ className }: { className?: string }) {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="5.4" fill="#4157FE" />
            <path d="M4.80078 7.86361L7.06478 10.1276L11.6008 5.59961" stroke="white" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
