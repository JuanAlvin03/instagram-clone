import React, { useState } from 'react'
import {
  Heart,
  HeartIcon,
  MessageCircle,
  Send,
  Bookmark,
  BookmarkCheck
} from 'lucide-react'

interface Props {
  likeCount: number
  commentsCount: number
  onOpenComments?: () => void
}

const PostActions: React.FC<Props> = ({ likeCount, commentsCount, onOpenComments }) => {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">

        {/* LIKE */}
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => setLiked(!liked)}>
          {liked ? (
            <HeartIcon className="w-6 h-6 text-red-500 fill-red-500" />
          ) : (
            <Heart className="w-6 h-6 hover:text-red-500 transition-colors" />
          )}
          <span className="text-sm">{likeCount + (liked ? 1 : 0)}</span>
        </div>

        {/* COMMENT */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={onOpenComments}
        >
          <MessageCircle className="w-6 h-6 hover:text-blue-500 transition-colors" />
          <span className="text-sm">{commentsCount}</span>
        </div>

        <div className="cursor-pointer">
          <Send className="w-6 h-6 hover:text-foreground/70 transition-colors" />
        </div>
      </div>

      <div className="cursor-pointer" onClick={() => setSaved(!saved)}>
        {saved ? (
          <BookmarkCheck className="w-6 h-6 fill-foreground" />
        ) : (
          <Bookmark className="w-6 h-6 hover:text-foreground/70 transition-colors" />
        )}
      </div>
    </div>
  )
}

export default PostActions
