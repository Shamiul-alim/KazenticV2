import React from 'react'

export default function BrokenStatusIcon({ className }: { className?: string }) {
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.6333 9.97998C2.34663 12.2733 4.26664 14.04 6.65331 14.5266Z" fill="currentColor" />
            <path d="M1.6333 9.97998C2.34663 12.2733 4.26664 14.04 6.65331 14.5266" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.3667 7.31992C1.7067 3.95325 4.5467 1.33325 8.00003 1.33325C11.4534 1.33325 14.2934 3.95992 14.6334 7.31992" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.33997 14.5334C11.72 14.0468 13.6333 12.3001 14.36 10.0134Z" fill="currentColor" />
            <path d="M9.33997 14.5334C11.72 14.0468 13.6333 12.3001 14.36 10.0134" stroke="currentColor" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
