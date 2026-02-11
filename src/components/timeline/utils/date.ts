import {
    addDays,
    differenceInDays,
    isValid,
    max as dfMax,
    min as dfMin,
    parseISO,
    startOfWeek,
} from "date-fns";

export function toValidDates(dateStrings: string[]) {
    return dateStrings.map((s) => parseISO(s)).filter(isValid);
}

export function getTimelineRange(tasks: { startDate: string; dueDate: string }[]) {
    const parsedStartDates = toValidDates(tasks.map((t) => t.startDate));
    const parsedEndDates = toValidDates(tasks.map((t) => t.dueDate));

    const today = new Date();
    const minTaskDate = parsedStartDates.length ? dfMin(parsedStartDates) : today;
    const maxTaskDate = parsedEndDates.length ? dfMax(parsedEndDates) : today;

    const BUFFER_BEFORE = 180;
    const BUFFER_AFTER = 180;

    return {
        start: addDays(minTaskDate, -BUFFER_BEFORE),
        end: addDays(maxTaskDate, BUFFER_AFTER),
    };
}

export function buildDayBuckets(start: Date, end: Date) {
    const totalDays = differenceInDays(end, start) + 1;
    return Array.from({ length: totalDays }, (_, i) => addDays(start, i));
}

export function buildWeekBuckets(start: Date, end: Date) {
    const startW = startOfWeek(start, { weekStartsOn: 1 });
    const endW = startOfWeek(end, { weekStartsOn: 1 });

    const totalWeeks = Math.floor(differenceInDays(endW, startW) / 7) + 1;
    return Array.from({ length: totalWeeks }, (_, i) => addDays(startW, i * 7));
}
