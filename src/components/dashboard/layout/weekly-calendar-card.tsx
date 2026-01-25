import CardContainer from '../card-container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Ban, CalendarDays, CalendarFold } from 'lucide-react'
import { Underline } from '../underline'
import { CalendarEvent } from '../recent-items/calendar/calendar-event'
import { NoticeItem } from '../recent-items/notice-item'
import { LeaveItem } from '../recent-items/leave-item'
import { CALENDAR_EVENTS, LEAVE_ITEMS, NOTICE_ITEMS } from '@/data/dashboard-data'

enum WEEKLY_CALENDAR_TABS {
    EVENTS = "events",
    NOTICES = "notices",
    LEAVES = "leaves",
}

export default function WeeklyCalendarCard() {
    return (
        <CardContainer childrenClassName='p-0' title="Weekly Calendar">
            {/* Calendar dates */}
            <div className="px-4 pt-4">
                <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                        <span key={d}>{d}</span>
                    ))}
                </div>

                <div className="mt-2 grid grid-cols-7 text-center">
                    {[14, 15, 16, 17, 18, 19, 20].map((day, i) => (
                        <div key={day} className="flex justify-center">
                            <span
                                className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${i === 0
                                    ? "bg-primary-dashboard text-primary-dashboard-foreground"
                                    : "text-foreground"
                                    }`}
                            >
                                {day}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <Tabs defaultValue={WEEKLY_CALENDAR_TABS.EVENTS}
                className="w-full py-4"
            >
                {/* Tabs header */}
                <TabsList className="relative bg-transparent p-0" variant="line">
                    <TabsTrigger value={WEEKLY_CALENDAR_TABS.EVENTS}>
                        <CalendarDays className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                        Events
                        <Underline />
                    </TabsTrigger>

                    <TabsTrigger value={WEEKLY_CALENDAR_TABS.NOTICES}>
                        <CalendarFold className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                        Recent Notices
                        <Underline />
                    </TabsTrigger>

                    <TabsTrigger value={WEEKLY_CALENDAR_TABS.LEAVES}>
                        <Ban className="inline-block w-4 h-4 mr-2 mb-0.5 data-[state=active]:text-primary-dashboard" />
                        Leaves
                        <Underline />
                    </TabsTrigger>
                </TabsList>
                <TabsContent value={WEEKLY_CALENDAR_TABS.EVENTS}>
                    <div className="space-y-3 px-4 overflow-y-auto h-77">
                        {
                            CALENDAR_EVENTS.map((event) => (
                                <CalendarEvent
                                    key={event.id}
                                    id={event.id}
                                    title={event.title}
                                    date={event.date}
                                    time={event.time}
                                    attendees={event.attendees}
                                    meetingLink={event.meetingLink}
                                />
                            ))
                        }
                    </div>
                </TabsContent>
                <TabsContent value={WEEKLY_CALENDAR_TABS.NOTICES}>
                    <div className="space-y-3 px-4 overflow-y-auto h-77">
                        {
                            NOTICE_ITEMS.map((notice, index) => (
                                <NoticeItem
                                    key={notice.id}
                                    id={notice.id}
                                    title={notice.title}
                                    description={notice.description}
                                    status={notice.status}
                                    timeAgo={notice.timeAgo}
                                />
                            ))
                        }
                    </div>
                </TabsContent>
                <TabsContent value={WEEKLY_CALENDAR_TABS.LEAVES}>
                    <div className="space-y-3 px-4 overflow-y-auto h-77">
                        {
                            LEAVE_ITEMS.map((leave) => (
                                <LeaveItem
                                    key={leave.id}
                                    title={leave.title}
                                    description={leave.description}
                                    dateRange={leave.dateRange}
                                />
                            ))
                        }
                    </div>
                </TabsContent>
            </Tabs>
        </CardContainer>
    )
}
