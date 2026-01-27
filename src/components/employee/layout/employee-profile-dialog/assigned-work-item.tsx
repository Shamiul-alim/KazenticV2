import { Card } from "@/components/employee/ui/card"
import { Badge } from "@/components/employee/ui/badge"
import { Button } from "@/components/employee/ui/button"
import { Play, Pause, Trash } from "lucide-react"
import { cn } from "@/lib/utils"

export function AssignedWorkItem({ work }: any) {
    return (
        <Card className="flex flex-row justify-between p-4 text-xs">
            {/* Left */}
            <div className="flex gap-4">
                <div className="mt-1 h-4 w-4 rounded-full border-2 border-primary" />

                <div className="space-y-2">
                    <p className="font-medium">{work.title}</p>

                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-purple-400 text-purple-600 bg-purple-50">
                            {work.project}
                        </Badge>

                        <Badge variant="outline" className="border-blue-400 text-blue-600 bg-blue-50">
                            {work.taskId}
                        </Badge>

                        {work.billable && (
                            <Badge variant="outline" className="border-green-500 text-green-600">
                                $
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                <p className="text-muted-foreground">
                    {work.spent}/{work.total}
                </p>

                <Button
                    size="icon"
                    variant="outline"
                    className={cn(
                        "h-9 w-9",
                        work.running && "text-red-500 border-red-500"
                    )}
                >
                    {work.running ? (
                        <Pause className="h-4 w-4" />
                    ) : (
                        <Play className="h-4 w-4" />
                    )}
                </Button>

                <Button size="icon" variant="outline" className="h-9 w-9 text-red-500">
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    )
}
