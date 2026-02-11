interface NestedArrowsIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function NestedArrowsIcon(props: NestedArrowsIconProps) {
    return (
        <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99992 5.66671V3.33337C9.99992 2.2288 9.10449 1.33337 7.99992 1.33337H3.33325C2.22868 1.33337 1.33325 2.2288 1.33325 3.33337V8.00004C1.33325 9.10461 2.22868 10 3.33325 10H5.66659" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.9998 10.0001H5.6665M10.9998 10.0001L9.33317 8.33341M10.9998 10.0001L9.33317 11.6667M5.6665 12.3334V7.66675C5.6665 6.56218 6.56193 5.66675 7.6665 5.66675H12.3332C13.4377 5.66675 14.3332 6.56218 14.3332 7.66675V12.3334C14.3332 13.438 13.4377 14.3334 12.3332 14.3334H7.6665C6.56193 14.3334 5.6665 13.438 5.6665 12.3334Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
