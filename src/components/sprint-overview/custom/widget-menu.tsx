"use client"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import {
    Copy,
    List,
    Trash2,
    MoreHorizontal,
    Upload,
    ClipboardList,
    Hourglass,
} from "lucide-react"
import { useState } from "react"
import CSVIcon from "../icons/csv"
import PDFIcon from "../icons/pdf"
import ZIPIcon from "../icons/zip"

export function WidgetMenu() {
    const [showLegend, setShowLegend] = useState(true)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl"
            >
                {/* Duplicate */}
                <DropdownMenuItem className="gap-3 hover:text-[#4157FE] hover:bg-[#F2F9FE] p-3">
                    <ClipboardList className="h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>

                {/* Show Legend */}
                <DropdownMenuCheckboxItem
                    checked={showLegend}
                    onCheckedChange={setShowLegend}
                    className="gap-3 hover:text-[#4157FE] hover:bg-[#F2F9FE] p-3"
                >
                    <Hourglass className="h-4 w-4" />
                    Show Legend
                </DropdownMenuCheckboxItem>

                {/* Export */}

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="gap-3 hover:text-[#4157FE] hover:bg-[#F2F9FE] p-3">
                        <Upload className="h-4 w-4" />
                        Export

                    </DropdownMenuSubTrigger>
                    {/* <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger> */}
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                                <CSVIcon className="h-4 w-4 mr-2" />
                                CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <PDFIcon className="h-4 w-4 mr-2" />
                                PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <ZIPIcon className="h-4 w-4 mr-2" />
                                ZIP
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>


                {/* Delete */}
                <DropdownMenuItem className="gap-3 text-red-500 focus:text-red-500 hover:bg-red-100 hover:text-red-600 p-3">
                    <Trash2 className="h-4 w-4" />
                    Delete Widget
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
