import React, { useEffect, useRef, useState } from 'react'
import type { Post, User } from '../../types/models'
import { db } from '../../db'

import PostHeader from "./PostHeader"
import PostImage from "./PostImage"
import PostCaption from "./PostCaption"

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [author, setAuthor] = useState<User | null>(null)
  const createdUrl = useRef<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        // fetch image blob + author data from IndexedDB
        const blobRec = await db.blobs.get(post.imageKey)
        const u = blobRec ? URL.createObjectURL(blobRec.data) : null
        const a = await db.users.get(post.authorId)

        if (!mounted) return
        // cleanup previous blob URLs
        if (createdUrl.current) {
          URL.revokeObjectURL(createdUrl.current)
          createdUrl.current = null
        }

        createdUrl.current = u
        setImageUrl(u)
        setAuthor(a ?? null)
      } catch (e) {
        console.warn("postcard load error", e)
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
    <article className="border rounded-md overflow-hidden">
      <PostHeader author={author} />
      <PostImage imageUrl={imageUrl} alt={post.caption ?? "post image"} />
      <PostCaption caption={post.caption} />
    </article>
  )
}

export default PostCard
