import { Badge } from "../sprint-report/ui/badge"
import { Check } from "lucide-react"
import { Progress } from "../ui/progress"
import { Card } from "./ui/card"

export function TopTaskItem() {
    return (
        <Card>
            <div className="flex flex-1 items-center justify-between gap-6 border-l-4 border-l-primary-dashboard p-4 rounded-none">
                <div className="space-y-2">
                    <p className="text-sm font-medium">
                        Redesign Landing page
                    </p>

                    <div className="flex flex-row items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Badge className="border-success bg-success/10 text-success rounded-sm">
                            <Check className="w-4 h-4" /> ACTIVE
                        </Badge>

                        <Badge
                            variant="outline"
                            className="border-primary-dashboard text-primary-dashboard rounded-sm bg-primary-dashboard/10"
                        >
                            Type
                        </Badge>

                        <div className="flex items-center gap-2">
                            {/* <Image
                                src="/avatar.png"
                                alt="Pat Cummins"
                                width={20}
                                height={20}
                                className="rounded-full"
                            /> */}
                            <div className="flex justify-center items-center h-5 w-5 rounded-full bg-primary-dashboard text-primary-foreground">P</div>
                            <span className="text-xs font-medium text-foreground">
                                Pat Cummins
                            </span>
                        </div>
                        <span className="min-w-3 min-h-5 border-x border-x-border"></span>

                        <span className="text-xs">
                            <span className="font-semibold text-black">Estimated:</span> 4 H
                        </span>

                        <span className="text-xs">
                            <span className="font-semibold text-black">Worked:</span> 4 H
                        </span>
                    </div>
                </div>

                {/* Right progress */}
                <div className="flex min-w-45 flex-col gap-5 border-l border-l-border pl-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span className="font-medium text-foreground">78%</span>
                    </div>

                    <Progress value={78} />
                </div>
            </div>
        </Card>
    )
}
