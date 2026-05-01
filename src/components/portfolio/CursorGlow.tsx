import { useEffect, useRef, useState } from "react";

/**
 * Detect coarse pointer / small viewport — no cursor glow on touch devices.
 */
const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);

const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isTouchDevice()) return;
    setEnabled(true);
    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx - 200}px, ${cy - 200}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[55] h-[400px] w-[400px] rounded-full opacity-60 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.35), hsl(var(--accent) / 0.12) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
};

export default CursorGlow;
