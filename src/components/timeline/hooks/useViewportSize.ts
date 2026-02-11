"use client";

import { useEffect, useState } from "react";
import { getRadixScrollViewport } from "../utils/dom";

export function useViewportSize(scrollRoot: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const viewport = getRadixScrollViewport(scrollRoot.current);
    if (!viewport) return;

    const update = () =>
      setSize({ width: viewport.clientWidth, height: viewport.clientHeight });

    update();

    const ro = new ResizeObserver(update);
    ro.observe(viewport);

    return () => ro.disconnect();
  }, [scrollRoot]);

  return size;
}
