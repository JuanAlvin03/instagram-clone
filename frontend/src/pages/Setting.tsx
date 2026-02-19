import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/app/AuthProvider"
import { LogOut } from "lucide-react"
import LogoutConfirm from "@/components/common/LogoutConfirm"

const Setting: React.FC = () => {
  const { /*userId: currentUserId,*/ logout } = useAuthContext()
  const navigate = useNavigate()

  const [showConfirm, setShowConfirm] = useState(false)
  
  const handleLogoutClick = () => {
    setShowConfirm(true)
  }

  const confirmLogout = () => {
    setShowConfirm(false)
    logout()
    navigate("/login", { replace: true })
  }
  
  const setting_item = "px-4 py-3 rounded-lg bg-muted text-sm font-medium"

  return (
    <div className="w-full max-w-screen-md mx-auto py-6 px-4 flex flex-col gap-8">

      <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>

      {/* ACCOUNT SECTION */}
      <section className="flex flex-col gap-3 opacity-50 grayscale pointer-events-none">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
          Account
        </h2>

        <div className={setting_item}>Change username</div>
        <div className={setting_item}>Change password</div>
        <div className={setting_item}>Privacy settings</div>
      </section>

      {/* NOTIFICATIONS SECTION */}
      <section className="flex flex-col gap-3 opacity-50 grayscale pointer-events-none">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
          Notifications
        </h2>

        <div className={setting_item}>Post notifications</div>
        <div className={setting_item}>Follower activity</div>
        <div className={setting_item}>Email alerts</div>
      </section>

      {/* APPEARANCE SECTION */}
      <section className="flex flex-col gap-3 opacity-50 grayscale pointer-events-none">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase">
          Appearance
        </h2>

        <div className={setting_item}>Dark mode</div>
        <div className={setting_item}>Language</div>
      </section>

      {/* LOGOUT */}
      <div className="pt-4 border-t">
        <button
          onClick={handleLogoutClick}
          className="red-button darken-on-hover w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium"
        >
          <LogOut/> Log out
        </button>
      </div>

      <LogoutConfirm
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmLogout}
      />
    </div>
  )
}

export default Setting
