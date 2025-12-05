import { db } from './index'
import type { User, Post, Comment, Like } from '../types/models'

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
  const dianaId = id()
  const eveId = id()
  const frankId = id()
  const garyId = id()

  const users: User[] = [
    { id: aliceId, username: 'alice', name: 'Alice' },
    { id: bobId, username: 'bob', name: 'Bob' },
    { id: akuId, username: 'me', name: 'Me' },
    { id: charlesId, username: 'charles', name: 'Charles' },
    { id: dianaId, username: 'diana', name: 'Diana' },
    { id: eveId, username: 'eve', name: 'Eve' },
    { id: frankId, username: 'frank', name: 'Frank'},
    { id: garyId, username: 'gary', name: 'Gary'}
  ]

  await db.users.bulkAdd(users)

  const followRelations = [
    { id: id(), followerId: akuId, followingId: aliceId },
    { id: id(), followerId: bobId, followingId: aliceId },
    { id: id(), followerId: charlesId, followingId: aliceId },
    { id: id(), followerId: dianaId, followingId: aliceId },
    { id: id(), followerId: eveId, followingId: aliceId },
    { id: id(), followerId: frankId, followingId: aliceId },
    { id: id(), followerId: garyId, followingId: aliceId },
    { id: id(), followerId: aliceId, followingId: garyId },
    { id: id(), followerId: bobId, followingId: akuId },
    { id: id(), followerId: charlesId, followingId: garyId },
    { id: id(), followerId: dianaId, followingId: bobId },
  ]
  await db.follows.bulkAdd(followRelations)

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

    const res3 = await fetch('img3.png')
    const blob3 = await res3.blob()
    const imgKey3 = id()
    await db.blobs.put({ key: imgKey3, data: blob3 })

    const res4 = await fetch('img4.png')
    const blob4 = await res4.blob()
    const imgKey4 = id()
    await db.blobs.put({ key: imgKey4, data: blob4 })

    const res5 = await fetch('img5.png')
    const blob5 = await res5.blob()
    const imgKey5 = id()
    await db.blobs.put({ key: imgKey5, data: blob5 })

    const res6 = await fetch('img6.png')
    const blob6 = await res6.blob()
    const imgKey6 = id()
    await db.blobs.put({ key: imgKey6, data: blob6 })

    const post: Post = {
      id: id(),
      authorId: aliceId,
      imageKey: imgKey,
      caption: 'Hello from the seeded Alice',
      createdAt: Date.now(),
      likeCount: 1,
      commentsCount: 2,
    }

    const posts: Post[] = [
      {
        id: id(),
        authorId: bobId,
        imageKey: imgKey1,
        caption: 'Bob\'s first post!',
        createdAt: Date.now() - 100000,
        likeCount: 2,
        commentsCount: 1,
      },
      {
        id: id(),
        authorId: charlesId,
        imageKey: imgKey2,
        caption: 'Charles\'s first post!',
        createdAt: Date.now() - 10000000,
        likeCount: 0,
        commentsCount: 0,
      },
      {
        id: id(),
        authorId: dianaId,
        imageKey: imgKey3,
        caption: 'This is a very long caption, do not read this, just want to test how the text wrapping works in the post grid view. Hope it looks good! 😊',
        createdAt: Date.now() - 100000000,
        likeCount: 0,
        commentsCount: 0,
      },
      {
        id: id(),
        authorId: aliceId,
        imageKey: imgKey4,
        caption: 'Alice again with another post!',
        createdAt: Date.now() - 300000,
        likeCount: 0,
        commentsCount: 3,
      },
      {
        id: id(),
        authorId: eveId,
        imageKey: imgKey5,
        caption: 'Eve\'s first post!',
        createdAt: Date.now() - 5000000,
        likeCount: 0,
        commentsCount: 0,
      },
      {
        id: id(),
        authorId: aliceId,
        imageKey: imgKey6,
        caption: 'Yet another post by Alice to showcase multiple posts in her profile grid.',
        createdAt: Date.now() - 500000000,
        likeCount: 0,
        commentsCount: 0,
      }
    ]

    await db.posts.add(post)
    await db.posts.bulkAdd(posts)

    const likes: Like[] = [
      { id: id(), postId: post.id, userId: bobId, createdAt: Date.now()},
      { id: id(), postId: posts[0].id, userId: aliceId, createdAt: Date.now() },
      { id: id(), postId: posts[0].id, userId: akuId, createdAt: Date.now() },
    ]
    await db.likes.bulkAdd(likes)

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
      },
      {
        id: id(),
        postId: posts[3].id,
        userId: frankId,
        text: "Nice post, Alice!",
        createdAt: Date.now(),
      },
      {
        id: id(),
        postId: posts[3].id,
        userId: dianaId,
        text: "Hi Alice!",
        createdAt: Date.now(),
      },
      {
        id: id(),
        postId: posts[3].id,
        userId: garyId,
        text: "wow",
        createdAt: Date.now(),
      }
    ]
    
    await db.comments.bulkAdd(comments)
  } catch (e) {
    // ignore seed image errors
    console.warn('seed: could not load seed image', e)
  }
}
