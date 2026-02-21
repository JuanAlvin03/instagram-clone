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
  
  // State for the discard confirmation
  const [showDiscard, setShowDiscard] = useState(false)

  const BIO_LIMIT = 150

  // Check if anything has changed
  const isDirty = bio !== (user.bio ?? "") || newAvatar !== null

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
    return () => { active = false }
  }, [user.avatarKey, open])

  // Reset internal state when modal opens/user changes
  useEffect(() => {
    if (open) {
      setBio(user.bio ?? "")
      setPreviewUrl(null)
      setNewAvatar(null)
      setShowDiscard(false)
    }
  }, [user.id, open, user.bio])

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return
    const file = e.target.files[0]
    setNewAvatar(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  // Intercept the close attempt
  const handleRequestClose = () => {
    if (isDirty) {
      setShowDiscard(true)
    } else {
      onClose()
    }
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
    <>
      <Dialog open={open} onOpenChange={handleRequestClose}>
        <DialogContent className="max-w-md w-full rounded-xl space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          {/* Avatar */}
          <div className="flex justify-center">
            <label className="relative cursor-pointer">
              <img
                src={previewUrl || avatarUrl || 'unknown.svg'}
                alt="Avatar preview"
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
              className="w-full border rounded p-2 text-sm resize-none"
              maxLength={BIO_LIMIT}
              rows={4}
            />
            <div className="mt-1 text-xs text-muted-foreground text-right">
              <span className={
                bio.length >= BIO_LIMIT ? "text-red-500" : 
                bio.length >= BIO_LIMIT * 0.9 ? "text-orange-500" : ""
              }>
                {bio.length}
              </span>
              /{BIO_LIMIT}
            </div>
          </div>

          <Button onClick={saveChanges} className="w-full">Save</Button>
        </DialogContent>
      </Dialog>

      {/* Discard Confirmation Dialog */}
      <Dialog open={showDiscard} onOpenChange={setShowDiscard}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Discard draft?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            If you leave, your selected image and bio edits will be lost.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-3 py-1 rounded-md bg-muted darken-on-hover"
              onClick={() => setShowDiscard(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 rounded-md bg-red-500 text-white darken-on-hover"
              onClick={() => {
                setShowDiscard(false)
                onClose() // Actually close the main modal
              }}
            >
              Discard
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditProfileModal