// components/post/PostImage.tsx
import React from 'react'

interface Props {
  imageUrl: string | null
  caption?: string | null
}

const PostImage: React.FC<Props> = ({ imageUrl, caption }) => {
  return (
    <div className="relative bg-muted flex justify-center remove-gap-post-image">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={caption ?? 'Post image'}
          className="w-full h-auto object-contain"
        />
      ) : (
        <div className="h-64 bg-muted flex items-center justify-center text-muted-foreground text-sm">
          No image
        </div>
      )}
    </div>
  )
}


export default PostImage
