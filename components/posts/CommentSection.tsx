"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addComment, deleteComment } from "@/app/actions"
import { formatDate } from "@/lib/utils"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Assuming these exist or will use simple fallback
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Send } from "lucide-react"

interface CommentUser {
  id: string
  name: string | null
  image: string | null
}

interface Comment {
  id: string
  content: string
  createdAt: Date
  author: CommentUser
}

interface CommentSectionProps {
  postId: string
  initialComments: Comment[]
  commentsEnabled?: boolean
  currentUser?: {
    id: string
    role?: string
  } | null
}

export function CommentSection({ postId, initialComments, commentsEnabled = true, currentUser }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await addComment(postId, newComment)
      setNewComment("")
      router.refresh()
    } catch (error) {
      console.error("Failed to add comment:", error)
      alert("Failed to post comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (commentId: string) => {
     if (!confirm("Are you sure you want to delete this comment?")) return
     
     try {
       await deleteComment(commentId)
       router.refresh()
     } catch (error) {
       console.error("Failed to delete comment:", error)
       alert("Failed to delete comment.")
     }
  }

  return (
    <div className="space-y-8 mt-12 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900 border-b pb-4">
        Comments ({initialComments.length})
      </h3>
      
      {/* Comment List */}
      <div className="space-y-6">
        {initialComments.length === 0 ? (
           <p className="text-gray-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          initialComments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg overflow-hidden">
                {comment.author.image ? (
                    <img src={comment.author.image} alt={comment.author.name || "User"} className="w-full h-full object-cover" />
                ) : (
                    (comment.author.name?.[0] || "U").toUpperCase()
                )}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-gray-900 block">{comment.author.name || "Anonymous"}</span>
                    <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  {currentUser && (
                    (currentUser.id === comment.author.id || 
                     ["SUPERADMIN", "ADMIN", "POST_ADMIN"].includes(currentUser.role || "")) && (
                      <button 
                        onClick={() => handleDelete(comment.id)} 
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete comment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )
                  )}
                </div>
                <div className="mt-2 text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      {commentsEnabled ? (currentUser ? (
        <form onSubmit={handleAddComment} className="mt-8 space-y-4">
          <div>
            <label htmlFor="comment" className="sr-only">Add a comment</label>
            <Textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="resize-none min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end">
            <Button 
                type="submit" 
                disabled={isSubmitting || !newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">Posting...</span>
                ) : (
                    <span className="flex items-center gap-2"><Send className="w-4 h-4"/> Post Comment</span>
                )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center border text-black">
          <p className="text-gray-600">Please <a href="/auth/signin" className="text-blue-600 hover:underline">sign in</a> to leave a comment.</p>
        </div>
      )) : (
        <div className="mt-8 p-4 bg-amber-50 rounded-lg text-center border border-amber-200 text-amber-900">
          Comments are disabled for this post.
        </div>
      )}
    </div>
  )
}
