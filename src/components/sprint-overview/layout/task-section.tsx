import { cn } from "@/lib/utils";
import ArrowDownIcon from "../icons/arrow-down";
import { Badge } from "../ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

const variantStyles = {
    'blue': 'bg-[#F2F9FE] text-[#4157FE] border-[#4157FE78]',
    'green': 'bg-[#C4FFE2] text-[#178D6C] border-[#65CBA5]',
    'red': 'bg-[#FFE0EB] text-[#C81C57] border-[#C81C5780]',
    'yellow': 'bg-[#FCE9CB] text-[#A4541A] border-[#D09E73]',
    'purple': 'bg-[#F0E4FF] text-[#722BCC] border-[#B187E5]',
};

export function TaskSection({
    title,
    color,
    children,
}: {
    title: string | React.ReactNode
    color: keyof typeof variantStyles
    children: React.ReactNode
}) {
    return (
        <Collapsible defaultOpen>
            <div className="flex items-center gap-3">
                <CollapsibleTrigger>
                    <ArrowDownIcon className="h-5 w-5 text-muted-foreground" />
                </CollapsibleTrigger>

                <Badge variant="outline" className={cn("px-1.5 py-1 text-xs font-medium", variantStyles[color])}>
                    {title}
                </Badge>
            </div>

            <CollapsibleContent className="mt-4">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}