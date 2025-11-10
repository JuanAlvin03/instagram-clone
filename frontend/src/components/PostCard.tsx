import React, { useEffect, useState } from 'react'
import type { Post } from '../types/models'
import { db } from '../db'

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [author, setAuthor] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const blobRec = await db.blobs.get(post.imageKey)
        const u = blobRec ? URL.createObjectURL(blobRec.data) : null
        const a = await db.users.get(post.authorId)
        if (!mounted) return
        setImageUrl(u)
        setAuthor(a)
      } catch (e) {
        console.warn('postcard load error', e)
      }
    })()
    return () => {
      mounted = false
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [post.imageKey])

  return (
    <article className="border rounded-md overflow-hidden">
      <header className="p-2 flex items-center gap-2">
        <div className="font-semibold">{author?.username ?? 'user'}</div>
      </header>
      {imageUrl ? (
        <img src={imageUrl} alt={post.caption ?? 'post image'} />
      ) : (
        <div className="h-48 bg-gray-100" />
      )}
      <div className="p-2">
        <div className="text-sm">{post.caption}</div>
      </div>
    </article>
  )
}

export default PostCard
