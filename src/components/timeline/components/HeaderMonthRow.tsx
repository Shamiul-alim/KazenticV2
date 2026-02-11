"use client";

export function HeaderMonthRow(props: {
  height: number;
  cellWidth: number;
  segments: {
    startIndex: number;
    length: number;
    label: string;
    year: string;
    key: string;
  }[];
}) {
  const { height, cellWidth, segments } = props;

  return (
    <div
      className="sticky top-0 z-20 border-b border-[#EBEBEB] bg-[#F2F9FE] relative"
      style={{ height }}
    >
      <div className="absolute inset-0">
        {segments.map((seg) => {
          const text = `${seg.label} ${seg.year}`;
          return (
            <div
              key={seg.key}
              className="absolute inset-y-0"
              style={{
                left: seg.startIndex * cellWidth,
                width: seg.length * cellWidth,
              }}
            >
              <div className="h-full flex items-center pl-2">
                <span className="text-[11px] leading-5 tracking-tight font-medium text-[#4157FE] whitespace-nowrap">
                  {text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
