import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "@/db"
import type { User, Post } from "@/types/models"
import GridPost from "@/components/explore/GridPost"
import { useAuthContext } from "@/app/AuthProvider"

const SavedPostsPage = () => {
  const { username } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const objectUrlsRef = useRef<string[]>([])

  const { userId: currentUserId } = useAuthContext()

  useEffect(() => {
    if (!username) return
    ;(async () => {
      const found = await db.users.where("username").equals(username).first()
      setUser(found ?? null)
    })()
  }, [username])

  useEffect(() => {
    if (!user) return

    if (user.id !== currentUserId) {
      // Prevent other users from seeing private saved posts
      setPosts([])
      return
    }

    let mounted = true

    ;(async () => {
      // Get saved post references
      const saved = await db.savedPosts.where("userId").equals(user.id).toArray()

      // Fetch posts for each saved postId
      const fullPosts: Post[] = []
      for (const s of saved) {
        const post = await db.posts.get(s.postId)
        if (post) fullPosts.push(post)
      }

      // Sort newest first
      fullPosts.sort((a, b) => b.createdAt - a.createdAt)

      if (!mounted) return
      setPosts(fullPosts)
    })()

    return () => {
      mounted = false
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u))
      objectUrlsRef.current = []
    }
  }, [user, currentUserId])

  if (!user) return <div className="p-4">User not found</div>

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Saved Posts</h2>

      {user.id !== currentUserId ? (
        <div className="text-muted-foreground">You cannot view someone else's saved posts.</div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center w-full py-20 text-muted-foreground">
          <div className="text-6xl mb-4">🔖</div>
          <p className="text-lg font-semibold">No saved posts yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
          {posts.map((post) => (
            <GridPost key={post.id} post={post} objectUrlsRef={objectUrlsRef} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedPostsPage
