// components/post/PostFooter.tsx
import React, { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'

interface Props {
  caption?: string | null
  username: string
}

const PostFooter: React.FC<Props> = ({ caption, username }) => {
  const [expanded, setExpanded] = useState(false)

  if (!caption) {
    return (
      <footer className="p-3">
        <div className="flex items-center gap-4">
          <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
          <MessageCircle className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
        </div>
      </footer>
    )
  }

  const fullText = `${username} ${caption}`
  const shouldTruncate = fullText.length > 100

  return (
    <footer className="p-3 space-y-2">
      <div className="flex items-center gap-4">
        <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
        <MessageCircle className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
      </div>

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
