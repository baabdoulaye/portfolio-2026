import { useEffect, useRef } from "react";

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full min-w-full min-h-full object-cover object-[65%_center] sm:object-center opacity-100 will-change-transform"
      >
        <source src="/High_angle_shot_bit_adventu.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
