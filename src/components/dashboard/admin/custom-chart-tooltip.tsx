export const CustomChartTooltip = ({ active, payload, coordinate }: any) => {
    if (!active || !payload?.length) return null

    const data = payload[0].payload

    return (
        <div>
            <div className="relative">
                {/* Bubble */}
                <div className="bg-white rounded-xl px-4 py-2 shadow-lg text-sm">
                    <p className="text-muted-foreground">
                        Task Completed : {data.completed}
                    </p>
                    <p className="text-muted-foreground">
                        Total Task : {data.total}
                    </p>
                </div>

                {/* Arrow */}
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
            </div>
        </div >
    )
}
