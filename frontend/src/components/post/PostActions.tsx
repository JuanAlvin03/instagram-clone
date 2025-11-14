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
}

const PostActions: React.FC<Props> = ({ likeCount, commentsCount }) => {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const toggleLike = () => setLiked(!liked)
  const toggleSave = () => setSaved(!saved)

  return (
    <div className="flex items-center justify-between">
      {/* LEFT SIDE ACTIONS */}
      <div className="flex items-center gap-4">

        {/* LIKE */}
        <div className="flex items-center gap-1 cursor-pointer" onClick={toggleLike}>
          {liked ? (
            <HeartIcon className="w-6 h-6 text-red-500 fill-red-500" />
          ) : (
            <Heart className="w-6 h-6 hover:text-red-500 transition-colors" />
          )}
          <span className="text-sm">{likeCount + (liked ? 1 : 0)}</span>
        </div>

        {/* COMMENT */}
        <div className="flex items-center gap-1 cursor-pointer">
          <MessageCircle className="w-6 h-6 hover:text-blue-500 transition-colors" />
          <span className="text-sm">{commentsCount}</span>
        </div>

        {/* SHARE */}
        <div className="cursor-pointer">
          <Send className="w-6 h-6 hover:text-foreground/70 transition-colors" />
        </div>
      </div>

      {/* RIGHT SIDE - BOOKMARK */}
      <div className="cursor-pointer" onClick={toggleSave}>
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
