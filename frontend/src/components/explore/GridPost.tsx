// src/components/explore/GridPost.tsx
import React, { useEffect, useState } from 'react'
import { db } from '@/db'
import type { Post } from '@/types/models'

interface Props {
  post: Post
  objectUrlsRef: React.MutableRefObject<string[]>
}

const GridPost: React.FC<Props> = ({ post, objectUrlsRef }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      const blobRec = await db.blobs.get(post.imageKey)
      if (!blobRec) return
      const url = URL.createObjectURL(blobRec.data)
      if (!mounted) return

      objectUrlsRef.current.push(url)
      setImgUrl(url)
    })()

    return () => {
      mounted = false
    }
  }, [post.imageKey])

  return (
    <div className="relative w-full aspect-square overflow-hidden bg-muted">
      {imgUrl && (
        <img
          src={imgUrl}
          alt="post"
          className="object-cover w-full h-full block"
        />
      )}
    </div>
  )
}

export default GridPost
