// src/pages/PostPage.tsx
import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "@/db"
import type { Post, /*User*/ } from "@/types/models"
import PostFullPage from "@/components/post/PostFullPage"

const PostPage: React.FC = () => {
  const { postId } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  //const [author, setAuthor] = useState<User | null>(null)
  //const [imageUrl, setImageUrl] = useState<string | null>(null)
  const createdUrlRef = useRef<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!postId) return
      const p = await db.posts.get(postId)
      if (!p) return

      //const u = await db.users.get(p.authorId)
      const blobRec = await db.blobs.get(p.imageKey)
      const url = blobRec ? URL.createObjectURL(blobRec.data) : null

      if (!mounted) return

      createdUrlRef.current = url
      setPost(p)
      //setAuthor(u ?? null)
      //setImageUrl(url)
    })()

    return () => {
      mounted = false
      if (createdUrlRef.current) {
        URL.revokeObjectURL(createdUrlRef.current)
        createdUrlRef.current = null
      }
    }
  }, [postId])

  if (!post) return null

  return <PostFullPage post={post}/>
}

export default PostPage
