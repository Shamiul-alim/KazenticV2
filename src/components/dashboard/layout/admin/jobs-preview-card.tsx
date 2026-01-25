import React from 'react'
import CardContainer from '../../card-container'
import { SummaryCard } from '../../summary-card'
import { BriefcaseBusiness, CheckCircle2, FolderOpen } from 'lucide-react'

export default function JobsPreviewCard() {
    return (
        <CardContainer className="col-span-1" title={<>Jobs Preview <span className="text-xs font-light text-muted-foreground">(Monthly)</span></>}>
            <div className="grid min-[400px]:grid-cols-2 gap-4 p-4">
                <SummaryCard
                    icon={<BriefcaseBusiness />}
                    label="Total Jobs"
                    value={24}
                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                />
                <SummaryCard
                    icon={<FolderOpen />}
                    label="Opened"
                    value={24}
                    iconClassName="bg-purple-700/10 text-purple-700 border-purple-700/60"
                />
                <SummaryCard
                    icon={<BriefcaseBusiness />}
                    label="Closed Jobs"
                    value={2}
                    iconClassName="bg-destructive/10 text-destructive border-destructive/60"
                />
                <SummaryCard
                    icon={<CheckCircle2 />}
                    label="Posted Today"
                    value={2}
                    iconClassName="bg-success/10 text-success border-success/60"
                />
            </div>
        </CardContainer>
    )
}
