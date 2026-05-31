import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const canUseCursor =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    window.innerWidth > 900;
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!canUseCursor) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX = window.innerWidth / 2, ringY = window.innerHeight / 2;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const lerp = () => {
      ringX += (mouseX - ringX) * 0.11;
      ringY += (mouseY - ringY) * 0.11;
      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(lerp);
    };

    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");

    window.addEventListener("mousemove", onMove);

    // Re-attach hover listeners via event delegation
    const handleMouseOver = (e) => {
      const el = e.target.closest("a, button, [data-cursor], .hover-card, .product-card");
      if (el) onEnter();
    };
    const handleMouseOut = (e) => {
      const el = e.target.closest("a, button, [data-cursor], .hover-card, .product-card");
      if (el) onLeave();
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    rafId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, [canUseCursor]);

  if (!canUseCursor) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
