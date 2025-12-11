// src/components/Feed.tsx
import React, { useEffect, useState } from "react"
import { db } from "../db"
import type { Post as PostType } from "../types/models"
import PostCard from "./post/PostCard"
import { useAuthContext } from "@/app/AuthProvider"

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [mode, setMode] = useState<"all" | "following">("all") // 🔥 NEW TOGGLE STATE
  const { userId } = useAuthContext()

  // Fetch posts based on mode
  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        if (!userId) return

        let result: PostType[] = []

        if (mode === "all") {
          // ---------------------------
          // MODE 1: All posts
          // ---------------------------
          result = await db.posts.orderBy("createdAt").reverse().toArray()
        } else {
          // ---------------------------
          // MODE 2: Following only
          // ---------------------------

          // Find all users current user follows
          const following = await db.follows.where("followerId").equals(userId).toArray()
          const followingIds = following.map((f) => f.followingId)

          if (followingIds.length === 0) {
            result = []
          } else {
            // Query posts for each followed user
            const collected: PostType[] = []

            for (const uid of followingIds) {
              const postsByUser = await db.posts.where("authorId").equals(uid).toArray()
              collected.push(...postsByUser)
            }

            result = collected.sort((a, b) => b.createdAt - a.createdAt)
          }
        }

        if (!mounted) return
        setPosts(result)
      } catch (error) {
        console.warn("Error loading feed posts", error)
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
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            mode === "following"
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setMode("following")}
        >
          Following
        </button>

        <button
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            mode === "all"
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground"
          }`}
          onClick={() => setMode("all")}
        >
          All
        </button>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="text-muted-foreground py-10">
          {mode === "following" ? "No posts from users you follow yet." : "No posts yet."}
        </p>
      )}
    </section>
  )
}

export default Feed
