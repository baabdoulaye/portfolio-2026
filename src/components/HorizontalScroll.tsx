import { Children, useEffect, useRef, type ReactNode } from "react";

/**
 * Navigation horizontale crantée : un geste de molette = un écran.
 */
export default function HorizontalScroll({
  children,
  onActiveIndexChange,
}: {
  children: ReactNode;
  onActiveIndexChange?: (index: number) => void;
}) {
  const panels = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);
  const activeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let settleTimer = 0;
    const animateTo = (left: number) => {
      const start = track.scrollLeft;
      const distance = left - start;
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 620;
      const startedAt = performance.now();
      track.style.scrollSnapType = "none";
      const frame = (now: number) => {
        const progress = duration === 0 ? 1 : Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        track.scrollLeft = start + distance * eased;
        if (progress < 1) requestAnimationFrame(frame);
        else {
          track.scrollLeft = left;
          requestAnimationFrame(() => {
            track.style.scrollSnapType = "x mandatory";
            lockedRef.current = false;
          });
        }
      };
      requestAnimationFrame(frame);
    };

    const select = (index: number, behavior: ScrollBehavior = "smooth") => {
      const next = Math.max(0, Math.min(panels.length - 1, index));
      activeRef.current = next;
      onActiveIndexChange?.(next);
      const left = next * track.clientWidth;
      if (behavior === "smooth") animateTo(left);
      else track.scrollLeft = left;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (lockedRef.current || Math.abs(event.deltaY) + Math.abs(event.deltaX) < 8) return;
      const direction = (Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX) > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(panels.length - 1, activeRef.current + direction));
      if (next === activeRef.current) return;
      lockedRef.current = true;
      select(next);
    };

    const onScroll = () => {
      if (lockedRef.current) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        const next = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
        if (next !== activeRef.current) {
          activeRef.current = next;
          onActiveIndexChange?.(next);
        }
        track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
      }, 120);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      select(activeRef.current + (event.key === "ArrowRight" ? 1 : -1));
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(settleTimer);
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onActiveIndexChange, panels.length]);

  return (
    <div
      id="portfolio-track"
      ref={trackRef}
      className="horizontal-track relative flex h-dvh w-screen snap-x snap-mandatory overflow-x-scroll overflow-y-hidden overscroll-none"
    >
      {panels.map((panel, index) => (
        <div key={index} className="h-dvh min-w-full snap-center snap-always overflow-hidden">
          {panel}
        </div>
      ))}
    </div>
  );
}
