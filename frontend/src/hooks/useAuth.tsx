import { useState, useEffect } from 'react'

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('currentUser')
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (userId) sessionStorage.setItem('currentUser', userId)
      else sessionStorage.removeItem('currentUser')
    } catch {}
  }, [userId])

  return {
    userId,
    login: (id: string) => setUserId(id),
    logout: () => setUserId(null),
  }
}
