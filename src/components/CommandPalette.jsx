import { useEffect, useRef, useState, useCallback } from "react";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

const COMMANDS = [
  { icon: "🏠", label: "Go to Dashboard", action: "nav", path: "/" },
  { icon: "📊", label: "Go to Analytics", action: "nav", path: "/analytics" },
  { icon: "📋", label: "Go to Sprint Board", action: "nav", path: "/sprint" },
  { icon: "🎨", label: "Toggle Theme", action: "theme" },
];

export default function CommandPalette() {
  const paletteOpen = useStore((s) => s.paletteOpen);
  const closePalette = useStore((s) => s.closePalette);
  const openPalette = useStore((s) => s.openPalette);
  const toggleTheme = useStore((s) => s.toggleTheme);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const runCommand = useCallback((cmd) => {
    if (!cmd) return;
    if (cmd.action === "nav") navigate(cmd.path);
    if (cmd.action === "theme") toggleTheme();
    closePalette();
  }, [navigate, toggleTheme, closePalette]);

  // Open with Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        paletteOpen ? closePalette() : openPalette();
      }
      if (e.key === "Escape") closePalette();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [paletteOpen, closePalette, openPalette]);

  // Arrow keys + Enter
  useEffect(() => {
    if (!paletteOpen) return;
    const handler = (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter")     { e.preventDefault(); runCommand(filtered[selected]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [paletteOpen, filtered, selected, runCommand]);

  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [paletteOpen]);

  if (!paletteOpen) return null;

  return (
    <>
      <div onClick={closePalette} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)", zIndex: 999
      }} />
      <div style={{
        position: "fixed", top: "20%", left: "50%",
        transform: "translateX(-50%)", width: 480,
        background: "var(--bg-panel)", border: "1px solid var(--bg-border)",
        borderRadius: 12, zIndex: 1000, overflow: "hidden"
      }}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
          placeholder="Type a command..."
          style={{
            width: "100%", padding: "14px 16px",
            background: "transparent", border: "none",
            borderBottom: "1px solid var(--bg-border)",
            color: "var(--text-main)", fontSize: 15, outline: "none"
          }}
        />
        <div style={{ padding: 6 }}>
          {filtered.length === 0 && (
            <div style={{ padding: "10px 12px", color: "var(--text-muted)" }}>No commands found</div>
          )}
          {filtered.map((cmd, i) => (
            <div
              key={cmd.label}
              onClick={() => runCommand(cmd)}
              onMouseEnter={() => setSelected(i)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 6, cursor: "pointer",
                fontSize: 14,
                background: i === selected ? "#6366f130" : "transparent",
                color: i === selected ? "#818cf8" : "var(--text-muted)"
              }}
            >
              <span>{cmd.icon}</span>
              <span>{cmd.label}</span>
            </div>
          ))}
        </div>
        <div style={{
          padding: "8px 14px", borderTop: "1px solid var(--bg-border)",
          display: "flex", gap: 14,
          fontSize: 11, color: "var(--text-muted)"
        }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </>
  );
}