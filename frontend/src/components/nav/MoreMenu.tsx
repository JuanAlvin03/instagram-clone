import { Bookmark, LogOut, Settings, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"

interface MoreMenuProps {
  onClose: () => void
  onRequestLogout: () => void
  currentUsername: string
}

const MoreMenu = ({ currentUsername, onClose, onRequestLogout }: MoreMenuProps) => {
  return (
    <div
      className="absolute bottom-14 left-4 w-48 bg-popover border border-border rounded-xl shadow-lg py-2 z-50"
      onMouseLeave={onClose}
    >
      <Link
        to={`/settings`}
        className="more-menu-link flex items-center gap-3 hover:bg-muted transition text-sm"
        onClick={onClose}
      >
        <Settings className="w-4 h-4" /> <span>Settings</span>
      </Link>

      <button disabled className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted transition text-sm disabled:opacity-50 disabled:pointer-events-none">
        <UserPlus className="w-4 h-4" /> Switch account
      </button>

      <Link
        to={`/u/${currentUsername}/saved`}
        className="more-menu-link flex items-center gap-3 hover:bg-muted transition text-sm"
        onClick={onClose}
      >
        <Bookmark className="w-4 h-4" /> <span>Saved posts</span>
      </Link>

      <hr className="my-2 border-border" />

      <button
        onClick={() => {
          // Ask the parent to handle logout flow (close menu -> show confirm)
          onRequestLogout()
        }}
        className="more-menu-button"
      >
        <LogOut className="w-4 h-4" /> Log out
      </button>
    </div>
  )
}

export default MoreMenu
