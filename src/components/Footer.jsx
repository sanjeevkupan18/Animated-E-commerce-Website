import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "70px 10vw 160px" }}>
      <div>
        {/* Top row */}
        <div className="footer-top-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "64px" }}>
          <div>
            <span className="font-display" style={{ fontSize: "2.2rem", color: "var(--accent)", display: "block", marginBottom: "16px", letterSpacing: "0.1em" }}>
              SOLESTEP
            </span>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.85, maxWidth: "280px", marginBottom: "24px" }}>
              Premium footwear engineered for those who push limits. Every step is a statement.
            </p>
            <div className="social-row" style={{ display: "flex", gap: "12px" }}>
              {["IG", "TW", "TT", "YT"].map(s => (
                <div key={s} className="hover-card" style={{
                  width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "0.05em",
                  color: "var(--muted)", transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                >{s}</div>
              ))}
            </div>
          </div>

          {[
            { heading: "Navigate", links: [["Home", "/"], ["Products", "/products"], ["Our Story", "/story"]] },
            { heading: "Account", links: [["Profile", "/profile"], ["Cart", "/cart"]] },
            { heading: "Support", links: [["FAQ", "#"], ["Returns", "#"], ["Contact", "#"]] },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={{ color: "var(--text)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
                {col.heading}
              </h4>
              {col.links.map(([label, path]) => (
                <Link key={path} to={path} style={{
                  display: "block", color: "var(--muted)", fontSize: "0.85rem",
                  marginBottom: "10px", textDecoration: "none", transition: "color 0.2s",
                }}
                  className="underline-hover"
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                >{label}</Link>
              ))}
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter" style={{
          background: "var(--surface2)", border: "1px solid var(--border)",
          padding: "32px 40px", marginBottom: "48px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px",
        }}>
          <div>
            <p style={{ fontWeight: "700", fontSize: "1rem", marginBottom: "4px" }}>Stay in the loop.</p>
            <p style={{ color: "var(--muted)", fontSize: "0.82rem" }}>New drops, exclusive offers, zero spam.</p>
          </div>
          <div className="footer-newsletter-form" style={{ display: "flex", gap: "0", border: "1px solid var(--border)" }}>
            <input placeholder="your@email.com" style={{
              background: "transparent", border: "none", outline: "none",
              padding: "12px 20px", color: "var(--text)", fontSize: "0.85rem",
              fontFamily: "inherit", width: "240px",
            }} />
            <button className="btn-accent" style={{ padding: "12px 24px", fontSize: "0.72rem" }}>
              <span>Subscribe</span>
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom-row" style={{ borderTop: "1px solid var(--border)", paddingTop: "28px", paddingBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span className="footer-copy" style={{ color: "var(--muted)", fontSize: "0.78rem" }}>© 2024 SOLESTEP. All rights reserved.</span>
          <span className="footer-tagline" style={{ color: "var(--muted)", fontSize: "0.78rem" }}>Engineered for the relentless.</span>
        </div>
      </div>
    </footer>
  );
}
