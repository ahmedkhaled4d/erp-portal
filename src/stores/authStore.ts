import Cookies from 'js-cookie'
import { create } from 'zustand'

const ACCESS_TOKEN = 'access_token' // Just an example, prefer to use a more descriptive name for the cookie

interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  // Initialize state from cookies
  const storedToken = Cookies.get(ACCESS_TOKEN) || ''
  const initToken = storedToken ? storedToken : ''

  // Retrieve user info from cookies as well (if needed)
  const storedUser = Cookies.get('user_info')
    ? JSON.parse(Cookies.get('user_info')!)
    : null

  return {
    auth: {
      user: storedUser, // Initialize user state from cookies
      setUser: (user) => {
        set((state) => {
          // Optionally store user data in cookies for persistence
          if (user) {
            Cookies.set('user_info', JSON.stringify(user), { expires: 7 }) // expires in 7 days
          } else {
            Cookies.remove('user_info')
          }
          return { ...state, auth: { ...state.auth, user } }
        })
      },
      accessToken: initToken, // Initialize access token state from cookies
      setAccessToken: (accessToken) =>
        set((state) => {
          // Store token in cookies for persistence
          Cookies.set(ACCESS_TOKEN, accessToken, { expires: 7 }) // expires in 7 days
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          // Remove token from cookies
          Cookies.remove(ACCESS_TOKEN)
          return { ...state, auth: { ...state.auth, accessToken: '' } }
        }),
      reset: () =>
        set((state) => {
          // Remove both user info and access token from cookies
          Cookies.remove(ACCESS_TOKEN)
          Cookies.remove('user_info')
          return {
            ...state,
            auth: {
              ...state.auth,
              user: null,
              accessToken: '',
            },
          }
        }),
    },
  }
})

export const useAuth = () => useAuthStore((state) => state.auth)
