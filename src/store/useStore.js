import { create } from 'zustand';

const useStore = create((set) => ({
  // Theme
  isDark: true,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),

  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  // Active page
  activePage: 'Home',
  setActivePage: (page) => set({ activePage: page }),

  // Collaborators
  collaborators: [
    { id: 1, name: 'Maya Chen',   initials: 'MC', color: '#f59e0b', status: 'typing'  },
    { id: 2, name: 'Alex Kim',    initials: 'AK', color: '#3b82f6', status: 'viewing' },
    { id: 3, name: 'Sam Rivera',  initials: 'SR', color: '#22c55e', status: 'away'    },
    { id: 4, name: 'Jordan Lee',  initials: 'JL', color: '#a855f7', status: 'viewing' },
  ],

  // Activity feed
  activities: [],
  addActivity: (name, color, action) =>
    set((state) => ({
      activities: [
        { id: Date.now(), name, color, action, time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) },
        ...state.activities,
      ].slice(0, 20),
    })),
  clearActivities: () => set({ activities: [] }),

  // Comments
  comments: [
    { id: 1, author: 'Maya Chen', color: '#f59e0b', time: '2m ago', text: "Can someone double-check the beta launch date? I think we said June 20th." },
    { id: 2, author: 'Alex Kim',  color: '#3b82f6', time: '1m ago', text: "Confirmed — June 20th. I've updated the backend timeline." },
  ],
  addComment: (text) =>
    set((state) => ({
      comments: [
        ...state.comments,
        { id: Date.now(), author: 'You', color: '#6366f1', time: 'just now', text },
      ],
    })),

  // Checklist
  checkStates: [true, true, false, false, false],
  toggleCheck: (index) =>
    set((state) => {
      const updated = [...state.checkStates];
      updated[index] = !updated[index];
      return { checkStates: updated };
    }),

  // Command palette
  paletteOpen: false,
  openPalette: () => set({ paletteOpen: true }),
  closePalette: () => set({ paletteOpen: false }),

  // Modal
  modalOpen: false,
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),

  // Dashboard Stats
stats: {
  tasks: 42,
  comments: 18,
  progress: 76,
  activeUsers: 4,
},

updateStat: (key, value) =>
  set((state) => ({
    stats: {
      ...state.stats,
      [key]: value,
    },
  })),

  // Update collaborator status
updateCollaboratorStatus: (id, status) =>
  set((state) => ({
    collaborators: state.collaborators.map((c) =>
      c.id === id ? { ...c, status } : c
    ),
  })),

}));

export default useStore;