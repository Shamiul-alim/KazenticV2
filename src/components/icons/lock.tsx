interface LockIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function LockIcon({ className, ...props }: LockIconProps) {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path d="M3 5V4C3 2.345 3.5 1 6 1C8.5 1 9 2.345 9 4V5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 11H3.5C1.5 11 1 10.5 1 8.5V7.5C1 5.5 1.5 5 3.5 5H8.5C10.5 5 11 5.5 11 7.5V8.5C11 10.5 10.5 11 8.5 11Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.99823 8H8.00272" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.99725 8H6.00174" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.99725 8H4.00174" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
