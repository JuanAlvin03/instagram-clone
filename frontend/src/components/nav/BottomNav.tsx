// src/components/nav/BottomNav.tsx
import { Home, Compass, User, PlusSquare, Info } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuthContext } from "../../app/AuthProvider"
import { db } from "../../db"
import { useEffect, useState } from "react"

interface BottomNavProps {
  onCreateClick: () => void
}

const BottomNav = ({ onCreateClick }: BottomNavProps) => {
  const { userId } = useAuthContext()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!userId) return
    db.users.get(userId).then(setUser)
  }, [userId])

  const currentUsername = user?.username ?? null
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center py-2 md:hidden">

      <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}>
        <Home className="w-6 h-6" />
      </NavLink>

      <NavLink to="/explore" className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}>
        <Compass className="w-6 h-6" />
      </NavLink>

      <button onClick={onCreateClick} className="button-in-bottom-navbar">
        <PlusSquare className="w-6 h-6 botnavbutton transition" />
      </button>

      <NavLink to="/about" className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}>
        <Info className="w-6 h-6" />
      </NavLink>

      {currentUsername && (
        <NavLink
          to={`/u/${currentUsername}`}
          className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}
        >
          <User className="w-6 h-6" />
        </NavLink>
      )}
    </nav>
  )
}

export default BottomNav
