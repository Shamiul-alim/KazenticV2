import React from 'react'

interface UserAddIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function UserAddIcon({ className, ...props }: UserAddIconProps) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M8.00008 7.99992C9.84103 7.99992 11.3334 6.50753 11.3334 4.66658C11.3334 2.82564 9.84103 1.33325 8.00008 1.33325C6.15913 1.33325 4.66675 2.82564 4.66675 4.66658C4.66675 6.50753 6.15913 7.99992 8.00008 7.99992Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.27344 14.6667C2.27344 12.0867 4.8401 10 8.0001 10C8.6401 10 9.26011 10.0867 9.84011 10.2467"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6666 11.9999C14.6666 12.2133 14.6399 12.4199 14.5866 12.6199C14.5266 12.8866 14.4199 13.1466 14.2799 13.3733C13.8199 14.1466 12.9733 14.6666 11.9999 14.6666C11.3133 14.6666 10.6932 14.4066 10.2266 13.9799C10.0266 13.8066 9.85324 13.5999 9.71991 13.3733C9.47324 12.9733 9.33325 12.4999 9.33325 11.9999C9.33325 11.2799 9.61992 10.6199 10.0866 10.1399C10.5733 9.63993 11.2533 9.33325 11.9999 9.33325C12.7866 9.33325 13.4999 9.67326 13.9799 10.2199C14.4066 10.6933 14.6666 11.3199 14.6666 11.9999Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.9932 11.9868H11.0066"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 11.0134V13.0068"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}