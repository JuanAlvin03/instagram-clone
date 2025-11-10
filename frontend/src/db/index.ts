import Dexie from 'dexie'
import type { Table } from 'dexie'
import type { User, Post, Like, Comment } from '../types/models'

class AppDB extends Dexie {
  users!: Table<User, string>
  posts!: Table<Post, string>
  likes!: Table<Like, string>
  comments!: Table<Comment, string>
  blobs!: Table<{ key: string; data: Blob }, string>

  constructor() {
    super('instagram_clone_db')
    this.version(1).stores({
      users: 'id, username',
      posts: 'id, authorId, createdAt',
      likes: 'id, postId, userId',
      comments: 'id, postId, userId',
      blobs: 'key',
    })
  }
}

export const db = new AppDB()
