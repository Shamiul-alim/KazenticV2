import CardContainer from '../card-container'
import { ArrowDownLeft, CheckCircle2, ChevronDown, Eye, Hourglass, Pause, PencilLine, RefreshCcw, XCircle } from 'lucide-react'
import { SummaryCard } from '../summary-card'

export default function KazenticOverview() {
    return (
        <CardContainer
            className="flex-2"
            childrenClassName="grid grid-cols-4 gap-4"
            title={<span>Kaznetic Overview <ChevronDown className="w-4 h-4 inline-block text-primary-dashboard" /></span>}
        >
            <SummaryCard
                icon={<PencilLine />}
                label="To Do"
                value={24}
                iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
            />
            <SummaryCard
                icon={<Hourglass />}
                label="In Progress"
                value={24}
                iconClassName="bg-purple-600/10 text-purple-600 border-purple-600/60"
            />
            <SummaryCard
                icon={<Pause />}
                label="On Hold"
                value={24}
                iconClassName="bg-orange-600/10 text-orange-600 border-orange-600/60"
            />
            <SummaryCard
                icon={<XCircle />}
                label="Cancelled"
                value={24}
                iconClassName="bg-red-600/10 text-red-600 border-red-600/60"
            />
            <SummaryCard
                icon={<ArrowDownLeft />}
                label="Backlog"
                value={24}
                iconClassName="bg-sky-600/10 text-sky-600 border-sky-600/60"
            />
            <SummaryCard
                icon={<Eye />}
                label="Code Review"
                value={24}
                iconClassName="bg-slate-600/10 text-slate-600 border-slate-600/60"
            />
            <SummaryCard
                icon={<CheckCircle2 />}
                label="Completed"
                value={24}
                iconClassName="bg-success/10 text-success border-success/60"
            />
            <SummaryCard
                icon={<RefreshCcw />}
                label="In Review"
                value={24}
                iconClassName="bg-amber-700/10 text-amber-700 border-amber-700/60"
            />
        </CardContainer>
    )
}
