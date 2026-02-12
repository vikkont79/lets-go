import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateUser } from '@/entities/user'
import type { User } from '@/entities/user'

interface RootStore {
  currentUser: User | null
  setCurrentUser: (user: User) => void
  generateCurrentUser: () => void
  clearCurrentUser: () => void
}

export const useGlobalStore = create<RootStore>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      generateCurrentUser: () => set({ currentUser: generateUser() }),
      clearCurrentUser: () => set({ currentUser: null }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ currentUser: state.currentUser })
    }
  )
)
