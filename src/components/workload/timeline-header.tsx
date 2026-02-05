export type Day = {
    date: string;
    label: string;
    capacityHours: number;
}

type TimelineHeaderProps = {
    days: Day[];
    dayWidth: number;
    rowHeight: number;
}

export default function TimelineHeader({ days, dayWidth, rowHeight }: TimelineHeaderProps) {
    return (
        <div className="sticky top-0 z-20 bg-background border-b"
            style={{ height: rowHeight }}
        >
            <div className="px-3 py-2 border-b text-primary font-medium bg-[#F2F9FE]">
                January 2025
            </div>
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${days.length}, ${dayWidth}px)`,

                }}
            >
                {days.map(day => (
                    <div key={day.date}>
                        <div
                            className="px-3 py-2 font-medium border-r text-center text-primary"
                        >
                            <div>{day.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
