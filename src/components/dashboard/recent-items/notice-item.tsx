import { Badge } from "@/components/sprint-report/ui/badge";
import { Check } from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

type NoticeItemProps = {
    id: number;
    title: string;
    description: string;
    status: "active" | "inactive";
    timeAgo: string;
}

export function NoticeItem(props: NoticeItemProps) {
    return (
        <Card>
            <div className="flex items-start gap-3 border-l-2 border-l-primary-dashboard pl-3">
                <div className="space-y-1">
                    <p className="text-sm font-medium">{props.title}</p>
                    <p className="text-xs text-muted-foreground">
                        {props.description}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <Badge
                    variant="outline"
                    className={cn(
                        props.status === "active"
                            ? "border-success bg-success/10 text-success"
                            : "border-muted-foreground/20 bg-muted-foreground/10 text-muted-foreground"
                    )}
                >
                    <Check className="w-4 h-4" /> {props.status.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">{props.timeAgo}</span>
            </div>
        </Card>
    )
}
