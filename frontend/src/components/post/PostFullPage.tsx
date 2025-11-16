import React from "react"
import PostCard from "./PostCard"
import CommentSection from "./CommentSection"
import type { Post } from "@/types/models"

const PostFullPage: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="max-w-md mx-auto pb-20">
      <PostCard post={post} />
      <div className="mt-4 px-4">
        <CommentSection postId={post.id} />
      </div>
    </div>
  )
}

export default PostFullPage
