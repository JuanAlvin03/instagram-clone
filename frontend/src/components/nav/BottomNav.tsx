import { Home, Search, Compass, User } from "lucide-react"
import { NavLink } from "react-router-dom"

const BottomNav = () => {
  const navItems = [
    { to: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
    { to: "/explore", icon: <Search className="w-6 h-6" />, label: "Search" },
    { to: "/profile", icon: <User className="w-6 h-6" />, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center py-2 md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          {item.icon}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
