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
        <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgClassName}`}>
                <Icon className={`h-6 w-6 ${iconClassName}`} />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xl font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    )
}

export function PayrollStats() {
    // Split stats into top row (5 items) and bottom row (1 item)
    const topRowStats = payrollStatsData.slice(0, 5);
    const bottomRowStats = payrollStatsData.slice(5);

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {topRowStats.map((stat, index) => (
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {bottomRowStats.map((stat, index) => (
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
        </div>
    )
}
