import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ActivityList } from "./activity-list"
import { ReminderBanner } from "./reminder-banner"
import { AssignedWorkList } from "./assigned-work-list"
import { AttendanceTable } from "./attendance-table"

export function EmployeeProfileBody() {
    return (
        <div className="px-6 pb-6 space-y-2">
            {/* Profile */}
            <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                    <AvatarImage src="https://i.pravatar.cc/150" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>

                <div>
                    <p className="font-semibold text-lg">John Doe</p>
                    <p className="text-muted-foreground">Developer</p>
                </div>
            </div>

            <Separator className="my-2" />

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-6">
                <InfoItem label="Email" value="john@gmail.com" />
                <InfoItem label="Phone Number" value="01834849-457" />
                <InfoItem label="Team" value="N/A" />
            </div>


            {/* Tabs */}
            <Tabs defaultValue="activity" className="mt-4 w-full">
                <TabsList className="mb-4 w-full bg-background border-y-border border-y rounded-none font-light text-[11px]">
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="assigned">Assigned Work</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                </TabsList>

                <TabsContent value="activity">
                    <ActivityList />
                </TabsContent>

                <TabsContent value="assigned">
                    <div className="space-y-6 text-muted-foreground text-sm">
                        <ReminderBanner />
                        <AssignedWorkList />
                    </div>
                </TabsContent>


                {/* <TabsContent value="attendance">
                    <div className="text-muted-foreground text-sm">
                        Attendance data unavailable.
                    </div>
                </TabsContent> */}
                <TabsContent value="attendance">
                    <div className="text-muted-foreground text-xs">
                        <AttendanceTable />
                    </div>
                </TabsContent>

            </Tabs>
        </div>
    )
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-xs font-medium">{label}</p>
            <p className="text-muted-foreground">{value}</p>
        </div>
    )
}
