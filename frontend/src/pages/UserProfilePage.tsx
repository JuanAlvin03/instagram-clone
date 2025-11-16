import /*React, */{ useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "@/db"
import type { User } from "@/types/models"

const UserProfilePage = () => {
  const { username } = useParams()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!username) return
    ;(async () => {
      const u = await db.users.where("username").equals(username).first()
      setUser(u ?? null)
    })()
  }, [username])


  if (!user) return <div className="p-4">User not found</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">@{user.username}</h1>
      {/* you can insert profile layout here */}
    </div>
  )
}

export default UserProfilePage
