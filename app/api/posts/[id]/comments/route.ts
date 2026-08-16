import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Simple in-memory map for rate limiting comment spam
const commentRateLimit = new Map<string, number>();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const comments = await db.comment.findMany({
      where: { postId: id },
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error("Get comments API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Rate Limiting (Spam protection) - 5 seconds cooldown
    const now = Date.now();
    const lastCommentTime = commentRateLimit.get(user.id);
    if (lastCommentTime && now - lastCommentTime < 5000) {
      return NextResponse.json(
        { error: "Too many comments. Please wait a few seconds before trying again." },
        { status: 429 }
      );
    }
    commentRateLimit.set(user.id, now);

    const { content } = await req.json();

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Comment content cannot be empty" },
        { status: 400 }
      );
    }

    const post = await db.post.findUnique({
      where: { id },
      select: { commentsEnabled: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!post.commentsEnabled) {
      return NextResponse.json(
        { error: "Comments are disabled for this post" },
        { status: 400 }
      );
    }

    const comment = await db.comment.create({
      data: {
        content: content.trim(),
        postId: id,
        authorId: user.id,
      },
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error("Create comment API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
