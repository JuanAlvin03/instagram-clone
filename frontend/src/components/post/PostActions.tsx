import React from "react";
import { Heart, HeartIcon, MessageCircle, Send, Bookmark, BookmarkCheck } from "lucide-react";
import { useLike } from "@/hooks/useLike";
import { useCommentsCount } from "@/hooks/useCommentsCount";
import { useAuthContext } from "@/app/AuthProvider";
import { useSavePost } from "@/hooks/useSavePost";

interface Props {
  likeCount: number;
  commentsCount: number;
  onOpenComments?: () => void;
  postId: string;
}

const PostActions: React.FC<Props> = ({ onOpenComments, postId }) => {
  const { userId } = useAuthContext();

  const { liked, likeCount: liveLikeCount, toggleLike } = useLike(postId, userId || "");
  const liveCommentsCount = useCommentsCount(postId);

  // New saved-post hook
  const { saved, toggleSave } = useSavePost(postId, userId);

  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/p/${postId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">

        {/* LIKE */}
        <div className="flex items-center gap-1 cursor-pointer" onClick={toggleLike}>
          {liked ? (
            <HeartIcon className="w-6 h-6 text-red-500 fill-red-500" />
          ) : (
            <Heart className="w-6 h-6 hover:text-red-500 transition-colors" />
          )}
          <span className="text-sm">{liveLikeCount}</span>
        </div>

        {/* COMMENT */}
        <div className="flex items-center gap-1 cursor-pointer" onClick={onOpenComments}>
          <MessageCircle className="w-6 h-6 hover:text-blue-500 transition-colors" />
          <span className="text-sm">{liveCommentsCount}</span>
        </div>

        {/* SHARE */}
        <div className="relative cursor-pointer" onClick={handleShare}>
          <Send className="w-6 h-6 hover:text-foreground/70 transition-colors" />
          {copied && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded-md shadow">
              Link Copied!
            </div>
          )}
        </div>

      </div>

      {/* SAVE BUTTON */}
      <div className="cursor-pointer" onClick={toggleSave}>
        {saved ? (
          <BookmarkCheck className="w-6 h-6 fill-foreground" />
        ) : (
          <Bookmark className="w-6 h-6 hover:text-foreground/70 transition-colors" />
        )}
      </div>
    </div>
  );
};

export default PostActions;
