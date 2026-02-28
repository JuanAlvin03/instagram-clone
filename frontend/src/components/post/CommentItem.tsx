import React from "react"
import type { Comment, User } from "@/types/models"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Dot } from "lucide-react"

interface Props {
  comment: Comment & { user: User | null }
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const c = comment

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return 'just now'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 30) return `${days}d`

    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="flex gap-3 text-sm py-2">
      <Link to={c.user ? `/u/${c.user.username}` : "#"} className="flex-shrink-0 pt-1">
        <Avatar className="h-9 w-9 border border-border">
          <AvatarImage src={c.user?.avatarKey ?? 'unknown.svg'} className="object-cover" />
          <AvatarFallback>{c.user?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex flex-col gap-0.5 pt-0.5">
        <div className="flex flex-wrap items-center">
          <Link
            to={c.user ? `/u/${c.user.username}` : "#"}
            className="font-semibold hover:underline w-fit"
          >
            {c.user?.username ?? "Deleted user"}
          </Link>

          <span className="text-xs text-muted-foreground">
            <Dot className="inline-block" size={12} />
            {formatTimeAgo(c.createdAt)}
          </span>
        </div>

        <span className="text-foreground leading-relaxed break-words">
          {c.text}
        </span>
      </div>
    </div>
  )
}

export default CommentItem
