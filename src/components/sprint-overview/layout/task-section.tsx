import { cn } from "@/lib/utils";
import ArrowDownIcon from "../icons/arrow-down";
import { Badge } from "../ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { MoreHorizontal, Plus } from "lucide-react";
import { StatusGroupMenu } from "../custom/status-group/status-group-menu";

const variantStyles = {
    'blue': 'bg-[#F2F9FE] text-[#4157FE] border-[#4157FE78]',
    'green': 'bg-[#C4FFE2] text-[#178D6C] border-[#65CBA5]',
    'red': 'bg-[#FFE0EB] text-[#C81C57] border-[#C81C5780]',
    'yellow': 'bg-[#FCE9CB] text-[#A4541A] border-[#D09E73]',
    'purple': 'bg-[#F0E4FF] text-[#697588] border-[#B187E5]',
    "default": 'bg-transparent text-[#475569] border-[#EBEBEB]',
};

export function TaskSection({
    title,
    taskCount,
    color,
    children,
    isDialog = false,
}: {
    title: string | React.ReactNode
    taskCount?: number
    color: keyof typeof variantStyles
    children: React.ReactNode
    isDialog?: boolean
}) {
    return (
        <Collapsible defaultOpen>
            <div className="flex items-center gap-3">
                <CollapsibleTrigger>
                    <ArrowDownIcon className="h-5 w-5 text-muted-foreground" />
                </CollapsibleTrigger>

                <Badge variant="outline" className={cn("px-1.5 py-1 text-xs font-medium", variantStyles[isDialog ? 'default' : color])}>
                    {title}
                </Badge>
                {
                    taskCount !== undefined && (
                        <div className="flex items-center">
                            <Badge variant="outline" className={cn("px-2 py-1 text-xs font-medium", variantStyles[isDialog ? 'default' : color])}>
                                {taskCount}
                            </Badge>
                            <StatusGroupMenu />
                            <Plus className="ml-2 h-4 w-4 text-muted-foreground cursor-pointer" />
                        </div>
                    )
                }
            </div>

            <CollapsibleContent className="mt-4">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}