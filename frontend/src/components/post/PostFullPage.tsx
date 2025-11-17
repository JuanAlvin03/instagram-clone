import React from "react"
import PostCard from "./PostCard"
import type { Post } from "@/types/models"

const PostFullPage: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="max-w-md mx-auto pb-20">
      <PostCard post={post} />
    </div>
  )
}

export default PostFullPage
