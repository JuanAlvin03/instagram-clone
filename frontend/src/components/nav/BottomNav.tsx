// src/components/nav/BottomNav.tsx
import { Home, Compass, User, PlusSquare, LogOut } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../app/AuthProvider"
import { db } from "../../db"
import { useEffect, useState } from "react"

interface BottomNavProps {
  onCreateClick: () => void
}

const BottomNav = ({ onCreateClick }: BottomNavProps) => {
  const { userId, logout } = useAuthContext()
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) return
    db.users.get(userId).then(setUser)
  }, [userId])

  const currentUsername = user?.username ?? null

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center py-2 md:hidden">

      <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}>
        <Home className="w-6 h-6" />
      </NavLink>

      <NavLink to="/explore" className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}>
        <Compass className="w-6 h-6" />
      </NavLink>

      <button onClick={onCreateClick}>
        <PlusSquare className="w-6 h-6 botnavbutton transition" />
      </button>

      {currentUsername && (
        <NavLink
          to={`/u/${currentUsername}`}
          className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}
        >
          <User className="w-6 h-6" />
        </NavLink>
      )}

      {/* Logout icon */}
      <button onClick={handleLogout}>
        <LogOut className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
      </button>
    </nav>
  )
}

export default BottomNav
