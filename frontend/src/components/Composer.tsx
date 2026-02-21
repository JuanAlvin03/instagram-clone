// src/components/Composer.tsx
import React, { useState, useEffect } from "react"
import { db } from "../db"
import { useAuthContext } from "../app/AuthProvider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function id() {
  return globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 9)
}

interface ComposerProps {
  onSuccess?: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const Composer: React.FC<ComposerProps> = ({ open, onOpenChange, onSuccess }) => {
  const [step, setStep] = useState<1 | 2>(1)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [showDiscard, setShowDiscard] = useState(false)

  const { userId } = useAuthContext()

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      setStep(1)
      setFile(null)
      setPreview(null)
      setCaption("")
    }
  }, [open])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return

    if (f.size > MAX_FILE_SIZE) {
      alert("Image is too large. Maximum allowed size is 5MB.")
      return
    }

    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  function requestClose() {
    if (file || caption.trim() !== "") {
      setShowDiscard(true)
    } else {
      onOpenChange(false)
    }
  }

  async function handleSubmit() {
    if (!file) return
    if (!userId) return
    const blob = await file.slice(0, file.size, file.type)
    const key = id()

    await db.blobs.put({ key, data: blob })
    await db.posts.add({
      id: id(),
      authorId: userId,
      imageKey: key,
      caption,
      createdAt: Date.now(),
      likeCount: 0,
      commentsCount: 0,
    })

    onOpenChange(false)
    onSuccess?.()
    window.location.reload()
  }

  return (
    <>
      {/* Main composer dialog */}
      <Dialog open={open} onOpenChange={requestClose}>
        <DialogContent className="max-w-md w-full sm:rounded-2xl sm:p-6 p-4">
          <DialogHeader>
            <DialogTitle>
              {step === 1 ? "Create new post" : "Write a caption"}
            </DialogTitle>
          </DialogHeader>

          {/* STEP 1 — Upload image */}
          {step === 1 && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-full aspect-square border border-dashed rounded-xl flex items-center justify-center bg-muted overflow-hidden">
                {!preview ? (
                  <label className="cursor-pointer text-center p-4">
                    <p className="font-medium">Upload picture</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="object-cover w-full h-full rounded-xl"
                  />
                )}
              </div>

              <button
                className={`w-full py-2 rounded-lg font-medium transition 
                  ${file ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
                disabled={!file}
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          )}

          {/* STEP 2 — Caption */}
          {step === 2 && (
            <div className="flex flex-col gap-3">
              {/* Preview image on top */}
              {preview && (
                <img
                  src={preview}
                  className="w-full rounded-xl object-cover max-h-60"
                />
              )}

              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                rows={4}
                className="w-full border rounded-lg p-3 resize-none bg-background"
              />

              <button
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Discard confirmation */}
      <Dialog open={showDiscard} onOpenChange={setShowDiscard}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Discard draft?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            If you leave, your selected image and caption will be lost.
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
                onOpenChange(false)
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

export default Composer
