import CardContainer from '../../card-container'
import { StatItem } from '../../admin/stat-item'

export default function LeadsOverviewCard() {
    return (
        <CardContainer childrenClassName='grid grid-cols-2 m-4' title="Leads Overview">
            <div className="border-r-2 border-muted pb-6">
                <StatItem value={126} label="Not Contacted" color="orange" />
            </div>

            <div className="pl-6">
                <StatItem value={25} label="Contacted" color="green" />
            </div>

            <div className="border-r-2 border-muted pr-6 pt-6 border-t-2">
                <StatItem value={12} label="Closed" color="purple" />
            </div>

            <div className="pl-6 pt-6 border-t-2 border-muted">
                <StatItem value={26} label="Lost" color="red" />
            </div>
        </CardContainer>
    )
}
