"use client";

import { CheckCircle2, Circle, Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"

type ChecklistItem = {
    id: number
    label: string
    checked?: boolean
}

const items: ChecklistItem[] = [
    { id: 1, label: "Setup authentication system" },
    { id: 2, label: "Create User profile Components", checked: true },
    { id: 3, label: "Configure Access Control", checked: true },
    { id: 4, label: "Design Landing Page" },
    { id: 5, label: "Fix form page" },
]

export function TaskChecklist() {
    const [itemList, setItemList] = useState<ChecklistItem[]>(items)
    const [newItemLabel, setNewItemLabel] = useState<string>("")
    const [isNewItemOpen, setIsNewItemOpen] = useState<boolean>(false)

    const completed = itemList.filter((i) => i.checked).length
    const total = itemList.length
    const percent = Math.round((completed / total) * 100)

    const addItem = (label: string) => {
        // Function to add a new checklist item
        const newItem: ChecklistItem = {
            id: itemList.length + 1,
            label,
            checked: false,
        }
        setItemList([...itemList, newItem])
    }

    const toggleItem = (id: number) => {
        // Function to toggle checklist item completion
        setItemList((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        )
    }

    const removeItem = (id: number) => {
        // Function to remove a checklist item
        setItemList((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    return (
        <section className="rounded-xl border bg-background p-3 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-0">
                <div>
                    <h3 className="text-xs sm:text-sm font-semibold">Checklist</h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                        {completed}/{total} completed
                    </p>
                </div>

                <div className="flex items-center gap-0.5 sm:gap-1 rounded-md bg-emerald-50 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    {percent}% Completed
                </div>
            </div>

            {/* Items */}
            <div className="space-y-2 sm:space-y-3">
                {itemList.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 sm:gap-3">
                        <Button variant="ghost" size="sm" className="p-0" onClick={() => toggleItem(item.id)}>
                            {item.checked ? (
                                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 flex-shrink-0" />
                            ) : (
                                <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                            )}
                        </Button>

                        <span
                            className={cn(
                                "text-xs sm:text-sm",
                                item.checked && "line-through text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Input Row */}
            {isNewItemOpen && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2">
                    <Input
                        placeholder="Enter checklist item..."
                        className="h-8 sm:h-9 text-xs sm:text-sm"
                        value={newItemLabel}
                        onChange={(e) => setNewItemLabel(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && newItemLabel.trim() !== "") {
                                addItem(newItemLabel);
                                setNewItemLabel("");
                            }
                        }}
                    />
                    <div className="flex gap-1.5 sm:gap-2">
                        <Button size="sm" className="flex-1 sm:flex-none text-xs" onClick={() => {
                            if (newItemLabel.trim() !== "") {
                                addItem(newItemLabel);
                                setNewItemLabel("");
                            }
                        }}>Save</Button>
                        <Button size="sm" variant="ghost" className="flex-1 sm:flex-none text-xs" onClick={() => setIsNewItemOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* Add Button */}
            <Button
                className="flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-lg border bg-muted/40 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-muted"
                variant="outline"
                onClick={() => {
                    setIsNewItemOpen(true)
                }}
            >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                Add Checklist Item
            </Button>
        </section>
    )
}
