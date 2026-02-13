import { differenceInDays, startOfDay } from "date-fns";

export function getMonthUnitWidth(cellWidth: number) {
    return cellWidth / 7;
}

export function dayIndexFromStart(startWeek: Date, date: Date) {
    return differenceInDays(startOfDay(date), startOfDay(startWeek));
}

export function getMonthBarRect(opts: {
    startWeek: Date;
    start: Date;
    due: Date;
    cellWidth: number;
}) {
    const unit = getMonthUnitWidth(opts.cellWidth);

    const sDay = dayIndexFromStart(opts.startWeek, opts.start);
    const dDay = dayIndexFromStart(opts.startWeek, opts.due);

    const startCol = Math.floor(sDay / 7);
    const endCol = Math.floor(dDay / 7);


    const inset = Math.min(6, Math.round(unit * 0.15)); 

    const left = sDay * unit + inset;
    const rawWidth = (dDay - sDay + 1) * unit - inset * 2;
    const width = Math.max(10, rawWidth);

    return { left, width, startCol, endCol, unit };
}
