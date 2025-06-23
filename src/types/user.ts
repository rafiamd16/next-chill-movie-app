export interface User {
  id: number
  username: string
  email?: string
  password: string
  avatar?: string
}

export interface UserState {
  users: User[]
  currentUser: User | null
  fetchUsers: () => Promise<void>
  login: (data: { username: string; password: string }) => boolean
  register: (data: { username: string; password: string }) => Promise<void>
  updateProfile: (data: { username: string; email: string; password: string }) => Promise<void>
  logout: () => void
  deleteAccount: () => Promise<void>
  hasHydrated: boolean
}
