import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  sidebarOpen:    boolean
  theme:          'dark' | 'light'
  toggleSidebar:  () => void
  setSidebarOpen: (open: boolean) => void
  toggleTheme:    () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      theme:       'dark',

      toggleSidebar:  () => set({ sidebarOpen: !get().sidebarOpen }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        document.documentElement.classList.toggle('dark', next === 'dark')
        set({ theme: next })
      },
    }),
    {
      name: 'sgdi-ui',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle('dark', state.theme === 'dark')
        }
      },
    },
  ),
)
