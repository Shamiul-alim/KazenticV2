import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import { MoreHorizontal, Settings, RefreshCw, Filter, Maximize, Maximize2 } from 'lucide-react'
import { ResponsiveContainer } from 'recharts'
import { DropdownMenuCheckboxItem } from '../ui/dropdown-menu'
import { WidgetMenu } from '../custom/widget-menu'
import { ChartSettingsDialog } from '../custom/chart/chart-settings-dialog'

type CardContainerProps = {
    className?: string
    title: string
    children: React.ReactNode
    chartTitle?: string
    chart?: boolean | React.ReactNode
    filterBtn?: boolean
}

export default function CardContainer({ className, title, children, chartTitle, chart, filterBtn = true }: CardContainerProps) {
    return (
        <Card className={cn("rounded-xl gap-0 py-0", className)}>
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between bg-[#F2F9FE] rounded-t-xl py-2 sm:py-3 px-3 sm:px-6 border-b">
                <CardTitle className="text-xs sm:text-sm font-semibold text-[#191F38] truncate pr-2">
                    {title}
                </CardTitle>

                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-muted-foreground shrink-0">
                    <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer" />
                    <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer" />
                    {filterBtn && <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 cursor-pointer" />}

                    {/* <Settings className="h-4 w-4 cursor-pointer" /> */}
                    <ChartSettingsDialog title={chartTitle || ""} isChart={!!chart}>
                        {!!chart && children}
                    </ChartSettingsDialog>
                    <WidgetMenu />
                </div>
            </CardHeader>

            {/* Chart */}
            <CardContent className="py-3 sm:py-4 px-3 sm:px-6 bg-[#FDFDFD]">
                {children}
            </CardContent>
        </Card>
    )
}
