import { Video } from "lucide-react"
import Image from "next/image"
import { Card } from "../../ui/card"

export function CalendarEvent() {
    return (
        <Card>
            <div className="flex items-start gap-3 border-l-2 border-l-primary-dashboard pl-3">
                <div className="space-y-2">
                    <p className="text-sm font-medium">Team Sprint Review</p>

                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <div className="flex -space-x-1">
                            <Image src="/assets/dashboard/avatar-1.jpg" alt="" width={20} height={20} className="rounded-full" />
                            <Image src="/assets/dashboard/avatar-2.jpg" alt="" width={20} height={20} className="rounded-full" />
                            <Image src="/assets/dashboard/avatar-3.jpg" alt="" width={20} height={20} className="rounded-full" />
                        </div>
                        <span>14 Jul, Mon @ 10:00 PM</span>
                    </div>
                </div>
            </div>

            <button className="flex items-center gap-2 rounded-md bg-primary-dashboard/10 px-3 py-1 text-xs font-medium text-primary-dashboard">
                <Video className="w-4 h-4" /> Join
            </button>
        </Card>
    )
}
