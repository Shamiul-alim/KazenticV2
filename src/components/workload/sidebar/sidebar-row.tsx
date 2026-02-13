import { Button } from "@/components/ui/Button"
import { User } from "./left-sidebar"
import { cn } from "@/lib/utils"
import { GroupIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/employee/ui/avatar"
import { TimeLimitPopover } from "../time-limit-popover"
import ArrowRightBoldIcon from "../icons/arrow-right-bold"

type SidebarUserRowProps = {
    user: User
    isExpanded: boolean
    onToggle: () => void
    isCollapsed: boolean
}

export function SidebarUserRow({ user, isExpanded, onToggle, isCollapsed }: SidebarUserRowProps) {
    const isGroupRow = !user.avatar // Group rows have no avatar

    if (isCollapsed) {
        return (
            <Button
                variant="ghost"
                onClick={onToggle}
                className={cn(
                    "w-full flex items-center justify-center px-2 border-t border-muted h-18",
                    "hover:bg-muted transition"
                )}
            >
                {isGroupRow ? (
                    <GroupIcon className="h-6 w-6 text-muted-foreground" />
                ) : (
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback>
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                )}
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            onClick={onToggle}
            className={cn(
                "w-full flex items-center justify-between px-4 border-t border-muted h-18",
                "hover:bg-muted transition"
            )}
        >
            <div className="flex items-center gap-3">
                {isGroupRow ? (
                    <GroupIcon className="h-6 w-6 text-muted-foreground" />
                ) : (
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback>
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                )}

                <div className="text-left">
                    <p className="font-medium leading-none">
                        {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {user.role}
                    </p>
                </div>
            </div>

            {user.loggedHours && (
                <div onClick={(e) => e.stopPropagation()}>
                    <TimeLimitPopover userId={user.id} loggedHours={user.loggedHours} />
                </div>
            )}

            {user.subtasks && user.subtasks.length > 0 && (
                <ArrowRightBoldIcon
                    className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        isExpanded && "rotate-90"
                    )}
                />
            )}
        </Button>
    )
}