import { useEffect, useState } from "react"
import { useParams, useOutletContext, Link } from "react-router-dom"
import { db } from "@/db"
import type { User } from "@/types/models"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileGrid from "@/components/profile/ProfileGrid"

const UserProfilePage = () => {
  const { username } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const { openComposer } = useOutletContext<{ openComposer: () => void }>()
  useEffect(() => {
    if (!username) return
    ;(async () => {
      const found = await db.users.where("username").equals(username).first()
      setUser(found ?? null)
    })()
  }, [username])

  if (!user) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-3xl font-bold mb-2">User Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The user you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded-lg bg-secondary text-primary-foreground hover:opacity-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  )

  const reloadUser = async () => {
    const fresh = await db.users.where("username").equals(username!).first()
    setUser(fresh!)
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <ProfileHeader user={user} reloadUser={reloadUser} />

      {/* User's posts */}
      <ProfileGrid userId={user.id} onCreateClick={openComposer} />
    </div>
  )
}

export default UserProfilePage
