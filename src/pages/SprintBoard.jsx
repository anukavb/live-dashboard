import { useState } from "react";

const INITIAL_TASKS = {
  todo: ["Write unit tests", "Update docs", "Fix navbar bug"],
  inprogress: ["Build API v2", "Design onboarding flow"],
  done: ["Setup CI/CD", "Finalize UI components"],
};

const COLUMN_LABELS = {
  todo: "📋 To Do",
  inprogress: "⚡ In Progress",
  done: "✅ Done",
};

export default function SprintBoard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [dragging, setDragging] = useState(null);
  const [newTask, setNewTask] = useState("");

  function onDragStart(task, from) {
    setDragging({ task, from });
  }

  function onDrop(to) {
    if (!dragging || dragging.from === to) return;
    setTasks((prev) => ({
      ...prev,
      [dragging.from]: prev[dragging.from].filter((t) => t !== dragging.task),
      [to]: [...prev[to], dragging.task],
    }));
    setDragging(null);
  }

  function addTask() {
    if (!newTask.trim()) return;
    setTasks((prev) => ({ ...prev, todo: [newTask.trim(), ...prev.todo] }));
    setNewTask("");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-main)" }}>Sprint Board</h2>

      {/* Add Task */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          style={{
            flex: 1, padding: "10px 14px",
            background: "var(--bg-panel)", border: "1px solid var(--bg-border)",
            borderRadius: 10, color: "var(--text-main)", fontSize: 14, outline: "none"
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px 20px", background: "#6366f1",
            color: "white", borderRadius: 10, fontSize: 14
          }}
        >
          Add
        </button>
      </div>

      {/* Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {Object.keys(tasks).map((col) => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(col)}
            style={{
              background: "var(--bg-panel)", borderRadius: 16,
              padding: 16, border: "1px solid var(--bg-border)",
              minHeight: 300
            }}
          >
            <h3 style={{ marginBottom: 14, fontSize: 15, color: "var(--text-main)" }}>
              {COLUMN_LABELS[col]}
              <span style={{
                marginLeft: 8, fontSize: 12,
                color: "var(--text-muted)"
              }}>
                {tasks[col].length}
              </span>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {tasks[col].map((task) => (
                <div
                  key={task}
                  draggable
                  onDragStart={() => onDragStart(task, col)}
                  style={{
                    background: "var(--bg-border)", borderRadius: 10,
                    padding: "12px 14px", fontSize: 14,
                    cursor: "grab", border: "1px solid var(--bg-border)",
                    color: "var(--text-main)",
                    transition: "0.2s",
                    opacity: dragging?.task === task ? 0.4 : 1
                  }}
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}