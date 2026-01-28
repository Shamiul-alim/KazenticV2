import { ChevronRight } from "lucide-react"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"

const variantClasses = {
    default:
        "text-[#697588] hover:bg-[#F2F9FE] hover:text-[#4157FE]",
    destructive:
        "text-[#DC2626] hover:bg-[#FEE2E2] hover:text-[#B91C1C]",
}

export function Section({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-1">
            <p className="text-[11px] font-medium text-[#9BA2AD] px-4 mb-2">
                {title}
            </p>
            {children}
        </div>
    )
}

export function SectionRow({
    label,
    value,
    icon,
    isSwitch = false,
    variant = "default",
}: {
    label: string | React.ReactNode
    value?: string
    icon?: React.ReactNode
    isSwitch?: boolean
    variant?: keyof typeof variantClasses
}) {
    return (
        <div className={cn("flex items-center justify-between text-[#697588] cursor-pointer px-4 py-1.5 rounded-md", variantClasses[variant])}>
            <span className="text-xs flex items-center gap-2">
                {icon}
                {label}
            </span>
            {isSwitch ? <Switch /> : (value && <span className="text-[11px] text-[#9BA2AD] flex items-center gap-2">
                {value}
                <ChevronRight className="size-4 text-[#697588]" />
            </span>
            )}
        </div>
    )
}