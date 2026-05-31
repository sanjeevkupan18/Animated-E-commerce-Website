import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";

export default function PageTransition({ children }) {
  const location = useLocation();
  const bar1 = useRef(null);
  const bar2 = useRef(null);
  const contentRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!contentRef.current || !bar1.current || !bar2.current) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set([bar1.current, bar2.current], { scaleY: 0, transformOrigin: "top" });
      gsap.set(contentRef.current, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();
    tl.set([bar1.current, bar2.current], { scaleY: 1, transformOrigin: "top" })
      .to(bar1.current, { scaleY: 0, transformOrigin: "top", duration: 0.45, ease: "power4.inOut" })
      .to(bar2.current, { scaleY: 0, transformOrigin: "top", duration: 0.45, ease: "power4.inOut" }, "-=0.3")
      .fromTo(contentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "-=0.08"
      );
    return () => tl.kill();
  }, [location.pathname]);

  return (
    <>
      {/* Bar 1 - accent */}
      <div ref={bar1} style={{
        position: "fixed", inset: 0, background: "var(--accent)",
        zIndex: 9999, pointerEvents: "none", transformOrigin: "top", transform: "scaleY(0)",
      }} />
      {/* Bar 2 - dark overlay (slightly delayed) */}
      <div ref={bar2} style={{
        position: "fixed", inset: 0, background: "var(--bg)",
        zIndex: 9998, pointerEvents: "none", transformOrigin: "top", transform: "scaleY(0)",
      }} />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
