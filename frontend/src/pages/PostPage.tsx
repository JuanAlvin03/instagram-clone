import React, { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { db } from "@/db"
import type { Post } from "@/types/models"
import PostFullPage from "@/components/post/PostFullPage"
import { Spinner } from "@/components/ui/spinner"

const PostPage: React.FC = () => {
  const { postId } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true) // Track loading state
  const createdUrlRef = useRef<string | null>(null)

  useEffect(() => {
    let mounted = true;
    
    // 1. CRITICAL: Reset states immediately when postId changes
    setLoading(true);
    setPost(null); 
    
    (async () => {
      if (!postId) {
        setLoading(false);
        return;
      }
    
      // Small delay or next-tick to ensure state transition is smooth
      const p = await db.posts.get(postId);
      
      if (!mounted) return;
    
      if (p) {
        // Clean up previous URL if it exists before creating a new one
        if (createdUrlRef.current) {
          URL.revokeObjectURL(createdUrlRef.current);
        }
        
        const blobRec = await db.blobs.get(p.imageKey);
        const url = blobRec ? URL.createObjectURL(blobRec.data) : null
        createdUrlRef.current = url;
        setPost(p);
      } else {
        setPost(null); // Explicitly ensure post is null if not found
      }
    
      setLoading(false);
    })();
  
    return () => {
      mounted = false;
      // Cleanup will run when the component unmounts OR before the effect runs again
    };
  }, [postId]); // Dependency array is correct, it watches the URL param

  // 1. Show Spinner while searching IndexedDB
  if (loading) {
    return (
      <div className="flex justify-center py-40">
        <Spinner className="size-8" />
      </div>
    )
  }

  // 2. Show "Not Found" if loading finished and post is null
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-secondary text-primary-foreground hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
      </div>
    )
  }

  // 3. Show Post
  return <PostFullPage post={post}/>
}

export default PostPage