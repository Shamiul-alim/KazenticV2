import CardContainer from '../../card-container'
import { ISSUE_TICKETS } from '@/data/dashboard-data'
import { TicketCard } from '../../admin/ticket-card'

export default function RecentTicketsCard() {
    return (
        <CardContainer childrenClassName='space-y-4 overflow-y-scroll max-h-180' title="Recent Tickets">
            {
                ISSUE_TICKETS.map((ticket, index) => (
                    <TicketCard
                        key={index}
                        title={ticket.title}
                        category={ticket.category}
                        date={ticket.date}
                        time={ticket.time}
                        assignee={ticket.assignee}
                        ticketId={ticket.ticketId}
                        status={ticket.status}
                        priority={ticket.priority}
                    />
                ))
            }
        </CardContainer>
    )
}
