import CardContainer from '../card-container'
import { SummaryCard } from '../summary-card'
import { Ban, CalendarDays, CalendarX2, CheckCircle2 } from 'lucide-react'

export default function LeavesCard() {
    return (
        <CardContainer className="flex-1" childrenClassName="grid grid-cols-2 gap-4" title={<>Leaves <span className="text-xs font-light text-muted-foreground">(Monthly)</span></>}>
            <SummaryCard
                icon={<CalendarDays />}
                label="Annual Leaves"
                value={24}
                iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
            />
            <SummaryCard
                icon={<CheckCircle2 />}
                label="Approved"
                value={24}
                iconClassName="bg-success/10 text-success border-success/60"
            />
            <SummaryCard
                icon={<Ban />}
                label="Emergency"
                value={2}
                iconClassName="bg-destructive/10 text-destructive border-destructive/60"
            />
            <SummaryCard
                icon={<CalendarX2 />}
                label="Unpaid Leave"
                value={2}
                iconClassName="bg-cyan-500/10 text-cyan-500 border-cyan-500/60"
            />
        </CardContainer>
    )
}
