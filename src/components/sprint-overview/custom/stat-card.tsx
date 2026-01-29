import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type StatCardProps = {
    label: string
    total: number
}

export function StatCard({ label, total }: StatCardProps) {
    return (
        <Card className="bg-[#FDFDFD]">
            <CardHeader>
                <CardTitle className="text-sm font-semibold text-[#191F38]">
                    {label}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex items-center justify-center rounded-lg bg-[#F2F9FE] py-8 border border-[#EBEBEB]">
                    <span className="text-4xl font-semibold text-[#4157FE]">
                        {total}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
