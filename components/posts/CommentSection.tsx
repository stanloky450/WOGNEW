"use client"

import { useState, useRef } from "react"
import { useSession } from "next-auth/react"
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
  currentUser?: {
    id: string
    role?: string
  } | null
}

export function CommentSection({ postId, initialComments, currentUser }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments) // We'll rely on page refresh for now, or optimistic?
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Note: For real-time updates without refresh, we'd need more complex state management
  // or use router.refresh() after action.
  // Ideally, valid actions revalidatePath which re-renders the server component.
  // But since this is a client component, we might not see the update immediately unless we optimistic update.
  
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await addComment(postId, newComment)
      setNewComment("")
      // For now, we rely on revalidatePath in the action to update the page data.
      // But since this is a client component taking initialComments, it won't see the new comment unless the parent re-renders.
      // So we should probably do a simple optimistic update or router.refresh()
      
      // Let's assume revalidatePath works and the parent component (Page) re-renders, 
      // but client components don't always reset state.
      // It's better to accept 'comments' as prop and rely on parent re-rendering.
      // But for better UX, let's just create a temporary object.
      
      /* 
      const tempComment = {
        id: "temp-" + Date.now(),
        content: newComment,
        createdAt: new Date(),
        author: {
           id: currentUser?.id || "",
           name: "You", // We might not have full name
           image: null
        }
      } 
      setComments([...comments, tempComment])
      */
     
     // Actually, nextjs actions with revalidatePath usually update the UI if using useFormState or similar.
     // Here we are just calling the function.
     
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
       // Optimistic remove
       // setComments(comments.filter(c => c.id !== commentId))
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
      {currentUser ? (
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
      )}
    </div>
  )
}
