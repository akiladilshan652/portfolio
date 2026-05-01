import { useEffect, useRef } from "react";

/** Adds .in-view to elements with .reveal when they intersect */
export function useReveal() {
  const observed = useRef(false);
  useEffect(() => {
    if (observed.current) return;
    observed.current = true;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
