import { useEffect, useRef, useState } from "react";

/**
 * Global scroll-driven frame background.
 * - Fixed full-viewport canvas behind every section.
 * - One scroll progress (0 → 1) for the entire document drives:
 *     • frame index (1 → 96)
 *     • zoom (1.0 → ~1.7, with a boost during the eye-open frames 34–43)
 *     • brightness, eye-glow, vignette
 * - Mobile: static last frame (no scrubbing) for performance.
 */

const TOTAL_FRAMES = 96;
const ZOOM_START_FRAME = 34;
const ZOOM_PEAK_FRAME = 43;

// Global zoom curve (driven by scroll progress 0..1)
const ZOOM_MIN = 1.0;
const ZOOM_MAX = 1.75; // final scroll position

// Extra zoom "boost" during the eye-open moment
const EYE_ZOOM_BOOST = 0.18;

const frameSrc = (i: number) =>
  `/frames/frame-${String(i).padStart(3, "0")}.jpg`;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

const FrameBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const eyeGlowRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(0);

  // Detect mobile / coarse pointer
  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches ||
          window.innerWidth < 768
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Preload all frames
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];
    let done = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      const finish = () => {
        done++;
        if (!cancelled) setLoaded(done);
      };
      img.onload = finish;
      img.onerror = finish;
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, []);

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const idx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameIndex)));
    const img = imagesRef.current[idx - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // Resize canvas to viewport (DPR-aware)
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Scroll-driven scrub (single global progress)
  useEffect(() => {
    if (isMobile) {
      drawFrame(TOTAL_FRAMES);
      if (stageRef.current) {
        stageRef.current.style.transform = `scale(${ZOOM_MAX.toFixed(3)})`;
      }
      return;
    }

    let raf = 0;
    let targetFrame = 1;
    let currentFrame = 1;
    let targetZoom = ZOOM_MIN;
    let currentZoom = ZOOM_MIN;
    let targetBrightness = 1;
    let currentBrightness = 1;
    let targetGlow = 0;
    let currentGlow = 0;
    let targetVignette = 0.4;
    let currentVignette = 0.4;

    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp(window.scrollY / scrollable) : 0;

      // Map global scroll → frame
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);

      // Base global zoom: smooth growth from MIN → MAX across whole page
      const baseZoom = ZOOM_MIN + (ZOOM_MAX - ZOOM_MIN) * easeInOut(progress);

      // Eye-open boost between frames 34–43 (peak around 43)
      let eyeT = 0;
      if (targetFrame >= ZOOM_START_FRAME && targetFrame <= ZOOM_PEAK_FRAME) {
        eyeT = (targetFrame - ZOOM_START_FRAME) / (ZOOM_PEAK_FRAME - ZOOM_START_FRAME);
      } else if (targetFrame > ZOOM_PEAK_FRAME) {
        // Ease boost back out over the next ~15 frames
        const tail = clamp((targetFrame - ZOOM_PEAK_FRAME) / 15);
        eyeT = 1 - tail;
      }
      const eyeBoost = EYE_ZOOM_BOOST * easeInOut(eyeT);

      targetZoom = baseZoom + eyeBoost;
      targetBrightness = 1 + 0.2 * easeInOut(eyeT);
      targetGlow = easeInOut(eyeT);
      // Vignette grows slightly as we scroll deeper (focus inward)
      targetVignette = 0.4 + 0.5 * easeInOut(progress);
    };

    const tick = () => {
      currentFrame += (targetFrame - currentFrame) * 0.18;
      currentZoom += (targetZoom - currentZoom) * 0.12;
      currentBrightness += (targetBrightness - currentBrightness) * 0.12;
      currentGlow += (targetGlow - currentGlow) * 0.15;
      currentVignette += (targetVignette - currentVignette) * 0.1;

      currentFrameRef.current = currentFrame;
      drawFrame(currentFrame);

      if (stageRef.current) {
        stageRef.current.style.transform = `scale(${currentZoom.toFixed(4)})`;
        stageRef.current.style.filter = `brightness(${currentBrightness.toFixed(3)})`;
      }
      if (eyeGlowRef.current) {
        eyeGlowRef.current.style.opacity = currentGlow.toFixed(3);
      }
      if (vignetteRef.current) {
        vignetteRef.current.style.opacity = currentVignette.toFixed(3);
      }

      raf = requestAnimationFrame(tick);
    };

    update();
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isMobile, loaded]);

  const pct = Math.round((loaded / TOTAL_FRAMES) * 100);

  return (
    <>
      {/* Fixed full-viewport background layer */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none"
      >
        <div
          ref={stageRef}
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${ZOOM_MIN})`,
            transformOrigin: "50% 42%", // center on eyes
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ display: "block" }}
          />
        </div>

        {/* Eye glow */}
        <div
          ref={eyeGlowRef}
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: 0,
            background:
              "radial-gradient(ellipse 22% 8% at 50% 42%, hsl(210 100% 70% / 0.55), transparent 70%)",
          }}
        />

        {/* Vignette */}
        <div
          ref={vignetteRef}
          className="absolute inset-0"
          style={{
            opacity: 0.4,
            background:
              "radial-gradient(ellipse at center, transparent 30%, hsl(230 35% 4% / 0.7) 75%, hsl(230 35% 4%) 100%)",
          }}
        />

        {/* Soft dark overlay so text on top stays readable */}
        <div className="absolute inset-0 bg-background/55" />

        {/* Subtle blur tint */}
        <div
          className="absolute inset-0"
          style={{ backdropFilter: "blur(2px)" }}
        />

        {/* Neon accents */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      </div>

      {/* Loader pill */}
      {!isMobile && loaded < TOTAL_FRAMES && (
        <div className="fixed bottom-6 right-6 z-50 text-xs text-muted-foreground glass rounded-full px-3 py-1.5">
          loading {pct}%
        </div>
      )}
    </>
  );
};

export default FrameBackground;
