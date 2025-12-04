import { useEffect, useState } from "react"
import { db } from "@/db"

export function useSavePost(postId: string, userId: string | null) {
  const [saved, setSaved] = useState(false)
  const [recordId, setRecordId] = useState<string | null>(null)

  // Load saved state
  useEffect(() => {
    if (!userId) return;

    let mounted = true;

    (async () => {
      const existing = await db.savedPosts
        .where(["userId", "postId"])
        .equals([userId, postId])
        .first()

      if (!mounted) return;

      setSaved(!!existing)
      setRecordId(existing?.id ?? null)
    })()

    return () => { mounted = false }
  }, [userId, postId])

  // Toggle
  const toggleSave = async () => {
    if (!userId) return;

    if (saved && recordId) {
      // Unsave
      await db.savedPosts.delete(recordId)
      setSaved(false)
      setRecordId(null)
      return
    }

    // Save
    const id = crypto.randomUUID()
    await db.savedPosts.add({
      id,
      userId,
      postId,
      createdAt: Date.now()
    })

    setSaved(true)
    setRecordId(id)
  }

  return { saved, toggleSave }
}
