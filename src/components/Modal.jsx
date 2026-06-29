import useStore from "../store/useStore";

export default function Modal() {
  const modalOpen = useStore((s) => s.modalOpen);
  const closeModal = useStore((s) => s.closeModal);
  const collaborators = useStore((s) => s.collaborators);

  if (!modalOpen) return null;

  return (
    <>
      <div onClick={closeModal} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)", zIndex: 999
      }} />
      <div style={{
        position: "fixed", top: "25%", left: "50%",
        transform: "translateX(-50%)", width: 420,
        background: "#1e2436", border: "1px solid #3a4570",
        borderRadius: 12, zIndex: 1000, padding: 24
      }}>
        <h3 style={{ marginBottom: 16 }}>Share Document</h3>
        <div style={{
          background: "#0f1117", borderRadius: 8,
          padding: "10px 14px", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          marginBottom: 16
        }}>
          <span style={{ fontSize: 13, color: "#8b92a8", fontFamily: "monospace" }}>
            https://livecollab.app/doc/q3-roadmap
          </span>
          <button
            onClick={() => { navigator.clipboard.writeText("https://livecollab.app/doc/q3-roadmap"); }}
            style={{
              background: "#6366f1", color: "white",
              padding: "4px 12px", borderRadius: 6, fontSize: 12
            }}
          >
            Copy
          </button>
        </div>
        <div style={{ fontSize: 13, color: "#8b92a8", marginBottom: 10 }}>
          Team members with access
        </div>
        {collaborators.map((c) => (
          <div key={c.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 0", borderBottom: "1px solid #2a3050"
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: c.color, display: "grid",
              placeItems: "center", color: "white",
              fontSize: 12, fontWeight: 700, flexShrink: 0
            }}>
              {c.initials}
            </div>
            <span style={{ flex: 1, fontSize: 14 }}>{c.name}</span>
            <select style={{
              background: "#1f2937", border: "1px solid #374151",
              color: "white", borderRadius: 6,
              fontSize: 12, padding: "3px 8px"
            }}>
              <option>Can edit</option>
              <option>Can view</option>
            </select>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
          <button onClick={closeModal} style={{
            padding: "8px 16px", borderRadius: 8,
            background: "#1f2937", color: "white",
            border: "1px solid #374151", fontSize: 13
          }}>
            Cancel
          </button>
          <button onClick={closeModal} style={{
            padding: "8px 16px", borderRadius: 8,
            background: "#6366f1", color: "white",
            fontSize: 13
          }}>
            Done
          </button>
        </div>
      </div>
    </>
  );
}