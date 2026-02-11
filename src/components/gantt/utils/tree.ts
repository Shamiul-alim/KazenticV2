import { addDays, format, startOfWeek, parseISO, isValid } from "date-fns";
import { GanttTask } from "@/data/gantt/gantt.types";

/** Flatten tree -> list */
export function flattenAllTasks(tasks: GanttTask[]) {
    const out: GanttTask[] = [];
    const walk = (t: GanttTask) => {
        out.push(t);
        t.children?.forEach(walk);
    };
    tasks.forEach(walk);
    return out;
}

/** ✅ Remove a task by id anywhere in the tree */
export function removeTaskFromTree(tasks: GanttTask[], id: string): GanttTask[] {
    const walk = (list: GanttTask[]): GanttTask[] => {
        const filtered = list
            .filter((t) => t.id !== id)
            .map((t) => {
                if (!t.children?.length) return t;
                const nextChildren = walk(t.children);
                // keep undefined if empty to match your existing data style
                return { ...t, children: nextChildren.length ? nextChildren : undefined };
            });

        return filtered;
    };

    return walk(tasks);
}

/** Generic update by id (useful for title, dates, status, etc.) */
export function updateTaskInTree(
    tasks: GanttTask[],
    id: string,
    patch:
        | Partial<GanttTask>
        | ((prev: GanttTask) => Partial<GanttTask> | GanttTask),
): GanttTask[] {
    const walk = (list: GanttTask[]): GanttTask[] => {
        return list.map((t) => {
            if (t.id === id) {
                if (typeof patch === "function") {
                    const next = patch(t);
                    return "id" in (next as any) ? (next as GanttTask) : ({ ...t, ...(next as any) } as GanttTask);
                }
                return { ...t, ...patch };
            }
            if (!t.children?.length) return t;
            return { ...t, children: walk(t.children) };
        });
    };
    return walk(tasks);
}

/** Backward-compatible: your existing date updater */
export function updateTaskDatesInTree(
    tasks: GanttTask[],
    id: string,
    startDate: string,
    dueDate: string,
): GanttTask[] {
    return updateTaskInTree(tasks, id, { startDate, dueDate });
}

/** Convenience: update title */
export function updateTaskTitleInTree(tasks: GanttTask[], id: string, title: string): GanttTask[] {
    return updateTaskInTree(tasks, id, { title });
}

/** Reorder helper */
function reorderArray(list: GanttTask[], movingId: string, targetId: string) {
    const from = list.findIndex((t) => t.id === movingId);
    const to = list.findIndex((t) => t.id === targetId);
    if (from < 0 || to < 0) return list;

    const next = [...list];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
}

/** Backward-compatible: reorder within same parent */
export function reorderWithinParent(
    tasks: GanttTask[],
    parentId: string | null,
    movingId: string,
    targetId: string,
): GanttTask[] {
    if (parentId == null) return reorderArray(tasks, movingId, targetId);

    const walk = (list: GanttTask[]): GanttTask[] => {
        return list.map((t) => {
            if (t.id === parentId) {
                const children = t.children ?? [];
                return { ...t, children: reorderArray(children, movingId, targetId) };
            }
            if (!t.children?.length) return t;
            return { ...t, children: walk(t.children) };
        });
    };

    return walk(tasks);
}

/** Insert task (root or into parent children) */
export function insertTaskIntoTree(
    tasks: GanttTask[],
    task: GanttTask,
    parentId: string | null,
    insertIndex?: number,
): GanttTask[] {
    if (parentId == null) {
        const next = [...tasks];
        const idx =
            typeof insertIndex === "number"
                ? Math.max(0, Math.min(insertIndex, next.length))
                : next.length;
        next.splice(idx, 0, task);
        return next;
    }

    const walk = (list: GanttTask[]): GanttTask[] => {
        return list.map((t) => {
            if (t.id !== parentId) {
                if (!t.children?.length) return t;
                return { ...t, children: walk(t.children) };
            }

            const children = [...(t.children ?? [])];
            const idx =
                typeof insertIndex === "number"
                    ? Math.max(0, Math.min(insertIndex, children.length))
                    : children.length;
            children.splice(idx, 0, task);

            return { ...t, children };
        });
    };

    return walk(tasks);
}

/* -----------------------------
   Date helpers for buckets
-------------------------------- */

export function dateFromBucketIndex(args: {
    mode: "day" | "week" | "month";
    startDate: Date;
    idx: number;
}) {
    const base =
        args.mode === "month"
            ? startOfWeek(args.startDate, { weekStartsOn: 1 })
            : args.startDate;

    return args.mode === "month" ? addDays(base, args.idx * 7) : addDays(base, args.idx);
}

/** Normalize to yyyy-MM-dd (accepts Date or ISO string) */
export function toYMD(d: Date | string) {
    const dt = typeof d === "string" ? parseISO(d) : d;
    if (!isValid(dt)) return format(new Date(), "yyyy-MM-dd");
    return format(dt, "yyyy-MM-dd");
}

/* -----------------------------
   Create task factories
-------------------------------- */

export function createTaskFromGrid(args: {
    idPrefix: string;
    mode: "day" | "week" | "month";
    startDate: Date;

    startIdx: number;
    cellSpan?: number;
    dueIdx?: number;

    title?: string;
    status?: string;
    assignee?: string;
}): GanttTask {
    const span = Math.max(1, args.cellSpan ?? 1);
    const dueIdx = typeof args.dueIdx === "number" ? args.dueIdx : args.startIdx + span - 1;

    const start = dateFromBucketIndex({ mode: args.mode, startDate: args.startDate, idx: args.startIdx });
    const due = dateFromBucketIndex({ mode: args.mode, startDate: args.startDate, idx: dueIdx });

    return {
        id: `${args.idPrefix}-${Date.now()}`,
        title: args.title ?? "New Task",
        startDate: format(start, "yyyy-MM-dd"),
        dueDate: format(due, "yyyy-MM-dd"),
        status: args.status ?? "IN_PROGRESS",
        assignee: args.assignee ?? "/assets/profile.svg",
    } as GanttTask;
}

export function createTaskFromDates(args: {
    idPrefix: string;
    title: string;
    startDate: Date | string;
    dueDate: Date | string;
    status?: string;
    assignee?: string;
}): GanttTask {
    return {
        id: `${args.idPrefix}-${Date.now()}`,
        title: args.title || "New Task",
        startDate: toYMD(args.startDate),
        dueDate: toYMD(args.dueDate),
        status: args.status ?? "IN_PROGRESS",
        assignee: args.assignee ?? "/assets/profile.svg",
    } as GanttTask;
}

type CreateNewTaskFromGridArgs = {
    idPrefix: string;
    startDate: Date;
    mode: "day" | "week" | "month";
    startIdx: number;
    cellSpan: number;
    status?: string;
    assignee?: string;
};

type CreateNewTaskFromIsoArgs = {
    id: string;
    title: string;
    startISO: string;
    dueISO: string;
    status?: string;
    assignee?: string;
};

export function createNewTask(args: CreateNewTaskFromGridArgs | CreateNewTaskFromIsoArgs): GanttTask {
    // Branch 1: grid-style
    if ("startIdx" in args) {
        return createTaskFromGrid({
            idPrefix: args.idPrefix,
            startDate: args.startDate,
            mode: args.mode,
            startIdx: args.startIdx,
            cellSpan: args.cellSpan,
            status: args.status,
            assignee: args.assignee,
        });
    }

    // Branch 2: your panel-style (id + ISO)
    return {
        id: args.id,
        title: args.title || "New Task",
        startDate: toYMD(args.startISO),
        dueDate: toYMD(args.dueISO),
        status: args.status ?? "IN_PROGRESS",
        assignee: args.assignee ?? "/assets/profile.svg",
    } as GanttTask;
}
