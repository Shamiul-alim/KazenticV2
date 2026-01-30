import React from 'react'
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

type SubtaskSummaryProps = {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
}

const colorVariants: Record<string, string> = {
    green: 'bg-[#C4FFE2] text-[#178D6C] border-[#059669B2]',
    red: 'bg-[#FFE6D3] text-[#FF7816] border-[#FF781680]',
    yellow: 'bg-[#FCE9CB] text-[#A4541A] border-[#A4541A80]',
};

export default function SubtaskSummary({
    title,
    subtitle,
    icon,
    color
}: SubtaskSummaryProps) {
    return (
        <div className="flex items-center border rounded-md border-[#E4E8F0] p-2 sm:p-3 lg:p-4 gap-1.5 sm:gap-2 w-full sm:w-auto flex-1">
            <div className={cn("p-1.5 sm:p-2 border rounded-lg [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5", colorVariants[color] || colorVariants['green'])}>
                {icon}
            </div>
            <div className='space-y-1 sm:space-y-2'>
                <h3 className="text-[10px] sm:text-xs font-semibold text-[#191F38]">{title}</h3>
                <p className="text-[10px] sm:text-xs font-medium text-[#697588]">{subtitle}</p>
            </div>
        </div>
    )
}
