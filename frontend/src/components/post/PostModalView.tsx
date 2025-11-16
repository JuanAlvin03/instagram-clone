import React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import CommentSection from "./CommentSection"
import type { Post, User } from "@/types/models"

interface Props {
  post: Post
  author: User
  imageUrl: string | null
  onClose: () => void
}

const PostModalView: React.FC<Props> = ({ post, author, imageUrl, onClose }) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-5xl w-full h-[80vh] p-0 flex overflow-hidden"
      >
        {/* LEFT: IMAGE */}
        <div className="basis-1/2 bg-black flex items-center justify-center">
          {imageUrl && <img src={imageUrl} className="max-h-full max-w-full object-contain" />}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="basis-1/2 flex flex-col border-l border-border bg-card">
          <div className="p-4 border-b border-border">
            <PostHeader author={author} />
          </div>

          {/* Scrollable caption + comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Caption at top 
            <PostFooter
              caption={post.caption}
              username={author.username}
              likeCount={post.likeCount}
              commentsCount={post.commentsCount}
              createdAt={post.createdAt}
              noActions // hide actions inside footer (since modal actions go below)
            />*/}

            <CommentSection postId={post.id} />
          </div>

          {/* ACTION BAR */}
          <div className="border-t p-4">
            <PostFooter
              caption={post.caption}
              username={author.username}
              likeCount={post.likeCount}
              commentsCount={post.commentsCount}
              createdAt={post.createdAt}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostModalView
