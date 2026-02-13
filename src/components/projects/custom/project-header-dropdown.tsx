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
    XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import Link2Icon from "@/components/icons/link-2"
import ExportIcon from "@/components/icons/export"
import ClipboardTextIcon from "@/components/icons/clipboard-text"
import SubtaskIcon from "@/components/icons/subtask"
import Element1Icon from "@/components/icons/element-1"
import TrashIcon from "@/components/icons/trash"
import { cn } from "@/lib/utils"
import SortIcon from "@/components/icons/sort"
import ArrowLeftIcon from "@/components/icons/arrow-left-outline"
import ArrowRightIcon from "@/components/icons/arrow-right-outline"
import PinIcon from "@/components/icons/pin"
import EyeSlashIcon from "@/components/icons/eye-slash"
import React from "react"

const DropdownItemList = [
    {
        label: "Sort",
        icon: SortIcon,
        onClick: () => { console.log("Sort") },
    },
    {
        label: "Clear Sort",
        icon: XCircle,
        onClick: () => { console.log("Clear Sort") },
    },
    {
        label: "Insert Left",
        icon: ArrowLeftIcon,
        onClick: () => { console.log("Insert Left") },
    },
    {
        label: "Insert Right",
        icon: ArrowRightIcon,
        onClick: () => { console.log("Insert Right") },
    },
    {
        label: "Pin Column",
        icon: PinIcon,
        onClick: () => { console.log("Pin Column") },
    },
    {
        label: "Hide Column",
        icon: EyeSlashIcon,
        onClick: () => { console.log("Hide Column") },
    },
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

export function TableHeaderDropdown({
    children,
    onCopyLink,
    onViewDetails,
    onExport,
    onViewTasks,
    onViewSubTasks,
    onViewBoard,
    onDelete,
}: ProjectActionsDropdownProps) {
    const [isSorted, setIsSorted] = React.useState(false)

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
                className="w-42 max-w-[calc(100vw-1rem)] rounded-xl shadow-xl text-muted-foreground"
            >
                {
                    DropdownItemList.map((item, index) => {
                        const Icon = item.icon
                        if (isSorted && index === 0) return null;
                        if (!isSorted && index === 1) return null;
                        return (
                            <DropdownMenuItem
                                key={item.label}
                                onClick={
                                    () => {
                                        item.onClick()
                                        if (index === 0) setIsSorted(true)
                                        if (index === 1) setIsSorted(false)
                                    }
                                }
                                className="py-2.5 px-4"
                            >
                                <Icon className="w-4 h-4 mr-3 text-muted-foreground" />
                                {item.label}
                            </DropdownMenuItem>
                        )
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
