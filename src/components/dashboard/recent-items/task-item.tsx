import { Badge } from "@/components/sprint-report/ui/badge"
import { Check } from "lucide-react"
import Image from "next/image"
import { ProgressRing } from "../progress-ring"
import { Card } from "../ui/card"
import { cn } from "@/lib/utils"

type TaskItemProps = {
    id: number,
    title: string,
    estimatedHours: number,
    workedHours: number,
    progressPercentage: number,
    assigneeAvatarUrl: string,
    status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | string,
    type: string,
    projectName: string
}

export function TaskItem(props: TaskItemProps) {
    return (
        <Card>
            <div className="space-y-2 w-full border-l-2 border-l-primary-dashboard pl-3">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">{props.title}</p>
                        <p className="text-xs text-muted-foreground">
                            <span className="font-semibold text-black">Estimated:</span> {props.estimatedHours}:00 H · <span className="font-semibold text-black">Worked:</span> {props.workedHours}:00 H
                        </p>
                    </div>
                    <div className="flex items-center text-primary-dashboard">
                        <ProgressRing value={props.progressPercentage} />
                        <span className="text-sm font-medium">{props.progressPercentage}%</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Image
                        src={props.assigneeAvatarUrl}
                        alt="avatar"
                        width={24}
                        height={24}
                        className="rounded-full"
                    />

                    <Badge
                        // className="bg-success/10 text-success border-success/60 rounded-sm"
                        className={cn("rounded-sm", {
                            'bg-green-800/10 text-green-800 border-green-800/60': props.status === 'COMPLETED',
                            'bg-yellow-800/10 text-yellow-800 border-yellow-800/60': props.status === 'PENDING',
                            'bg-blue-800/10 text-blue-800 border-blue-800/60': props.status === 'ACTIVE',
                        })}

                    >
                        <Check className="w-4 h-4 inline-block" /> {props.status.toUpperCase()}
                    </Badge>

                    <Badge variant="outline" className="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60 rounded-sm">
                        {props.type}
                    </Badge>

                    <Badge variant="outline" className="bg-purple-800/10 text-purple-800 border-purple-800/60 rounded-sm">
                        {props.projectName}
                    </Badge>
                </div>
            </div>
        </Card>
    )
}
