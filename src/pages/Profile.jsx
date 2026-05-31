import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Footer from "../components/Footer";

const user = {
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  username: "@alex_runner",
  location: "New York, USA",
  memberSince: "March 2024",
  favoriteModel: "Apex Void",
  bio: "Ultra-marathon runner. 6 continents, still counting.",
};

const orderHistory = [
  { id: "SS-0041", date: "May 12, 2024", product: "Apex Void", size: 10, amount: 249, status: "Delivered", color: "var(--accent)" },
  { id: "SS-0029", date: "April 3, 2024", product: "Neon Surge", size: 10, amount: 199, status: "Delivered", color: "var(--accent)" },
  { id: "SS-0018", date: "March 20, 2024", product: "Obsidian X", size: 11, amount: 289, status: "Delivered", color: "var(--accent)" },
  { id: "SS-0007", date: "March 10, 2024", product: "Terra Flux", size: 10, amount: 179, status: "Delivered", color: "var(--accent)" },
];

export default function Profile() {
  const containerRef = useRef(null);
  const rightColumnRef = useRef(null);
  const heroRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current?.querySelectorAll(".h-line"),
        { y: "110%", skewY: 4 },
        { y: "0%", skewY: 0, stagger: 0.1, duration: 1, ease: "power4.out", delay: 0.15 }
      );
      gsap.fromTo(containerRef.current?.querySelectorAll(".profile-card"),
        { y: 50, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.09, duration: 0.65, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const panel = rightColumnRef.current?.querySelector(".profile-tab-panel");
    if (!panel) return;

    gsap.fromTo(
      panel,
      { opacity: 0, y: 22, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
    );
  }, [activeTab]);

  const tabs = ["orders", "preferences", "addresses"];

  return (
    <main className="profile-page" style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section ref={heroRef} className="profile-hero" style={{
        padding: "140px 10vw 60px", background: "var(--surface)",
        borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "70px 70px", opacity: 0.4,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>— Account</p>
          <div style={{ overflow: "hidden" }}>
            <h1 className="h-line font-display" style={{ display: "block", fontSize: "clamp(4rem, 9vw, 8rem)", lineHeight: 0.9 }}>
              PROFILE
            </h1>
          </div>
        </div>
      </section>

      <section className="profile-content" style={{ padding: "60px 10vw 80px" }}>
        <div ref={containerRef} className="profile-layout" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "32px", alignItems: "start" }}>

          {/* LEFT COLUMN */}
          <div className="profile-sidebar" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* User card */}
            <div className="profile-card hover-card" style={{ padding: "36px 28px", textAlign: "center", opacity: 0 }}>
              {/* Avatar with glow */}
              <div style={{ position: "relative", display: "inline-block", marginBottom: "20px" }}>
                <div style={{
                  width: "88px", height: "88px", borderRadius: "50%",
                  background: "var(--grad1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2.2rem", fontWeight: "700", color: "#000",
                  margin: "0 auto",
                  boxShadow: "0 0 0 3px var(--bg), 0 0 0 5px var(--accent), 0 8px 32px rgba(200,255,0,0.25)",
                }}>AR</div>
                <div style={{
                  position: "absolute", bottom: "2px", right: "2px",
                  width: "14px", height: "14px", borderRadius: "50%",
                  background: "#22c55e", border: "2px solid var(--bg)",
                }} />
              </div>

              <h2 style={{ fontWeight: "700", fontSize: "1.1rem", marginBottom: "4px" }}>{user.name}</h2>
              <p style={{ color: "var(--accent)", fontSize: "0.78rem", marginBottom: "8px" }}>{user.username}</p>
              <p style={{ color: "var(--muted)", fontSize: "0.78rem", marginBottom: "20px" }}>{user.bio}</p>

              <div style={{ height: "1px", background: "var(--border)", marginBottom: "20px" }} />

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "24px" }}>
                {[["4", "Orders"], ["$916", "Spent"], ["4.9★", "Rating"]].map(([v, l]) => (
                  <div key={l} className="hover-card" style={{ padding: "12px 8px", textAlign: "center" }}>
                    <span style={{ display: "block", fontSize: "1.1rem", fontWeight: "700", color: "var(--accent)", marginBottom: "3px" }}>{v}</span>
                    <span style={{ color: "var(--muted)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</span>
                  </div>
                ))}
              </div>

              <button
                className={editMode ? "btn-accent" : "btn-outline"}
                style={{ width: "100%", padding: "11px" }}
                onClick={() => setEditMode(o => !o)}
              >
                <span>{editMode ? "✓ Save Changes" : "Edit Profile"}</span>
              </button>
            </div>

            {/* Details card */}
            <div className="profile-card hover-card" style={{ padding: "28px", opacity: 0 }}>
              <h3 style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "20px" }}>
                Account Details
              </h3>
              {[
                ["📧", "Email", user.email],
                ["📍", "Location", user.location],
                ["🗓", "Member Since", user.memberSince],
                ["👟", "Fav. Model", user.favoriteModel],
              ].map(([icon, label, value]) => (
                <div key={label} style={{ marginBottom: "16px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--muted)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                    <span>{icon}</span>{label}
                  </span>
                  {editMode ? (
                    <input defaultValue={value} style={{
                      background: "var(--bg)", border: "1px solid var(--accent)", borderRadius: "0",
                      color: "var(--text)", padding: "8px 12px", fontSize: "0.85rem",
                      width: "100%", outline: "none", fontFamily: "inherit",
                    }} />
                  ) : (
                    <span style={{ fontSize: "0.88rem" }}>{value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="profile-card hover-card" style={{ padding: "24px", opacity: 0 }}>
              <h3 style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "16px" }}>
                Achievements
              </h3>
              {[
                { icon: "🏅", label: "First Purchase", earned: true },
                { icon: "🔥", label: "3+ Orders", earned: true },
                { icon: "⭐", label: "Loyal Member", earned: true },
                { icon: "🚀", label: "Early Adopter", earned: false },
              ].map(a => (
                <div key={a.label} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "10px 0", borderBottom: "1px solid var(--border)",
                  opacity: a.earned ? 1 : 0.35,
                }}>
                  <span style={{ fontSize: "1.2rem" }}>{a.icon}</span>
                  <span style={{ fontSize: "0.82rem", flex: 1 }}>{a.label}</span>
                  {a.earned && <span style={{ color: "var(--accent)", fontSize: "0.7rem" }}>✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div ref={rightColumnRef} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Tabs */}
            <div className="profile-card profile-tabs" style={{
              display: "flex", borderBottom: "1px solid var(--border)",
              background: "var(--surface)", padding: "0 28px",
              gap: "0", opacity: 1,
            }}>
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "20px 24px", fontSize: "0.78rem", fontWeight: "600",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: activeTab === tab ? "var(--accent)" : "var(--muted)",
                  borderBottom: `2px solid ${activeTab === tab ? "var(--accent)" : "transparent"}`,
                  marginBottom: "-1px", transition: "color 0.2s, border-color 0.2s",
                  fontFamily: "inherit",
                }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="profile-card profile-tab-panel profile-orders-panel hover-card" style={{ padding: "32px", opacity: 0 }}>
                <h2 className="font-display" style={{ fontSize: "1.8rem", marginBottom: "28px", letterSpacing: "0.04em" }}>ORDER HISTORY</h2>
                {/* Table head */}
                <div className="profile-orders-head" style={{
                  display: "grid", gridTemplateColumns: "1.2fr 2fr 1.4fr 80px 100px 120px",
                  padding: "0 0 12px", borderBottom: "1px solid var(--border)",
                  color: "var(--muted)", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase",
                }}>
                  {["Order", "Product", "Date", "Size", "Amount", "Status"].map(h => <span key={h}>{h}</span>)}
                </div>
                {orderHistory.map((order) => (
                  <div key={order.id} className="profile-order-row" style={{
                    display: "grid", gridTemplateColumns: "1.2fr 2fr 1.4fr 80px 100px 120px",
                    padding: "18px 0", borderBottom: "1px solid var(--border)",
                    alignItems: "center",
                    transition: "background 0.25s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,255,0,0.025)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <div data-label="Order" style={{ color: "var(--accent)", fontSize: "0.78rem", fontFamily: "monospace" }}>{order.id}</div>
                    <div data-label="Product" className="font-display" style={{ fontSize: "1.05rem" }}>{order.product}</div>
                    <div data-label="Date" style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{order.date}</div>
                    <div data-label="Size" style={{ color: "var(--muted)", fontSize: "0.8rem" }}>US {order.size}</div>
                    <div data-label="Amount" style={{ fontWeight: "700" }}>${order.amount}</div>
                    <div data-label="Status" style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: "rgba(34,197,94,0.1)", color: "#22c55e",
                      padding: "4px 10px", fontSize: "0.65rem", fontWeight: "700",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                      {order.status}
                    </div>
                  </div>
                ))}
                <div className="profile-orders-actions" style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
                  <button className="btn-accent" style={{ padding: "10px 24px", fontSize: "0.72rem" }}><span>Track Orders</span></button>
                  <button className="btn-outline" style={{ padding: "10px 24px", fontSize: "0.72rem" }}><span>Returns</span></button>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="profile-card profile-tab-panel hover-card" style={{ padding: "32px", opacity: 0 }}>
                <h2 className="font-display" style={{ fontSize: "1.8rem", marginBottom: "28px", letterSpacing: "0.04em" }}>PREFERENCES</h2>
                <div className="profile-preferences-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[
                    { label: "New Drop Alerts", on: true },
                    { label: "Restock Notifications", on: true },
                    { label: "Exclusive Offers", on: true },
                    { label: "Newsletter", on: false },
                    { label: "SMS Updates", on: false },
                    { label: "Partner Deals", on: true },
                  ].map(pref => (
                    <div key={pref.label} className="hover-card" style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "16px 20px",
                    }}>
                      <span style={{ fontSize: "0.85rem" }}>{pref.label}</span>
                      <div style={{
                        width: "40px", height: "22px", borderRadius: "11px",
                        background: pref.on ? "var(--accent)" : "var(--border2)",
                        position: "relative", cursor: "pointer", transition: "background 0.3s",
                        flexShrink: 0,
                      }}>
                        <div style={{
                          position: "absolute",
                          top: "3px", left: pref.on ? "calc(100% - 19px)" : "3px",
                          width: "16px", height: "16px", borderRadius: "50%",
                          background: pref.on ? "#000" : "var(--muted)",
                          transition: "left 0.3s",
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="profile-card profile-tab-panel hover-card" style={{ padding: "32px", opacity: 0 }}>
                <h2 className="font-display" style={{ fontSize: "1.8rem", marginBottom: "28px", letterSpacing: "0.04em" }}>ADDRESSES</h2>
                <div className="profile-addresses-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    { label: "🏠 Home (Default)", addr: "1284 W 42nd Street, Apt 7B, New York, NY 10036, USA" },
                    { label: "🏢 Work", addr: "Empire State Building, 350 5th Ave, Suite 1200, New York, NY 10118, USA" },
                  ].map(a => (
                    <div key={a.label} className="hover-card" style={{ padding: "24px" }}>
                      <p style={{ fontWeight: "700", fontSize: "0.85rem", marginBottom: "10px" }}>{a.label}</p>
                      <p style={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.8, marginBottom: "16px" }}>{a.addr}</p>
                      <button className="btn-outline" style={{ padding: "7px 16px", fontSize: "0.68rem" }}>
                        <span>Edit</span>
                      </button>
                    </div>
                  ))}
                  <div className="hover-card" style={{
                    padding: "24px", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    border: "1px dashed var(--border2)", cursor: "pointer",
                    minHeight: "140px",
                  }}>
                    <span style={{ fontSize: "2rem", color: "var(--accent)", marginBottom: "8px" }}>+</span>
                    <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>Add Address</span>
                  </div>
                </div>
              </div>
            )}

            {/* Loyalty card */}
            <div className="profile-card profile-loyalty-card" style={{
              padding: "28px 32px", opacity: 1,
              background: "linear-gradient(135deg, var(--surface) 0%, rgba(200,255,0,0.04) 100%)",
              border: "1px solid rgba(200,255,0,0.15)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <p style={{ color: "var(--accent)", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "4px" }}>Loyalty Status</p>
                  <h3 className="font-display" style={{ fontSize: "1.8rem" }}>GOLD MEMBER</h3>
                </div>
                <div style={{
                  width: "60px", height: "60px", borderRadius: "50%",
                  background: "var(--grad2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem",
                }}>🏆</div>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--muted)", marginBottom: "8px" }}>
                  <span>Points: 916 / 1,000 for Platinum</span>
                  <span style={{ color: "var(--accent)" }}>91.6%</span>
                </div>
                <div style={{ height: "4px", background: "var(--border)", borderRadius: "2px" }}>
                  <div style={{
                    height: "100%", width: "91.6%",
                    background: "var(--grad1)", borderRadius: "2px",
                    boxShadow: "0 0 8px rgba(200,255,0,0.4)",
                  }} />
                </div>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.75rem" }}>84 more points to unlock Platinum tier and free next-day shipping.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
