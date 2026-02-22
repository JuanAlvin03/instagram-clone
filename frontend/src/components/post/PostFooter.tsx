// components/post/PostFooter.tsx
import React, { useState} from 'react'
import PostActions from "./PostActions"
import CommentSheet from "./CommentSheet"
import { Link } from "react-router-dom"

interface Props {
  caption?: string | null
  username: string
  likeCount: number
  commentsCount: number
  createdAt: number
  postId: string
}

const PostFooter: React.FC<Props> = ({ caption, username, likeCount, commentsCount, createdAt, postId }) => {
  const [expanded, setExpanded] = useState(false)
  const [showComments, setShowComments] = useState(false)


  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 60) return 'just now'
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`

    // Full date (example: "29 September 2025")
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (!caption) {
    return (
      <footer className="p-3">
        <PostActions
          likeCount={likeCount}
          commentsCount={commentsCount}
          onOpenComments={() => setShowComments(true)}
          postId={postId}
        />
        <p className="text-xs text-muted-foreground uppercase">
          {formatTimeAgo(createdAt)}
        </p>
        {/* COMMENT SHEET MODAL */}
        <CommentSheet
          open={showComments}
          onClose={() => setShowComments(false)}
          postId={postId}
        />
      </footer>
    )
  }

  const MAX_CHARACTER_LIMIT = 80; // Adjusted for better UX
  const isLongCaption = caption.length > MAX_CHARACTER_LIMIT;
  const displayCaption = (isLongCaption && !expanded) 
    ? caption.slice(0, MAX_CHARACTER_LIMIT).trim() + "..." 
    : caption;

  return (
    <footer className="p-3 space-y-2">
      <PostActions
        likeCount={likeCount}
        commentsCount={commentsCount}
        onOpenComments={() => setShowComments(true)}
        postId={postId}
      />

      {/* USERNAME + CAPTION */}
      <div className="text-sm text-foreground leading-snug break-words">
        <div className="inline">
          <Link
            to={`/u/${username}`}
            className="font-semibold hover:underline mr-1"
          >
            {username}
          </Link>

          <span className="whitespace-pre-line">
            {displayCaption}
          </span>

          {isLongCaption && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="text-muted-foreground hover:text-foreground ml-1 font-medium"
            >
              more
            </button>
          )}
        </div>

        {/* TIME AGO */}
        <p className="text-[10px] text-muted-foreground uppercase mt-1 tracking-wide">
          {formatTimeAgo(createdAt)}
        </p>
      </div>

      {/* COMMENT SHEET MODAL */}
      <CommentSheet
        open={showComments}
        onClose={() => setShowComments(false)}
        postId={postId}
      />
    </footer>
  )
}

export default PostFooter
