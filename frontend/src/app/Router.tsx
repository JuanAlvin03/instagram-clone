import React, { useState } from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import Home from "../pages/Home"
import Explore from "../pages/Explore"
import UserProfilePage from "../pages/UserProfilePage"
import PostPage from "../pages/PostPage"
import LoginPage from "../pages/Login"
import RegisterPage from "@/pages/Register"
import FollowPage from "../pages/FollowPage"
import AboutPage from "@/pages/About"

import SidebarNav from "../components/nav/SidebarNav"
import BottomNav from "../components/nav/BottomNav"
import Composer from "../components/Composer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import RequireAuth from "./RequireAuth"
import NotFound from "@/pages/NotFound"
import SavedPostsPage from "@/pages/SavedPostsPage"

import { useAuthContext } from "../app/AuthProvider"

const Router: React.FC = () => {
  const [showComposer, setShowComposer] = useState(false)
  const { userId } = useAuthContext()   // ← check login state!

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      
      {/* Show side nav ONLY when logged in */}
      {userId && (
        <SidebarNav onCreateClick={() => setShowComposer(true)} />
      )}

      <main className={`flex-1 flex justify-center p-4 ${userId ? "md:ml-60" : ""}`}>
        <div className="w-full mx-auto">
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route
                element={<Outlet context={{ openComposer: () => setShowComposer(true) }} />}
              >
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/p/:postId" element={<PostPage />} />
                <Route path="/u/:username" element={<UserProfilePage />} />
                <Route path="/u/:username/followers" element={<FollowPage tab="followers" />} />
                <Route path="/u/:username/following" element={<FollowPage tab="following" />} />
                <Route path="/u/:username/saved" element={<SavedPostsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      {/* Bottom nav ONLY when logged in */}
      {userId && (
        <BottomNav onCreateClick={() => setShowComposer(true)} />
      )}

      {/* Composer modal */}
      <Dialog open={showComposer} onOpenChange={setShowComposer}>
        <DialogContent className="max-w-md w-full sm:rounded-2xl sm:p-6 p-4">
          <DialogHeader>
            <DialogTitle>Create new post</DialogTitle>
          </DialogHeader>
          <Composer
            open={showComposer}
            onOpenChange={setShowComposer}
            onSuccess={() => setShowComposer(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Router
