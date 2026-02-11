"use client";

import { useState } from "react";

export type HoverPos = { x: number; y: number; visible: boolean };

export function useHoverCell() {
    const [hoverPos, setHoverPos] = useState<HoverPos>({
        x: 0,
        y: 0,
        visible: false,
    });

    return { hoverPos, setHoverPos };
}
