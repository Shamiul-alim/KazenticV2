import { StatsCard } from '../../stats-card'
import { Ban, CalendarDays, CalendarFold, ClipboardList, CloudLightning, File, LifeBuoy, Mail } from 'lucide-react'

export default function AdminStatSection() {
    return (
        <div className="p-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4 border-b border-b-border">
            <StatsCard
                title="Emails"
                left={{ value: "12", label: "Unread", color: "text-blue-600" }}
                right={{ value: "100", label: "Received Today", color: "text-green-600" }}
                icon={<Mail className="w-5 h-5 text-border-strong" />}
            />

            <StatsCard
                title="Tasks"
                left={{ value: "12", label: "Completed", color: "text-green-600" }}
                right={{ value: "2", label: "Pending", color: "text-orange-500" }}
                icon={<ClipboardList className="w-5 h-5 text-border-strong" />}
            />

            <StatsCard
                title="Storage"
                left={{ value: "80 GB", label: "Overall Storage Used", color: "text-blue-600" }}
                icon={<CloudLightning className="w-5 h-5 text-border-strong" />}
            />

            <StatsCard
                title="Leaves"
                left={{ value: "12", label: "Pending", color: "text-orange-500" }}
                right={{ value: "2", label: "Approved", color: "text-green-600" }}
                icon={<Ban className="w-5 h-5 text-border-strong" />}
            />

            <StatsCard
                title="Events"
                left={{ value: "12", label: "Today", color: "text-primary-dashboard" }}
                right={{ value: "100", label: "Upcoming", color: "text-success" }}
                icon={<CalendarDays className="w-5 h-5 text-border-strong" />}
            />

            <StatsCard
                title="Notices"
                left={{ value: "12", label: "New Notices", color: "text-primary-dashboard" }}
                icon={<CalendarFold className="w-5 h-5 text-border-strong" />}
            />

            <StatsCard
                title="Forms"
                left={{ value: "80", label: "New Submissions", color: "text-primary-dashboard" }}
                // right={{ value: "2", label: "Approved", color: "text-green-600" }}
                icon={<File className="w-5 h-5 text-border-strong" />}
            />

            <StatsCard
                title="Support"
                left={{ value: "12", label: "Tickets Resolved", color: "text-success" }}
                right={{ value: "2", label: "Tickets Pending", color: "text-orange-500" }}
                icon={<LifeBuoy className="w-5 h-5 text-border-strong" />}
            />
        </div>
    )
}
