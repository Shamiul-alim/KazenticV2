import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import { MoreHorizontal, Settings, RefreshCw, Filter, Maximize, Maximize2 } from 'lucide-react'
import { ResponsiveContainer } from 'recharts'
import { DropdownMenuCheckboxItem } from '../ui/dropdown-menu'
import { WidgetMenu } from '../custom/widget-menu'

type CardContainerProps = {
    className?: string
    title: string
    children: React.ReactNode
    filterBtn?: boolean
}

export default function CardContainer({ className, title, children, filterBtn = true }: CardContainerProps) {
    return (
        <Card className={cn("rounded-xl gap-0 py-0", className)}>
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between bg-[#F2F9FE] rounded-t-xl py-3 border-b">
                <CardTitle className="text-sm font-semibold text-[#191F38]">
                    {title}
                </CardTitle>

                <div className="flex items-center gap-3 text-muted-foreground">
                    <RefreshCw className="h-4 w-4 cursor-pointer" />
                    <Maximize2 className="h-4 w-4 cursor-pointer" />
                    {filterBtn && <Filter className="h-4 w-4 cursor-pointer" />}
                    <Settings className="h-4 w-4 cursor-pointer" />
                    {/* <MoreHorizontal className="h-4 w-4 cursor-pointer" /> */}
                    <WidgetMenu />
                </div>
            </CardHeader>

            {/* Chart */}
            <CardContent className="py-4 bg-[#FDFDFD]">
                {children}
            </CardContent>
        </Card>
    )
}
