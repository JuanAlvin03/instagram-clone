import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "@/db"
import type { User } from "@/types/models"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileGrid from "@/components/profile/ProfileGrid"

const UserProfilePage = () => {
  const { username } = useParams()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!username) return
    ;(async () => {
      const found = await db.users.where("username").equals(username).first()
      setUser(found ?? null)
    })()
  }, [username])

  if (!user) return <div className="p-4">User not found</div>

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <ProfileHeader user={user} />

      {/* User's posts */}
      <ProfileGrid userId={user.id} />
    </div>
  )
}

export default UserProfilePage
