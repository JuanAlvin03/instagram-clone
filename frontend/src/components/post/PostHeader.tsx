import Avatar from "../ui/Avatar"
import type { User } from "@/types/models"

type PostHeaderProps = {
  author: User | null
}

export default function PostHeader({ author }: PostHeaderProps) {
  return (
    <header className="p-2 flex items-center gap-2">
      <Avatar src={author ? undefined : '/vite.svg'} />
      <div className="font-semibold">{author?.username ?? 'user'}</div>
    </header>
  )
}
