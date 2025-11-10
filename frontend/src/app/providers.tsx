import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { db } from '../db'
import { seedIfEmpty } from '../db/seed'
import { DexieContext } from './db'

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
