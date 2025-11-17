// components/post/PostCard.tsx
import React, { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { db } from '../../db'
import type { Post, User } from '../../types/models'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostFooter from './PostFooter'

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [author, setAuthor] = useState<User | null>(null)
  const createdUrl = useRef<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const blobRec = await db.blobs.get(post.imageKey)
        const u = blobRec ? URL.createObjectURL(blobRec.data) : null
        const a = await db.users.get(post.authorId)
        if (!mounted) return
        if (createdUrl.current) {
          URL.revokeObjectURL(createdUrl.current)
          createdUrl.current = null
        }
        createdUrl.current = u
        setImageUrl(u)
        setAuthor(a ?? null)
      } catch (e) {
        console.warn('postcard load error', e)
      }
    })()
    return () => {
      mounted = false
      if (createdUrl.current) {
        URL.revokeObjectURL(createdUrl.current)
        createdUrl.current = null
      }
    }
  }, [post.imageKey, post.authorId])

  return (
    <Card className="overflow-hidden max-w-md w-full rounded-2xl bg-card border border-border shadow-sm">
      <PostHeader author={author}/>
      <PostImage imageUrl={imageUrl} caption={post.caption} />
      <PostFooter 
        caption={post.caption}
        username={author?.username ?? 'user'}
        likeCount={post.likeCount}
        commentsCount={post.commentsCount}
        createdAt={post.createdAt}
        postId={post.id}
      />
    </Card>
  )
}

export default PostCard
