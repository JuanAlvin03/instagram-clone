import React, { useEffect, useState } from 'react'
import { db } from '../db'
import type { Post as PostType } from '../types/models'
import PostCard from './PostCard'

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
    <section className="grid gap-4">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </section>
  )
}

export default Feed
