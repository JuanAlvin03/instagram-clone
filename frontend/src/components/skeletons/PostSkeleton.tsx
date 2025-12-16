import { Skeleton } from "@/components/ui/skeleton"

const PostSkeleton = () => {
  return (
    <div className="w-full max-w-md space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3 px-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Image */}
      <Skeleton className="w-full aspect-square rounded-lg" />

      {/* Actions */}
      <div className="px-3 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export default PostSkeleton
