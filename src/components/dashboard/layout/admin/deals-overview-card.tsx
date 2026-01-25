import CardContainer from '../../card-container'
import { StatItem } from '../../admin/stat-item'

export default function DealsOverviewCard() {
    return (
        <CardContainer childrenClassName='grid grid-cols-2 m-4' title="Deals Overview">
            <div className="border-r-2 border-muted pb-6">
                <StatItem value={126} label="Qualify To Buy" color="green" />
            </div>

            <div className="pl-6">
                <StatItem value={25} label="Presentation" color="orange" />
            </div>

            <div className="border-r-2 border-muted pr-6 pt-6 border-t-2">
                <StatItem value={12} label="Contact" color="blue" />
            </div>

            <div className="pl-6 pt-6 border-t-2 border-muted">
                <StatItem value={26} label="Proposal" color="red" />
            </div>
        </CardContainer>
    )
}
