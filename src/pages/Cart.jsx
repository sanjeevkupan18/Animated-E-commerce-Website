import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, count } = useCart();
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll(".h-line"),
        { y: "110%", skewY: 4 },
        { y: "0%", skewY: 0, stagger: 0.1, duration: 1, ease: "power4.out", delay: 0.15 }
      );
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current.querySelectorAll(".cart-item, .summary-box"),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.65, ease: "power3.out", delay: 0.2 }
        );
      }
    });
    return () => ctx.revert();
  }, [cart.length]);

  return (
    <main className="cart-page" style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section ref={heroRef} className="cart-hero" style={{
        padding: "140px 10vw 60px",
        background: "var(--surface)", borderBottom: "1px solid var(--border)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "70px 70px", opacity: 0.4,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>— Your Bag</p>
          <div style={{ overflow: "hidden" }}>
            <h1 className="h-line font-display" style={{ display: "block", fontSize: "clamp(4rem, 9vw, 8rem)", lineHeight: 0.9 }}>
              CART ({count})
            </h1>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 10vw 80px" }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "120px 0" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              border: "1px solid var(--border)", display: "flex",
              alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px", fontSize: "2rem", color: "var(--muted)",
            }}>◻</div>
            <h2 className="font-display" style={{ fontSize: "3.5rem", color: "var(--muted)", marginBottom: "16px" }}>EMPTY</h2>
            <p style={{ color: "var(--muted)", marginBottom: "36px", fontSize: "0.95rem" }}>No shoes yet. Let's fix that.</p>
            <Link to="/products">
              <button className="btn-accent"><span>Shop Now ↗</span></button>
            </Link>
          </div>
        ) : (
          <div ref={containerRef} className="cart-layout" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "56px", alignItems: "start" }}>
            {/* Items */}
            <div>
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="cart-item hover-card" style={{
                  display: "flex", gap: "24px", alignItems: "flex-start",
                  padding: "28px", marginBottom: "16px", opacity: 0,
                }}>
                  {/* Image */}
                  <div style={{
                    width: "120px", height: "90px", flexShrink: 0,
                    background: "var(--surface2)", border: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                    position: "relative",
                  }}>
                    <img src={item.image} alt={item.name} loading="lazy"
                      style={{ width: "100%", objectFit: "contain", maxHeight: "78px", transition: "transform 0.4s ease" }}
                      onMouseEnter={e => (e.target.style.transform = "scale(1.08)")}
                      onMouseLeave={e => (e.target.style.transform = "scale(1)")}
                      onError={e => { e.target.style.display = "none"; }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <h3 className="font-display" style={{ fontSize: "1.6rem", letterSpacing: "0.04em" }}>{item.name}</h3>
                      <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--accent)" }}>
                        ${(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                    <p style={{ color: "var(--muted)", fontSize: "0.78rem", marginBottom: "3px" }}>Category: {item.category}</p>
                    <p style={{ color: "var(--muted)", fontSize: "0.78rem", marginBottom: "20px" }}>
                      Size: US {item.size} &nbsp;·&nbsp; ${item.price} each
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {/* Qty stepper */}
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)" }}>
                        <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} style={{
                          background: "none", border: "none", color: "var(--text)", cursor: "pointer",
                          padding: "8px 14px", fontSize: "1.1rem", transition: "color 0.2s",
                          lineHeight: 1,
                        }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                        >−</button>
                        <span style={{
                          padding: "0 14px", fontSize: "0.9rem", minWidth: "32px",
                          textAlign: "center", lineHeight: "2.4",
                          borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)",
                        }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} style={{
                          background: "none", border: "none", color: "var(--text)", cursor: "pointer",
                          padding: "8px 14px", fontSize: "1.1rem", transition: "color 0.2s",
                          lineHeight: 1,
                        }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                        >+</button>
                      </div>

                      <button onClick={() => removeFromCart(item.id, item.size)} style={{
                        background: "none", border: "none", color: "var(--muted)", cursor: "pointer",
                        fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
                        padding: "0", transition: "color 0.2s",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#ff4444")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                      >Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="summary-box cart-summary hover-card" style={{
              padding: "36px", position: "sticky", top: "100px", opacity: 0,
              background: "var(--surface)",
            }}>
              <h2 className="font-display" style={{ fontSize: "2rem", marginBottom: "32px", letterSpacing: "0.05em" }}>ORDER SUMMARY</h2>

              {[
                ["Subtotal", `$${total.toLocaleString()}`],
                ["Shipping", "FREE"],
                ["Tax (est.)", `$${(total * 0.08).toFixed(2)}`],
              ].map(([label, val]) => (
                <div key={label} style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: "14px", fontSize: "0.88rem",
                }}>
                  <span style={{ color: "var(--muted)" }}>{label}</span>
                  <span style={{ color: label === "Shipping" ? "var(--accent)" : "var(--text)", fontWeight: label === "Shipping" ? "700" : "400" }}>{val}</span>
                </div>
              ))}

              <div style={{ height: "1px", background: "var(--border)", margin: "20px 0 24px" }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "28px" }}>
                <span style={{ fontWeight: "700", fontSize: "1rem" }}>Total</span>
                <span style={{ fontWeight: "700", fontSize: "1.5rem", color: "var(--accent)" }}>
                  ${(total * 1.08).toFixed(2)}
                </span>
              </div>

              <button className="btn-accent glow-on-hover" style={{ width: "100%", padding: "16px", fontSize: "0.82rem", marginBottom: "10px" }}>
                <span>Proceed to Checkout →</span>
              </button>
              <Link to="/products">
                <button className="btn-outline" style={{ width: "100%", padding: "14px", fontSize: "0.78rem" }}>
                  <span>Continue Shopping</span>
                </button>
              </Link>

              {/* Trust row */}
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
                {["🔒 Secure Checkout", "🚚 Free Returns 90 days", "🌱 Carbon Neutral"].map(t => (
                  <p key={t} style={{ color: "var(--muted)", fontSize: "0.72rem", marginBottom: "7px", display: "flex", alignItems: "center", gap: "8px" }}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
