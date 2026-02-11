"use client";

export function MonthPlate(props: {
  width: number;
  height: number;
  label: string;
  prevLabel: string;
  dir: "forward" | "backward";
  step: "idle" | "from" | "to";
}) {
  const { width, height, label, prevLabel, dir, step } = props;

  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-40"
      style={{ width, height }}
    >
      <div className="h-full w-full bg-[#F2F9FE] border-b border-[#EBEBEB] flex items-center pl-2">
        <div className="relative h-4" style={{ width: "180px" }}>
          {/* Current label */}
          <div
            className={[
              "absolute left-0 top-0 text-xs font-medium text-[#4157FE] whitespace-nowrap",
              "transition-transform transition-opacity duration-200 ease-out",
              step === "idle"
                ? "opacity-100 translate-x-1"
                : step === "from"
                  ? dir === "forward"
                    ? "opacity-0 translate-x-10"
                    : "opacity-0 -translate-x-10"
                  : "opacity-0 translate-x-0",
            ].join(" ")}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}
