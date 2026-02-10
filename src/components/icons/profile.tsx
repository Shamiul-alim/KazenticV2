import React from 'react'

interface UserIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

export default function ProfileIcon({ className, ...props }: UserIconProps) {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M7.29613 6.52195C7.23613 6.51595 7.16413 6.51595 7.09813 6.52195C5.67013 6.47395 4.53613 5.30395 4.53613 3.86395C4.53613 2.39395 5.72413 1.19995 7.20013 1.19995C8.67013 1.19995 9.86413 2.39395 9.86413 3.86395C9.85813 5.30395 8.72413 6.47395 7.29613 6.52195Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.29603 8.7361C2.84403 9.7081 2.84403 11.2921 4.29603 12.2581C5.94603 13.3621 8.65203 13.3621 10.302 12.2581C11.754 11.2861 11.754 9.7021 10.302 8.7361C8.65803 7.6381 5.95203 7.6381 4.29603 8.7361Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}