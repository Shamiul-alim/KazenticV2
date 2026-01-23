import { cn } from '@/lib/utils'
import { Ellipsis } from 'lucide-react'

export default function CardContainer({
    title,
    children,
    className }
    : { title: string | React.ReactNode, children: React.ReactNode, className?: string }) {

    return (
        <div className={cn("flex-1 rounded-xl border border-border bg-background overflow-hidden", className)}>
            {/* Header */}
            <div className="flex items-center justify-between bg-[#F2F9FE] px-4 py-3">
                <p className="text-sm font-semibold">{title}</p>
                <Ellipsis className="text-muted-foreground" />
            </div>

            {/* List */}
            {children}
        </div>
    )
}
