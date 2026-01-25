import CardContainer from '../../card-container'
import { EMPLOYEE_PERFORMANCE_DATA } from '@/data/dashboard-data'
import { EmployeeRow } from '../../admin/employee-row'

export default function EmployeesPerformanceCard() {
    return (
        <CardContainer className="mt-4" title="Employees Performance This Week">
            <div className="columns-1 p-4 space-y-3">
                {
                    EMPLOYEE_PERFORMANCE_DATA.map((employee) => (
                        <EmployeeRow
                            key={employee.rank}
                            rank={employee.rank}
                            name={employee.name}
                            role={employee.role}
                            tasks={employee.tasks}
                            hours={employee.hours}
                            productivity={employee.productivity}
                        />
                    ))
                }
            </div>
        </CardContainer>
    )
}
