// src/components/profile/EditProfileModal.tsx
import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import type { User } from "@/types/models"

interface Props {
  open: boolean
  onClose: () => void
  user: User
  onUpdated: () => void
}

const EditProfileModal: React.FC<Props> = ({ open, onClose, user, onUpdated }) => {
  const [bio, setBio] = useState(user.bio ?? "")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [newAvatar, setNewAvatar] = useState<File | null>(null)

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    let active = true
  
    const loadAvatar = async () => {
      if (user.avatarKey) {
        const blobEntry = await db.blobs.get(user.avatarKey)
        if (blobEntry && active) {
          setAvatarUrl(URL.createObjectURL(blobEntry.data))
        }
      } else {
        setAvatarUrl(null)
      }
    }

    loadAvatar()

    return () => {
      active = false
    }
  }, [user.avatarKey, open])

  useEffect(() => {
    setBio(user.bio ?? "")
    setPreviewUrl(null)
    setNewAvatar(null)
  }, [user.id, open])

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]
    setNewAvatar(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const saveChanges = async () => {
    let avatarKey = user.avatarKey

    if (newAvatar) {
      const key = crypto.randomUUID()
      const blob = new Blob([await newAvatar.arrayBuffer()], { type: newAvatar.type })
      await db.blobs.put({ key, data: blob })
      avatarKey = key
    }

    await db.users.update(user.id, {
      bio,
      avatarKey,
    })

    onClose()
    onUpdated()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full rounded-xl space-y-4">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        {/* Avatar */}
        <div className="flex justify-center">
          <label className="relative cursor-pointer">
            <img
              src={previewUrl || avatarUrl || undefined}
              className="w-24 h-24 rounded-full object-cover bg-muted"
            />
            <input 
              type="file" 
              accept="image/*" 
              onChange={onAvatarChange} 
              className="hidden" 
            />
          </label>
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm mb-1 block">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded p-2 text-sm"
            maxLength={150}
          />
        </div>

        <Button onClick={saveChanges} className="w-full">Save</Button>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
