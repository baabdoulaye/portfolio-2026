import { Children, useEffect, useRef, type ReactNode } from "react";

/**
 * Navigation horizontale crantée : molette, touches clavier (flèches, Espace) et swipe tactile (horizontal & vertical).
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

  // Coordonnées de départ du touch pour mobile
  const touchStart = useRef<{ x: number; y: number } | null>(null);

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
      const direction =
        (Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX) > 0
          ? 1
          : -1;
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

    // Gestion du clavier : Flèches + Barre d'espace
    const onKeyDown = (event: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if (event.code === "Space") {
        event.preventDefault();
        select(activeRef.current + 1);
        return;
      }

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        select(activeRef.current + 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        select(activeRef.current - 1);
      }
    };

    // Gestion tactile mobile (swipe horizontal et vertical)
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touchStart.current || !touch || lockedRef.current) return;

      const deltaX = touchStart.current.x - touch.clientX;
      const deltaY = touchStart.current.y - touch.clientY;

      const threshold = 45; // Seuil minimum en px pour déclencher le swipe

      // Swipe horizontal prédominant
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        lockedRef.current = true;
        if (deltaX > 0) {
          select(activeRef.current + 1); // Glisse vers la gauche -> suivant
        } else {
          select(activeRef.current - 1); // Glisse vers la droite -> précédent
        }
      }
      // Swipe vertical prédominant
      else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
        lockedRef.current = true;
        if (deltaY > 0) {
          select(activeRef.current + 1); // Glisse vers le haut -> suivant
        } else {
          select(activeRef.current - 1); // Glisse vers le bas -> précédent
        }
      }

      touchStart.current = null;
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(settleTimer);
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
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
