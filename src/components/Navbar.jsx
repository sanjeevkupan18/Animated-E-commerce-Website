import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Home", path: "/", num: "01" },
  { label: "Our Story", path: "/story", num: "02" },
  { label: "Products", path: "/products", num: "03" },
  { label: "Cart", path: "/cart", num: "04" },
  { label: "Profile", path: "/profile", num: "05" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);
  const descRef = useRef([]);
  const location = useLocation();
  const { count } = useCart();
  const { theme, toggle } = useTheme();

  const handleLogoClick = () => {
    setOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  useEffect(() => {
    if (!overlayRef.current) return;
    if (open) {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, { clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "power4.inOut" });
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.07, duration: 0.7, ease: "power3.out", delay: 0.35 }
      );
      gsap.fromTo(
        descRef.current.filter(Boolean),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.5, ease: "power2.out", delay: 0.55 }
      );
    } else {
      gsap.killTweensOf(overlayRef.current);
      gsap.to(overlayRef.current, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "power4.inOut" });
    }
  }, [open]);

  const isLight = theme === "light";

  return (
    <>
      {/* ── TOP BAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 8000,
        padding: "22px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
          <Link to="/" onClick={handleLogoClick} style={{ textDecoration: "none", position: "relative", zIndex: 8100 }}>
          <span className="font-display" style={{
            fontSize: "1.65rem", color: open ? "var(--accent)" : "var(--accent)",
            letterSpacing: "0.12em", lineHeight: 1,
            textShadow: "0 0 20px rgba(200,255,0,0.3)",
          }}>
            SOLESTEP
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative", zIndex: 8100 }}>
          {/* Theme toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {isLight ? "☀" : "◑"}
            </span>
            <button
              onClick={toggle}
              className={`theme-toggle ${isLight ? "active" : ""}`}
              aria-label="Toggle theme"
              style={{ border: "none" }}
            />
          </div>

          {/* Cart */}
          <Link to="/cart" onClick={() => setOpen(false)} style={{ position: "relative", color: "var(--text)", textDecoration: "none" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "4px" }}
            aria-label="Toggle navigation"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block",
                width: i === 1 ? (open ? "28px" : "20px") : "28px",
                height: "1.5px",
                background: "var(--text)",
                transition: "all 0.35s cubic-bezier(0.77,0,0.175,1)",
                transform: open
                  ? i === 0 ? "rotate(45deg) translate(4.5px,4.5px)"
                  : i === 2 ? "rotate(-45deg) translate(4.5px,-4.5px)"
                  : "none"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* ── NAV OVERLAY ── */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed", inset: 0, background: "var(--bg)", zIndex: 7500,
          clipPath: "inset(0 0 100% 0)",
          display: "flex", alignItems: "center",
          padding: "0 10vw",
          overflow: "hidden",
        }}
      >
        {/* Accent blob */}
        <div style={{
          position: "absolute", right: "5vw", top: "50%",
          transform: "translateY(-50%)",
          width: "40vw", height: "40vw", maxWidth: "500px", maxHeight: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <nav style={{ width: "100%" }}>
          {navLinks.map((link, i) => (
            <div key={link.path} style={{
              display: "flex", alignItems: "baseline", gap: "24px",
              borderBottom: "1px solid var(--border)",
              padding: "4px 0",
              overflow: "hidden",
            }}>
              <span ref={el => (descRef.current[i] = el)} className="font-display" style={{
                fontSize: "0.9rem", color: "var(--accent)", opacity: 0,
                letterSpacing: "0.1em", minWidth: "32px",
              }}>{link.num}</span>
              <Link
                to={link.path}
                ref={el => (itemsRef.current[i] = el)}
                style={{
                  display: "block", textDecoration: "none",
                  color: location.pathname === link.path ? "var(--accent)" : "var(--text)",
                  opacity: 0, flex: 1,
                }}
                onClick={() => setOpen(false)}
                onMouseEnter={e => {
                  gsap.to(e.currentTarget, { color: "var(--accent)", x: 12, duration: 0.25, ease: "power2.out" });
                }}
                onMouseLeave={e => {
                  gsap.to(e.currentTarget, {
                    color: location.pathname === link.path ? "var(--accent)" : "var(--text)",
                    x: 0, duration: 0.3, ease: "power2.out"
                  });
                }}
              >
                <span className="font-display" style={{
                  fontSize: "clamp(2.8rem, 7vw, 6rem)", letterSpacing: "0.04em", lineHeight: 1.1,
                  display: "block",
                }}>
                  {link.label}
                </span>
              </Link>
            </div>
          ))}
        </nav>

        {/* Bottom row */}
        <div style={{
          position: "absolute", bottom: "36px", left: "10vw", right: "40px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <p style={{ color: "var(--muted)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Premium Footwear — Est. 2024
          </p>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Instagram", "Twitter", "TikTok"].map(s => (
              <span key={s} className="underline-hover" style={{
                color: "var(--muted)", fontSize: "0.72rem", textTransform: "uppercase",
                letterSpacing: "0.12em", cursor: "pointer", transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >{s}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
