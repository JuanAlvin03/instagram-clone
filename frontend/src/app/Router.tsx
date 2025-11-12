import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Explore from "../pages/Explore"
import ProfilePage from "../pages/ProfilePage"
import SidebarNav from "../components/nav/SidebarNav"
import BottomNav from "../components/nav/BottomNav"

const Router: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar for desktop */}
      <SidebarNav />

      {/* Main feed */}
      <main className="flex-1 md:ml-60 flex justify-center p-4">
        <div className="w-full max-w-xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>

      {/* Bottom nav for mobile */}
      <BottomNav />
    </div>
  )
}

export default Router
