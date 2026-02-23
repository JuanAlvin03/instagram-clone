// app/providers.tsx
import React, { useEffect, useState } from 'react'
import { HashRouter } from 'react-router-dom'
import { db } from '../db'
import { seedIfEmpty } from '../db/seed'
import { DexieContext } from './db'
import { Spinner } from '@/components/ui/spinner'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      await seedIfEmpty()
      setReady(true);
    }
    init()
  }, [])

  if (!ready) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-between bg-white p-8">
        {/* Top Spacer to help center the middle content */}
        <div className="flex-1" />

        {/* Center Content: Logo and Name */}
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
          <div className="relative mb-4">
            <img 
              src="myinsta.svg" 
              alt="MyGram Logo" 
              className="size-20 md:size-24 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            MyGram
          </h1>
        </div>

        {/* Bottom Content: Spinner and Branding */}
        <div className="flex-1 flex flex-col items-center justify-end pb-10">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Spinner className="size-5 border-t-blue-500" />
            <span className="text-sm font-medium">Loading...</span>
          </div>
          
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            By Juan Alvin
          </p>
        </div>
      </div>
    )
  }

  return (
    <DexieContext.Provider value={db}>
      <HashRouter>{children}</HashRouter>
    </DexieContext.Provider>
  )
}

export default Providers