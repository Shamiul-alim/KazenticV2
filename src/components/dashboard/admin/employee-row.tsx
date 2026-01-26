import { Separator } from "@/components/ui/separator"
import BronzeRankBadge from "../icons/bronze-rank-badge"
import GoldRankBadge from "../icons/gold-rank-badge"
import SilverRankBadge from "../icons/silver-rank-badge"
import { ProgressRing } from "../progress-ring"
import { Card } from "../ui/card"

type Props = {
    rank: number
    name: string
    role: string
    tasks: number
    hours: number
    productivity: number
}

export function EmployeeRow({
    rank,
    name,
    role,
    tasks,
    hours,
    productivity,
}: Props) {

    const getRankBadge = ({ rank }: { rank: number }) => {
        switch (rank) {
            case 1:
                return <GoldRankBadge className="w-8 h-8" />
            case 2:
                return <SilverRankBadge className="w-8 h-8" />
            case 3:
                return <BronzeRankBadge className="w-8 h-8" />
            default:
                return <div className="w-8 h-8 font-semibold text-sm text-muted-foreground">{rank}th</div>
        }
    }

    return (
        <Card className="p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            {/* Left */}
            <div className="flex items-center gap-4">
                {getRankBadge({ rank })}

                <div className="w-10 h-10 rounded-full bg-primary-dashboard text-white flex items-center justify-center font-semibold">
                    {name.charAt(0)}
                </div>

                <div>
                    <p className="text-xs font-semibold">{name}</p>
                    <p className="text-[11px] text-muted-foreground">{role}</p>
                </div>
            </div>


            {/* Right Stats */}
            <div className="flex items-center w-full sm:w-auto">
                <Separator orientation="vertical" className="h-10 w-0.5 mr-6 hidden sm:block" />
                <div className="flex flex-wrap items-start gap-6 sm:gap-10 w-full sm:w-auto justify-between sm:justify-start text-xs">
                    <div className="space-y-2">
                        <p className="text-muted-foreground">Tasks</p>
                        <p className="font-semibold">{tasks}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-muted-foreground">Hours</p>
                        <p className="font-semibold">{hours}</p>
                    </div>

                    <div className="space-y-2 flex flex-col items-center">
                        <p className="text-muted-foreground">Productivity</p>
                        <div className="flex gap-1 items-center">
                            <ProgressRing value={productivity} className="text-success" />
                            <span>{productivity}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
