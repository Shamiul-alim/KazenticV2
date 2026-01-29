import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
const menuItems = [
    {
        column: "priority",
        submenu: {
            title: "Count Values",
            items: [
                {
                    label: "Count",
                    items: [
                        { label: "Count Values" },
                        { label: "Count Unique Values" },
                        { label: "Count Empty" },
                    ]
                },
                {
                    label: "Percent",
                    items: [
                        { label: "Percent Empty" },
                        { label: "Percent Not Empty" }
                    ]
                }
            ],
        }
    }
]

export function DropdownMenuSubmenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    Calculate
                    <ChevronDown className="inline-block ml-1 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {
                        menuItems[0].submenu.items.map((submenu) => (
                            <DropdownMenuSub key={submenu.label}>
                                <DropdownMenuSubTrigger>
                                    <Button variant="outline" className="w-full justify-between">
                                        {submenu.label}
                                        <ChevronRight className="inline-block ml-1 h-4 w-4" />
                                    </Button>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {
                                            submenu?.items.map((subItem) => (
                                                <DropdownMenuSub key={subItem.label}>
                                                    <DropdownMenuSubTrigger>
                                                        <Button variant="outline" className="w-full justify-between">
                                                            {subItem.label}
                                                        </Button>
                                                    </DropdownMenuSubTrigger>
                                                </DropdownMenuSub>
                                            ))
                                        }
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        ))
                    }
                    <DropdownMenuItem>
                        <Button className="w-full justify-start">
                            Calculate
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
