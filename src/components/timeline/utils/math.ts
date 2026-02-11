export function clamp(n: number, minV: number, maxV: number) {
    return Math.max(minV, Math.min(maxV, n));
}
