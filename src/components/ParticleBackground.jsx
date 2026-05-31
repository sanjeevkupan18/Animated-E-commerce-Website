import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId;
    let mouseX = W / 2,
      mouseY = H / 2;

    canvas.width = W;
    canvas.height = H;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Determine accent color from CSS var
    const getAccent = () => {
      const style = getComputedStyle(document.documentElement);
      return style.getPropertyValue("--accent").trim() || "#C8FF00";
    };

    // Particles
    const N_PARTICLES = 80;
    const N_LINES = 12;

    const particles = Array.from({ length: N_PARTICLES }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random() * 800 + 100,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 0.5,
      pulse: Math.random() * Math.PI * 2,
    }));

    // 3D flowing lines (bezier curves in 3D projected)
    const lines = Array.from({ length: N_LINES }, (_, i) => ({
      pts: Array.from({ length: 6 }, () => ({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1200,
        z: Math.random() * 600 - 300,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.4,
      })),
      phase: (i / N_LINES) * Math.PI * 2,
    }));

    const project = (x, y, z) => {
      const fov = 500;
      const cx = W / 2 + (mouseX - W / 2) * 0.015;
      const cy = H / 2 + (mouseY - H / 2) * 0.01;
      const scale = fov / (fov + z);
      return {
        sx: cx + x * scale,
        sy: cy + y * scale,
        scale,
      };
    };

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      const isDark =
        document.documentElement.getAttribute("data-theme") !== "light";
      const accentHex = getAccent();

      // Parse hex to rgb
      const hex = accentHex.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      const baseAlpha = isDark ? 1 : 0.55;

      // Draw 3D flowing lines
      for (const line of lines) {
        for (const pt of line.pts) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.z += pt.vz;
          if (Math.abs(pt.x) > 900) pt.vx *= -1;
          if (Math.abs(pt.y) > 700) pt.vy *= -1;
          if (pt.z > 400 || pt.z < -400) pt.vz *= -1;
        }

        const projected = line.pts.map((pt) => project(pt.x, pt.y, pt.z));
        const lineAlpha =
          (0.06 + Math.sin(frame * 0.008 + line.phase) * 0.04) * baseAlpha;

        ctx.beginPath();
        ctx.moveTo(projected[0].sx, projected[0].sy);
        for (let i = 1; i < projected.length; i++) {
          const prev = projected[i - 1];
          const curr = projected[i];
          const cpx = (prev.sx + curr.sx) / 2;
          const cpy = (prev.sy + curr.sy) / 2;
          ctx.quadraticCurveTo(prev.sx, prev.sy, cpx, cpy);
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Connect nearby particles with lines
      for (let i = 0; i < N_PARTICLES; i++) {
        const a = particles[i];
        for (let j = i + 1; j < N_PARTICLES; j++) {
          const b2 = particles[j];
          const dx = a.x - b2.x;
          const dy = a.y - b2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12 * baseAlpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b2.x, b2.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.pulse += 0.02;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        if (p.z > 900) p.z = 100;
        if (p.z < 100) p.z = 900;

        // Mouse repulsion
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100) {
          p.x += (mdx / mdist) * 0.6;
          p.y += (mdy / mdist) * 0.6;
        }

        const depth = 1 - (p.z - 100) / 800;
        const alpha = (0.25 + Math.sin(p.pulse) * 0.15) * depth * baseAlpha;
        // Ensure size is never negative (prevents createRadialGradient IndexSizeError)
        const rawSize = p.size * depth + Math.sin(p.pulse) * 0.4;
        const size = Math.max(0.2, rawSize);

        // Glow - guard radius so it is >= 0.5
        const glowRadius = Math.max(0.5, size * 3);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grd.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 2.5})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
}
