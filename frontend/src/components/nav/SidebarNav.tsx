import { Home, Search, Compass, User, PlusSquare } from "lucide-react"
import { NavLink } from "react-router-dom"

const SidebarNav = () => {
  const navItems = [
    { to: "/", icon: <Home className="w-6 h-6" />, label: "Home" },
    { to: "/explore", icon: <Compass className="w-6 h-6" />, label: "Explore" },
    { to: "/profile", icon: <User className="w-6 h-6" />, label: "Profile" },
  ]

  return (
    <aside className="hidden md:flex md:flex-col md:w-60 border-r border-border h-screen p-4 fixed left-0 top-0 bg-background">
      <div className="text-2xl font-bold mb-8 px-4">MyGram</div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition ${
                isActive ? "font-semibold text-primary" : "text-foreground"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default SidebarNav
