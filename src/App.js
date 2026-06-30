import { useEffect } from "react";
import useStore from "./store/useStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ActivityPanel from "./components/ActivityPanel";
import CommandPalette from "./components/CommandPalette";
import Modal from "./components/Modal";

import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import SprintBoard from "./pages/SprintBoard";

import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  const updateCollaboratorStatus = useStore((s) => s.updateCollaboratorStatus);
  const addActivity = useStore((s) => s.addActivity);
  const collaborators = useStore((s) => s.collaborators);
  const isDark = useStore((s) => s.isDark);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  // Theme switching
  useEffect(() => {
  document.body.classList.toggle("light", !isDark);
  }, [isDark]);

  // Live collaborator simulation
  useEffect(() => {
    const statuses = ["typing", "viewing", "away"];

    const interval = setInterval(() => {
      const random =
        collaborators[Math.floor(Math.random() * collaborators.length)];

      const status =
        statuses[Math.floor(Math.random() * statuses.length)];

      updateCollaboratorStatus(random.id, status);

      addActivity(random.name, random.color, `is now ${status}`);
    }, 6000);

    return () => clearInterval(interval);
  }, [collaborators, updateCollaboratorStatus, addActivity]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "b" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleSidebar]);

  return (
    <BrowserRouter>

      <Toaster position="top-right" />

      <div className="app">

        <Sidebar />

        <div className="main">

          <Topbar />

          <div className="content">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/sprint" element={<SprintBoard />} />
            </Routes>

          </div>

        </div>

        <ActivityPanel />

        <CommandPalette />

        <Modal />

      </div>

    </BrowserRouter>
  );
}

export default App;