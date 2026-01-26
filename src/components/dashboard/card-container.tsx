import { cn } from '@/lib/utils'
import { Ellipsis } from 'lucide-react'

export default function CardContainer({
    title,
    children,
    className,
    childrenClassName
}
    : { title: string | React.ReactNode, children: React.ReactNode, className?: string, childrenClassName?: string }) {

    return (
        <div className={cn("flex-1 rounded-xl border border-border bg-background", className)}>
            {/* Header */}
            <div className="flex items-center justify-between bg-[#F2F9FE] px-4 py-3">
                <p className="text-sm font-semibold">{title}</p>
                <Ellipsis className="text-muted-foreground" />
            </div>

            {/* List */}
            <div className={cn("p-4", childrenClassName)}>
                {children}
            </div>
        </div>
    )
}
