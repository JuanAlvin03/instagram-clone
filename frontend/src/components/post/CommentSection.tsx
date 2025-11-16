import React, { useEffect, useState } from "react"
import { db } from "@/db"
import type { Comment, User } from "@/types/models"

const CommentSection: React.FC<{ postId: string }> = ({ postId }) => {
  const [comments, setComments] = useState<
    Array<Comment & { user: User | null }>
  >([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const list = await db.comments.where({ postId }).sortBy("createdAt")
      const withUsers = await Promise.all(
        list.map(async c => ({
          ...c,
          user: await db.users.get(c.userId)
        }))
      )
      if (mounted) setComments(withUsers)
    })()
    return () => { mounted = false }
  }, [postId])

  return (
    <div className="space-y-3">
      {comments.map(c => (
        <div key={c.id} className="text-sm">
          <span className="font-semibold">{c.user?.username ?? "user"}</span>{" "}
          {c.text}
        </div>
      ))}
    </div>
  )
}

export default CommentSection
