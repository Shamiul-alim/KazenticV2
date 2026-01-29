import { payrollStatsData } from "@/data/payroll-data"

interface StatCardProps {
    icon: React.ElementType
    label: string
    value: string | number
    iconClassName: string
    bgClassName: string
}

function StatCard({ icon: Icon, label, value, iconClassName, bgClassName }: StatCardProps) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm min-w-0 overflow-hidden">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bgClassName}`}>
                <Icon className={`h-6 w-6 ${iconClassName}`} />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate sm:whitespace-normal">{label}</p>
                <p className="text-xl font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    )
}

export function PayrollStats() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {payrollStatsData.map((stat, index) => (
                <StatCard
                    key={index}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    iconClassName={stat.iconClassName}
                    bgClassName={stat.bgClassName}
                />
            ))}
        </div>
    )
}
