export function toMinutes(v: string): number {
    const raw = String(v ?? "").trim().toLowerCase();
    if (!raw || raw === "-" || raw === "—") return 0;

    const colon = raw.match(/^(\d{1,4})\s*:\s*(\d{1,2})$/);
    if (colon) {
        const h = parseInt(colon[1], 10);
        const m = parseInt(colon[2], 10);
        if (!Number.isNaN(h) && !Number.isNaN(m) && m >= 0 && m < 60) {
            return Math.max(0, h * 60 + m);
        }
        return 0;
    }

    const dotAsMinutes = raw.match(/^(\d{1,4})\s*\.\s*(\d{2})$/);
    if (dotAsMinutes) {
        const h = parseInt(dotAsMinutes[1], 10);
        const m = parseInt(dotAsMinutes[2], 10);
        if (!Number.isNaN(h) && !Number.isNaN(m) && m >= 0 && m < 60) {
            return Math.max(0, h * 60 + m);
        }
    }

    const hMatch = raw.match(/(\d+(\.\d+)?)\s*h/);
    const mMatch = raw.match(/(\d+)\s*m/);

    let minutes = 0;
    if (hMatch) minutes += Math.round(parseFloat(hMatch[1]) * 60);
    if (mMatch) minutes += parseInt(mMatch[1], 10);

    if (!hMatch && !mMatch) {
        const num = Number(raw.replace(/[^\d.]/g, ""));
        if (!Number.isNaN(num)) minutes = Math.round(num * 60);
    }

    return Math.max(0, minutes);
}

export function formatMinutes(mins: number): string {
    const m = Math.max(0, Math.round(mins));
    if (m === 0) return "-";
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    const rem = m % 60;
    return rem === 0 ? `${h}h` : `${h}h ${rem}m`;
}

export function humanizeMinutes(mins: number): string {
    const m = Math.max(0, Math.round(mins));
    const h = Math.floor(m / 60);
    const r = m % 60;

    const parts: string[] = [];
    if (h > 0) parts.push(`${h} hour${h === 1 ? "" : "s"}`);
    if (r > 0) parts.push(`${r} minute${r === 1 ? "" : "s"}`);

    if (parts.length === 0) return "0 minutes";
    return parts.join(" ");
}

export function formatClock(ts: number) {
    const s = new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return s.toLowerCase();
}

export function formatHMS(totalSeconds: number) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export function parseClockToMinutes(s: string): number | null {
    const raw = String(s ?? "").trim().toLowerCase();
    if (!raw || raw === "-" || raw === "—" || raw === "now") return null;

    const m12 = raw.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
    if (m12) {
        let h = parseInt(m12[1], 10);
        const mm = m12[2] ? parseInt(m12[2], 10) : 0;
        const ap = m12[3].toLowerCase();
        if (Number.isNaN(h) || Number.isNaN(mm) || mm < 0 || mm > 59) return null;
        h = h % 12;
        if (ap === "pm") h += 12;
        return h * 60 + mm;
    }

    const m24 = raw.match(/^(\d{1,2})\s*:\s*(\d{2})$/);
    if (m24) {
        const h = parseInt(m24[1], 10);
        const mm = parseInt(m24[2], 10);
        if (Number.isNaN(h) || Number.isNaN(mm)) return null;
        if (h < 0 || h > 23 || mm < 0 || mm > 59) return null;
        return h * 60 + mm;
    }

    return null;
}

export function formatMinutesToClock(mins: number): string {
    const m = ((Math.round(mins) % 1440) + 1440) % 1440;
    const h24 = Math.floor(m / 60);
    const mm = m % 60;
    const ap = h24 >= 12 ? "pm" : "am";
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return `${h12}:${String(mm).padStart(2, "0")} ${ap}`;
}

export function minutesDiffWrap(startM: number, endM: number): number {
    let d = endM - startM;
    if (d < 0) d += 24 * 60;
    return d;
}

export function computeDurationFromTimes(startStr: string, endStr: string): string {
    const a = parseClockToMinutes(startStr);
    const b = parseClockToMinutes(endStr);
    if (a == null || b == null) return "-";
    return formatMinutes(minutesDiffWrap(a, b));
}

export function buildTimeOptions(stepMins = 15) {
    const out: { mins: number; label: string }[] = [];
    for (let m = 0; m < 24 * 60; m += stepMins) {
        out.push({ mins: m, label: formatMinutesToClock(m) });
    }
    return out;
}
