type PostCaptionProps = {
  caption?: string
}

export default function PostCaption({ caption }: PostCaptionProps) {
  if (!caption) return null

  return (
    <div className="p-2">
      <div className="text-sm">{caption}</div>
    </div>
  )
}
