"use client"

import { CreatePayslip } from "@/components/payroll/payment-history/CreatePayslip"
import { useRouter } from "next/navigation"

export default function CreatePayrollPage() {
    const router = useRouter()

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-white min-h-screen">
            <CreatePayslip onBack={() => router.back()} />
        </div>
    )
}
