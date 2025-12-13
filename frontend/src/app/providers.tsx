// app/providers.tsx
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { db } from '../db'
import { seedIfEmpty } from '../db/seed'
import { DexieContext } from './db'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      await seedIfEmpty()
      setReady(true)
    }
    init()
  }, [])

  if (!ready) {
    // simple splash/loading state
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading…
      </div>
    )
  }

  return (
    <DexieContext.Provider value={db}>
      <BrowserRouter>{children}</BrowserRouter>
    </DexieContext.Provider>
  )
}

export default Providers
