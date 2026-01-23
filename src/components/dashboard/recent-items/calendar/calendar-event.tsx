import Image from "next/image"

export function CalendarEvent() {
    return (
        <div className="flex items-center justify-between rounded-lg border px-4 py-3">
            <div className="flex items-start gap-3">
                {/* Left indicator */}
                <span className="mt-1 h-10 w-1 rounded-full bg-primary" />

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

            <button className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Join
            </button>
        </div>
    )
}
