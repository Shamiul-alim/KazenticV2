import { Calendar } from "lucide-react"
import { Card } from "../ui/card"

type LeaveItemProps = {
    title: string;
    description: string;
    dateRange: string;
}

export function LeaveItem(props: LeaveItemProps) {
    return (
        <Card>
            <div className="space-y-1 border-l-2 border-l-primary-dashboard pl-3">
                <p className="text-sm font-medium text-foreground">
                    {props.title}
                </p>

                <p className="text-xs text-muted-foreground">
                    {props.description}
                </p>

                <div className="flex items-center gap-2 pt-1 text-xs font-medium text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{props.dateRange}</span>
                </div>
            </div>
        </Card>
    )
}
