'use client';

import { ChevronDown, Filter, LayoutGrid, List, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/lib/utils";
import { EmployeeTable } from "./employee-table";
import { useState } from "react";
import EmployeeGrid from "./employee-grid";

export const toolbarButton =
    "rounded-md h-10"


export default function AllEmployeeSection() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    return (
        <main className="w-full flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
                <span className="text-base font-semibold">All Employees</span>
                <div>
                    <div className="flex items-center justify-between gap-3">
                        {/* Left actions */}
                        <div className="flex items-center gap-2">
                            {/* Export */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className={toolbarButton}>
                                        Export
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem>CSV</DropdownMenuItem>
                                    <DropdownMenuItem>Excel</DropdownMenuItem>
                                    <DropdownMenuItem>PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Filter */}
                            <Button variant="outline" className={toolbarButton}>
                                <Filter className="mr-2" size={10} />
                                Filter
                            </Button>

                            {/* View toggle */}
                            <ToggleGroup variant="outline" type="single" value={viewMode} onValueChange={(status) => setViewMode(status as "grid" | "list")} className="gap-0">
                                <ToggleGroupItem value="grid" className="rounded-r-none border-r-0 data-[state=on]:bg-primary-dashboard/10 data-[state=on]:text-primary-dashboard">
                                    <LayoutGrid size={10} />
                                </ToggleGroupItem>
                                <ToggleGroupItem value="list" className="rounded-l-none data-[state=on]:bg-primary-dashboard/10 data-[state=on]:text-primary-dashboard">
                                    <List size={10} />
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>

                        {/* Right action */}
                        <Button className={cn(toolbarButton, "px-3")}>
                            Manage Employee
                            <Settings size={10} />
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                {viewMode === "list" ? <EmployeeTable /> : <EmployeeGrid />}
            </div>
        </main>
    )
}
