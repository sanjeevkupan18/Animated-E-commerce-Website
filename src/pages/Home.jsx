import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

function ShoeSVG({ id = 1, size = 280 }) {
  const colors = {
    1: { main: "#C8FF00", body: "#1a1a1a", sole: "#C8FF00" },
    2: { main: "#f0f0f0", body: "#f0f0f0", sole: "#C8FF00" },
    3: { main: "#8B6914", body: "#1e1814", sole: "#E8DCC8" },
    4: { main: "#5a8a1e", body: "#3a2010", sole: "#5a8a1e" },
  };
  const c = colors[id] || colors[1];
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="200" cy="220" rx="170" ry="16" fill={c.main} opacity="0.1"/>
      <path d="M40 185 Q70 110 150 95 L265 88 Q338 86 368 118 Q384 142 368 172 Q275 198 40 188 Z"
        fill={c.body} stroke={c.main} strokeWidth="1.5"/>
      <path d="M50 183 Q78 115 155 100 L260 93 Q330 91 360 121 Q374 143 360 170 Q272 193 50 185 Z"
        fill={c.body} opacity="0.8"/>
      <path d="M148 95 L160 55 Q167 40 180 42 L218 45 Q228 47 226 61 L222 92" fill={c.main} opacity="0.9"/>
      <path d="M220 92 L224 50 Q227 38 240 40 L265 43 Q274 46 271 59 L265 91" fill={c.main} opacity="0.6"/>
      <path d="M155 92 Q192 108 268 104" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
      <path d="M158 82 Q194 97 265 93" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>
      <path d="M162 72 Q197 86 262 82" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"/>
      <path d="M40 188 Q272 198 368 172 L372 192 Q275 220 40 208 Z" fill={c.sole} opacity="0.85"/>
      <path d="M40 202 Q272 212 372 188 L372 192 Q275 220 40 208 Z" fill={c.sole} opacity="0.4"/>
      <text x="90" y="178" fontFamily="Arial" fontSize="10" fill={c.main} opacity="0.6" letterSpacing="4">SOLESTEP</text>
    </svg>
  );
}

// Animated counter
function Counter({ target, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        let start = 0;
        const step = target / (duration * 60);
        const tick = () => {
          start += step;
          if (start >= target) { setVal(target); return; }
          setVal(Math.floor(start));
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    return () => st.kill();
  }, [target, duration]);
  return <span ref={ref} className="stat-num">{val}{suffix}</span>;
}

export default function Home() {
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroTagRef = useRef(null);
  const heroShoeRef = useRef(null);
  const heroOrbitRef = useRef(null);

  const statsRef = useRef(null);
  const featuredRef = useRef(null);
  const featuredImgRef = useRef(null);
  const experienceRef = useRef(null);
  const collectionRef = useRef(null);
  const showcaseRef = useRef(null);
  const showcaseTrackRef = useRef(null);
  const showcaseViewportRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const testimonials = [
    { name: "Marcus Chen", role: "Ultra-Marathon Runner", text: "The Apex Void changed everything. 100 miles and my feet felt like I'd just started.", rating: 5 },
    { name: "Priya Nair", role: "Nike Training Camp", text: "I've worn every major brand. SOLESTEP's carbon plate tech is genuinely next level.", rating: 5 },
    { name: "Jordan Blake", role: "Street Culture Creator", text: "Finally a shoe that performs AND looks insane. Neon Surge gets so many questions.", rating: 5 },
  ];

  const expFeatures = [
    { num: "01", icon: "◈", title: "CARBON PRECISION", desc: "Aerospace-grade plates return 98% of energy with every stride.", color: "#C8FF00" },
    { num: "02", icon: "◉", title: "ADAPTIVE FIT", desc: "Dynamic lacing systems that conform to the unique geometry of your foot.", color: "#00FFD1" },
    { num: "03", icon: "◐", title: "ZERO FRICTION", desc: "Self-lubricating outsoles reduce ground resistance by up to 40%.", color: "#FF6B35" },
    { num: "04", icon: "◑", title: "CLOUD CUSHION", desc: "Multi-density foam stacked in precise layers for infinite comfort.", color: "#C8FF00" },
    { num: "05", icon: "◈", title: "TRAIL ARMOUR", desc: "Reinforced toe cap and TPU cage protect in every environment.", color: "#00FFD1" },
    { num: "06", icon: "◉", title: "ECO FORWARD", desc: "50% recycled materials, zero compromise on performance.", color: "#FF6B35" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO ──
      const heroLines = heroTitleRef.current?.querySelectorAll(".h-line");
      if (heroLines) {
        gsap.fromTo(heroLines,
          { y: "110%", skewY: 6, opacity: 0 },
          { y: "0%", skewY: 0, opacity: 1, stagger: 0.14, duration: 1.2, ease: "power4.out", delay: 0.3 }
        );
      }
      gsap.fromTo(heroTagRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.9 }
      );
      gsap.fromTo(heroSubRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 1.1 }
      );
      gsap.fromTo(heroShoeRef.current,
        { y: 60, opacity: 0, scale: 0.85, rotateY: -15 },
        { y: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1.4, ease: "power3.out", delay: 0.6 }
      );
      // Hero shoe float
      gsap.to(heroShoeRef.current, {
        y: -18, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2
      });
      // Orbit rotation
      if (heroOrbitRef.current) {
        gsap.to(heroOrbitRef.current, { rotation: 360, duration: 18, ease: "none", repeat: -1 });
      }

      // ── STATS SECTION ──
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll(".stat-card"),
          { y: 60, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 78%" } }
        );
      }

      // ── FEATURED ──
      if (featuredRef.current) {
        gsap.fromTo(featuredImgRef.current,
          { y: 80, opacity: 0, scale: 0.88 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: featuredRef.current, start: "top 68%" } }
        );
        // Parallax on scroll
        gsap.fromTo(featuredImgRef.current,
          { y: 0 },
          { y: -60, ease: "none",
            scrollTrigger: { trigger: featuredRef.current, start: "top bottom", end: "bottom top", scrub: 1.8 } }
        );
        gsap.fromTo(featuredRef.current.querySelectorAll(".feat-text"),
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: featuredRef.current, start: "top 68%" } }
        );
      }

      // ── EXPERIENCE GRID ──
      if (experienceRef.current) {
        gsap.fromTo(experienceRef.current.querySelectorAll(".exp-card"),
          { y: 80, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: experienceRef.current, start: "top 72%" } }
        );
      }

      // ── COLLECTION ──
      if (collectionRef.current) {
        gsap.fromTo(collectionRef.current.querySelectorAll(".col-card"),
          { y: 60, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: collectionRef.current, start: "top 72%" } }
        );
      }

      // ── SHOWCASE - pinned horizontal ──
      if (showcaseRef.current) {
        const track = showcaseTrackRef.current;
        const viewport = showcaseViewportRef.current;
        if (track && viewport) {
          const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            invalidateOnRefresh: true,
            scrollTrigger: {
              trigger: showcaseRef.current,
              start: "top top",
              end: () => `+=${getDistance()}`,
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
            }
          });
        }
      }

      // ── TESTIMONIALS ──
      if (testimonialsRef.current) {
        gsap.fromTo(testimonialsRef.current.querySelectorAll(".testi-item"),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: testimonialsRef.current, start: "top 72%" } }
        );
      }

      // ── CTA ──
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.querySelectorAll(".cta-item"),
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 75%" } }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Shoes Crafted", value: 48000, suffix: "+" },
    { label: "Countries Shipped", value: 62, suffix: "" },
    { label: "Athlete Partners", value: 140, suffix: "+" },
    { label: "Avg. Rating", value: 4.9, suffix: "★" },
  ];

  return (
    <main style={{ position: "relative", zIndex: 1 }}>

      {/* ──────────────────────────────────────────────
          1. HERO
      ────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "0 10vw", position: "relative", overflow: "hidden",
        gap: "40px", paddingTop: "100px",
      }}>
        {/* BG grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px", opacity: 0.4,
        }} />

        {/* Left */}
        <div ref={heroTitleRef} style={{ flex: 1, zIndex: 1 }}>
          <div ref={heroTagRef} style={{ opacity: 0, marginBottom: "20px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.2)",
              padding: "6px 16px", fontSize: "0.7rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--accent)",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "glowPulse 2s ease infinite" }} />
              New Collection 2024
            </span>
          </div>

          {["STEP INTO", "THE FUTURE"].map((line, i) => (
            <div key={i} className="split-line" style={{ overflow: "hidden" }}>
              <h1 className="h-line font-display" style={{
                display: "block",
                fontSize: "clamp(4rem, 9.5vw, 9.5rem)",
                lineHeight: 0.88,
                color: i === 1 ? "transparent" : "var(--text)",
                WebkitTextStroke: i === 1 ? "1.5px var(--accent)" : "none",
                letterSpacing: "-0.01em",
                opacity: 0,
              }}>
                {line}
              </h1>
            </div>
          ))}

          <div ref={heroSubRef} style={{ opacity: 0, marginTop: "28px", display: "flex", flexDirection: "column", gap: "28px", maxWidth: "480px" }}>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.8 }}>
              Premium footwear engineered for those who push limits. Every stitch. Every sole. Every step.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link to="/products">
                <button className="btn-accent"><span>Shop Now ↗</span></button>
              </Link>
              <Link to="/story">
                <button className="btn-outline"><span>Our Story</span></button>
              </Link>
            </div>
            {/* Trust signals */}
            <div style={{ display: "flex", gap: "20px" }}>
              {["Free Shipping", "90-Day Returns", "Carbon Neutral"].map(t => (
                <span key={t} style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.05em",
                }}>
                  <span style={{ color: "var(--accent)", fontSize: "0.9rem" }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right – Shoe + orbit */}
        <div style={{ flex: 1, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", minHeight: "460px" }}>
          {/* Orbit ring */}
          <div ref={heroOrbitRef} style={{
            position: "absolute", width: "420px", height: "420px",
            border: "1px dashed rgba(200,255,0,0.15)",
            borderRadius: "50%",
          }}>
            {[0, 90, 180, 270].map((deg, i) => (
              <div key={i} style={{
                position: "absolute",
                width: "10px", height: "10px",
                borderRadius: "50%",
                background: i === 0 ? "var(--accent)" : "rgba(200,255,0,0.3)",
                top: "50%", left: "50%",
                transform: `rotate(${deg}deg) translateX(209px) translateY(-50%)`,
                boxShadow: i === 0 ? "0 0 12px var(--accent)" : "none",
              }} />
            ))}
          </div>

          {/* Glow */}
          <div className="spotlight" style={{ width: "400px", height: "400px", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

          {/* Shoe */}
          <div ref={heroShoeRef} style={{ opacity: 0, position: "relative" }}>
            <img src="/assets/image1.avif" alt="Apex Void — featured shoe"
              style={{ width: "400px", objectFit: "contain", filter: "drop-shadow(0 20px 60px rgba(200,255,0,0.2))" }}
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
            />
            <div style={{ display: "none" }}><ShoeSVG id={1} size={380} /></div>

            {/* Price tag */}
            <div style={{
              position: "absolute", top: "10px", right: "-20px",
              background: "var(--accent)", color: "#000",
              padding: "8px 14px",
              transform: "rotate(3deg)",
            }}>
              <span style={{ fontSize: "0.65rem", fontWeight: "700", letterSpacing: "0.1em", display: "block", textTransform: "uppercase" }}>Starting at</span>
              <span className="font-display" style={{ fontSize: "1.6rem", lineHeight: 1 }}>$179</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        }}>
          <span style={{ color: "var(--muted)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{
            width: "1px", height: "48px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "scrollPulse 1.6s ease-in-out infinite",
          }} />
        </div>
        <style>{`@keyframes scrollPulse{0%,100%{opacity:1;transform:scaleY(1)}50%{opacity:0.3;transform:scaleY(0.5)}}`}</style>
      </section>

      {/* ──────────────────────────────────────────────
          2. MARQUEE STRIP
      ────────────────────────────────────────────── */}
      <div style={{ overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "16px 0", background: "var(--surface)" }}>
        <div className="marquee-track" style={{ gap: "40px" }}>
          {[...Array(2)].map((_, ri) =>
            ["APEX VOID", "◈", "NEON SURGE", "◉", "OBSIDIAN X", "◈", "TERRA FLUX", "◉", "STEP INTO THE FUTURE", "◈", "ENGINEERED FOR THE RELENTLESS", "◉"].map((t, i) => (
              <span key={`${ri}-${i}`} className="font-display" style={{
                fontSize: "1rem", letterSpacing: "0.2em",
                color: t.length <= 2 ? "var(--accent)" : "var(--muted)",
                whiteSpace: "nowrap",
              }}>{t}</span>
            ))
          )}
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          3. STATS SECTION
      ────────────────────────────────────────────── */}
      <section ref={statsRef} style={{ padding: "100px 10vw", background: "var(--bg)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "var(--border)" }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card hover-card" style={{ padding: "52px 32px", textAlign: "center", opacity: 0 }}>
              <div className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--accent)", lineHeight: 1, marginBottom: "12px" }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          4. FEATURED PRODUCT
      ────────────────────────────────────────────── */}
      <section ref={featuredRef} style={{
        minHeight: "90vh", display: "flex", alignItems: "center",
        padding: "80px 10vw", background: "var(--surface)", gap: "80px", overflow: "hidden",
      }}>
        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Background glow */}
          <div style={{
            position: "absolute", width: "500px", height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 65%)",
            animation: "glowPulse 4s ease infinite",
          }} />
          <div ref={featuredImgRef} style={{ position: "relative", zIndex: 1 }}>
            <img src="/assets/image1.avif" alt="Apex Void featured"
              style={{ width: "100%", maxWidth: "480px", objectFit: "contain", filter: "drop-shadow(0 30px 80px rgba(200,255,0,0.18))" }}
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
            />
            <div style={{ display: "none" }}><ShoeSVG id={1} size={440} /></div>
            {/* Badge */}
            <div style={{
              position: "absolute", top: "20px", left: "0",
              background: "var(--accent)", color: "#000",
              padding: "6px 18px", fontSize: "0.65rem",
              fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>★ Featured Drop</div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <p className="feat-text" style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px" }}>
            — Signature Model 2024
          </p>
          <h2 className="feat-text font-display" style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.88, marginBottom: "12px" }}>
            APEX VOID
          </h2>
          <p className="feat-text" style={{ color: "var(--accent)", fontSize: "1rem", fontStyle: "italic", marginBottom: "20px" }}>
            "Zero gravity. Maximum impact."
          </p>
          <p className="feat-text" style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.9, maxWidth: "420px", marginBottom: "28px" }}>
            Engineered for the relentless. Aerospace-grade foam with reactive carbon-fiber plating delivers unmatched energy return with every stride.
          </p>

          {/* Feature pills */}
          <div className="feat-text" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {["Carbon Fiber Plate", "AeroFoam™", "Grip-Lock Sole", "Breathable Mesh"].map(f => (
              <span key={f} className="hover-card" style={{
                padding: "6px 14px", fontSize: "0.72rem", letterSpacing: "0.08em",
                textTransform: "uppercase", color: "var(--muted)",
                transition: "color 0.3s, border-color 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; }}
              >{f}</span>
            ))}
          </div>

          <div className="feat-text" style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "28px" }}>
            <span style={{ fontSize: "2.5rem", fontWeight: "700" }}>$249</span>
            <span style={{ color: "var(--muted)", textDecoration: "line-through" }}>$320</span>
            <span style={{ background: "var(--accent)", color: "#000", padding: "2px 8px", fontSize: "0.7rem", fontWeight: "700" }}>22% OFF</span>
          </div>

          <div className="feat-text" style={{ display: "flex", gap: "12px" }}>
            <button className="btn-accent" onClick={() => handleAdd(products[0])}>
              <span>{addedId === 1 ? "✓ Added!" : "Add to Cart"}</span>
            </button>
            <button className="btn-outline"><span>Learn More</span></button>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          5. MARQUEE 2 (reversed)
      ────────────────────────────────────────────── */}
      <div style={{ overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "14px 0", background: "var(--surface2)" }}>
        <div className="marquee-rev" style={{ gap: "36px" }}>
          {[...Array(2)].map((_, ri) =>
            ["COMFORT ◈", "PERFORMANCE ◉", "STYLE ◈", "DURABILITY ◉", "INNOVATION ◈", "PRECISION ◉", "SPEED ◈", "GRIP ◉"].map((t, i) => (
              <span key={`${ri}-${i}`} className="font-display" style={{
                fontSize: "1rem", letterSpacing: "0.18em", color: "var(--muted)", whiteSpace: "nowrap",
              }}>{t}</span>
            ))
          )}
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          6. EXPERIENCE / FEATURES GRID
      ────────────────────────────────────────────── */}
      <section ref={experienceRef} style={{ padding: "120px 10vw", background: "var(--bg)" }}>
        <div style={{ marginBottom: "70px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>
              — Why SOLESTEP
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.9 }}>
              THE EDGE IS IN<br />THE DETAILS
            </h2>
          </div>
          <p style={{ color: "var(--muted)", maxWidth: "340px", fontSize: "0.92rem", lineHeight: 1.8 }}>
            Six pillars of engineering excellence that separate SOLESTEP from everything else on the market.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border)" }}>
          {expFeatures.map((f) => (
            <div key={f.num} className="exp-card hover-card" style={{
              background: "var(--bg)", padding: "48px 36px", opacity: 0, cursor: "default",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                <span style={{ fontSize: "2rem", color: f.color, transition: "transform 0.3s" }}>{f.icon}</span>
                <span className="font-display" style={{ fontSize: "2.5rem", color: "var(--border)", lineHeight: 1 }}>{f.num}</span>
              </div>
              <h3 className="font-display text-hover-grad" style={{ fontSize: "1.5rem", letterSpacing: "0.07em", marginBottom: "14px", display: "block" }}>
                {f.title}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.85 }}>{f.desc}</p>
              <div style={{ marginTop: "24px", height: "2px", background: "var(--border)", position: "relative", overflow: "hidden" }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, height: "100%", width: "0%",
                  background: `linear-gradient(90deg, ${f.color}, transparent)`,
                  transition: "width 0.5s ease",
                }}
                  ref={el => {
                    if (el) {
                      el.parentElement.parentElement.addEventListener("mouseenter", () => el.style.width = "100%");
                      el.parentElement.parentElement.addEventListener("mouseleave", () => el.style.width = "0%");
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          7. HORIZONTAL SHOWCASE (pinned)
      ────────────────────────────────────────────── */}
      <section ref={showcaseRef} style={{ overflow: "hidden", background: "var(--surface)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 35vw) 1fr", minHeight: "100vh" }}>
          {/* Intro panel stays visible while the product track scrolls */}
          <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "100px 6vw 100px 10vw",
            borderRight: "1px solid var(--border)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0))",
            position: "relative",
            zIndex: 2,
          }}>
            <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px" }}>— The Collection</p>
            <h2 className="font-display" style={{ fontSize: "clamp(3rem, 5vw, 5rem)", lineHeight: 0.9, marginBottom: "20px" }}>
              FOUR MODELS.<br />ONE PURPOSE.
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.8, maxWidth: "360px" }}>
              Drag or scroll to explore all four silhouettes in the 2024 collection.
            </p>
            <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "12px", color: "var(--muted)", fontSize: "0.8rem" }}>
              <span style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
              <span style={{ fontSize: "1.2rem", color: "var(--accent)" }}>→</span>
            </div>
          </div>

          {/* Horizontally scrolling panels */}
          <div ref={showcaseViewportRef} style={{ overflow: "hidden", minWidth: 0 }}>
            <div ref={showcaseTrackRef} className="showcase-track" style={{ display: "flex", gap: "0px", width: "max-content", minHeight: "100vh" }}>
              {products.map((p) => (
                <div key={p.id} style={{
                  width: "420px", minHeight: "100vh", flexShrink: 0,
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  padding: "60px 40px",
                  borderLeft: "1px solid var(--border)",
                }}>
                  <div className="hover-card" style={{
                    background: "var(--bg)", padding: "40px 32px",
                    height: "100%", maxHeight: "600px",
                    display: "flex", flexDirection: "column",
                  }}>
                    {p.badge && (
                      <span style={{
                        display: "inline-block", background: "var(--accent)", color: "#000",
                        padding: "4px 12px", fontSize: "0.62rem", fontWeight: "700",
                        letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px",
                        alignSelf: "flex-start",
                      }}>{p.badge}</span>
                    )}
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={p.image} alt={`${p.name} shoe`} loading="lazy"
                        style={{ width: "100%", maxHeight: "240px", objectFit: "contain", filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.4))", transition: "transform 0.5s ease, filter 0.5s ease" }}
                        onMouseEnter={e => { e.target.style.transform = "scale(1.06) rotate(-2deg)"; e.target.style.filter = "drop-shadow(0 20px 50px rgba(200,255,0,0.18))"; }}
                        onMouseLeave={e => { e.target.style.transform = "scale(1) rotate(0deg)"; e.target.style.filter = "drop-shadow(0 16px 40px rgba(0,0,0,0.4))"; }}
                        onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
                      />
                      <div style={{ display: "none" }}><ShoeSVG id={p.id} size={260} /></div>
                    </div>
                    <div style={{ marginTop: "24px" }}>
                      <p style={{ color: "var(--muted)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>{p.category}</p>
                      <h3 className="font-display" style={{ fontSize: "2rem", marginBottom: "8px" }}>{p.name}</h3>
                      <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "20px", lineHeight: 1.7 }}>{p.tagline}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "1.4rem", fontWeight: "700" }}>${p.price}</span>
                        <button className="btn-accent" style={{ padding: "9px 22px", fontSize: "0.7rem" }} onClick={() => handleAdd(p)}>
                          <span>{addedId === p.id ? "✓" : "+ Cart"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          8. COLLECTION GRID
      ────────────────────────────────────────────── */}
      <section ref={collectionRef} style={{ padding: "100px 10vw", background: "var(--bg)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px" }}>
          <div>
            <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "12px" }}>— 2024 Collection</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", lineHeight: 0.9 }}>ALL MODELS</h2>
          </div>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <button className="btn-outline"><span>View All →</span></button>
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {products.map(p => (
            <div key={p.id} className="col-card product-card hover-card" style={{ opacity: 0, cursor: "pointer" }}>
              <div style={{
                aspectRatio: "1", padding: "24px",
                background: "radial-gradient(circle at 55% 40%, rgba(200,255,0,0.04) 0%, transparent 70%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderBottom: "1px solid var(--border)", overflow: "hidden",
              }}>
                <img src={p.image} alt={`${p.name} shoe`} loading="lazy"
                  style={{ width: "100%", objectFit: "contain", maxHeight: "160px" }}
                  onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
                />
                <div style={{ display: "none" }}><ShoeSVG id={p.id} size={180} /></div>
              </div>
              <div style={{ padding: "20px 22px 24px" }}>
                {p.badge && (
                  <span style={{ background: "var(--accent)", color: "#000", fontSize: "0.58rem", fontWeight: "700", letterSpacing: "0.12em", padding: "3px 8px", textTransform: "uppercase", display: "inline-block", marginBottom: "8px" }}>
                    {p.badge}
                  </span>
                )}
                <h3 className="font-display" style={{ fontSize: "1.3rem", marginBottom: "4px" }}>{p.name}</h3>
                <p style={{ color: "var(--muted)", fontSize: "0.75rem", marginBottom: "14px" }}>{p.category}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1.1rem", fontWeight: "700" }}>${p.price}</span>
                  <button className="btn-accent" style={{ padding: "7px 16px", fontSize: "0.68rem" }} onClick={() => handleAdd(p)}>
                    <span>{addedId === p.id ? "✓" : "+ Cart"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          9. TESTIMONIALS
      ────────────────────────────────────────────── */}
      <section ref={testimonialsRef} style={{ padding: "100px 10vw", background: "var(--surface)" }}>
        <div style={{ marginBottom: "60px", textAlign: "center" }}>
          <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>— Reviews</p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.9 }}>WHAT THEY SAY</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testi-item hover-card" style={{
              padding: "40px 32px", opacity: 0,
              background: i === activeTestimonial ? "rgba(200,255,0,0.04)" : "var(--card-bg)",
              borderColor: i === activeTestimonial ? "rgba(200,255,0,0.25)" : "var(--card-border)",
              cursor: "pointer",
              transition: "all 0.4s ease",
            }}
              onClick={() => setActiveTestimonial(i)}
            >
              <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                {[...Array(t.rating)].map((_, si) => (
                  <span key={si} style={{ color: "var(--accent)", fontSize: "0.85rem" }}>★</span>
                ))}
              </div>
              <p style={{ color: "var(--text)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "28px", fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: `var(--grad${i + 1})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", fontWeight: "700", color: "#000",
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontWeight: "600", fontSize: "0.9rem" }}>{t.name}</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.75rem" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          10. BRAND PROMISE
      ────────────────────────────────────────────── */}
      <section style={{ padding: "120px 10vw", background: "var(--bg)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        <div>
          <p style={{ color: "var(--accent)", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>— The Promise</p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 0.9, marginBottom: "28px" }}>
            IF IT'S NOT<br />PERFECT, IT<br />DOESN'T SHIP.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "32px" }}>
            Every single SOLESTEP shoe passes our 48-point quality inspection before it ever reaches your door. We test in labs, on tracks, and on trails. Because you deserve nothing less.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {["2-Year Warranty", "48-Point QC", "Athlete Tested", "Climate Pledged"].map(p => (
              <div key={p} className="hover-card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: "var(--accent)", fontSize: "1.1rem" }}>◈</span>
                <span style={{ fontSize: "0.82rem", fontWeight: "600" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { label: "Quality Score", value: "9.8/10", sub: "Independent labs" },
            { label: "Return Rate", value: "< 1%", sub: "Industry avg 8%" },
            { label: "NPS Score", value: "94", sub: "Promoters" },
            { label: "Reorder Rate", value: "71%", sub: "Customers" },
          ].map((s, i) => (
            <div key={i} className="hover-card" style={{ padding: "32px 24px", textAlign: "center" }}>
              <div className="font-display" style={{ fontSize: "2.4rem", color: "var(--accent)", marginBottom: "6px" }}>{s.value}</div>
              <p style={{ fontWeight: "600", fontSize: "0.82rem", marginBottom: "4px" }}>{s.label}</p>
              <p style={{ color: "var(--muted)", fontSize: "0.72rem" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          11. CTA
      ────────────────────────────────────────────── */}
      <section ref={ctaRef} style={{
        minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "100px 40px",
        background: "var(--accent)", position: "relative", overflow: "hidden",
      }}>
        {/* Animated grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="cta-item" style={{ fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(0,0,0,0.45)", marginBottom: "20px" }}>
            Ready to elevate your game?
          </p>
          <h2 className="cta-item font-display" style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)", color: "#000", lineHeight: 0.88, marginBottom: "44px" }}>
            START YOUR<br />JOURNEY
          </h2>
          <div className="cta-item" style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
            <Link to="/products">
              <button style={{
                background: "#000", color: "var(--accent)",
                border: "none", padding: "16px 48px",
                fontSize: "0.82rem", fontWeight: "700",
                letterSpacing: "0.15em", textTransform: "uppercase",
                cursor: "pointer", transition: "all 0.3s",
                clip_path: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#000"; e.currentTarget.style.boxShadow = "none"; }}
              >
                Explore All Products →
              </button>
            </Link>
            <Link to="/story">
              <button style={{
                background: "transparent", color: "#000",
                border: "1.5px solid rgba(0,0,0,0.3)", padding: "15px 40px",
                fontSize: "0.82rem", fontWeight: "700",
                letterSpacing: "0.15em", textTransform: "uppercase",
                cursor: "pointer", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#000"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.3)"; }}
              >
                Our Story
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
