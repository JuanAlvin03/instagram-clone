import { Bookmark, LogOut, Settings, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import LogoutConfirm from "../common/LogoutConfirm"

interface MoreMenuProps {
  onClose: () => void
  onLogout: () => void
  currentUsername: string
}

const MoreMenu = ({ currentUsername, onClose, onLogout }: MoreMenuProps) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleLogoutClick = () => {
    setShowConfirm(true)
  }

  return (
    <div
      className="absolute bottom-14 left-4 w-48 bg-popover border border-border rounded-xl shadow-lg py-2 z-50"
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
        onClick={handleLogoutClick}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted transition text-sm text-red-500"
      >
        <LogOut className="w-4 h-4" /> Log out
      </button>
        
      <LogoutConfirm
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={onLogout}
      />

    </div>
  )
}

export default MoreMenu
