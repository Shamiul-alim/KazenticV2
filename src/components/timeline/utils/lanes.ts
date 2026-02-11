import { differenceInDays, isValid, parseISO } from "date-fns";

export function rangesOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number) {
    return aStart <= bEnd && bStart <= aEnd;
}

export function isValidTask(t: { startDate: string; dueDate: string }) {
    return isValid(parseISO(t.startDate)) && isValid(parseISO(t.dueDate));
}

export function findFirstAvailableRow<T extends { id: string; row?: number; startDate: string; dueDate: string }>(
    tasks: T[],
    movingId: string,
    startIdx: number,
    endIdx: number,
    startDate: Date,
) {
    let row = 0;

    while (true) {
        const conflict = tasks.some((t) => {
            if (t.id === movingId) return false;
            const tRow = t.row ?? 0;
            if (tRow !== row) return false;

            const tStart = differenceInDays(parseISO(t.startDate), startDate);
            const tEnd = differenceInDays(parseISO(t.dueDate), startDate);

            return rangesOverlap(startIdx, endIdx, tStart, tEnd);
        });

        if (!conflict) return row;
        row += 1;
    }
}

export function buildLanesByIndex<T extends { row?: number; startDate: string; dueDate: string }>(
    tasks: T[],
    getIndex: (t: T) => { startIdx: number; endIdx: number },
) {
    const validTasks = tasks.filter(isValidTask);

    const sorted = [...validTasks].sort((a, b) => {
        const aRow = a.row ?? 0;
        const bRow = b.row ?? 0;
        if (aRow !== bRow) return aRow - bRow;

        const ai = getIndex(a);
        const bi = getIndex(b);
        if (ai.startIdx !== bi.startIdx) return ai.startIdx - bi.startIdx;
        return ai.endIdx - bi.endIdx;
    });

    const laneEnds: number[] = [];
    const positioned: (T & { lane: number })[] = [];

    for (const task of sorted) {
        const { startIdx, endIdx } = getIndex(task);
        const preferredLane = Math.max(0, task.row ?? 0);

        if (preferredLane >= laneEnds.length) {
            for (let i = laneEnds.length; i <= preferredLane; i++) {
                laneEnds.push(Number.NEGATIVE_INFINITY);
            }
        }

        let assignedLane = -1;
        for (let i = preferredLane; i < laneEnds.length; i++) {
            if (laneEnds[i] < startIdx) {
                assignedLane = i;
                break;
            }
        }

        if (assignedLane === -1) {
            assignedLane = laneEnds.length;
            laneEnds.push(endIdx);
        } else {
            laneEnds[assignedLane] = endIdx;
        }

        positioned.push({ ...task, lane: assignedLane });
    }

    return { positioned, laneCount: laneEnds.length };
}
