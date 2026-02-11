"use client";

import * as React from "react";
import { Plus } from "lucide-react";
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
import { useEffect } from "react";
import NestedArrowsIcon from "@/components/icons/nested-arrows";

type FilterPopoverProps = {
    rules: FilterRule[];
    setRules: React.Dispatch<React.SetStateAction<FilterRule[]>>;
    onChange?: (rules: FilterRule[]) => void;
};

export function FilterPopover({ rules, setRules, onChange }: FilterPopoverProps) {
    const addRule = () =>
        setRules((r) => [...r, { id: uuid() }]);

    const removeRule = (id: string) =>
        setRules((r) => r.filter((rule) => rule.id !== id));

    const clearFilters = () => setRules([{ id: uuid() }]);

    useEffect(() => {
        if (onChange) {
            onChange(rules);
        }
    }, [rules, onChange]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                    <FilterOutlineIcon className="h-4 w-4" />
                    Filter
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-130 p-4 text-xs">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between">
                    <span className="font-semibold text-[#191F38] text-sm">Filters</span>
                    <button
                        onClick={clearFilters}
                        className="text-[13px] font-medium text-muted-foreground hover:text-primary"
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
                            setRule={(updatedRule) =>
                                setRules((r) =>
                                    r.map((r) => (r.id === rule.id ? updatedRule : r))
                                )
                            }
                            onDelete={() => removeRule(rule.id)}
                        />
                    ))}

                    {/* Nested filter (UI only for now) */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-muted-foreground py-1"
                    >
                        <NestedArrowsIcon className="h-4 w-4" />
                        Add Nested Filter
                    </Button>
                </div>

                {/* Footer */}
                <Button
                    size="sm"
                    className="mt-3 flex items-center py-1.5 gap-1"
                    onClick={addRule}
                >
                    <Plus className="h-4 w-4" />
                    Add More Filter
                </Button>
            </PopoverContent>
        </Popover>
    );
}
