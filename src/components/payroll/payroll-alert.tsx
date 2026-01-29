import { AlertCircle } from "lucide-react"
import Link from "next/link"

export function PayrollAlert() {
    return (
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
            <p>
                <span className="font-medium">28 Pay Slips are pending approval across different stages.</span>{" "}
                <Link href="/payroll/salary-revision" className="font-medium text-blue-600 hover:underline">
                    Review now
                </Link>
            </p>
        </div>
    )
}
