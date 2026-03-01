// src/pages/PostPage.tsx
import React, { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
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

  if (!post) return 
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <h1 className="text-3xl font-bold mb-2">Post Not Found</h1>
    <p className="text-muted-foreground mb-6">
      The post you're looking for doesn't exist.
    </p>
    <Link
      to="/"
      className="px-4 py-2 rounded-lg bg-secondary text-primary-foreground hover:opacity-90 transition"
    >
      Go Back Home
    </Link>
  </div>

  return <PostFullPage post={post}/>
}

export default PostPage
