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
    if (!user.avatarKey) {
      setAvatarUrl(null)
      return
    } 

    ;(async () => {
      const blobRec = await db.blobs.get(user.avatarKey || "")
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
    <div className="py-6 px-2 flex flex-col gap-6">

      {/* TOP SECTION: Avatar + username + name + stats */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
        {/* Avatar */}
        <div className="flex items-start">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-muted">
            {avatarUrl ? (
              <img src={avatarUrl} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
                👤
              </div>
            )}
          </div>
        </div>

        {/* Username + name + stats */}
        <div className="flex flex-col gap-3">
          {/* Username + Follow/Following button */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold">@{user.username}</h1>
                    
            {!isOwner && (
              <Button
                size="sm"
                variant={isFollowing ? "outline" : "default"}  // outline for "Following", filled for "Follow"
                className={isFollowing ? "text-sm" : "text-sm bg-primary text-white"}
                onClick={isFollowing ? handleUnfollow : handleFollow}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>

          {/* Name */}
          {user.name && (
            <div className="text-base font-light">
              {user.name}
            </div>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span>
              <strong>{postCount}</strong> {postCount === 1 ? "post" : "posts"}
            </span>

            <Link to={`/u/${user.username}/followers`}>
              <strong>{followerCount}</strong> followers
            </Link>

            <Link to={`/u/${user.username}/following`}>
              <strong>{followingCount}</strong> following
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Bio + buttons */}
      <div className="flex flex-col gap-4 max-w-lg w-full">
        {/* Bio */}
        <p className="text-sm whitespace-pre-wrap">
          {bio || (isOwner ? "Add a bio…" : "")}
        </p>

        {/* Buttons row */}
        {isOwner && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
          
            <Button
              size="sm"
              onClick={() => setShowEditModal(true)}
              className="w-full sm:w-28"
            >
              Edit Profile
            </Button>
        
            <Link
              to={`/u/${user.username}/saved`}
              className="w-full sm:w-28 px-4 py-2 bg-muted rounded-md text-sm font-medium text-center hover:bg-muted/80 transition"
            >
              Saved
            </Link>
        
            {/* Disabled Settings button */}
            <button
              disabled
              className="w-full sm:w-28 px-4 py-2 rounded-md text-sm font-medium bg-muted opacity-50 cursor-not-allowed text-center"
            >
              Settings
            </button>
        
          </div>
        )}

      </div>

      <EditProfileModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onUpdated={reloadUser}
      />
    </div>
  )
}

export default ProfileHeader
