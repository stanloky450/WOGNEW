"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { toggleLike } from "@/app/actions"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

interface LikeButtonProps {
  postId: string
  initialCount: number
  initialIsLiked: boolean
}

export function LikeButton({ postId, initialCount, initialIsLiked }: LikeButtonProps) {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    if (!session) {
      alert("You must be logged in to like a post. Redirecting to sign in page...")
      window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      return
    }
    
    if (isLoading) return

    // Optimistic update
    const previousIsLiked = isLiked
    const previousCount = count
    
    setIsLiked(!isLiked)
    setCount(isLiked ? count - 1 : count + 1)
    setIsLoading(true)

    try {
      await toggleLike(postId)
      // Success - state is already updated
    } catch (error) {
      // Revert on error
      setIsLiked(previousIsLiked)
      setCount(previousCount)
      console.error("Failed to toggle like:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition-colors cursor-pointer",
        isLiked 
          ? "text-red-600 bg-red-50 hover:bg-red-100" 
          : "text-gray-600 bg-gray-100 hover:bg-gray-200"
      )}
      aria-label={isLiked ? "Unlike post" : "Like post"}
    >
      <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
      <span className="font-medium">{count}</span>
    </button>
  )
}
