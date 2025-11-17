import { db } from './index'
import type { User, Post } from '../types/models'

function id() {
  // use crypto if available
  // fallback to simple random string
  return (globalThis.crypto && (globalThis.crypto as any).randomUUID)
    ? (globalThis.crypto as any).randomUUID()
    : Math.random().toString(36).slice(2, 9)
}

export async function seedIfEmpty() {
  const count = await db.posts.count()
  if (count > 0) return

  const aliceId = id()
  const bobId = id()

  const users: User[] = [
    { id: aliceId, username: 'alice', name: 'Alice' },
    { id: bobId, username: 'bob', name: 'Bob' },
  ]

  await db.users.bulkAdd(users)

  // Use an existing public asset as placeholder image
  try {
    const res = await fetch('/vite.svg')
    const blob = await res.blob()
    const imgKey = id()
    await db.blobs.put({ key: imgKey, data: blob })

    const post: Post = {
      id: id(),
      authorId: aliceId,
      imageKey: imgKey,
      caption: 'Hello from the seeded Alice',
      createdAt: Date.now(),
      likeCount: 0,
      commentsCount: 0,
    }

    await db.posts.add(post)

    // seed comments
    const comments = [
      {
        id: id(),
        postId: post.id,
        userId: bobId,
        text: "Nice photo!",
        createdAt: Date.now() - 1000,
      },
      {
        id: id(),
        postId: post.id,
        userId: aliceId,
        text: "Thank you! 😊",
        createdAt: Date.now(),
      },
    ]
    
    await db.comments.bulkAdd(comments)
  } catch (e) {
    // ignore seed image errors
    console.warn('seed: could not load seed image', e)
  }
}
