import "./ActivityPanel.css";
import { useEffect } from "react";
import useStore from "../store/useStore";

const actions = [
  "updated the roadmap",
  "commented on Sprint Planning",
  "completed a task",
  "joined the workspace",
  "reviewed a pull request",
  "uploaded a design file",
];

export default function ActivityPanel() {
  const collaborators = useStore((s) => s.collaborators);
  const activities = useStore((s) => s.activities);
  const addActivity = useStore((s) => s.addActivity);

  useEffect(() => {
    const interval = setInterval(() => {
      const user =
        collaborators[Math.floor(Math.random() * collaborators.length)];

      const action =
        actions[Math.floor(Math.random() * actions.length)];

      addActivity(user.name, user.color, action);
    }, 5000);

    return () => clearInterval(interval);
  }, [collaborators, addActivity]);

  return (
    <aside className="activity-panel">
      <h2>Activity</h2>

      {activities.length === 0 ? (
        <p className="empty">Waiting for activity...</p>
      ) : (
        activities.map((item) => (
          <div key={item.id} className="activity-item">
            <div
              className="activity-avatar"
              style={{ background: item.color }}
            >
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="activity-text">
              <strong>{item.name}</strong>

              <p>{item.action}</p>

              <small>{item.time}</small>
            </div>
          </div>
        ))
      )}
    </aside>
  );
}