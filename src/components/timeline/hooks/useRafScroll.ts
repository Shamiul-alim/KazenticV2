"use client";

import { useEffect, useRef, useState } from "react";
import { getRadixScrollViewport } from "../utils/dom";

export function useRafScroll(scrollRoot: React.RefObject<HTMLDivElement>) {
    const [scrollLeft, setScrollLeft] = useState(0);
    const lastLeft = useRef(0);
    const raf = useRef<number | null>(null);

    useEffect(() => {
        const viewport = getRadixScrollViewport(scrollRoot.current);
        if (!viewport) return;

        const onScroll = () => {
            lastLeft.current = viewport.scrollLeft;
            if (raf.current) return;

            raf.current = requestAnimationFrame(() => {
                raf.current = null;
                setScrollLeft(lastLeft.current);
            });
        };

        viewport.addEventListener("scroll", onScroll, { passive: true });
        setScrollLeft(viewport.scrollLeft);

        return () => {
            viewport.removeEventListener("scroll", onScroll);
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [scrollRoot]);

    return scrollLeft;
}
