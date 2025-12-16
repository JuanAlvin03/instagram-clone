import { useEffect, useState } from "react";
import { db } from "@/db";

export function useCommentsCount(postId: string) {
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const count = await db.comments
        .where("postId")
        .equals(postId)
        .count();

      if (mounted) setCommentsCount(count);
    }

    load();

    // LIVE updates using Dexie hooks
    const { comments } = db;

    const listener = async () => {
      const count = await comments
        .where("postId")
        .equals(postId)
        .count();

      if (mounted) setCommentsCount(count);
    };

    comments.hook("creating").subscribe(listener)
    comments.hook("updating").subscribe(listener)
    comments.hook("deleting").subscribe(listener)

    return () => {
      mounted = false;
      comments.hook("creating").unsubscribe(listener);
      comments.hook("updating").unsubscribe(listener);
      comments.hook("deleting").unsubscribe(listener);
    };
  }, [postId]);

  return commentsCount;
}
