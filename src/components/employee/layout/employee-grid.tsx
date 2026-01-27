import { EMPLOYEE_DATA } from "@/data/employees-data";
import { EmployeeProfileCard } from "../custom/employee-profile-card";

export default function EmployeeGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {
                EMPLOYEE_DATA.map((emp) => (
                    <EmployeeProfileCard
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
