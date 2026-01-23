import { Badge } from "@/components/sprint-report/ui/badge";
import { Check } from "lucide-react";
import { Card } from "../ui/card";

export function NoticeItem() {
    return (
        <Card>
            <div className="flex items-start gap-3 border-l-2 border-l-primary-dashboard pl-3">
                <div className="space-y-1">
                    <p className="text-sm font-medium">Notice Title</p>
                    <p className="text-xs text-muted-foreground">
                        Lorem ipsum Lorem ipsum Lorem ipsum...
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <Badge
                    variant="outline"
                    className="border-success bg-success/10 text-success"
                >
                    <Check className="w-4 h-4" /> ACTIVE
                </Badge>
                <span className="text-xs text-muted-foreground">2h Ago</span>
            </div>
        </Card>
    )
}
