type PostImageProps = {
  imageUrl: string | null
  alt?: string
}

export default function PostImage({ imageUrl, alt }: PostImageProps) {
  if (!imageUrl) {
    return <div className="h-48 bg-gray-100" />
  }

  return <img src={imageUrl} alt={alt ?? "post image"} />
}
