import { db } from './index'
import type { User, Post, Comment } from '../types/models'

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
  const akuId = id()
  const charlesId = id()

  const users: User[] = [
    { id: aliceId, username: 'alice', name: 'Alice' },
    { id: bobId, username: 'bob', name: 'Bob' },
    { id: akuId, username: 'me', name: 'Me' },
    { id: charlesId, username: 'charles', name: 'Charles' },
  ]

  await db.users.bulkAdd(users)

  // Use an existing public asset as placeholder image
  try {
    const res = await fetch('/vite.svg')
    const blob = await res.blob()
    const imgKey = id()
    await db.blobs.put({ key: imgKey, data: blob })

    const res1 = await fetch('img1.png')
    const blob1 = await res1.blob()
    const imgKey1 = id()
    await db.blobs.put({ key: imgKey1, data: blob1 })

    const res2 = await fetch('img2.png')
    const blob2 = await res2.blob()
    const imgKey2 = id()
    await db.blobs.put({ key: imgKey2, data: blob2 })

    const post: Post = {
      id: id(),
      authorId: aliceId,
      imageKey: imgKey,
      caption: 'Hello from the seeded Alice',
      createdAt: Date.now(),
      likeCount: 0,
      commentsCount: 2,
    }

    const posts: Post[] = [
      {
        id: id(),
        authorId: bobId,
        imageKey: imgKey1,
        caption: 'Bob\'s first post!',
        createdAt: Date.now() - 100000,
        likeCount: 0,
        commentsCount: 0,
      },
      {
        id: id(),
        authorId: charlesId,
        imageKey: imgKey2,
        caption: 'Charles\'s first post!',
        createdAt: Date.now() - 10000000,
        likeCount: 0,
        commentsCount: 0,
      }
    ]

    await db.posts.add(post)
    await db.posts.bulkAdd(posts)

    // seed comments
    const comments: Comment[] = [
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
      {
        id: id(),
        postId: posts[0].id,
        userId: akuId,
        text: "Welcome to the platform, Bob!",
        createdAt: Date.now(),
      }
    ]
    
    await db.comments.bulkAdd(comments)
  } catch (e) {
    // ignore seed image errors
    console.warn('seed: could not load seed image', e)
  }
}
