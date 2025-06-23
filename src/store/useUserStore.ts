'use client'

import { UserState } from '@/types/user'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { createData, deleteData, getAllData, updateData } from '@/services/api'
import { User } from '@/types/user'

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      hasHydrated: false,

      fetchUsers: async () => {
        const data: User[] = await getAllData('users')
        set({ users: data })
      },

      login: ({ username, password }) => {
        const user = get().users.find((u) => u.username === username && u.password === password)
        if (user) {
          set({ currentUser: user })
          return true
        }
        return false
      },

      register: async ({ username, password }) => {
        const data = { username, password, email: 'johndoe@gmail.com', avatar: '/img/profile.png' }

        const newUser = await createData('users', data)
        set((state) => ({
          users: [...state.users, newUser],
        }))
      },

      updateProfile: async ({ username, email, password }) => {
        const user = get().currentUser
        if (!user) return

        const data = { username, password, email, avatar: user.avatar }
        const updateUser = await updateData(`users`, user.id, data)
        set((state) => ({
          users: state.users.map((u) => (u.id === user.id ? updateUser : u)),
          currentUser: updateUser,
        }))
      },

      logout: () => set({ currentUser: null }),

      deleteAccount: async () => {
        const user = get().currentUser
        if (!user) return
        await deleteData('users', user.id)
        set((state) => ({
          users: state.users.filter((u) => u.id !== user.id),
          currentUser: null,
        }))
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ currentUser: state.currentUser }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.hasHydrated = true //
          }
        }
      },
    },
  ),
)

export default useUserStore
