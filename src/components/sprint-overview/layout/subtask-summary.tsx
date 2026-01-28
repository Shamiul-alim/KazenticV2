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
        <div className="flex items-center border rounded-md border-[#E4E8F0] p-4 gap-2 w-65">
            <div className={cn("p-2 border rounded-lg", colorVariants[color] || colorVariants['green'])}>
                {icon}
            </div>
            <div className='space-y-2'>
                <h3 className="text-xs font-semibold text-[#191F38]">{title}</h3>
                <p className="text-xs font-medium text-[#697588]">{subtitle}</p>
            </div>
        </div>
    )
}
