import { CheckCircle2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function InviteStatusPill({ status }: { status: "INVITED" | "NOT_INVITED" }) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium",
                status === "INVITED"
                    ? "border-[#05966980] bg-[#ECFFF9] text-[#059669]"
                    : "border-[#69758880] bg-[#EBEBEB] text-[#697588]"
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
