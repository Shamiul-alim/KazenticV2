import ArrowDownIcon from "@/components/sprint-overview/icons/arrow-down"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, ChevronDownIcon, ChevronLeftCircle, ChevronRight, ChevronRightCircle, InfoIcon } from "lucide-react"
import { useProjectContext } from "../context/project-context"

type Props = {
    title: string | React.ReactNode
    count: number
    collapsed: boolean
    onToggle: () => void
    color?: string
    onScrollLeft: () => void
    onScrollRight: () => void
    canScrollLeft?: boolean
    canScrollRight?: boolean
    hidden?: boolean
}

const StatusMap: Record<string, { color: string, bgColor: string, icon: React.ReactNode }> = {
    "Not Started": { color: "#DC2626", bgColor: "#FEE2E2", icon: <ChevronDownIcon className="h-3 w-3" /> },
    "In Progress": { color: "#2563EB", bgColor: "#DBEAFE", icon: <ChevronDownIcon className="h-3 w-3" /> },
    "Completed": { color: "#059669", bgColor: "#C4FFE2", icon: <Check className="h-3 w-3" /> },
    "On Hold": { color: "#D97706", bgColor: "#FFEDD5", icon: <ChevronDownIcon className="h-3 w-3" /> },
    "Cancelled": { color: "#6B7280", bgColor: "#E5E7EB", icon: <ChevronDownIcon className="h-3 w-3" /> },
    "active": { color: "#059669", bgColor: "#C4FFE2", icon: <Check className="h-3 w-3" /> },
    "inactive": { color: "#6B7280", bgColor: "#E5E7EB", icon: <InfoIcon className="h-3 w-3" /> },
}

export function ProjectGroupHeader({
    title,
    count,
    collapsed,
    onToggle,
    color,
    onScrollLeft,
    onScrollRight,
    canScrollLeft = false,
    canScrollRight = false,
    hidden = false,
}: Props) {
    const { viewMode } = useProjectContext()

    return (
        <div className="flex items-center justify-between">
            <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={onToggle}
            >
                <ArrowDownIcon
                    className={`transition size-5 text-[#7F899C] ${collapsed ? "-rotate-90" : ""}`}
                />
                <Badge
                    style={{
                        color: color,
                        borderColor: color + "80",
                        backgroundColor: color + "20",
                    }}
                    variant="outline"
                    className="flex gap-2 items-center text-[11px] font-medium h-5 px-2 rounded-sm"
                >
                    {StatusMap[title as string]?.icon}
                    {title}
                </Badge>
                <Badge
                    style={{
                        color: color,
                        borderColor: color + "80",
                        backgroundColor: color + "20",
                    }}
                    variant="outline"
                    className="text-[11px] font-medium h-5 px-2 rounded-sm"
                >
                    {count}
                </Badge>
            </div>
            <div className={
                cn("flex items-center gap-1.5", viewMode === 'list' && "hidden")
            }>
                {/* Scroll Left */}
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "rounded-full p-0 text-primary disabled:text-primary/50",
                        hidden && "hidden"
                    )}
                    onClick={canScrollLeft ? onScrollLeft : undefined}
                    disabled={!canScrollLeft}
                >
                    <ChevronLeftCircle className="h-5 w-5" />
                </Button>

                {/* Scroll Right */}
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "rounded-full p-0 text-primary disabled:text-primary/50",
                        hidden && "hidden"
                    )}
                    onClick={canScrollRight ? onScrollRight : undefined}
                    disabled={!canScrollRight}
                >
                    <ChevronRightCircle className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}
