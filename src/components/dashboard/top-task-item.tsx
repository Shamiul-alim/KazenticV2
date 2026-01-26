import { Badge } from "../sprint-report/ui/badge"
import { Check } from "lucide-react"
import { Progress } from "../ui/progress"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"

type TopTaskItemProps = {
    id: number,
    title: string,
    estimatedHours: number,
    workedHours: number,
    progressPercentage: number,
    assigneeName: string,
    assigneeAvatarUrl: string,
    status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | string,
    type: string,
    projectName: string
}

export function TopTaskItem(props: TopTaskItemProps) {
    return (
        <Card>
            <div className="flex flex-col lg:flex-row flex-1 items-start lg:items-center justify-between gap-4 lg:gap-6 border-l-4 border-l-primary-dashboard p-4 rounded-none">
                <div className="space-y-2 flex-1 min-w-0">
                    <p className="text-sm font-medium">
                        {props.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge
                            className={cn("rounded-sm", {
                                'bg-green-800/10 text-green-800 border-green-800/60': props.status === 'COMPLETED',
                                'bg-yellow-800/10 text-yellow-800 border-yellow-800/60': props.status === 'PENDING',
                                'bg-blue-800/10 text-blue-800 border-blue-800/60': props.status === 'ACTIVE',
                            })}
                        >
                            <Check className="w-4 h-4" /> {props.status.toUpperCase()}
                        </Badge>

                        <Badge
                            variant="outline"
                            className="border-primary-dashboard text-primary-dashboard rounded-sm bg-primary-dashboard/10"
                        >
                            {props.type}
                        </Badge>

                        <div className="flex items-center gap-2">
                            <div className="flex justify-center items-center h-5 w-5 rounded-full bg-primary-dashboard text-primary-foreground">{props.assigneeName.charAt(0)}</div>
                            <span className="text-xs font-medium text-foreground">
                                {props.assigneeName}
                            </span>
                        </div>
                        <span className="min-w-3 min-h-5 border-x border-x-border hidden sm:block"></span>

                        <span className="text-xs">
                            <span className="font-semibold text-black">Estimated:</span> {props.estimatedHours} H
                        </span>

                        <span className="text-xs">
                            <span className="font-semibold text-black">Worked:</span> {props.workedHours} H
                        </span>
                    </div>
                </div>

                {/* Right progress */}
                <div className="flex w-full lg:min-w-45 lg:w-auto flex-col gap-5 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span className="font-medium text-foreground">{props.progressPercentage}%</span>
                    </div>

                    <Progress value={props.progressPercentage} />
                </div>
            </div>
        </Card>
    )
}
