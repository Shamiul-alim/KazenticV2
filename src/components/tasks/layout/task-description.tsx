'use client';

import { Button } from "@/components/ui/Button";
import {
    List,
    ChevronDown,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Code,
    Link,
    Image as ImageIcon,
    Code2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator";

type DescriptionToolbarProps = {
    onAction?: (action: string) => void
}

export default function TaskDescription() {
    return (
        <div className="rounded-lg border p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
            <h3 className="text-xs sm:text-sm font-medium">Description</h3>

            <DescriptionToolbar />

            <div className="h-24 sm:h-28 lg:h-32 border rounded-md bg-muted/20" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-[10px] sm:text-xs text-muted-foreground">
                <span>Max word limit 120 words</span>
                <Button size="sm" className="w-full sm:w-auto">Save</Button>
            </div>
        </div>
    );
}

export function DescriptionToolbar({ onAction }: DescriptionToolbarProps) {
    const trigger = (action: string) => () => onAction?.(action)

    return (
        <div className="flex items-center gap-0.5 sm:gap-1 rounded-lg border px-1.5 sm:px-2 py-0.5 sm:py-1 overflow-x-auto">
            {/* List dropdown */}
            <ToolbarButton onClick={trigger("list")}>
                <List className="h-3 w-3 sm:h-4 sm:w-4" />
                <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </ToolbarButton>

            <Separator orientation="vertical" className="hidden xs:block" />

            <ToolbarButton onClick={trigger("bold")}>
                <Bold className="h-3 w-3 sm:h-4 sm:w-4" />
            </ToolbarButton>

            <ToolbarButton onClick={trigger("italic")}>
                <Italic className="h-3 w-3 sm:h-4 sm:w-4" />
            </ToolbarButton>

            <ToolbarButton onClick={trigger("underline")}>
                <Underline className="h-3 w-3 sm:h-4 sm:w-4" />
            </ToolbarButton>

            <ToolbarButton onClick={trigger("strike")}>
                <Strikethrough className="h-3 w-3 sm:h-4 sm:w-4" />
            </ToolbarButton>

            <Separator orientation="vertical" className="hidden xs:block" />

            <ToolbarButton onClick={trigger("code")}>
                <Code className="h-3 w-3 sm:h-4 sm:w-4" />
            </ToolbarButton>

            <ToolbarButton onClick={trigger("link")}>
                <Link className="h-3 w-3 sm:h-4 sm:w-4" />
            </ToolbarButton>

            <ToolbarButton onClick={trigger("image")}>
                <ImageIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            </ToolbarButton>

            <ToolbarButton onClick={trigger("code-block")}>
                <Code2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </ToolbarButton>
        </div>
    )
}

function ToolbarButton({
    children,
    onClick,
}: {
    children: React.ReactNode
    onClick?: () => void
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center gap-0.5 sm:gap-1 rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 flex-shrink-0",
                "text-muted-foreground",
                "hover:bg-muted hover:text-foreground",
                "transition-colors"
            )}
        >
            {children}
        </button>
    )
}