import { StatsCard } from '../../stats-card'
import { Ban, ClipboardList, CloudLightning, Mail } from 'lucide-react'

// type StatItem = {
//     id: string;
//     label: string;
//     value: string | number;
//     color?: string;
//     direction?: 'left' | 'right';
// }

// type DashboardStatSectionProps = {
//     title: string;
//     stats: StatItem[];
//     icon?: React.ReactNode;
// }

export default function DashboardStatSection({ isAdmin = false }: { isAdmin?: boolean }) {
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
        </div>
    )
}
