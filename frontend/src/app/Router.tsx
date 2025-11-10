import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import ProfilePage from '../pages/ProfilePage'

const Router: React.FC = () => {
  return (
    <>
      <header className="p-4 border-b">
        <nav className="container mx-auto flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </>
  )
}

export default Router
