// src/components/nav/SidebarNav.tsx
import { Home, Compass, User, PlusSquare, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../app/AuthProvider"
import { db } from "../../db"
import { useEffect, useState } from "react"
import NavItem from "./NavItem"

interface NavbarProps {
  onCreateClick: () => void
}

const SidebarNav = ({ onCreateClick }: NavbarProps) => {
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

  const navItems = [
    { to: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
    { to: "/explore", icon: <Compass className="w-6 h-6" />, label: "Explore" },
    { to: "#", icon: <PlusSquare className="w-6 h-6" />, label: "Create", action: "openComposer" },
    currentUsername && {
      to: `/u/${currentUsername}`,
      icon: <User className="w-6 h-6" />,
      label: "Profile",
    },
  ].filter(Boolean)

  return (
    <aside className="hidden md:flex md:flex-col md:w-60 border-r border-border h-screen p-4 fixed left-0 top-0 bg-background">
      <div className="text-2xl font-bold mb-8 px-4">MyGram</div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item: any) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            to={item.action === "openComposer" ? undefined : item.to}
            onClick={item.action === "openComposer" ? onCreateClick : undefined}
          />
        ))}
      </nav>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition text-red-500"
      >
        <LogOut className="w-6 h-6" />
        <span>Log out</span>
      </button>
    </aside>
  )
}

export default SidebarNav
