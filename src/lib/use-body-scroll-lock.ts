import { useEffect } from "react";

/**
 * Locks document scrolling while `locked` is true.
 * Uses position:fixed on body so iOS keeps the viewport stable after scroll.
 * Returns scrollbar width for compensating fixed headers.
 */
export function useBodyScrollLock(locked: boolean): number {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const prevOverflow = style.overflow;
    const prevPaddingRight = style.paddingRight;
    const prevPosition = style.position;
    const prevTop = style.top;
    const prevWidth = style.width;
    const width = window.innerWidth - document.documentElement.clientWidth;

    style.overflow = "hidden";
    style.paddingRight = width > 0 ? `${width}px` : "";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";

    return () => {
      style.overflow = prevOverflow;
      style.paddingRight = prevPaddingRight;
      style.position = prevPosition;
      style.top = prevTop;
      style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);

  if (!locked || typeof window === "undefined") {
    return 0;
  }

  return window.innerWidth - document.documentElement.clientWidth;
}
