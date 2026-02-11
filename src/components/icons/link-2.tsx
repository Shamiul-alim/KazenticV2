interface Link2Props extends React.SVGProps<SVGSVGElement> {
    className?: string
}
export default function Link2Icon({ className, ...props }: Link2Props) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path d="M8.70656 7.29333C10.2066 8.79334 10.2066 11.22 8.70656 12.7133C7.20656 14.2067 4.7799 14.2133 3.28656 12.7133C1.79323 11.2133 1.78656 8.78667 3.28656 7.29333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.06014 8.93998C5.50014 7.37998 5.50014 4.84665 7.06014 3.27998C8.62014 1.71332 11.1535 1.71998 12.7201 3.27998C14.2868 4.83998 14.2801 7.37332 12.7201 8.93998" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
