import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { User } from '../../types/models'
import { Link } from "react-router-dom"

interface Props {
  author: User | null
}

const PostHeader: React.FC<Props> = ({ author }) => {
  const username = author?.username ?? 'user'
  const [open, setOpen] = useState(false)

  return (
    <header className="flex items-center justify-between p-3 border-b border-border">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 rounded-full overflow-hidden border border-border">
          <AvatarImage src={author?.avatarKey ?? '/vite.svg'} className="object-cover w-full h-full" />
          <AvatarFallback>{username[0]?.toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>

        {/* Username*/}
        <div className="flex flex-col leading-tight">
          <Link
            to={`/u/${username}`}
            className="font-semibold text-sm hover:underline"
          >
            {username}
          </Link>
        </div>
      </div>

      {/* 3-dot menu */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-transparent focus-visible:ring-0 focus-visible:outline-none"
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </DialogTrigger>

        <DialogOverlay className="bg-black/50 fixed inset-0 z-40" />

        <DialogContent
          className="bg-card text-foreground p-0 rounded-2xl overflow-hidden w-72 z-50 border-none shadow-lg"
          showCloseButton={false}
        >
          <ul className="divide-y divide-border">
            <li className="text-red-500 text-center py-3 font-semibold cursor-pointer hover:bg-muted/40">Report</li>
            <li className="text-center py-3 cursor-pointer hover:bg-muted/40">Unfollow</li>
            <li className="text-center py-3 cursor-pointer hover:bg-muted/40">Add to favorites</li>
            <li className="text-center py-3 cursor-pointer hover:bg-muted/40">Go to post</li>
            <li className="text-center py-3 cursor-pointer hover:bg-muted/40">Share to…</li>
            <li className="text-center py-3 cursor-pointer hover:bg-muted/40">Copy link</li>
            <li className="text-center py-3 cursor-pointer hover:bg-muted/40">Embed</li>
            <li className="text-center py-3 cursor-pointer hover:bg-muted/40">About this account</li>
            <li
              className="text-center py-3 font-semibold cursor-pointer hover:bg-muted/40"
              onClick={() => setOpen(false)}
            >
              Cancel
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default PostHeader
