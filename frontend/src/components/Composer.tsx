import React, { useState } from 'react'
import { db } from '../db'

function id() {
  // prefer the secure UUID when available
  return globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 9)
}

const Composer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [caption, setCaption] = useState('')

  async function submit() {
    if (!file) return
    const blob = await file.slice(0, file.size, file.type)
    const key = id()
    await db.blobs.put({ key, data: blob })
    await db.posts.add({
      id: id(),
      authorId: 'anonymous',
      imageKey: key,
      caption,
      createdAt: Date.now(),
      likeCount: 0,
      commentsCount: 0,
    })
    setFile(null)
    setCaption('')
    // simple page refresh to show new post (replace later with state updates)
    window.location.reload()
  }

  return (
    <div className="p-2 border rounded-md">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <input className="border p-1 mt-2 w-full" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption..." />
      <div className="mt-2">
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={submit}>
          Post
        </button>
      </div>
    </div>
  )
}

export default Composer
