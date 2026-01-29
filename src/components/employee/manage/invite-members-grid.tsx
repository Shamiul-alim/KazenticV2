import { EmployeeCard } from './employee-card'
import { EMPLOYEE_DATA } from '@/data/employees-data'

export default function InviteMembersGrid() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'>
            {
                EMPLOYEE_DATA.map((emp) => (
                    <EmployeeCard
                        key={emp.id}
                        name={emp.name}
                        designation={emp.designation}
                        phone={emp.phone}
                        email={emp.email}
                        status={emp.status}
                        viewMode="invite"
                    />
                ))
            }
        </div>
    )
}
