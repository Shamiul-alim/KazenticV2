import { Calendar, Clock, Flag, FlagTriangleRight } from "lucide-react"
import { Card } from "../ui/card"
import { Badge } from "@/components/sprint-report/ui/badge"
import { Separator } from "@/components/ui/separator"

type Props = {
    title: string
    category: string
    date: string
    time: string
    assignee: string
    ticketId: string
    status: "Open" | "Closed" | "In Progress"
    priority: "Low" | "Medium" | "High"
}

export function TicketCard({
    title,
    category,
    date,
    time,
    assignee,
    ticketId,
    status,
    priority,
}: Props) {
    return (
        <Card className="flex flex-col items-start space-y-1">
            <div className="pl-4 border-l-3 border-primary-dashboard/50 space-y-2">
                {/* Title */}
                <div>
                    <h3 className="font-semibold text-xs">{title}</h3>
                    <p className="text-[11px] text-muted-foreground">{category}</p>
                </div>

                {/* Date + Time */}
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {date}
                    </div>
                    <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground"></span>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {time}
                    </div>
                </div>
            </div>

            <Separator />

            {/* Footer */}
            <div className="flex items-center justify-between">
                {/* Assignee */}
                <div className="flex items-center gap-2">
                    <div className="min-w-5 min-h-5 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-semibold">
                        {assignee.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{assignee}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-row items-center gap-2 pl-2">
                    <Badge variant="outline" className="bg-muted text-muted-foreground border border-muted-foreground rounded-md">#{ticketId}</Badge>

                    <Badge className="bg-success/30 border border-success/60 text-success rounded-md">
                        {status}
                    </Badge>

                    <Badge className="bg-orange-100 text-orange-700 border border-orange-700 rounded-md flex items-center gap-1">
                        <FlagTriangleRight className="w-3 h-3" />
                        {priority}
                    </Badge>
                </div>
            </div>
        </Card>
    )
}
