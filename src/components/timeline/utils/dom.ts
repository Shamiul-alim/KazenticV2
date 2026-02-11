export function getRadixScrollViewport(root: HTMLDivElement | null) {
    return root?.querySelector(
        "[data-radix-scroll-area-viewport]",
    ) as HTMLDivElement | null;
}
