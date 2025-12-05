import { Bookmark, LogOut, Settings, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"

interface MoreMenuProps {
  onClose: () => void
  onLogout: () => void
  currentUsername: string
}

const MoreMenu = ({ currentUsername, onClose, onLogout }: MoreMenuProps) => {
  return (
    <div
      className="absolute bottom-14 left-4 w-48 bg-popover border border-border rounded-xl shadow-lg py-2 z-50"
      onMouseLeave={onClose}
    >
      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted transition text-sm">
        <Settings className="w-4 h-4" /> Settings (placeholder)
      </button>

      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted transition text-sm">
        <UserPlus className="w-4 h-4" /> Switch account (placeholder)
      </button>

      <Link to={`/u/${currentUsername}/saved`}>
        <Bookmark className="w-4 h-4" /> Saved posts
      </Link>

      <hr className="my-2 border-border" />

      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted transition text-sm text-red-500"
      >
        <LogOut className="w-4 h-4" /> Log out
      </button>
    </div>
  )
}

export default MoreMenu
