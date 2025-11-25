import { useEffect, useRef, useState } from "react"
import { db } from "@/db"
import type { Post } from "@/types/models"
import GridPost from "@/components/explore/GridPost"
import { useAuthContext } from "@/app/AuthProvider"

interface Props {
  userId: string,
  onCreateClick: () => void
}

const ProfileGrid = ({ userId, onCreateClick }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const objectUrlsRef = useRef<string[]>([])

  const { userId: currentUserId } = useAuthContext()
  const isOwner = currentUserId === userId

  useEffect(() => {
    let mounted = true

    ;(async () => {
      /**
       * Fetch posts by the specific user and sort them by creation date descending
       * We cannot use Dexie's orderBy on indexedDB for non-primary key queries,
       * so we fetch and sort manually here.
       * We should consider adding a compound index on (authorId, createdAt) for better performance.
       */
      const userPosts = await db.posts.where("authorId").equals(userId).toArray()
      userPosts.sort((a, b) => b.createdAt - a.createdAt)
        
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
        {isOwner && (
          <button onClick={onCreateClick} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">
            Create Post
          </button>
        )}
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
