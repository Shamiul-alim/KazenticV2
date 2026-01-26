import CardContainer from '../card-container'
import { RECENT_EMAILS } from '@/data/dashboard-data'
import { EmailItem } from '../recent-items/email-item'

export default function RecentEmailsCard() {
    return (
        <CardContainer childrenClassName="space-y-3 overflow-y-auto max-h-108 pr-2" title="Recent Emails">
            {
                RECENT_EMAILS.map((email) => (
                    <EmailItem
                        key={email.id}
                        starred={email.starred}
                        title={email.title}
                        sender={email.sender}
                        time={email.time}
                    />
                ))
            }
        </CardContainer>
    )
}
