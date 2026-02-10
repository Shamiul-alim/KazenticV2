interface KazenticLogoProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function KazenticLogo(props: KazenticLogoProps) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width="14" height="14" rx="3.11111" fill="#4157FE" />
            <path d="M3.90039 11.1111V3.11108H5.34961V6.78687H5.44727L8.56836 3.11108H10.3379L7.24414 6.70093L10.3652 11.1111H8.62305L6.23633 7.6814L5.34961 8.72827V11.1111H3.90039Z" fill="white" />
        </svg>
    )
}
