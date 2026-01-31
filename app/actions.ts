"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function toggleLike(postId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("You must be logged in to like a post")
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    throw new Error("User not found")
  }

  const existingLike = await db.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId: postId,
      },
    },
  })

  if (existingLike) {
    await db.like.delete({
      where: {
        id: existingLike.id,
      },
    })
  } else {
    await db.like.create({
      data: {
        userId: user.id,
        postId: postId,
      },
    })
  }

  revalidatePath(`/posts/${postId}`)
}

export async function addComment(postId: string, content: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("You must be logged in to comment")
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    throw new Error("User not found")
  }

  if (!content.trim()) {
    throw new Error("Comment cannot be empty")
  }

  await db.comment.create({
    data: {
      content: content,
      postId: postId,
      authorId: user.id,
    },
  })

  revalidatePath(`/posts/${postId}`)
}

export async function deleteComment(commentId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("You must be logged in to delete a comment")
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    throw new Error("User not found")
  }

  const comment = await db.comment.findUnique({
    where: { id: commentId },
  })

  if (!comment) {
    throw new Error("Comment not found")
  }

  const isAdmin = ["SUPERADMIN", "ADMIN", "POST_ADMIN"].includes(user.role as string)
  
  if (comment.authorId !== user.id && !isAdmin) {
    throw new Error("Unauthorized to delete this comment")
  }

  await db.comment.delete({
    where: { id: commentId },
  })

  revalidatePath(`/posts/${comment.postId}`)
}
