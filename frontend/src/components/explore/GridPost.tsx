// src/components/explore/GridPost.tsx
import React, { useEffect, useState } from 'react'
import { db } from '@/db'
import type { Post } from '@/types/models'
import { useNavigate } from "react-router-dom"
import { Heart, MessageCircle } from "lucide-react"

interface Props {
  post: Post
  objectUrlsRef: React.MutableRefObject<string[]>
}

const GridPost: React.FC<Props> = ({ post, objectUrlsRef }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const navigate = useNavigate()

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

    return () => { mounted = false }
  }, [post.imageKey])

  return (
    <div
      className="
        relative 
        w-full 
        aspect-square 
        overflow-hidden 
        bg-muted 
        cursor-pointer
        group
      "
      onClick={() => navigate(`/p/${post.id}`)}
    >
      {/* Image */}
      {imgUrl && (
        <img
          src={imgUrl}
          alt="post"
          className="
            object-cover 
            w-full 
            h-full 
            block
            transition-all
            duration-300
            group-hover:brightness-75
          "
        />
      )}

      {/* HOVER OVERLAY */}
      <div
        className="
          absolute inset-0 
          flex items-center justify-center
          gap-6
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
          text-white
          font-semibold
          text-sm
        "
      >
        {/* Likes */}
        <div className="flex items-center gap-1">
          <Heart className="w-5 h-5 fill-white" />
          {post.likeCount ?? 0}
        </div>

        {/* Comments */}
        <div className="flex items-center gap-1">
          <MessageCircle className="w-5 h-5 fill-white" />
          {post.commentsCount ?? 0}
        </div>
      </div>
    </div>
  )
}

export default GridPost
