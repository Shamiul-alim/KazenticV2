import { User, UserCheck, UserMinus, UserX } from 'lucide-react'
import { SummaryCard } from '../summary-card'

export default function HeaderSection() {
    return (
        <header className='flex flex-wrap gap-4'>
            <SummaryCard
                icon={<User size={24} />}
                label="Total Employees"
                value={24}
                className="max-w-80 pr-20"
                iconClassName="bg-blue-100 text-blue-500 border-blue-400"
            />
            <SummaryCard
                icon={<UserCheck size={24} />}
                label="Employees Online"
                value={24}
                className="max-w-80 pr-20"
                iconClassName="bg-blue-100 text-blue-500 border-blue-400"
            />
            <SummaryCard
                icon={<UserMinus size={24} />}
                label="Employees Offline"
                value={24}
                className="max-w-80 pr-20"
                iconClassName="bg-blue-100 text-blue-500 border-blue-400"
            />
            <SummaryCard
                icon={<UserX size={24} />}
                label="Employees Deactivated"
                value={24}
                className="max-w-80 pr-20"
                iconClassName="bg-blue-100 text-blue-500 border-blue-400"
            />
        </header>
    )
}
