import { useEffect, useState } from "react"
import type { User } from "@/types/models"
import { db } from "@/db"
import { useAuthContext } from "@/app/AuthProvider"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import EditProfileModal from "./EditProfileModal"

interface Props {
  user: User
  reloadUser: () => void
}

const ProfileHeader = ({ user, reloadUser }: Props) => {
  const { userId: currentUserId } = useAuthContext()
  const isOwner = currentUserId === user.id

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [bio, setBio] = useState(user.bio ?? "")
  const [postCount, setPostCount] = useState<number>(0)
  const [showEditModal, setShowEditModal] = useState(false)

  // Follow state
  const [followerCount, setFollowerCount] = useState<number>(0)
  const [followingCount, setFollowingCount] = useState<number>(0)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [followRecordId, setFollowRecordId] = useState<string | null>(null)

  useEffect(() => {
    setBio(user.bio ?? "")
  }, [user.bio])
  /* ======================================================
     LOAD AVATAR
  ====================================================== */
  useEffect(() => {
    if (!user.avatarKey) return

    ;(async () => {
      const blobRec = await db.blobs.get(user.avatarKey)
      if (!blobRec) return
      const url = URL.createObjectURL(blobRec.data)
      setAvatarUrl(url)
    })()
  }, [user.avatarKey])

  /* ======================================================
     LOAD POST COUNT
  ====================================================== */
  useEffect(() => {
    let mounted = true
    ;(async () => {
      const c = await db.posts.where("authorId").equals(user.id).count()
      if (mounted) setPostCount(c)
    })()
    return () => {
      mounted = false
    }
  }, [user.id])

  /* ======================================================
     LOAD FOLLOWER / FOLLOWING COUNTS AND FOLLOW STATE
  ====================================================== */
  useEffect(() => {
    if (!currentUserId) return

    let mounted = true

    ;(async () => {
      // Count followers: people who follow this profile user
      const fCount = await db.follows
        .where("followingId")
        .equals(user.id)
        .count()

      // Count following: people whom this profile user follows
      const gCount = await db.follows
        .where("followerId")
        .equals(user.id)
        .count()

      // Check if current user is following this user
      const existing = await db.follows
        .where(["followerId", "followingId"])
        .equals([currentUserId, user.id])
        .first()

      if (!mounted) return

      setFollowerCount(fCount)
      setFollowingCount(gCount)
      setIsFollowing(!!existing)
      setFollowRecordId(existing?.id ?? null)
    })()

    return () => {
      mounted = false
    }
  }, [user.id, currentUserId])

  /* ======================================================
     FOLLOW USER
  ====================================================== */
  const handleFollow = async () => {
    if (!currentUserId || currentUserId === user.id) return

    const id = crypto.randomUUID()

    await db.follows.add({
      id,
      followerId: currentUserId,
      followingId: user.id,
    })

    setIsFollowing(true)
    setFollowRecordId(id)
    setFollowerCount((c) => c + 1)
  }

  /* ======================================================
     UNFOLLOW USER (WITH CONFIRMATION)
  ====================================================== */
  const handleUnfollow = async () => {
    if (!followRecordId) return

    const yes = confirm(`Unfollow @${user.username}?`)
    if (!yes) return

    await db.follows.delete(followRecordId)

    setIsFollowing(false)
    setFollowRecordId(null)
    setFollowerCount((c) => c - 1)
  }

  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <div className="flex gap-8 py-6 px-2">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden bg-muted relative">
        {avatarUrl ? (
          <img src={avatarUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-3xl">
            👤
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-3">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">@{user.username}</h1>

          {/* Follow Button (hidden for owner) */}
          {!isOwner && currentUserId && (
            isFollowing ? (
              <Button size="sm" variant="outline" onClick={handleUnfollow}>
                Following
              </Button>
            ) : (
              <Button size="sm" onClick={handleFollow}>
                Follow
              </Button>
            )
          )}
        </div>

        {user.name && <h2 className="text-l font-light">{user.name}</h2>}

        {/* Follower stats */}
        <div className="flex gap-6 text-sm">
          <span><strong>{postCount}</strong> {postCount === 1 ? "post" : "posts"}</span>

          <Link to={`/u/${user.username}/followers`}>
            <strong>{followerCount}</strong> followers
          </Link>

          <Link to={`/u/${user.username}/following`}>
            <strong>{followingCount}</strong> following
          </Link>

          {isOwner && (
            <Link to={`/u/${user.username}/saved`}>
              <strong>Saved</strong>
            </Link>
          )}
        </div>

        {/* Bio */}
        <p className="text-sm">{bio || (isOwner ? "Add a bio…" : "")}</p>

        {/* Edit Profile Button */}
        {isOwner && (
          <Button size="sm" onClick={() => setShowEditModal(true)}>
            Edit Profile
          </Button>
        )}

        <EditProfileModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          user={user}
          onUpdated={reloadUser}
        />
      </div>
    </div>
  )
}

export default ProfileHeader
