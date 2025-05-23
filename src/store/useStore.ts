import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  department: string
  performance: number
  address: string
  phone: string
  bio: string
  performanceHistory: { date: string; rating: number }[]
}

interface StoreState {
  employees: Employee[]
  bookmarks: number[]
  setEmployees: (employees: Employee[]) => void
  addBookmark: (id: number) => void
  removeBookmark: (id: number) => void
  isBookmarked: (id: number) => boolean
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      employees: [],
      bookmarks: [],
      setEmployees: (employees) => set({ employees }),
      addBookmark: (id) => set((state) => ({ bookmarks: [...state.bookmarks, id] })),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmarkId) => bookmarkId !== id),
        })),
      isBookmarked: (id) => get().bookmarks.includes(id),
    }),
    {
      name: 'hr-dashboard-storage',
    }
  )
) 