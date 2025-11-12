// components/post/PostHeader.tsx
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import type { User } from '../../types/models'

interface Props {
  author: User | null
}

const PostHeader: React.FC<Props> = ({ author }) => {
  const username = author?.username ?? 'user'
  return (
    <header className="flex items-center gap-3 p-3 border-b border-border">
      <Avatar className="h-10 w-10">
        <AvatarImage src={author?.avatarKey ?? '/vite.svg'} />
        <AvatarFallback>{username[0]?.toUpperCase() || 'U'}</AvatarFallback>
      </Avatar>
      <span className="font-semibold text-sm">{username}</span>
    </header>
  )
}

export default PostHeader
