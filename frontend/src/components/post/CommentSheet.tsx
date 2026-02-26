// src/components/post/CommentSheet.tsx
import React, { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { db } from "@/db"
import type { Comment, User } from "@/types/models"
import { useAuthContext } from "@/app/AuthProvider"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface Props {
  open: boolean
  onClose: () => void
  postId: string
  onCommentAdded?: (newCount: number) => void   // ⭐ NEW
}

const CommentSheet: React.FC<Props> = ({ open, onClose, postId, onCommentAdded }) => {
  const [comments, setComments] = useState<Array<Comment & { user: User | null }>>([])
  const [text, setText] = useState("")
  const { userId: currentUserId } = useAuthContext()

  // Load comments
  const loadComments = async () => {
    const list = await db.comments.where({ postId }).sortBy("createdAt")

    const withUsers: Array<Comment & { user: User | null }> = await Promise.all(
      list.map(async (c) => ({
        ...c,
        user: (await db.users.get(c.userId)) ?? null,
      }))
    )

    setComments(withUsers)
    return list.length
  }

  useEffect(() => {
    if (!open) return
    loadComments()
  }, [open, postId])

  // Add comment
  const submit = async () => {
    if (!text.trim()) return
    if (!currentUserId) return
    await db.comments.add({
      id: crypto.randomUUID(),
      postId,
      userId: currentUserId,
      text,
      createdAt: Date.now()
    })

    await db.posts.update(postId, { commentsCount: comments.length + 1 });

    setText("")

    // Refresh list + get new total
    const newCount = await loadComments()

    // Inform parent
    if (onCommentAdded) onCommentAdded(newCount)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          margin-auto
          p-0 
          border-none 
          rounded-t-2xl 
          fixed 
          bottom-0 
          left-0 
          right-0 
          max-w-none 
          w-full 
          bg-background
          animate-slide-up
          !top-auto 
          !left-0 
          !translate-x-0 
          !translate-y-0
        "
      >
        {/* Drag handle */}
        <div className="w-full flex justify-center py-2">
          <div className="w-10 h-1.5 bg-muted rounded-full"></div>
        </div>

        <div className="flex justify-center">
          <h2 className="text-lg font-semibold">Comments</h2>
        </div>

        {/* COMMENTS */}
        <div className="px-4 pb-20 max-h-[60vh] overflow-y-auto space-y-3 break-words">
          {comments.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              <p className="text-sm">No comments yet.</p>
              <p className="text-xs mt-1">Be the first to say something!</p>
            </div>
          ) : (
            comments.map(c => (
              <div key={c.id} className="flex gap-3 text-sm py-2">
                {/* LEFT: Avatar (Now larger) */}
                <Link to={c.user ? `/u/${c.user.username}` : "#"} className="flex-shrink-0">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage 
                      src={c.user?.avatarKey ?? 'unknown.svg'} 
                      className="object-cover" 
                    />
                    <AvatarFallback>{c.user?.username[0]?.toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                </Link>

                {/* RIGHT: Text Content */}
                <div className="flex flex-col gap-0.5 pt-0.5">
                  <div className="flex flex-col">
                    <Link
                      to={c.user ? `/u/${c.user.username}` : "#"}
                      className="font-semibold hover:underline w-fit"
                    >
                      {c.user?.username ?? "Deleted user"}
                    </Link>

                    {/* Comment text below username */}
                    <span className="text-foreground leading-relaxed break-words">
                      {c.text}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* INPUT BAR */}
        <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-3 flex gap-2">
          <input
            className="border rounded-lg w-full px-3 py-2 text-sm"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            onClick={submit}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm disabled:opacity-50 darken-on-hover transition"
            disabled={!text.trim()}
          >
            Post
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentSheet
