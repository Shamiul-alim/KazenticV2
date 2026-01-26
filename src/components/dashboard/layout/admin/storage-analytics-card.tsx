import CardContainer from '../../card-container'
import { File, FilePlay, Folder, Image } from 'lucide-react'
import { SummaryCard } from '../../summary-card'
import { BillingProgress } from '../../admin/billing-progress'

export default function StorageAnalyticsCard() {
    return (
        <CardContainer className="col-span-1" title="Storage Analytics">
            {/* Header */}
            <div className="flex flex-col gap-4 justify-center items-center w-full mb-4">
                <h4 className="text-lg font-semibold">40.2 GB</h4>
                <p className="text-xs text-muted-foreground">of 100 GB has been utilized</p>

                <BillingProgress className="w-full" usedSegments={40} totalSegments={50} />
                <p className="text-xs text-muted-foreground">60% remaining</p>
            </div>

            <div className="grid min-[400px]:grid-cols-2 gap-4">
                <SummaryCard
                    icon={<File />}
                    label="Documents"
                    value={24}
                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                />
                <SummaryCard
                    icon={<Folder />}
                    label="ZIP Files"
                    value={24}
                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                />
                <SummaryCard
                    icon={<Image />}
                    label="Images"
                    value={2}
                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                />
                <SummaryCard
                    icon={<FilePlay />}
                    label="Videos"
                    value={2}
                    iconClassName="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/60"
                />
            </div>
        </CardContainer>
    )
}
