import React, { useState } from "react"
import { Routes, Route, /*useLocation*/ } from "react-router-dom"
import Home from "../pages/Home"
import Explore from "../pages/Explore"
import UserProfilePage from "../pages/UserProfilePage"
import PostPage from "../pages/PostPage"

import SidebarNav from "../components/nav/SidebarNav"
import BottomNav from "../components/nav/BottomNav"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Composer from "../components/Composer"

const Router: React.FC = () => {
  const [showComposer, setShowComposer] = useState(false)

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <SidebarNav onCreateClick={() => setShowComposer(true)} />

      <main className="flex-1 md:ml-60 flex justify-center p-4">
        <div className="w-full mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />

            {/* New routes */}
            <Route path="/p/:postId" element={<PostPage />} />
            <Route path="/u/:username" element={<UserProfilePage />} />
          </Routes>
        </div>
      </main>

      <BottomNav onCreateClick={() => setShowComposer(true)} />

      {/* Composer Modal */}
      <Dialog open={showComposer} onOpenChange={setShowComposer}>
        <DialogContent className="max-w-md w-full sm:rounded-2xl sm:p-6 p-4">
          <DialogHeader>
            <DialogTitle>Create new post</DialogTitle>
          </DialogHeader>
          <Composer onSuccess={() => setShowComposer(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Router
