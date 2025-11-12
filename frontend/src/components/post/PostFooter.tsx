// components/post/PostFooter.tsx
import React from 'react'
import { Heart, MessageCircle } from 'lucide-react'

interface Props {
  caption?: string | null
}

const PostFooter: React.FC<Props> = ({ caption }) => {
  return (
    <footer className="p-3 space-y-2">
      <div className="flex items-center gap-4">
        <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
        <MessageCircle className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
      </div>
      {caption && <p className="text-sm text-foreground">{caption}</p>}
    </footer>
  )
}

export default PostFooter
