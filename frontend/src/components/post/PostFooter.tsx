// components/post/PostFooter.tsx
import React, { useState } from 'react'
import PostActions from "./PostActions"

interface Props {
  caption?: string | null
  username: string
  likeCount: number
  commentsCount: number
}

const PostFooter: React.FC<Props> = ({ caption, username, likeCount, commentsCount }) => {
  const [expanded, setExpanded] = useState(false)

  if (!caption) {
    return (
      <footer className="p-3">
        <PostActions likeCount={likeCount} commentsCount={commentsCount} />
      </footer>
    )
  }

  const fullText = `${username} ${caption}`
  const shouldTruncate = fullText.length > 100

  return (
    <footer className="p-3 space-y-2">
      <PostActions likeCount={likeCount} commentsCount={commentsCount} />

      {/* USERNAME + CAPTION */}
      <div className="text-sm text-foreground leading-snug relative">
        {!expanded ? (
          <div className="line-clamp-1">
            <span className="font-semibold">{username}</span>{' '}
            {caption}
          </div>
        ) : (
          <div>
            <span className="font-semibold">{username}</span>{' '}
            {caption}
          </div>
        )}

        {/* "more" button appears only when clamped */}
        {!expanded && shouldTruncate && (
          <button
            className="text-muted-foreground ml-1 hover:underline absolute right-0 bottom-0 bg-card pl-1"
            onClick={() => setExpanded(true)}
          >
            more
          </button>
        )}

      </div>
    </footer>
  )
}

export default PostFooter
