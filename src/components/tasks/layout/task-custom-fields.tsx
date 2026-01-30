import { ReactNode } from "react";
import {
    ChevronDown,
    Pencil,
    X,
    Hash,
    Mail,
    Tag,
    DollarSign,
    Phone,
    Star,
    Globe,
    Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const iconMap = {
    dropdown: ChevronDown,
    date: Calendar,
    email: Mail,
    tags: Tag,
    money: DollarSign,
    number: Hash,
    phone: Phone,
    rating: Star,
    website: Globe,
};

export type CustomFieldType =
    | "dropdown"
    | "date"
    | "email"
    | "tags"
    | "money"
    | "number"
    | "phone"
    | "rating"
    | "website";

export type CustomField = {
    id: string;
    label: string;
    type: CustomFieldType;
    value?: ReactNode;
};

export default function TaskCustomFields() {
    const fields: CustomField[] = [
        { id: "1", label: "Dropdown", type: "dropdown", value: <Button variant="outline" size="sm" className="rounded-sm text-[10px] sm:text-xs">Option 1</Button> },
        { id: "2", label: "Date", type: "date", value: <Button variant="outline" size="sm" className="rounded-sm text-[10px] sm:text-xs">Choose</Button> },
        { id: "3", label: "Email", type: "email", value: <Input variant="ghost" size="sm" className="rounded-sm text-[10px] sm:text-xs" placeholder="Type Here" /> },
        { id: "4", label: "Tags", type: "tags", value: "Choose" },
        { id: "5", label: "Money", type: "money", value: <Input variant="ghost" size="sm" className="rounded-sm text-[10px] sm:text-xs" placeholder="$" /> },
        { id: "6", label: "Number", type: "number", value: <Input variant="ghost" size="sm" className="rounded-sm text-[10px] sm:text-xs" placeholder="Type Here" /> },
        { id: "7", label: "Phone", type: "phone", value: <Input variant="ghost" size="sm" className="rounded-sm text-[10px] sm:text-xs" placeholder="99944445113" /> },
        { id: "8", label: "Rating", type: "rating", value: Array.from({ length: 4 }).map((_, i) => (<Star key={i} className="inline-block h-3 w-3 sm:h-4 sm:w-4" />)) },
        { id: "9", label: "Website", type: "website", value: <Input variant="ghost" size="sm" className="rounded-sm text-[10px] sm:text-xs" placeholder="Type Here" /> },
    ];

    return (
        <Card className="p-3 sm:p-4 gap-3 sm:gap-4 flex flex-col">
            <h3 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-4">Custom Fields</h3>

            <div className="space-y-1 sm:space-y-1">
                {fields.map((field) => (
                    <CustomFieldRow key={field.id} field={field} />
                ))}
            </div>

            <Button variant="secondary" size="sm" className="rounded-sm mt-2 sm:mt-4 text-[10px] sm:text-xs">
                Add Custom Fields
            </Button>
        </Card>
    );
}


export function CustomFieldRow({ field }: { field: CustomField }) {
    const Icon = iconMap[field.type];

    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 rounded-lg border p-2 sm:px-3 sm:py-0">
            {/* Left */}
            <div className="flex justify-between items-center gap-2 sm:gap-3 w-full sm:w-32 lg:w-40 sm:border-r sm:pr-3 py-1 sm:py-2">
                <div className="rounded-md flex items-center gap-1.5 sm:gap-2">
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary shrink-0" />
                    <span className="text-[10px] sm:text-xs font-medium text-primary">
                        {field.label}
                    </span>
                </div>
                <Pencil className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground cursor-pointer shrink-0" />
            </div>

            {/* Value */}
            <div
                className={cn(
                    "flex-1 text-xs sm:text-sm text-muted-foreground min-w-0",
                    field.type === "rating" && "text-yellow-500"
                )}
            >
                {field.value}
            </div>

            {/* Remove */}
            <button className="text-muted-foreground hover:text-foreground self-end sm:self-center">
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
        </div>
    );
}