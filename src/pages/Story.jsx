import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

function RevealSection({ children, className = "", style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current?.querySelectorAll(".rv"),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 72%", toggleActions: "play none none none" } }
      );
    });
    return () => ctx.revert();
  }, []);
  return <section ref={ref} className={className} style={style}>{children}</section>;
}

const timeline = [
  { year: "2019", event: "The Garage", desc: "Two athletes, one obsession: footwear that doesn't compromise. The first prototype was duct tape and foam.", icon: "◈" },
  { year: "2020", event: "18 Prototypes", desc: "Pandemic. Closed gyms. Perfect time to obsess over shoe geometry and material science.", icon: "◉" },
  { year: "2021", event: "Carbon Plate", desc: "Breakthrough #1: A carbon-fiber plate configuration that no major brand had attempted. Patent pending.", icon: "◈" },
  { year: "2022", event: "Patent Granted", desc: "Our aerospace carbon-fiber plate technology is now protected in 16 countries worldwide.", icon: "◉" },
  { year: "2023", event: "Global Launch", desc: "Apex Void drops worldwide. 10,000 units in 72 hours. Server crashes included.", icon: "◈" },
  { year: "2024", event: "The Collection", desc: "Four models. Four stories. 62 countries. One brand that refuses to stand still.", icon: "◉" },
];

const team = [
  { name: "Ravi Mehta", role: "Co-founder & CEO", bio: "Former ultra-marathon runner. 47 DNFs before the first finish. Now runs the company the same way.", initial: "R" },
  { name: "Dr. Sarah Kim", role: "Head of R&D", bio: "Biomechanics PhD from MIT. Holds 8 patents in foot-load distribution technology.", initial: "S" },
  { name: "Carlos Santos", role: "Design Director", bio: "Trained at Central Saint Martins. Previously at Nike. Believes aesthetics and performance are never in conflict.", initial: "C" },
  { name: "Aisha Okafor", role: "Head of Sustainability", bio: "Led climate policy at three Fortune 500 companies before joining SOLESTEP to make footwear future-proof.", initial: "A" },
];

const values = [
  { icon: "◈", title: "NO COMPROMISE", desc: "If it's not perfect, it doesn't ship. Our 48-point QC process has a <1% return rate as proof." },
  { icon: "◉", title: "ATHLETE-FIRST", desc: "Every decision goes through the same filter: would a professional athlete wear this in competition?" },
  { icon: "◐", title: "RADICAL TRANSPARENCY", desc: "We publish our material sourcing, factory conditions, and carbon footprint every quarter." },
  { icon: "◑", title: "FORWARD MOTION", desc: "We invest 18% of revenue back into R&D. The next breakthrough is already in the lab." },
];

export default function Story() {
  const heroRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero lines
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".h-line"),
        { y: "110%", skewY: 5 },
        { y: "0%", skewY: 0, stagger: 0.1, duration: 1.1, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(
        heroRef.current?.querySelectorAll(".hero-sub"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.9 }
      );

      // Parallax BG
      if (parallaxRef.current) {
        gsap.fromTo(parallaxRef.current,
          { y: -60 },
          { y: 60, ease: "none",
            scrollTrigger: { trigger: parallaxRef.current.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } }
        );
      }

      // Timeline items
      gsap.fromTo(".tl-item",
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.14, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".tl-container", start: "top 72%", toggleActions: "play none none none" } }
      );

      // Team cards
      gsap.fromTo(".team-card",
        { y: 60, opacity: 0, scale: 0.93 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".team-grid", start: "top 72%", toggleActions: "play none none none" } }
      );

      // Values cards
      gsap.fromTo(".val-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: ".val-grid", start: "top 72%", toggleActions: "play none none none" } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        minHeight: "90vh", display: "flex", alignItems: "flex-end",
        padding: "140px 10vw 80px", background: "var(--surface)",
        borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden",
      }}>
        {/* BG Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px", opacity: 0.4,
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute", top: "30%", right: "10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 65%)",
          animation: "glowPulse 5s ease infinite",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="hero-sub" style={{
            display: "inline-block",
            background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.2)",
            padding: "6px 16px", fontSize: "0.7rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: "20px",
          }}>— Who We Are</span>
          {["OUR", "STORY"].map((word, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <h1 className="h-line font-display" style={{
                display: "block",
                fontSize: "clamp(5rem, 14vw, 13rem)",
                lineHeight: 0.86,
                color: i === 1 ? "transparent" : "var(--text)",
                WebkitTextStroke: i === 1 ? "1.5px var(--accent)" : "none",
              }}>
                {word}
              </h1>
            </div>
          ))}
          <div className="hero-sub" style={{ marginTop: "32px", display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {[["2019", "Founded"], ["16", "Patents"], ["62", "Countries"], ["4.9★", "Rating"]].map(([n, l]) => (
              <div key={l}>
                <span className="font-display" style={{ fontSize: "2rem", color: "var(--accent)", display: "block", lineHeight: 1 }}>{n}</span>
                <span style={{ color: "var(--muted)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <RevealSection style={{ padding: "120px 10vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        <div>
          <p className="rv" style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "20px" }}>
            — The Beginning
          </p>
          <h2 className="rv font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.9, marginBottom: "28px" }}>
            BORN FROM<br />OBSESSION
          </h2>
          <p className="rv" style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "20px" }}>
            SOLESTEP began in a 400 sq ft garage in Austin, Texas in 2019. Two athletes — a marathon runner and a biomechanist — who couldn't find shoes that matched their ambition. So they built their own.
          </p>
          <p className="rv" style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "32px" }}>
            Three years, 47 prototypes, and one carbon-fiber breakthrough later, the Apex Void launched to the world. It sold out in 72 hours. The rest is history still being written.
          </p>
          <Link to="/products" style={{ textDecoration: "none" }} className="rv">
            <button className="btn-accent"><span>See the Collection</span></button>
          </Link>
        </div>
        <div className="rv hover-card" style={{
          aspectRatio: "3/4",
          background: "var(--surface)",
          position: "relative",
          overflow: "hidden",
        }}>
          <img
            src="/assets/athelte.jpg"
            alt="Athlete"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 100%)",
          }} />
          <div style={{
            position: "absolute",
            left: "24px",
            right: "24px",
            bottom: "24px",
          }}>
            <span className="font-display" style={{ fontSize: "1.8rem", color: "#fff", display: "block", marginBottom: "6px", letterSpacing: "0.06em" }}>
              BUILT BY ATHLETES
            </span>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Performance started here
            </p>
          </div>
          <div style={{
            position: "absolute",
            inset: "0",
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}>
            <span className="font-display" style={{ fontSize: "10rem", color: "rgba(255,255,255,0.08)", position: "absolute", inset: "50% auto auto 50%", transform: "translate(-50%, -50%)", lineHeight: 1 }}>SS</span>
            <div style={{ position: "relative", textAlign: "center" }}>
              <span className="font-display" style={{ fontSize: "5rem", color: "var(--accent)", display: "block", marginBottom: "8px" }}>47</span>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "40px" }}>Prototypes Before Launch</p>
              <span className="font-display" style={{ fontSize: "5rem", color: "#fff", display: "block", marginBottom: "8px" }}>72h</span>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>To Sell Out First Drop</p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── MISSION (FULL-WIDTH ACCENT) ── */}
      <section style={{ padding: "120px 10vw", background: "var(--accent)", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "20px" }}>
            — Our Mission
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", color: "#000", lineHeight: 0.9, maxWidth: "900px", marginBottom: "48px" }}>
            TO BUILD THE SHOE THAT MAKES YOU FEEL UNSTOPPABLE
          </h2>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {["Performance", "Innovation", "Sustainability", "Community"].map(v => (
              <span key={v} style={{
                background: "rgba(0,0,0,0.12)", color: "#000",
                padding: "8px 20px", fontSize: "0.78rem",
                fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase",
              }}>{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "120px 10vw", background: "var(--bg)" }}>
        <div style={{ marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>— What Drives Us</p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.9 }}>OUR VALUES</h2>
        </div>
        <div className="val-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "var(--border)" }}>
          {values.map((v, i) => (
            <div key={i} className="val-card hover-card" style={{
              background: "var(--bg)", padding: "56px 48px",
              display: "flex", gap: "32px",
            }}>
              <span style={{ fontSize: "2.5rem", color: "var(--accent)", flexShrink: 0 }}>{v.icon}</span>
              <div>
                <h3 className="font-display" style={{ fontSize: "1.8rem", letterSpacing: "0.06em", marginBottom: "14px" }}>{v.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.85 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <RevealSection style={{ padding: "120px 10vw", background: "var(--surface)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        <div className="rv" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
          background: "var(--border)", aspectRatio: "1",
        }}>
          {[
            { label: "DESIGN", src: "/assets/image8.jpg" },
            { label: "SPEED", src: "/assets/image7.jpg" },
            { label: "COMFORT", src: "/assets/image5.jpg" },
            { label: "DURABILITY", src: "/assets/image6.jpg" },
          ].map((item) => (
            <div key={item.label} className="hover-card" style={{
              background: "var(--surface)",
              position: "relative",
              overflow: "hidden",
              aspectRatio: "1",
            }}>
              <img
                src={item.src}
                alt={item.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)",
              }} />
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                padding: "24px",
              }}>
                <span className="font-display" style={{ fontSize: "1.8rem", letterSpacing: "0.06em", marginBottom: "8px", color: "#fff" }}>{item.label}</span>
                <div style={{ width: "24px", height: "2px", background: "var(--accent)", opacity: 0.9 }} />
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="rv" style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "20px" }}>
            — Our Philosophy
          </p>
          <h2 className="rv font-display" style={{ fontSize: "clamp(2.2rem, 4vw, 4rem)", lineHeight: 0.9, marginBottom: "28px" }}>
            NO COMPROMISE.<br />EVER.
          </h2>
          <p className="rv" style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "20px" }}>
            Every SOLESTEP shoe starts with one question: "What would the perfect shoe feel like?" We reverse-engineer from that dream, working backward until the materials, the geometry, and the engineering all converge.
          </p>
          <p className="rv" style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.9 }}>
            We don't follow trends. We don't cut corners. We test every shoe through training camps, ultramarathons, and city streets — and only ship when we'd wear it ourselves.
          </p>
        </div>
      </RevealSection>

      {/* ── TIMELINE ── */}
      <section style={{ padding: "120px 10vw", background: "var(--bg)" }}>
        <div style={{ marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>— Milestones</p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.9 }}>THE JOURNEY</h2>
        </div>
        <div className="tl-container" style={{ position: "relative", paddingLeft: "32px" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "1px", background: "var(--border)" }} />
          {timeline.map((item, i) => (
            <div key={i} className="tl-item hover-card" style={{
              display: "flex", gap: "56px", alignItems: "flex-start",
              padding: "36px 36px 36px 0", borderBottom: "1px solid var(--border)",
              marginLeft: "32px", opacity: 0, position: "relative",
              background: "transparent", border: "none",
            }}>
              {/* Dot */}
              <div style={{
                position: "absolute", left: "-44px", top: "44px",
                width: "12px", height: "12px", borderRadius: "50%",
                background: i % 2 === 0 ? "var(--accent)" : "var(--border)",
                border: "2px solid var(--bg)",
                boxShadow: i % 2 === 0 ? "0 0 12px var(--accent)" : "none",
              }} />
              <div style={{ minWidth: "100px" }}>
                <span className="font-display" style={{ fontSize: "3rem", color: "var(--accent)", display: "block", lineHeight: 1 }}>{item.year}</span>
                <span style={{ fontSize: "2rem", color: "var(--muted)", display: "block" }}>{item.icon}</span>
              </div>
              <div style={{ flex: 1, paddingTop: "8px" }}>
                <h3 className="font-display" style={{ fontSize: "1.8rem", letterSpacing: "0.04em", marginBottom: "10px" }}>{item.event}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.85, maxWidth: "500px" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "120px 10vw", background: "var(--surface)" }}>
        <div style={{ marginBottom: "64px" }}>
          <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>— The People</p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.9 }}>MEET THE TEAM</h2>
        </div>
        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {team.map((member, i) => (
            <div key={i} className="team-card hover-card" style={{ padding: "36px 28px", opacity: 0, textAlign: "center" }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: `var(--grad${(i % 3) + 1})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.8rem", fontWeight: "700", color: "#000",
                margin: "0 auto 20px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              }}>
                {member.initial}
              </div>
              <h3 style={{ fontWeight: "700", fontSize: "1rem", marginBottom: "4px" }}>{member.name}</h3>
              <p style={{ color: "var(--accent)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>{member.role}</p>
              <p style={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.8 }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUSTAINABILITY ── */}
      <RevealSection style={{ padding: "120px 10vw", background: "var(--bg)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        <div>
          <p className="rv" style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "20px" }}>
            — Planet First
          </p>
          <h2 className="rv font-display" style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)", lineHeight: 0.9, marginBottom: "28px" }}>
            BUILT FOR THE<br />LONG RUN
          </h2>
          <p className="rv" style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "28px" }}>
            By 2026, 100% of our materials will be either recycled or sustainably sourced. We're already at 50%. We publish our progress every quarter — no greenwashing, just data.
          </p>
          <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Recycled materials", value: 50, color: "var(--accent)" },
              { label: "Carbon offset", value: 78, color: "var(--accent2)" },
              { label: "Renewable energy in production", value: 91, color: "var(--accent3)" },
            ].map(bar => (
              <div key={bar.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{bar.label}</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: "700", color: bar.color }}>{bar.value}%</span>
                </div>
                <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px" }}>
                  <div style={{
                    height: "100%", width: `${bar.value}%`,
                    background: bar.color, borderRadius: "2px",
                    boxShadow: `0 0 8px ${bar.color}`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rv" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { icon: "🌱", title: "B-Corp Certified", sub: "Since 2023" },
            { icon: "♻", title: "50% Recycled", sub: "Materials used" },
            { icon: "🌍", title: "Carbon Neutral", sub: "By 2026" },
            { icon: "💧", title: "40% Less Water", sub: "vs. industry avg" },
          ].map((s, i) => (
            <div key={i} className="hover-card" style={{ padding: "28px 24px", textAlign: "center" }}>
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "10px" }}>{s.icon}</span>
              <p style={{ fontWeight: "700", fontSize: "0.9rem", marginBottom: "4px" }}>{s.title}</p>
              <p style={{ color: "var(--muted)", fontSize: "0.75rem" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <section style={{
        padding: "100px 10vw", background: "var(--accent)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "40px",
      }}>
        <div>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#000", lineHeight: 0.9 }}>
            NOW YOU KNOW<br />THE STORY.
          </h2>
        </div>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <button style={{
            background: "#000", color: "var(--accent)",
            border: "none", padding: "18px 52px",
            fontSize: "0.85rem", fontWeight: "700",
            letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.3s",
          }}>
            Step In →
          </button>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
