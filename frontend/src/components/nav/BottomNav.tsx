// src/components/nav/BottomNav.tsx
import { Home, Compass, User, PlusSquare } from "lucide-react"
import { NavLink } from "react-router-dom"

interface BottomNavProps {
  onCreateClick: () => void
}

const BottomNav = ({ onCreateClick }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center py-2 md:hidden">
      <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}>
        <Home className="w-6 h-6" />
      </NavLink>
      <NavLink to="/explore" className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}>
        <Compass className="w-6 h-6" />
      </NavLink>
      <button onClick={onCreateClick}>
        <PlusSquare className="w-6 h-6 text-muted-foreground hover:text-primary transition" />
      </button>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? "text-primary" : "text-muted-foreground")}>
        <User className="w-6 h-6" />
      </NavLink>
    </nav>
  )
}

export default BottomNav
