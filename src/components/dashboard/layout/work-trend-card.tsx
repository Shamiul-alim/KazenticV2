import CardContainer from '../card-container'
import { Card } from '../ui/card'
import { WorkTrendChart } from '../work-trend/work-trend-chart'
import { InsightRow } from '../work-trend/insight-row'

export default function WorkTrendCard() {
    return (
        <CardContainer childrenClassName="p-0" title="John Doe's Work Trend">
            <Card className="space-y-3 rounded-none flex flex-col border-0 text-xs mt-4 border-t border-t-muted-foreground/10">
                <WorkTrendChart />

                <div className="space-y-3 w-full">
                    <h4 className="font-semibold text-muted-foreground">
                        Key Insights
                    </h4>

                    <InsightRow
                        icon="clock"
                        title="Peak Hours"
                        value="10-11 AM, 1-2 PM"
                    />
                    <InsightRow
                        icon="activity"
                        title="Most Productive Day"
                        value="Wednesday | 9H:25M"
                    />
                    <InsightRow
                        icon="hourglass"
                        title="Total Working Hours This Week"
                        value="44H:00M"
                    />
                </div>

                {/* Highlight Box */}
                <div className="rounded-xl border border-indigo-300 bg-indigo-50 p-4 text-indigo-700">
                    💡 Your most productive hours are 10-11 AM and 1-2 PM. Consider
                    scheduling important tasks during these times.
                </div>
            </Card>
        </CardContainer>
    )
}
