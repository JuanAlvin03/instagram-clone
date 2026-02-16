// src/components/Feed.tsx
import React, { useEffect, useState } from "react"
import { db } from "../db"
import type { Post as PostType } from "../types/models"
import PostCard from "./post/PostCard"
import { useAuthContext } from "@/app/AuthProvider"
import PostSkeleton from "./skeletons/PostSkeleton"

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [mode, setMode] = useState<"all" | "following">("all") // 🔥 NEW TOGGLE STATE
  const [loading, setLoading] = useState(true)
  const { userId } = useAuthContext()

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        if (!userId) return

        setLoading(true)

        let result: PostType[] = []

        if (mode === "all") {
          result = await db.posts.orderBy("createdAt").reverse().toArray()
        } else {
          const following = await db.follows
            .where("followerId")
            .equals(userId)
            .toArray()

          const followingIds = following.map(f => f.followingId)

          if (followingIds.length > 0) {
            const collected: PostType[] = []

            for (const uid of followingIds) {
              const postsByUser = await db.posts
                .where("authorId")
                .equals(uid)
                .toArray()
              collected.push(...postsByUser)
            }

            result = collected.sort((a, b) => b.createdAt - a.createdAt)
          }
        }

        if (!mounted) return
        setPosts(result)
      } catch (e) {
        console.warn("Error loading feed", e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [mode, userId])


  // ---------------------------
  // UI
  // ---------------------------
  return (
    <section className="flex flex-col items-center w-full gap-6 py-6">

      {/* 🔥 Feed toggle */}
      <div className="flex items-center gap-3 mb-2">
        <button
          className={`feed-mode-toggle-button ${
            mode === "following"
              ? "feed-mode-toggle-selected pointer-events-none"
              : "feed-mode-toggle-off darken-on-hover"
          }`}
          onClick={() => setMode("following")}
        >
          Following
        </button>

        <button
          className={`feed-mode-toggle-button ${
            mode === "all"
              ? "feed-mode-toggle-selected pointer-events-none"
              : "feed-mode-toggle-off darken-on-hover"
          }`}
          onClick={() => setMode("all")}
        >
          All
        </button>
      </div>

      {/* Posts */}
      {loading ? (
        <div className="flex flex-col items-center gap-6 w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : posts.length > 0 ? (
        posts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-muted-foreground py-10">
          {mode === "following"
            ? "No posts from users you follow yet."
            : "No posts yet."}
        </p>
      )}
    </section>
  )
}

export default Feed
