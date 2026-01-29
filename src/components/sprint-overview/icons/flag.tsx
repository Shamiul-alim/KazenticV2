import React from 'react'

export default function FlagIcon({ className }: { className?: string }) {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.29999 1.33325V14.6666" stroke="#DC2626" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.63336 2.66675L10.0334 5.00008C12.2334 5.93341 12.2334 7.53341 10.1667 8.60008L4.63336 11.3334" fill="#DC2626" />
            <path d="M4.63336 2.66675L10.0334 5.00008C12.2334 5.93341 12.2334 7.53341 10.1667 8.60008L4.63336 11.3334" stroke="#DC2626" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
