import { Bell } from "lucide-react"
import { Switch } from "@/components/employee/ui/switch"

export function ReminderBanner() {
    return (
        <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3 text-xs">
            <div className="flex items-start gap-3">
                <div className="h-8 w-1 rounded-full bg-primary-dashboard" />

                <div className="flex flex-col gap-1">
                    <p className="flex items-center gap-2 font-medium text-primary">
                        <Bell className="h-4 w-4" />
                        Send Reminder
                    </p>
                    <p className="text-muted-foreground">
                        Notifies team members to start the timer when they're inactive.
                    </p>
                </div>
            </div>

            <Switch defaultChecked />
        </div>
    )
}
