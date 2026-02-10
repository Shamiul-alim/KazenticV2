import { Card, CardContent } from "@/components/ui/card"

type Props = {
    label: string
    count: number
    icon: React.ReactNode
    onClick?: () => void
}

export function ProjectSummaryCard({
    label,
    count,
    icon,
    onClick,
}: Props) {
    return (
        <Card
            className="cursor-pointer hover:shadow-md transition rounded-md"
            onClick={onClick}
        >
            <CardContent className="flex items-center gap-4 p-0">
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[#F2F9FE] border border-[#4157FEB2]">
                    {icon}
                </div>
                <div>
                    <p className="text-[#191F38] font-semibold">{label}</p>
                    <p className="font-medium text-muted-foreground">{count}</p>
                </div>
            </CardContent>
        </Card>
    )
}
