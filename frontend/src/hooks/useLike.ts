import { useEffect, useState } from "react";
import { db } from "@/db";

function id() {
  return globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 9)
}

export function useLike(postId: string, userId: string) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const post = await db.posts.get(postId);
      const existing = await db.likes
        .where({ postId, userId })
        .first();

      if (mounted) {
        setLiked(!!existing);
        setLikeCount(post?.likeCount ?? 0);
        setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [postId, userId]);

  // LIKE / UNLIKE
  const toggleLike = async () => {
    if (loading) return;

    if (liked) {
      // UNLIKE
      const existing = await db.likes
        .where({ postId, userId })
        .first();

      if (existing) {
        await db.likes.delete(existing.id);
        await db.posts.update(postId, { likeCount: likeCount - 1 });
        setLikeCount(prev => prev - 1);
      }
      setLiked(false);
    } else {
      // LIKE
      await db.likes.add({
        id: id(),
        postId,
        userId,
        createdAt: Date.now()
      });

      await db.posts.update(postId, { likeCount: likeCount + 1 });
      setLikeCount(prev => prev + 1);

      setLiked(true);
    }
  };

  return { liked, likeCount, toggleLike, loading };
}
