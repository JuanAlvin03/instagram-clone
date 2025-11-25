import { useEffect, useState } from "react"
import type { User } from "@/types/models"
import { db } from "@/db"
import { useAuthContext } from "@/app/AuthProvider"
import { Button } from "@/components/ui/button"

interface Props {
  user: User
}

const ProfileHeader = ({ user }: Props) => {
  const { userId: currentUserId } = useAuthContext()
  const isOwner = currentUserId === user.id

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [bio, setBio] = useState(user.bio ?? "")
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (!user.avatarKey) return

    ;(async () => {
      const blobRec = await db.blobs.get(user.avatarKey)
      if (!blobRec) return
      const url = URL.createObjectURL(blobRec.data)
      setAvatarUrl(url)
    })()
  }, [user.avatarKey])

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]

    const key = crypto.randomUUID()
    const blob = new Blob([await file.arrayBuffer()], { type: file.type })

    await db.blobs.put({ key, data: blob })
    await db.users.update(user.id, { avatarKey: key })

    const url = URL.createObjectURL(blob)
    setAvatarUrl(url)
  }

  const saveBio = async () => {
    await db.users.update(user.id, { bio })
    setEditMode(false)
  }

  return (
    <div className="flex gap-8 py-6 px-2">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden bg-muted relative">
        {avatarUrl ? (
          <img src={avatarUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-3xl">👤</div>
        )}

        {isOwner && (
          <label className="absolute bottom-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded cursor-pointer">
            Edit
            <input type="file" accept="image/*" onChange={onAvatarChange} className="hidden" />
          </label>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-3">
        <h1 className="text-xl font-semibold">@{user.username}</h1>

        {/* Follower stats (placeholder) */}
        <div className="flex gap-6 text-sm">
          <span><strong>1</strong> posts</span>
          <span><strong>12</strong> followers</span>
          <span><strong>8</strong> following</span>
        </div>

        {/* Bio */}
        {!editMode ? (
          <p className="text-sm">{bio || (isOwner ? "Add a bio…" : "")}</p>
        ) : (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border p-2 text-sm rounded"
          />
        )}

        {/* Edit Bio Button */}
        {isOwner && (
          <div>
            {!editMode ? (
              <Button size="sm" onClick={() => setEditMode(true)}>Edit Profile</Button>
            ) : (
              <Button size="sm" onClick={saveBio}>Save</Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileHeader
