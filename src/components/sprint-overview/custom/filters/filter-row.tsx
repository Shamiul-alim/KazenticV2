"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "../../ui/select";
import { FilterRule } from "./filter.types";
import { ReactEventHandler } from "react";

interface FilterRowProps {
    rule: FilterRule;
    setRule: (rule: FilterRule) => void;
    onDelete: () => void;
}

export function FilterRow({ rule, setRule, onDelete }: FilterRowProps) {

    const handleFieldChange = (name: string, value: string) => {
        setRule({
            ...rule,
            [name]: value,
        });
    }

    return (
        <div className="flex items-center gap-2">
            {/* Field */}
            <Select onValueChange={(value) => handleFieldChange("type", value)} name="type">
                <SelectTrigger className="w-32 h-7 shadow-none text-[11px]">
                    <SelectValue placeholder="Select Filter" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="assignee">Assignee</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
            </Select>

            {/* Operator */}
            <Select onValueChange={(value) => handleFieldChange("operator", value)} name="operator">
                <SelectTrigger className="w-32 h-7 shadow-none text-[11px]">
                    <SelectValue placeholder="Is" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="IS">Is</SelectItem>
                    <SelectItem value="IS_NOT">Is not</SelectItem>
                    <SelectItem value="CONTAINS">Contains</SelectItem>
                </SelectContent>
            </Select>

            {/* Value */}
            <Select onValueChange={(value) => handleFieldChange("value", value)} name="value">
                <SelectTrigger className="w-32 h-7 shadow-none text-[11px]">
                    <SelectValue placeholder="Select Option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todo">TODO</SelectItem>
                    <SelectItem value="in_progress">IN PROGRESS</SelectItem>
                </SelectContent>
            </Select>

            {/* Delete */}
            <Button
                size="icon"
                variant="ghost"
                onClick={onDelete}
                className="text-red-500"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
