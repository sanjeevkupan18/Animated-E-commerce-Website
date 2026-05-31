import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const { addToCart } = useCart();
  const sectionsRef = useRef([]);
  const heroRef = useRef(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedIds, setAddedIds] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(heroRef.current?.querySelectorAll(".h-line"),
        { y: "110%", skewY: 4 },
        { y: "0%", skewY: 0, stagger: 0.1, duration: 1, ease: "power4.out", delay: 0.2 }
      );

      sectionsRef.current.forEach((section, i) => {
        if (!section) return;
        const isEven = i % 2 === 0;
        const img = section.querySelector(".prod-img");
        const infos = section.querySelectorAll(".prod-info");

        gsap.fromTo(img,
          { x: isEven ? 100 : -100, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 70%" } }
        );
        gsap.fromTo(infos,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 68%" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const handleAdd = (product) => {
    const size = selectedSizes[product.id] || 10;
    addToCart(product, size);
    setAddedIds(p => ({ ...p, [product.id]: true }));
    setTimeout(() => setAddedIds(p => ({ ...p, [product.id]: false })), 1800);
  };

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} style={{
        minHeight: "55vh", display: "flex", alignItems: "flex-end",
        padding: "140px 10vw 70px",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "70px 70px", opacity: 0.4,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px" }}>
            — The Full Collection
          </p>
          {["ALL", "MODELS"].map((word, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <h1 className="h-line font-display" style={{
                display: "block",
                fontSize: "clamp(4rem, 10vw, 9rem)", lineHeight: 0.88,
                color: i === 1 ? "transparent" : "var(--text)",
                WebkitTextStroke: i === 1 ? "1.5px var(--accent)" : "none",
              }}>{word}</h1>
            </div>
          ))}
          <p style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: "400px", marginTop: "20px" }}>
            Four distinct silhouettes. One relentless purpose. Find the shoe that matches your pace.
          </p>
        </div>
      </section>

      {/* Products */}
      {products.map((product, i) => {
        const isEven = i % 2 === 0;
        const accentColors = ["#C8FF00", "#00FFD1", "#F0EDE8", "#5a8a1e"];
        const ac = accentColors[i];
        return (
          <section key={product.id} ref={el => (sectionsRef.current[i] = el)} style={{
            minHeight: "90vh", display: "flex", alignItems: "center",
            padding: "80px 10vw", gap: "80px",
            background: i % 2 === 0 ? "var(--bg)" : "var(--surface)",
            flexDirection: isEven ? "row" : "row-reverse",
            overflow: "hidden",
          }}>
            {/* Image */}
            <div className="prod-img hover-card" style={{
              flex: "0 0 46%", aspectRatio: "1",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", padding: "48px",
              background: `radial-gradient(circle at 55% 45%, ${ac}08 0%, transparent 65%)`,
            }}>
              {product.badge && (
                <div style={{
                  position: "absolute", top: "20px", left: "20px",
                  background: "var(--accent)", color: "#000",
                  padding: "5px 14px", fontSize: "0.62rem", fontWeight: "700",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                }}>{product.badge}</div>
              )}
              <img src={product.image} alt={`${product.name} shoe`} loading="lazy"
                style={{
                  width: "100%", objectFit: "contain", maxHeight: "340px",
                  filter: `drop-shadow(0 24px 64px ${ac}22)`,
                  transition: "transform 0.7s ease, filter 0.5s ease",
                }}
                onMouseEnter={e => { e.target.style.transform = "scale(1.05) rotate(-2deg)"; e.target.style.filter = `drop-shadow(0 30px 80px ${ac}44)`; }}
                onMouseLeave={e => { e.target.style.transform = "scale(1) rotate(0deg)"; e.target.style.filter = `drop-shadow(0 24px 64px ${ac}22)`; }}
                onError={e => { e.target.style.display = "none"; }}
              />
              <div style={{
                position: "absolute", bottom: "20px", right: "20px",
                color: "var(--muted)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase",
              }}>{product.color}</div>
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <p className="prod-info" style={{ color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>
                {product.category} — #{String(product.id).padStart(2, "0")}
              </p>
              <h2 className="prod-info font-display" style={{ fontSize: "clamp(3rem, 6.5vw, 6.5rem)", lineHeight: 0.88, marginBottom: "10px" }}>
                {product.name}
              </h2>
              <p className="prod-info" style={{ color: ac, fontSize: "1.05rem", fontStyle: "italic", marginBottom: "22px", letterSpacing: "0.02em" }}>
                "{product.tagline}"
              </p>
              <p className="prod-info" style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.9, maxWidth: "440px", marginBottom: "28px" }}>
                {product.description}
              </p>

              {/* Features */}
              <div className="prod-info" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                {product.features.map(f => (
                  <span key={f} className="hover-card" style={{
                    padding: "6px 14px", fontSize: "0.7rem", letterSpacing: "0.08em",
                    textTransform: "uppercase", color: "var(--muted)",
                    transition: "color 0.3s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                  >{f}</span>
                ))}
              </div>

              {/* Sizes */}
              <div className="prod-info" style={{ marginBottom: "28px" }}>
                <p style={{ color: "var(--muted)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>
                  Select Size (US)
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.sizes.map(s => {
                    const sel = selectedSizes[product.id] === s;
                    return (
                      <button key={s} onClick={() => setSelectedSizes(p => ({ ...p, [product.id]: s }))} style={{
                        width: "44px", height: "44px",
                        background: sel ? "var(--accent)" : "transparent",
                        color: sel ? "#000" : "var(--text)",
                        border: `1px solid ${sel ? "var(--accent)" : "var(--border2)"}`,
                        fontSize: "0.8rem", fontWeight: "600", cursor: "pointer",
                        transition: "all 0.22s",
                        boxShadow: sel ? "0 0 12px rgba(200,255,0,0.3)" : "none",
                      }}>{s}</button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="prod-info">
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "22px" }}>
                  <span style={{ fontSize: "2.4rem", fontWeight: "700" }}>${product.price}</span>
                  <span style={{ color: "var(--muted)", textDecoration: "line-through", fontSize: "1.1rem" }}>${product.originalPrice}</span>
                  <span style={{ background: "var(--accent)", color: "#000", padding: "2px 10px", fontSize: "0.7rem", fontWeight: "700" }}>
                    SAVE ${product.originalPrice - product.price}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button className="btn-accent glow-on-hover" onClick={() => handleAdd(product)} style={{ minWidth: "160px" }}>
                    <span>{addedIds[product.id] ? "✓ Added!" : "Add to Cart"}</span>
                  </button>
                  <button className="btn-outline"><span>Buy Now</span></button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </main>
  );
}
