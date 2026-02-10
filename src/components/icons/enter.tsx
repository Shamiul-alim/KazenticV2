interface EnterIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function EnterIcon({ className, ...props }: EnterIconProps) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path d="M13.3336 2.66699V8.66699C13.3336 9.37424 13.0527 10.0525 12.5526 10.5526C12.0525 11.0527 11.3742 11.3337 10.667 11.3337H4.60962L6.27628 13.0003L5.33362 13.943L2.05762 10.667L5.33362 7.39099L6.27628 8.33366L4.60962 10.0003H10.667C11.0206 10.0003 11.3597 9.85985 11.6098 9.6098C11.8598 9.35975 12.0003 9.02061 12.0003 8.66699V2.66699H13.3336Z" fill="white" />
        </svg>

    )
}
