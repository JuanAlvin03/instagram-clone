// src/components/nav/SidebarNav.tsx
import { Home, Compass, User, PlusSquare, Menu, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../app/AuthProvider"
import { db } from "../../db"
import { useEffect, useState } from "react"
import NavItem from "./NavItem"
import MoreMenu from "./MoreMenu"
import LogoutConfirm from "../common/LogoutConfirm"
interface NavbarProps {
  onCreateClick: () => void
}

const SidebarNav = ({ onCreateClick }: NavbarProps) => {
  const { userId, logout } = useAuthContext()
  const [user, setUser] = useState<any>(null)
  const [openMore, setOpenMore] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) return
    db.users.get(userId).then(setUser)
  }, [userId])

  const currentUsername = user?.username ?? null

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

  // Called when MoreMenu requests a logout (user clicked its "Log out")
  const handleRequestLogout = () => {
    // close the menu first
    setOpenMore(false)
    // then show confirmation modal
    setShowLogoutConfirm(true)
  }

  // user confirmed logout
  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false)
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <aside className="hidden md:flex md:flex-col md:w-60 border-r border-border h-screen p-4 fixed left-0 top-0 bg-background z-40">
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

      <div className="relative">
        <NavItem
          key={"About"}
          icon={<Info className="w-6 h-6" />}
          label={"About"}
          to={"/about"}
        />
      </div>

      {/* --- MORE DROPDOWN TRIGGER --- */}
      <div className="relative px-4">
        <button
          onClick={() => setOpenMore(prev => !prev)}
          className="more-button-trigger flex items-center justify-between gap-3 py-2 w-full rounded-lg hover:bg-muted transition"
        >
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6" />
            <span>More</span>
          </div>
        </button>

        {openMore && (
          <MoreMenu
            onClose={() => setOpenMore(false)}
            onRequestLogout={handleRequestLogout}
            currentUsername={currentUsername}
          />
        )}
      </div>

      {/* Logout confirmation modal (parent controls it) */}
      <LogoutConfirm
        open={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleConfirmLogout}
      />
    </aside>
  )
}

export default SidebarNav
