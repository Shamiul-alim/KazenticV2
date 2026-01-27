import { EMPLOYEE_DATA } from '@/data/employees-data'
import { EmployeeCard } from './employee-card'

export default function EmployeeActionGrid() {
    return (
        <div className='flex flex-wrap gap-4'>
            {
                EMPLOYEE_DATA.map((emp) => (
                    <EmployeeCard
                        key={emp.id}
                        name={emp.name}
                        designation={emp.designation}
                        phone={emp.phone}
                        email={emp.email}
                        status={emp.status}
                    />
                ))
            }
        </div>
    )
}
