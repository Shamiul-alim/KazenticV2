export type TagDef = {
    id: string;
    label: string;
    color: string;
};

export const PRESET_COLORS = [
    "#4C2FB8",
    "#2563EB",
    "#0EA5E9",
    "#10B981",
    "#F59E0B",
    "#F97316",
    "#EF4444",
    "#EC4899",
    "#14B8A6",
    "#64748B",
];

export function pickColor(i: number) {
    return PRESET_COLORS[i % PRESET_COLORS.length] ?? "#4C2FB8";
}

export function norm(s: string) {
    return String(s ?? "").trim().toLowerCase();
}

export function uid(prefix = "id") {
    const c: any = globalThis.crypto;
    const v =
        c?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${prefix}_${v}`;
}

export function makeTimerSubId(taskId: string | number) {
    return `timer-${taskId}-${uid("t")}`;
}
