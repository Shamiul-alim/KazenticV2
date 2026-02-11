import { differenceInDays, startOfWeek } from "date-fns";

export function bucketIndexFromDate(
    mode: "day" | "week" | "month",
    startDate: Date,
    d: Date,
) {
    if (mode === "month") {
        const w = startOfWeek(d, { weekStartsOn: 1 });
        const base = startOfWeek(startDate, { weekStartsOn: 1 });
        return Math.floor(differenceInDays(w, base) / 7);
    }
    return differenceInDays(d, startDate);
}
