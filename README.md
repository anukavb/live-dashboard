# LiveCollab — Live Collaboration Dashboard

An interactive, state-driven SaaS dashboard simulating a real-time collaboration tool (inspired by Notion / Figma presence systems).

## Overview

This project was built for the **Frontend Task: Interactive Product Experience Platform** — Level 1 (Core UI and State).

## Tech Stack

- **React** (Create React App)
- **Zustand** — global state management
- **React Router DOM** — client-side routing
- **react-icons** — icon library
- **react-hot-toast** — toast notifications

## Features

- **Multi-panel layout** — sidebar, main workspace, and live activity panel
- **Global state management** — all app state (theme, collaborators, activity, comments, checklist) handled via Zustand
- **Dynamic routing** — Dashboard, Analytics, and Sprint Board pages via React Router
- **Theme system** — dark/light mode toggle
- **Simulated real-time collaboration**
  - Live collaborator presence (typing / viewing / away)
  - Auto-updating activity feed
  - Live comments
- **Command palette** — press `Ctrl/Cmd + K` to search and run commands
- **Keyboard shortcuts**
  - `Ctrl/Cmd + K` — open command palette
  - `B` — toggle sidebar
  - `Esc` — close modal/palette
- **Reusable components** — buttons, cards, modal, checklist, comment threads
- **Sprint Board** — drag-and-drop kanban board (To Do / In Progress / Done)
- **Analytics page** — stat cards, activity bar chart, team status overview

## Project Structure

\`\`\`
src/
├── components/
│   ├── Sidebar.jsx / .css
│   ├── Topbar.jsx / .css
│   ├── Workspace.jsx / .css
│   ├── ActivityPanel.jsx / .css
│   ├── CommandPalette.jsx
│   ├── Modal.jsx
│   ├── OverviewCards.jsx / .css
│   ├── Checklist.jsx / .css
│   └── Comments.jsx / .css
├── pages/
│   ├── Home.jsx
│   ├── Analytics.jsx
│   └── SprintBoard.jsx
├── store/
│   └── useStore.js
├── App.js
└── App.css
\`\`\`

## How to Run Locally

\`\`\`bash
git clone https://github.com/anukavb/live-dashboard.git
cd live-dashboard
npm install
npm start
\`\`\`

App runs at \`http://localhost:3000\`

## Live Demo

Vercel Link: https://live-dashboard-red.vercel.app