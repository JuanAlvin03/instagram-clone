// components/post/PostFooter.tsx
import React, { useState } from 'react'
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

  const fullText = `${username} ${caption}`
  const shouldTruncate = fullText.length > 50

  return (
    <footer className="p-3 space-y-2">
      <PostActions
        likeCount={likeCount}
        commentsCount={commentsCount}
        onOpenComments={() => setShowComments(true)}
        postId={postId}
      />

      {/* USERNAME + CAPTION */}
      <div className="text-sm text-foreground leading-snug relative">
        {!expanded ? (
          <div className="inline">
            <Link
              to={`/u/${username}`}
              className="font-semibold hover:underline"
            >
              {username}
            </Link>{" "}
            <span
              className="truncate inline-block max-w-full align-middle overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {caption}
            </span>

            {shouldTruncate && (
              <span
                className="text-muted-foreground hover:underline cursor-pointer ml-1"
                onClick={() => setExpanded(true)}
              >
                more
              </span>
            )}
          </div>
        ) : (
          <div className="inline">
            <Link
              to={`/u/${username}`}
              className="font-semibold hover:underline"
            >
              {username}
            </Link>{" "}
            {caption}
          </div>
        )}

        {/* TIME AGO */}
        <p className="text-xs text-muted-foreground">
          {formatTimeAgo(createdAt)}
        </p>

        {/* COMMENT SHEET MODAL */}
        <CommentSheet
          open={showComments}
          onClose={() => setShowComments(false)}
          postId={postId}
        />

      </div>
    </footer>
  )
}

export default PostFooter
