import { CheckCircle2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function InviteStatusPill({ status }: { status: "INVITED" | "NOT_INVITED" }) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm font-medium",
                status === "INVITED"
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-muted bg-muted text-muted-foreground"
            )}
        >
            {status === "INVITED" ? (
                <CheckCircle2 className="h-4 w-4" />
            ) : (
                <Info className="h-4 w-4" />
            )}
            {status.replace("_", " ")}
        </div>
    )
}
