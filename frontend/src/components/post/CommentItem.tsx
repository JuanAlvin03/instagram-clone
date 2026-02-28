import React from "react"
import type { Comment, User } from "@/types/models"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface Props {
  comment: Comment & { user: User | null }
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const c = comment

  return (
    <div className="flex gap-3 text-sm py-2">
      <Link to={c.user ? `/u/${c.user.username}` : "#"} className="flex-shrink-0 pt-1">
        <Avatar className="h-9 w-9 border border-border">
          <AvatarImage src={c.user?.avatarKey ?? 'unknown.svg'} className="object-cover" />
          <AvatarFallback>{c.user?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex flex-col gap-0.5 pt-0.5">
        <div className="flex flex-col">
          <Link
            to={c.user ? `/u/${c.user.username}` : "#"}
            className="font-semibold hover:underline w-fit"
          >
            {c.user?.username ?? "Deleted user"}
          </Link>

          <span className="text-foreground leading-relaxed break-words">
            {c.text}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
