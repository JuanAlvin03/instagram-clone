import { useEffect, useState } from "react"
import type { User } from "@/types/models"
import { db } from "@/db"
import { useAuthContext } from "@/app/AuthProvider"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import EditProfileModal from "./EditProfileModal"
import { Settings } from "lucide-react"

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
    <div className="px-0 pb-4 flex flex-col gap-4 max-w-screen-md mx-auto">

      {/* USERNAME (TOP, MOBILE FIRST) */}
      <span className="text-xl sm:text-3xl font-bold text-center sm:text-left">
        @{user.username}
      </span>

      {/* AVATAR + NAME + STATS */}
      <div className="flex gap-4 items-center">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-muted">
            <img src={avatarUrl ? avatarUrl : 'unknown.svg'} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Name + Stats */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {user.name && (
            <div className="text-sm font-medium truncate sm:text-base">
              {user.name}
            </div>
          )}

          {/* Stats (newline layout for ALL screen sizes) */}
          <div className="flex gap-4 text-sm sm:text-base">
            <div className="pr-2">
              <strong>{postCount}</strong>
              <div className="text-muted-foreground">posts</div>
            </div>

            <Link
              to={`/u/${user.username}/followers`}
              className="pr-2"
            >
              <strong>{followerCount}</strong>
              <div className="text-muted-foreground">followers</div>
            </Link>

            <Link
              to={`/u/${user.username}/following`}
            >
              <strong>{followingCount}</strong>
              <div className="text-muted-foreground">following</div>
            </Link>
          </div>
        </div>
      </div>

      {/* BIO */}
      <p className="text-sm whitespace-pre-wrap">
        {bio || (isOwner ? "Add a bio…" : "")}
      </p>

      {/* FOLLOW / MESSAGE BUTTONS */}
      {!isOwner && (
        <div className="flex justify-center gap-3">
          <Button
            size="sm"
            variant={isFollowing ? "outline" : "default"}
            onClick={isFollowing ? handleUnfollow : handleFollow}
            className="w-28"
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled
            className="w-28 opacity-50"
          >
            Message
          </Button>
        </div>
      )}

      {/* OWNER ACTIONS */}
      {isOwner && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="w-24 font-w-600 button-grey"
          >
            Edit Profile
          </button>

          <Link
            to={`/u/${user.username}/saved`}
            className="w-24 px-3 py-2 rounded-md text-sm font-medium text-center button-grey transition a-not-blue-on-hover"
          >
            Saved
          </Link>

          <Link
            to="/settings"
            className="w-24 px-3 py-2 rounded-md text-sm font-medium text-center button-grey transition a-not-blue-on-hover flex items-center justify-center gap-1"
            title="Settings"
          >
            <Settings size={16}/>
          </Link>
        </div>
      )}

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
