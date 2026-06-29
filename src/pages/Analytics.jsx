import useStore from "../store/useStore";

export default function Analytics() {
  const stats = useStore((s) => s.stats);
  const collaborators = useStore((s) => s.collaborators);

  const bars = [
    { label: "Mon", value: 40 },
    { label: "Tue", value: 70 },
    { label: "Wed", value: 55 },
    { label: "Thu", value: 90 },
    { label: "Fri", value: 65 },
    { label: "Sat", value: 30 },
    { label: "Sun", value: 50 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <h2 style={{ fontSize: 24, fontWeight: 700 }}>Analytics</h2>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { label: "Total Tasks", value: stats.tasks },
          { label: "Progress", value: stats.progress + "%" },
          { label: "Team Size", value: stats.activeUsers },
        ].map((s) => (
          <div key={s.label} style={{
            background: "#111827", borderRadius: 16,
            padding: 20, border: "1px solid #1f2937"
          }}>
            <p style={{ color: "#94a3b8", marginBottom: 8 }}>{s.label}</p>
            <h2 style={{ fontSize: 32 }}>{s.value}</h2>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div style={{
        background: "#111827", borderRadius: 16,
        padding: 24, border: "1px solid #1f2937"
      }}>
        <h3 style={{ marginBottom: 20 }}>Activity This Week</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
          {bars.map((b) => (
            <div key={b.label} style={{
              flex: 1, display: "flex",
              flexDirection: "column", alignItems: "center", gap: 6
            }}>
              <div style={{
                width: "100%",
                height: b.value * 1.5,
                background: "#6366f1",
                borderRadius: "6px 6px 0 0",
                transition: "height 0.3s"
              }} />
              <span style={{ fontSize: 12, color: "#94a3b8" }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Status */}
      <div style={{
        background: "#111827", borderRadius: 16,
        padding: 24, border: "1px solid #1f2937"
      }}>
        <h3 style={{ marginBottom: 16 }}>Team Status</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {collaborators.map((c) => (
            <div key={c.id} style={{
              display: "flex", alignItems: "center", gap: 12
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: c.color, display: "grid",
                placeItems: "center", fontWeight: 700, fontSize: 13
              }}>
                {c.initials}
              </div>
              <span style={{ flex: 1 }}>{c.name}</span>
              <span style={{
                fontSize: 12, padding: "3px 10px", borderRadius: 20,
                background: c.status === "typing" ? "#f59e0b20"
                  : c.status === "viewing" ? "#22c55e20" : "#64748b20",
                color: c.status === "typing" ? "#f59e0b"
                  : c.status === "viewing" ? "#22c55e" : "#64748b"
              }}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}