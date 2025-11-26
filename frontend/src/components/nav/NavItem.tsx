import { NavLink } from "react-router-dom"

interface Props {
  icon: React.ReactNode
  label: string
  to?: string
  onClick?: () => void
}

const baseClass =
  "flex items-center gap-3 px-4 py-2 rounded-lg transition text-foreground hover:bg-muted"

export default function NavItem({ icon, label, to, onClick }: Props) {
  // click-only (for Create button)
  if (!to) {
    return (
      <button onClick={onClick} className={baseClass + " button-in-nav"}>
        {icon}
        <span>{label}</span>
      </button>
    )
  }

  // nav routing
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClass} ${isActive ? "font-semibold text-primary" : ""}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}
