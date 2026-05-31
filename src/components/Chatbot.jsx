import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { products } from "../data/products";

const RESPONSES = {
  "/help": [
    "Available commands:",
    "  /products  → list all products",
    "  /price     → show pricing",
    "  /about     → brand info",
    "  /clear     → clear terminal output",
    "  /help      → this menu",
  ].join("\n"),
  "/products": products.map((p) => `  [${p.id}] ${p.name} — $${p.price}`).join("\n"),
  "/price": products.map((p) => `  ${p.name}: $${p.price} (was $${p.originalPrice})`).join("\n"),
  "/about":
    "SOLESTEP is a premium footwear brand born in 2024.\nWe blend performance engineering with bold street aesthetics.\nEvery shoe tells a story. Step into yours.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    { type: "sys", text: "SOLESTEP_CLI v1.0.0" },
    { type: "sys", text: 'Type /help for available commands.' },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const submit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "/clear") {
      setLines([
        { type: "sys", text: "SOLESTEP_CLI v1.0.0" },
        { type: "sys", text: 'Type /help for available commands.' },
      ]);
      setInput("");
      return;
    }

    setLines((prev) => [...prev, { type: "input", text: `> ${cmd}` }]);
    const response = RESPONSES[cmd] || `Command not found: ${cmd}\nType /help for help.`;
    setTimeout(() => {
      setLines((prev) => [...prev, { type: "output", text: response }]);
    }, 180);
    setInput("");
  };

  const ui = (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="chatbot-trigger"
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          width: "54px", height: "54px",
          background: "var(--accent)", color: "#000",
          border: "none", borderRadius: "50%",
          zIndex: 8500, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.3rem", fontWeight: "700",
          boxShadow: "0 0 0 0 rgba(200,255,0,0.4)",
          animation: open ? "none" : "pulse 2.5s infinite",
        }}
        aria-label="Open chatbot"
      >
        {open ? "×" : ">_"}
      </button>

      {/* Window */}
      {open && (
        <div className="chatbot-window">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: "#ff5f56" }} />
            <div className="terminal-dot" style={{ background: "#ffbd2e" }} />
            <div className="terminal-dot" style={{ background: "#27c93f" }} />
            <span style={{ marginLeft: "8px", fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
              SOLESTEP — CLI
            </span>
          </div>

          <div ref={bodyRef} className="terminal-body">
            {lines.map((line, i) => (
              <div key={i} style={{
                color: line.type === "input" ? "var(--accent)" : line.type === "sys" ? "#888" : "var(--text)",
                whiteSpace: "pre-wrap",
                marginBottom: "4px",
              }}>
                {line.text}
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="terminal-input-row">
            <span style={{ color: "var(--muted)" }}>$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="enter command..."
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,255,0,0.4); }
          50% { box-shadow: 0 0 0 14px rgba(200,255,0,0); }
        }
      `}</style>
    </>
  );

  if (typeof document === "undefined") return ui;

  return createPortal(ui, document.body);
}
