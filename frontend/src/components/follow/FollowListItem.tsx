import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "@/db"
import type { User } from "@/types/models"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/app/AuthProvider"

interface Props {
  user: User
}

const FollowListItem = ({ user }: Props) => {
  const { userId: currentUserId } = useAuthContext()
  const isOwner = currentUserId === user.id

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (!user.avatarKey) return

    ;(async () => {
      const blobRec = await db.blobs.get(user.avatarKey || "")
      if (!blobRec) return
      const url = URL.createObjectURL(blobRec.data)
      setAvatarUrl(url)
    })()
  }, [user.avatarKey])

  // Check follow state
  useEffect(() => {
    if (!currentUserId) return
    if (isOwner) return

    ;(async () => {
      const row = await db.follows
        .where(["followerId", "followingId"])
        .equals([currentUserId, user.id])
        .first()

      setIsFollowing(!!row)
    })()
  }, [currentUserId, user.id, isOwner])

  const toggleFollow = async () => {
    if (!currentUserId) return

    if (isFollowing) {
      // Unfollow
      const row = await db.follows
        .where(["followerId", "followingId"])
        .equals([currentUserId, user.id])
        .first()

      if (row) await db.follows.delete(row.id)
      setIsFollowing(false)
      return
    }

    // Follow
    await db.follows.add({
      id: crypto.randomUUID(),
      followerId: currentUserId,
      followingId: user.id,
    })

    setIsFollowing(true)
  }

  return (
    <div className="flex items-center justify-between">
      {/* LEFT: Avatar + names */}
      <div className="flex items-center gap-3">
        <Link to={`/u/${user.username}`}>
          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
            <img src={avatarUrl ? avatarUrl : "unknown.svg"} className="w-full h-full object-cover" />
          </div>
        </Link>

        <div>
          <Link to={`/u/${user.username}`} className="font-semibold hover:underline block">
            {user.username}
          </Link>
          <span className="text-sm text-muted-foreground">{user.name ?? ""}</span>
        </div>
      </div>

      {/* RIGHT: Follow button */}
      {!isOwner && (
        <Button size="sm" variant={isFollowing ? "secondary" : "default"} onClick={toggleFollow}>
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
    </div>
  )
}

export default FollowListItem
