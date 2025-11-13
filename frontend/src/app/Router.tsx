// src/app/Router.tsx
import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Explore from "../pages/Explore"
import ProfilePage from "../pages/ProfilePage"
import SidebarNav from "../components/nav/SidebarNav"
import BottomNav from "../components/nav/BottomNav"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Composer from "../components/Composer"

const Router: React.FC = () => {
  const [showComposer, setShowComposer] = useState(false)

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar (Desktop) */}
      <SidebarNav onCreateClick={() => setShowComposer(true)} />

      {/* Main content area */}
      <main className="flex-1 md:ml-60 flex justify-center p-4">
        <div className="w-full max-w-xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>

      {/* Bottom nav (Mobile) */}
      <BottomNav onCreateClick={() => setShowComposer(true)} />

      {/* Global Composer Modal */}
      <Dialog open={showComposer} onOpenChange={setShowComposer}>
        <DialogContent className="max-w-md w-full sm:rounded-2xl sm:p-6 p-4">
          <DialogHeader>
            <DialogTitle>Create new post</DialogTitle>
          </DialogHeader>
          <Composer
            onSuccess={() => {
              setShowComposer(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Router
