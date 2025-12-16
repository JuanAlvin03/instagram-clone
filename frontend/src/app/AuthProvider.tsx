import { createContext, useContext } from "react"
import { useAuth } from "../hooks/useAuth"

type AuthContextType = {
  userId: string | null
  login: (id: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("AuthContext missing")
  return ctx
}
