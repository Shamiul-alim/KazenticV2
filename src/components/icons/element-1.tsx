interface Element1IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function Element1Icon({ className, ...props }: Element1IconProps) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
            <path d="M7.00016 13.2666V2.73331C7.00016 1.73331 6.5735 1.33331 5.5135 1.33331H2.82016C1.76016 1.33331 1.3335 1.73331 1.3335 2.73331V13.2666C1.3335 14.2666 1.76016 14.6666 2.82016 14.6666H5.5135C6.5735 14.6666 7.00016 14.2666 7.00016 13.2666Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.6667 7.26665V2.73331C14.6667 1.73331 14.24 1.33331 13.18 1.33331H10.4867C9.42667 1.33331 9 1.73331 9 2.73331V7.26665C9 8.26665 9.42667 8.66665 10.4867 8.66665H13.18C14.24 8.66665 14.6667 8.26665 14.6667 7.26665Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.6667 13.2667V12.0667C14.6667 11.0667 14.24 10.6667 13.18 10.6667H10.4867C9.42667 10.6667 9 11.0667 9 12.0667V13.2667C9 14.2667 9.42667 14.6667 10.4867 14.6667H13.18C14.24 14.6667 14.6667 14.2667 14.6667 13.2667Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
