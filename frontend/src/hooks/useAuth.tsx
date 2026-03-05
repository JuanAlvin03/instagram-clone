import { useState, useEffect } from 'react'

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('userId')
    } catch {
      return null
    }
  })

  const [username, setUsername] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('username')
    } catch {
      return null
    }
  })

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('accessToken')
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (userId) sessionStorage.setItem('userId', userId)
      else sessionStorage.removeItem('userId')
    } catch {}
  }, [userId])

  useEffect(() => {
    try {
      if (username) sessionStorage.setItem('username', username)
      else sessionStorage.removeItem('username')
    } catch {}
  }, [username])

  useEffect(() => {
    try {
      if (accessToken) sessionStorage.setItem('accessToken', accessToken)
      else sessionStorage.removeItem('accessToken')
    } catch {}
  }, [accessToken])

  return {
    userId,
    username,
    accessToken,
    login: (id: string, user: string, token: string) => {
      setUserId(id)
      setUsername(user)
      setAccessToken(token)
    },
    logout: () => {
      setUserId(null)
      setUsername(null)
      setAccessToken(null)
    },
  }
}
