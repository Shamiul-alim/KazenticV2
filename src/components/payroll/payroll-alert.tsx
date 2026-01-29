import { AlertCircle } from "lucide-react"
import Link from "next/link"

export function PayrollAlert() {
    return (
        <div className="w-full flex items-start sm:items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5 sm:mt-0" />
            <p className="leading-relaxed">
                <span className="font-semibold">28 Pay Slips are pending approval across different stages.</span>{" "}
                <Link href="/payroll/salary-revision" className="font-medium text-blue-600 hover:underline inline-block whitespace-nowrap">
                    Review now
                </Link>
            </p>
        </div>
    )
}
