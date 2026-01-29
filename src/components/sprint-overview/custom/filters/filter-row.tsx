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

interface FilterRowProps {
    rule: FilterRule;
    onDelete: () => void;
}

export function FilterRow({ rule, onDelete }: FilterRowProps) {
    return (
        <div className="flex items-center gap-2">
            {/* Field */}
            <Select>
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select Filter" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="assignee">Assignee</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
            </Select>

            {/* Operator */}
            <Select>
                <SelectTrigger className="w-30">
                    <SelectValue placeholder="Is" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="IS">Is</SelectItem>
                    <SelectItem value="IS_NOT">Is not</SelectItem>
                    <SelectItem value="CONTAINS">Contains</SelectItem>
                </SelectContent>
            </Select>

            {/* Value */}
            <Select>
                <SelectTrigger className="w-40">
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
