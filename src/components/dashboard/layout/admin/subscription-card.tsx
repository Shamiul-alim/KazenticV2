import CardContainer from '../../card-container'
import { Card } from '../../ui/card'
import { Badge } from '@/components/sprint-report/ui/badge'
import { Check, TrendingUp, Users } from 'lucide-react'
import { BillingProgress } from '../../admin/billing-progress'
import { SummaryCard } from '../../summary-card'
import { Button } from '@/components/ui/Button'

export default function SubscriptionCard() {
    return (
        <CardContainer childrenClassName='flex flex-col gap-4' title="Subscription">
            <Card className="flex flex-col gap-6 text-sm">
                {/* Top Section */}
                <div className="flex flex-col justify-between items-start">
                    <div className="flex flex-row justify-between items-center w-full">
                        <div>
                            <h2 className="font-semibold text-primary-dashboard">$99</h2>
                            <p className="text-xs font-medium mt-1">Pro Plan / Month</p>
                        </div>
                        <Badge className="rounded-md border border-success/60 bg-success/20 text-success gap-1 px-2 py-0.5 text-[11px]">
                            <Check className="w-4 h-4" />
                            ACTIVE
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 text-[11px]">
                        Architecto voluptatem maiores. Perspiciatis commodi eos. Nam ex ut
                        perspiciatis rerum.
                    </p>

                </div>

                {/* Billing Cycle */}
                <div className="space-y-3 w-full text-xs">
                    <div className="flex justify-between font-medium">
                        <span>Billing Cycle</span>
                        <span className="text-muted-foreground">20% remaining</span>
                    </div>

                    <BillingProgress usedSegments={40} totalSegments={50} />

                    <div className="flex justify-between text-muted-foreground">
                        <span>Oct 2025</span>
                        <span>Nov 25</span>
                    </div>
                </div>
            </Card>
            <Card className="flex flex-col gap-6 text-xs">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <SummaryCard
                        label="Members"
                        value="24"
                        icon={<Users className="w-6 h-6 text-primary-dashboard" />}
                        iconClassName="border-primary-dashboard bg-primary-dashboard/10"
                    />
                    <SummaryCard
                        label="Usage"
                        value="80%"
                        icon={<TrendingUp className="w-6 h-6 text-success" />}
                        iconClassName="border-success bg-success/10"
                    />
                </div>

                {/* Button */}
                <Button className="bg-primary-dashboard w-full rounded-xl text-base py-2">
                    Manage Subscriptions
                </Button>
            </Card>
        </CardContainer>
    )
}
