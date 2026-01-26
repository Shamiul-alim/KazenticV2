import { cn } from "@/lib/utils"

export function TimePill({
    color,
    children,
}: {
    color: "green" | "red" | "blue" | "yellow"
    children: React.ReactNode
}) {
    return (
        <div
            className={cn(
                "py-2 w-full rounded-md flex items-center justify-center font-medium text-xs",
                color === "green" && "bg-green-100 text-green-700",
                color === "red" && "bg-red-100 text-red-700",
                color === "blue" && "bg-blue-100 text-blue-700",
                color === "yellow" && "bg-yellow-100 text-yellow-700"
            )}
        >
            {children}
        </div>
    )
}
