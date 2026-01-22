import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/sprint-report/ui/card';

interface SummaryCardProps {
    title: string;
    value: number;
    className?: string;
}

export const SummaryCard = ({ title, value, className }: SummaryCardProps) => {
    return (
        <Card className={cn("p-6 flex flex-col", className)}>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">{title}</h3>
            <div className="bg-[#f8faff] rounded-xl flex items-center justify-center py-10 px-6">
                <span className="text-[#3b82f6] text-6xl font-bold">{value}</span>
            </div>
        </Card>
    );
};
