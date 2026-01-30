import { LeaveConfiguration } from "@/components/leaves/manage-leaves/leave-configuration"

export default function LeaveConfigurationPage() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-6 lg:gap-8">
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <LeaveConfiguration />
                </div>
            </div>
        </div>
    )
}
