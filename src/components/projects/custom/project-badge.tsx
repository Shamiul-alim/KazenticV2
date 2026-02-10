import { Badge } from '@/components/ui/badge';
import React from 'react'

interface ProjectBadgeProps {
    title: string | React.ReactNode;
    className?: string;
    color?: string;
    icon?: React.ReactNode;
}

export default function ProjectBadge({ title, className, color, icon }: ProjectBadgeProps) {
    return (
        <Badge
            style={{
                color: color,
                borderColor: color + "80",
                backgroundColor: color + "20",
            }}
            variant="outline"
            className="inline-flex gap-2 items-center text-[11px] font-medium h-5 px-2 rounded-sm"
        >
            {icon}
            {title}
        </Badge>
    )
}
