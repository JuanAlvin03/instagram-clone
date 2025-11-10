import React, { createContext, useContext, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { db } from '../db'
import { seedIfEmpty } from '../db/seed'

const DexieContext = createContext(db)

export function useDB() {
  return useContext(DexieContext)
}

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  // seed DB on first mount for convenience
  useEffect(() => {
    void seedIfEmpty()
  }, [])

  return (
    <DexieContext.Provider value={db}>
      <BrowserRouter>{children}</BrowserRouter>
    </DexieContext.Provider>
  )
}

export default Providers
