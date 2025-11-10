import { createContext, useContext } from 'react'
import { db } from '../db'

// Provide the Dexie instance via context for components to consume
export const DexieContext = createContext(db)

export function useDB() {
  return useContext(DexieContext)
}
