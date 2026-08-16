"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { addComment, deleteComment, editComment } from "@/app/actions"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Send, Edit3, X, Check } from "lucide-react"

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
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState("")
  const [isEditingSubmitting, setIsEditingSubmitting] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    setComments(initialComments)
  }, [initialComments])

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    
    // We can optimistically add a comment if we know the user details
    const tempId = `temp-${Date.now()}`
    const userDisplay = {
      id: currentUser?.id || "temp-user",
      name: "You",
      image: null
    }
    const optimisticComment: Comment = {
      id: tempId,
      content: newComment.trim(),
      createdAt: new Date(),
      author: userDisplay
    }
    
    setComments(prev => [optimisticComment, ...prev])
    const commentText = newComment
    setNewComment("")

    try {
      await addComment(postId, commentText)
      router.refresh()
    } catch (error: any) {
      console.error("Failed to add comment:", error)
      // Revert optimistic add
      setComments(prev => prev.filter(c => c.id !== tempId))
      setNewComment(commentText)
      alert(error.message || "Failed to post comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id)
    setEditingContent(comment.content)
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
    setEditingContent("")
  }

  const handleSaveEdit = async (commentId: string) => {
    if (!editingContent.trim() || isEditingSubmitting) return

    setIsEditingSubmitting(true)
    
    const originalComments = [...comments]
    // Optimistic Update
    setComments(prev => 
      prev.map(c => c.id === commentId ? { ...c, content: editingContent.trim() } : c)
    )
    
    try {
      await editComment(commentId, editingContent)
      setEditingCommentId(null)
      setEditingContent("")
      router.refresh()
    } catch (error: any) {
      console.error("Failed to edit comment:", error)
      // Revert on error
      setComments(originalComments)
      alert(error.message || "Failed to edit comment.")
    } finally {
      setIsEditingSubmitting(false)
    }
  }

  const handleDelete = async (commentId: string) => {
     if (!confirm("Are you sure you want to delete this comment?")) return
     
     const originalComments = [...comments]
     // Optimistic Delete
     setComments(prev => prev.filter(c => c.id !== commentId))

     try {
       await deleteComment(commentId)
       router.refresh()
     } catch (error: any) {
       console.error("Failed to delete comment:", error)
       // Revert on error
       setComments(originalComments)
       alert(error.message || "Failed to delete comment.")
     }
  }

  return (
    <div className="space-y-8 mt-12 bg-white p-6 rounded-lg shadow-sm border text-black">
      <h3 className="text-2xl font-bold text-gray-900 border-b pb-4">
        Comments ({comments.length})
      </h3>
      
      {/* Comment List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
           <p className="text-gray-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => {
            const isEditingThis = editingCommentId === comment.id;
            const isAuthor = currentUser?.id === comment.author.id;
            const isAdminOrMod = currentUser && ["SUPERADMIN", "ADMIN", "POST_ADMIN", "EDITOR"].includes(currentUser.role || "");
            
            return (
              <div key={comment.id} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg overflow-hidden border">
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
                    
                    {!isEditingThis && currentUser && (
                      <div className="flex items-center gap-2">
                        {isAuthor && (
                          <button 
                            onClick={() => handleStartEdit(comment)} 
                            className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            title="Edit comment"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                        {(isAuthor || isAdminOrMod) && (
                          <button 
                            onClick={() => handleDelete(comment.id)} 
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete comment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {isEditingThis ? (
                    <div className="mt-2 space-y-2">
                      <Textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="min-h-[80px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        disabled={isEditingSubmitting}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleCancelEdit}
                          disabled={isEditingSubmitting}
                          className="gap-1 border border-gray-300"
                        >
                          <X className="w-3.5 h-3.5" /> Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleSaveEdit(comment.id)}
                          disabled={isEditingSubmitting || !editingContent.trim()}
                          className="gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Check className="w-3.5 h-3.5" /> Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {comment.content}
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Add Comment Form */}
      {commentsEnabled ? (currentUser ? (
        <form onSubmit={handleAddComment} className="mt-8 space-y-4 border-t pt-6">
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
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center border">
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
