import { Progress } from "@/components/ui/progress"
import { MoreHorizontal } from "lucide-react"
import { Card } from "../ui/card"
import { Badge } from "@/components/sprint-report/ui/badge"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "../ui/avatar"

type Props = {
    name: string
    progress: number
}

export function ProjectCard({ name, progress }: Props) {
    return (
        <Card className="min-w-64 p-4 flex flex-col items-start space-y-4 text-xs">
            {/* Header */}
            <div className="flex flex-row justify-between items-start w-full">
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-1 items-center">
                        <span className="text-sm font-semibold text-primary-foreground bg-success rounded-sm px-1.5 py-0.5">{name.slice(0, 2)}</span>
                        <h3 className="font-semibold ">{name}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 justify-between mt-2">
                        <div className="space-y-1 flex flex-col">
                            <span>Status</span>
                            <Badge variant="outline" className="rounded-md bg-success/20 border border-success/60 text-success">ACTIVE</Badge>
                        </div>
                        <div className="space-y-1 flex flex-col">
                            <span>Project Type</span>
                            <Badge variant="outline" className="rounded-md bg-primary-dashboard/20 border border-primary-dashboard/60 text-primary-dashboard">Type</Badge>
                        </div>
                    </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </div>

            {/* Progress */}
            <div className="w-full flex gap-2 items-center">
                <Progress value={progress} />
                <div className="text-sm text-muted-foreground text-right">
                    {progress}%
                </div>
            </div>

            {/* Avatars */}
            <Avatar className="hidden">
                <AvatarImage src="/assets/dashboard/avatar-1.jpg" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="border-t-2 border-t-muted w-full pt-2">
                <AvatarGroup>
                    {
                        Array.from({ length: 3 }).map((_, i) => (
                            <Avatar key={i}>
                                <AvatarImage src={`/assets/dashboard/avatar-${i + 1}.jpg`} alt="avatars" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        ))
                    }
                    <AvatarGroupCount>+5</AvatarGroupCount>
                </AvatarGroup>
            </div>
        </Card>
    )
}
