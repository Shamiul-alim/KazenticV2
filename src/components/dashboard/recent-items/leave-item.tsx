import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export function LeaveItem() {
    return (
        <Card>
            <div className="space-y-1 border-l-2 border-l-primary-dashboard pl-3">
                <p className="text-sm font-medium text-foreground">
                    Emergency Leave
                </p>

                <p className="text-xs text-muted-foreground">
                    Lorem ipsum Lorem ipsum Lorem ipsum...
                </p>

                <div className="flex items-center gap-2 pt-1 text-xs font-medium text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>13 - 12 Jul, 2025</span>
                </div>
            </div>
        </Card>
    )
}
