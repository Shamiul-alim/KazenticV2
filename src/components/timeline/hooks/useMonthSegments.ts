"use client";

import { useMemo } from "react";
import { format } from "date-fns";

export function useMonthSegments(buckets: Date[]) {
    return useMemo(() => {
        if (!buckets.length) return [];
        const segments: {
            startIndex: number;
            length: number;
            label: string;
            year: string;
            key: string;
        }[] = [];

        let segStart = 0;
        let currentKey = format(buckets[0], "yyyy-MM");

        for (let i = 1; i < buckets.length; i++) {
            const key = format(buckets[i], "yyyy-MM");
            if (key !== currentKey) {
                const d = buckets[segStart];
                segments.push({
                    startIndex: segStart,
                    length: i - segStart,
                    label: format(d, "MMMM"),
                    year: format(d, "yyyy"),
                    key: `${segStart}-${currentKey}`,
                });
                segStart = i;
                currentKey = key;
            }
        }

        const d = buckets[segStart];
        segments.push({
            startIndex: segStart,
            length: buckets.length - segStart,
            label: format(d, "MMMM"),
            year: format(d, "yyyy"),
            key: `${segStart}-${currentKey}`,
        });

        return segments;
    }, [buckets]);
}
