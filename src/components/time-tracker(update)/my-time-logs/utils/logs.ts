import type { MyLogSubEntry, MyLogTask } from "../types";
import { formatMinutes, toMinutes } from "./time";

export function padWeeklyHours(len: number, fill = "-") {
    return Array.from({ length: len }, () => fill);
}

export function safeTimeRange(sub: MyLogSubEntry): { start: string; end: string } {
    if (sub.startTime || sub.endTime) return { start: sub.startTime ?? "—", end: sub.endTime ?? "—" };
    if (sub.time && sub.time.includes("-")) {
        const [a, b] = sub.time.split("-").map((x) => x.trim());
        return { start: a || "—", end: b || "—" };
    }
    return { start: "—", end: "—" };
}

export function computeTaskFromSubs(task: MyLogTask): MyLogTask {
    const daysCount = task.weeklyHours?.length ?? 7;
    const sums = padWeeklyHours(daysCount, "0").map(() => 0);

    (task.subEntries ?? []).forEach((se) => {
        (se.weeklyHours ?? []).forEach((h, i) => {
            sums[i] += toMinutes(h);
        });
    });

    const weekly = sums.map((m) => formatMinutes(m));
    const total = formatMinutes(sums.reduce((a, b) => a + b, 0));

    return { ...task, weeklyHours: weekly, total };
}
