"use client"

import { useState } from "react"
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandGroup,
} from "@/components/ui/command"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

type Person = {
    id: string
    name: string
    image?: string
}

const PEOPLE: Person[] = [
    { id: "1", name: "Alif Hassan" },
    { id: "2", name: "Tonmoy Asif" },
    { id: "3", name: "John Doe" },
    { id: "4", name: "Nat qwe" },
]

export function PeopleSelect() {
    const [selected, setSelected] = useState<string[]>([])

    const toggleUser = (id: string) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        )
    }

    return (
        <Command>
            <CommandInput
                wrapperClassName="bg-muted m-2 rounded-md"
                className="py-0 m-0 h-8"
                placeholder="Search"
            />

            <CommandList>
                <CommandEmpty>No people found.</CommandEmpty>

                <CommandGroup>
                    {PEOPLE.map((person) => {
                        const isChecked = selected.includes(person.id)

                        return (
                            <CommandItem
                                key={person.id}
                                value={person.name}
                                onSelect={() => toggleUser(person.id)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-4 w-4">
                                        <AvatarImage src={person.image} />
                                        <AvatarFallback style={{ fontSize: 8 }}>
                                            {person.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <span className="text-xs font-medium">
                                        {person.name}
                                    </span>
                                </div>

                                <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={() => toggleUser(person.id)}
                                    className="border border-muted-foreground shadow-none"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
