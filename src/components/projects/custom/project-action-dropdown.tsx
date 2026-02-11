"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Link,
    Eye,
    Upload,
    ClipboardList,
    ListTree,
    LayoutGrid,
    Trash2,
    MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import Link2Icon from "@/components/icons/link-2"
import ExportIcon from "@/components/icons/export"
import ClipboardTextIcon from "@/components/icons/clipboard-text"
import SubtaskIcon from "@/components/icons/subtask"
import Element1Icon from "@/components/icons/element-1"
import TrashIcon from "@/components/icons/trash"
import { cn } from "@/lib/utils"

const DropdownItemList = [
    {
        label: "Copy Project Link",
        icon: Link2Icon,
        onClick: () => { console.log("Copy Link") },
    },
    {
        label: "View Details",
        icon: Eye,
        onClick: () => { console.log("View Details") },
    },
    {
        label: "Export Report",
        icon: ExportIcon,
        onClick: () => { console.log("Export Report") },
    },
    {
        label: "View All Tasks",
        icon: ClipboardTextIcon,
        onClick: () => { console.log("View All Tasks") },
    },
    {
        label: "View All Sub Tasks",
        icon: SubtaskIcon,
        onClick: () => { console.log("View All Sub Tasks") },
    },
    {
        label: "View Board",
        icon: Element1Icon,
        onClick: () => { console.log("View Board") },
    },
    {
        label: "Delete Project",
        icon: TrashIcon,
        onClick: () => { console.log("Delete Project") },
        variant: "destructive",
    }
]

interface ProjectActionsDropdownProps {
    children?: React.ReactNode
    onCopyLink?: () => void
    onViewDetails?: () => void
    onExport?: () => void
    onViewTasks?: () => void
    onViewSubTasks?: () => void
    onViewBoard?: () => void
    onDelete?: () => void
}

export function ProjectActionsDropdown({
    children,
    onCopyLink,
    onViewDetails,
    onExport,
    onViewTasks,
    onViewSubTasks,
    onViewBoard,
    onDelete,
}: ProjectActionsDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children ? (
                    children
                ) : (
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </Button>
                )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl shadow-xl text-muted-foreground"
            >
                {
                    DropdownItemList.map((item) => {
                        const Icon = item.icon
                        return (
                            <DropdownMenuItem
                                key={item.label}
                                onClick={item.onClick}
                                className={
                                    cn(
                                        "py-2.5 px-4",
                                        item.variant === "destructive" ? "text-red-600 focus:text-red-600" : ""
                                    )
                                }
                            >
                                <Icon className={cn("w-4 h-4 mr-3", item.variant === "destructive" ? "text-red-600" : "text-muted-foreground")} />
                                {item.label}
                            </DropdownMenuItem>
                        )
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
