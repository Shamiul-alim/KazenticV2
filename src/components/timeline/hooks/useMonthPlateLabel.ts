"use client";

import { useEffect, useRef, useState } from "react";
import { clamp } from "../utils/math";

export function useMonthPlateLabel(args: {
    scrollLeft: number;
    cellWidth: number;
    bucketsLen: number;
    plateWidth: number;
    labelAtIndex: (idx: number) => string;
}) {
    const { scrollLeft, cellWidth, bucketsLen, plateWidth, labelAtIndex } = args;

    const [label, setLabel] = useState("");
    const [prevLabel, setPrevLabel] = useState("");
    const [dir, setDir] = useState<"forward" | "backward">("forward");
    const [step, setStep] = useState<"idle" | "from" | "to">("idle");

    const lastLeftRef = useRef(0);

    useEffect(() => {
        if (!bucketsLen || cellWidth <= 0) return;

        const focusX = scrollLeft + plateWidth; // IMPORTANT: focus after the plate
        const idx = clamp(Math.floor(focusX / cellWidth), 0, bucketsLen - 1);

        const next = labelAtIndex(idx);
        if (!next) return;

        const nextDir = scrollLeft > lastLeftRef.current ? "forward" : "backward";
        lastLeftRef.current = scrollLeft;

        if (next !== label) {
            setDir(nextDir);
            setPrevLabel(label);
            setLabel(next);
            setStep("from");
            requestAnimationFrame(() => setStep("to"));
        }
    }, [scrollLeft, cellWidth, bucketsLen, plateWidth, labelAtIndex, label]);

    useEffect(() => {
        if (step !== "to") return;
        const t = window.setTimeout(() => setStep("idle"), 180);
        return () => window.clearTimeout(t);
    }, [step]);

    return { label, prevLabel, dir, step };
}
