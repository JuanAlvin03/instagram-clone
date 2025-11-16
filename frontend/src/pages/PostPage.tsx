import React, { useEffect, useState } from "react"
import { useNavigate, useParams, /*useLocation*/ } from "react-router-dom"
import { db } from "@/db"
import type { Post, User } from "@/types/models"

import PostModalView from "@/components/post/PostModalView"
import PostFullPage from "@/components/post/PostFullPage"

const MOBILE_BREAKPOINT = 768

/**
 * Might not need the author and image url, check again later
 */

const PostPage: React.FC = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  //const location = useLocation()

  const [post, setPost] = useState<Post | null>(null)
  const [author, setAuthor] = useState<User | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const isMobile = window.innerWidth < MOBILE_BREAKPOINT

  // WORKS TILL THIS POINT

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!postId) return

      const p = await db.posts.get(postId)
      if (!p) return

      const u = await db.users.get(p.authorId)
      const blobRec = await db.blobs.get(p.imageKey)

      const url = blobRec ? URL.createObjectURL(blobRec.data) : null

      if (!mounted) return
      setPost(p)
      setAuthor(u ?? null)
      setImageUrl(url)
    })()

    return () => { mounted = false }
  }, [postId])

  if (!post || !author) return null // I can

  // Mobile → full page
  if (isMobile) {
    return <PostFullPage post={post}/>
  }

  // Desktop → modal dialog
  return (
    <PostModalView
      post={post}
      author={author}
      imageUrl={imageUrl}
      onClose={() => navigate(-1)}
    />
  )
}

export default PostPage
