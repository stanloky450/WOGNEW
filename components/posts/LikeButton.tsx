"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { toggleLike } from "@/app/actions"
import { cn } from "@/lib/utils"
// import { useOptimistic } from "react" // Not available in all versions, using local state for now

interface LikeButtonProps {
  postId: string
  initialCount: number
  initialIsLiked: boolean
}

export function LikeButton({ postId, initialCount, initialIsLiked }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [count, setCount] = useState(initialCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
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
      // Ideally show a toast here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
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
