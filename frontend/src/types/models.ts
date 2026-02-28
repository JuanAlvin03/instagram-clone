export type ID = string

export type Follow = {
  id: ID
  followerId: ID
  followingId: ID
}

export type User = {
  id: ID
  username: string
  name?: string
  avatarKey?: string // key into blobs table
  bio?: string
}

export type Post = {
  id: ID
  authorId: ID
  imageKey: string
  caption?: string
  createdAt: number
  likeCount: number
  commentsCount: number
}

export type Like = {
  id: ID
  postId: ID
  userId: ID
  createdAt: number
}

export type Comment = {
  id: ID
  postId: ID
  userId: ID
  text: string
  createdAt: number
}

export type SavedPost = {
  id: ID
  userId: ID
  postId: ID
  createdAt: number
}