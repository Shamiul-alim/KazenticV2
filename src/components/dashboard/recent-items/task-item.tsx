import { Badge } from "@/components/sprint-report/ui/badge"
import { Check } from "lucide-react"
import Image from "next/image"
import { ProgressRing } from "../progress-ring"
import { Card } from "../ui/card"

export function TaskItem() {
    return (
        <Card>
            <div className="space-y-2 w-full border-l-2 border-l-primary-dashboard pl-3">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Task Title</p>
                        <p className="text-xs text-muted-foreground">
                            <span className="font-semibold text-black">Estimated:</span> 4:00 H · <span className="font-semibold text-black">Worked:</span> 4:00 H
                        </p>
                    </div>
                    <div className="flex items-center text-primary-dashboard">
                        <ProgressRing value={70} />
                        <span className="text-sm font-medium">70%</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Image
                        src="/assets/dashboard/avatar-4.jpg"
                        alt=""
                        width={24}
                        height={24}
                        className="rounded-full"
                    />

                    <Badge className="bg-success/10 text-success border-success/60 rounded-sm">
                        <Check className="w-4 h-4 inline-block" /> ACTIVE
                    </Badge>

                    <Badge variant="outline" className="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60 rounded-sm">
                        Type
                    </Badge>

                    <Badge variant="outline" className="bg-purple-800/10 text-purple-800 border-purple-800/60 rounded-sm">
                        Project Name
                    </Badge>
                </div>
            </div>
        </Card>
    )
}
