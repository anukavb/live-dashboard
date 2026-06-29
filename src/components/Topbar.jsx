import "./Topbar.css";
import { FaSearch, FaBell } from "react-icons/fa";
import useStore from "../store/useStore";

export default function Topbar() {
  const collaborators = useStore((s) => s.collaborators);
  const openPalette = useStore((s) => s.openPalette);
  const openModal = useStore((s) => s.openModal);

  return (
    <header className="topbar">

      {/* Search */}
      <div className="search-box">
        <FaSearch color="#94a3b8" />
        <input placeholder="Search projects..." />
      </div>

      {/* Right Section */}
      <div className="topbar-right">

        <button className="icon-btn" onClick={openPalette} title="Ctrl+K">
          ⌘
        </button>

        <button className="icon-btn" onClick={openModal} title="Share">
          ↗
        </button>

        <button className="icon-btn">
          <FaBell />
        </button>

        {/* Live Collaborators */}
        <div className="avatar-group">
          {collaborators.map((c) => (
            <div
              key={c.id}
              className={`avatar ${c.status}`}
              style={{ background: c.color }}
              title={`${c.name} • ${c.status}`}
            >
              {c.initials}
            </div>
          ))}
        </div>

        {/* Logged-in User */}
        <div className="user-avatar">Y</div>

      </div>

      {/* Live Presence */}
      <div className="live-status">
        {collaborators.some((c) => c.status === "typing") ? (
          collaborators
            .filter((c) => c.status === "typing")
            .map((c) => (
              <span key={c.id}>✍️ {c.name} is typing...</span>
            ))
        ) : (
          <span>
            🟢 {collaborators.filter((c) => c.status !== "away").length} collaborators online
          </span>
        )}
      </div>

    </header>
  );
}