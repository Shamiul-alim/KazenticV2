import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../ui/avatar"
import { Box } from "lucide-react"
import { Card, CardContent } from "../../ui/card"

const activities = Array.from({ length: 10 }).map(() => ({
    user: "John Doe",
    action: `Created "Trading Bot" project in the project management module.`,
}))

export function ActivityList() {
    return (
        <div className="space-y-2 max-h-90 overflow-y-auto p-1">
            {activities.map((a, i) => (
                <Card key={i}>
                    <CardContent className="flex gap-4 px-4">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://i.pravatar.cc/100" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col gap-1 justify-center">
                            <p className="font-medium text-[13px]">{a.user}</p>
                            <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                                <Box className="h-4 w-4 text-primary-dashboard" />
                                {a.action}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
