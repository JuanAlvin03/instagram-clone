// src/components/explore/ExploreGrid.tsx
import React, { useEffect, useRef, useState } from 'react'
import { db } from '@/db'
import type { Post } from '@/types/models'
import GridPost from './GridPost'

const ExploreGrid: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const objectUrlsRef = useRef<string[]>([])

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const latest = await db.posts
          .orderBy('createdAt')
          .reverse()
          .limit(96)
          .toArray()

        if (!mounted) return
        setPosts(latest)
      } catch (err) {
        console.warn('Explore load error', err)
      }
    })()

    return () => {
      mounted = false
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u))
      objectUrlsRef.current = []
    }
  }, [])

  return (
    <div
      className="
        grid 
        grid-cols-3 
        sm:grid-cols-4
        gap-1
      "
    >
      {posts.map((post) => (
        <GridPost key={post.id} post={post} objectUrlsRef={objectUrlsRef} />
      ))}
    </div>
  )
}

export default ExploreGrid
