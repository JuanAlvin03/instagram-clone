// components/Feed.tsx
import React, { useEffect, useState } from 'react'
import { db } from '../db'
import type { Post as PostType } from '../types/models'
import PostCard from './post/PostCard'

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const all = await db.posts.orderBy('createdAt').reverse().toArray()
        if (!mounted) return
        setPosts(all)
      } catch (e) {
        console.warn('feed load error', e)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="flex flex-col items-center gap-6 py-6">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </section>
  )
}

export default Feed
