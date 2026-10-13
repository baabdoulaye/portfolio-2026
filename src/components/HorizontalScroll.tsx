import { Children, useEffect, useRef, type ReactNode } from "react";

/**
 * Navigation horizontale ultra-fluide : molette, clavier et scroll natif optimisé mobile.
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
  const activeRef = useRef(0);
  const isWheelingRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let scrollTimeout = 0;

    // Détection de la section active lors du scroll (natif ou programmatique)
    const handleScroll = () => {
      if (isWheelingRef.current) return;

      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        const panelWidth = track.clientWidth;
        if (panelWidth === 0) return;
        const next = Math.round(track.scrollLeft / panelWidth);

        if (next !== activeRef.current && next >= 0 && next < panels.length) {
          activeRef.current = next;
          onActiveIndexChange?.(next);
        }
      }, 50);
    };

    // Navigation à la molette sur desktop
    const onWheel = (event: WheelEvent) => {
      // Sur mobile/trackpad avec défilement horizontal naturel, on laisse couler
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();
      if (isWheelingRef.current || Math.abs(event.deltaY) < 10) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(panels.length - 1, activeRef.current + direction));

      if (next === activeRef.current) return;

      isWheelingRef.current = true;
      activeRef.current = next;
      onActiveIndexChange?.(next);

      track.scrollTo({
        left: next * track.clientWidth,
        behavior: "smooth",
      });

      window.setTimeout(() => {
        isWheelingRef.current = false;
      }, 500);
    };

    // Gestion du clavier (Desktop)
    const onKeyDown = (event: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      let next = activeRef.current;
      if (event.code === "Space" || event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        next = Math.min(panels.length - 1, activeRef.current + 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        next = Math.max(0, activeRef.current - 1);
      }

      if (next !== activeRef.current) {
        activeRef.current = next;
        onActiveIndexChange?.(next);
        track.scrollTo({
          left: next * track.clientWidth,
          behavior: "smooth",
        });
      }
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(scrollTimeout);
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onActiveIndexChange, panels.length]);

  return (
    <div
      id="portfolio-track"
      ref={trackRef}
      className="horizontal-track relative flex h-dvh w-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-none [-webkit-overflow-scrolling:touch]"
    >
      {panels.map((panel, index) => (
        <div
          key={index}
          className="h-dvh min-w-full shrink-0 snap-center snap-always overflow-y-auto overflow-x-hidden"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
