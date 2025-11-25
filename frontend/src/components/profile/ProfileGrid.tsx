import { useEffect, useRef, useState } from "react"
import { db } from "@/db"
import type { Post } from "@/types/models"
import GridPost from "@/components/explore/GridPost"

interface Props {
  userId: string
}

const ProfileGrid = ({ userId }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const objectUrlsRef = useRef<string[]>([])

  useEffect(() => {
    let mounted = true

    ;(async () => {
      const userPosts = await db.posts
        .where("authorId")
        .equals(userId)
        //.orderBy("createdAt")
        //.reverse()
        .toArray()
        
      if (!mounted) return
      setPosts(userPosts)
    })()

    return () => {
      mounted = false
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u))
      objectUrlsRef.current = []
    }
  }, [userId])

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center w-full py-20 text-muted-foreground">
        <div className="text-6xl mb-4">📷</div>
        <p className="text-lg font-semibold">No posts yet</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
      {posts.map((post) => (
        <GridPost key={post.id} post={post} objectUrlsRef={objectUrlsRef} />
      ))}
    </div>
  )
}

export default ProfileGrid
