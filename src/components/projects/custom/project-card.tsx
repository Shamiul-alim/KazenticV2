import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Lock } from "lucide-react"
import { Project } from "../types/project"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/dashboard/ui/avatar"

type Props = {
    project: Project
}

export function ProjectCard({ project }: Props) {
    return (
        <Card className="w-60 shrink-0 rounded-lg">
            <CardContent className="p-0 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="size-5 flex items-center justify-center bg-[#178D6C] rounded-sm text-sm font-semibold text-white">{project.name.charAt(0)}</span>
                        <p className="font-medium truncate text-[#191F38]">{project.name}</p>
                    </div>
                    {project.isPrivate && <Lock size={14} />}
                </div>

                {/* Pills */}
                <div className="grid grid-cols-2 gap-2 justify-start">
                    <span
                        className="flex flex-col items-start text-xs gap-1"
                    >
                        <span className="text-[11px] text-muted-foreground">Status</span>
                        <Badge
                            variant="outline"
                            style={{
                                color: project.status.color,
                                borderColor: project.status.color + "80",
                                backgroundColor: project.status.color + "20",
                            }}
                            className={cn(
                                "px-1.5 py-1 rounded-sm text-[10px] font-medium",
                            )}
                        >
                            {project.status.name.toUpperCase()}
                        </Badge>
                    </span>

                    <span
                        className="flex flex-col items-start text-xs gap-1"
                    >
                        <span className="text-[11px] text-muted-foreground">Project Type</span>
                        <Badge
                            variant="outline"
                            style={{
                                color: project.type.color,
                                borderColor: project.type.color + "80",
                                backgroundColor: project.type.color + "20",
                            }}
                            className={cn(
                                "px-1.5 py-1 rounded-sm text-[10px] font-medium",
                            )}
                        >
                            {project.type.name}
                        </Badge>
                    </span>
                </div>

                {/* Progress */}
                <div className="flex gap-5 items-center justify-between">
                    <Progress value={project.progress} />
                    <p className="text-xs text-muted-foreground">
                        {project.progress}%
                    </p>
                </div>

                {/* Members */}
                <AvatarGroup className="">
                    {project.members.slice(0, 3).map((m) => (
                        <Avatar key={m.id} size="sm">
                            <AvatarImage src={m.avatarUrl || "/avatar.png"} alt={m.name} />
                            <AvatarFallback>{m.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    ))}
                    {project.members.length > 3 && (
                        <AvatarGroupCount className="bg-[#F2F9FE] text-primary text-xs font-medium">+{project.members.length - 3}</AvatarGroupCount>
                    )}
                </AvatarGroup>
            </CardContent>
        </Card>
    )
}
