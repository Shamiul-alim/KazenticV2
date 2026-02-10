"use client";

import * as React from "react";
import { Filter, Plus } from "lucide-react";
import { v4 as uuid } from "uuid";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../../ui/popover";
import { FilterRow } from "./filter-row";
import { FilterRule } from "./filter.types";
import FilterOutlineIcon from "@/components/icons/filter-outline";
import { Button } from "@/components/ui/Button";

export function FilterPopover() {
    const [rules, setRules] = React.useState<FilterRule[]>([
        { id: uuid() },
    ]);

    const addRule = () =>
        setRules((r) => [...r, { id: uuid() }]);

    const removeRule = (id: string) =>
        setRules((r) => r.filter((rule) => rule.id !== id));

    const clearFilters = () => setRules([{ id: uuid() }]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                    <FilterOutlineIcon className="h-4 w-4" />
                    Filter
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-130 p-4">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between">
                    <span className="font-medium">Filters</span>
                    <button
                        onClick={clearFilters}
                        className="text-sm text-muted-foreground hover:text-primary"
                    >
                        Clear Filters
                    </button>
                </div>

                {/* Filter rows */}
                <div className="space-y-2 rounded-md border p-3">
                    {rules.map((rule) => (
                        <FilterRow
                            key={rule.id}
                            rule={rule}
                            onDelete={() => removeRule(rule.id)}
                        />
                    ))}

                    {/* Nested filter (UI only for now) */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                    >
                        Add Nested Filter
                    </Button>
                </div>

                {/* Footer */}
                <Button
                    variant="secondary"
                    size="sm"
                    className="mt-3 gap-1"
                    onClick={addRule}
                >
                    <Plus className="h-4 w-4" />
                    Add More Filter
                </Button>
            </PopoverContent>
        </Popover>
    );
}
