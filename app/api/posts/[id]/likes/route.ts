import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const sessionUserId = (session?.user as any)?.id;

  try {
    const likes = await db.like.findMany({
      where: { postId: id },
      select: { userId: true },
    });

    const hasLiked = sessionUserId ? likes.some((like) => like.userId === sessionUserId) : false;

    return NextResponse.json({
      success: true,
      count: likes.length,
      hasLiked,
      userIds: likes.map((like) => like.userId),
    });
  } catch (error) {
    console.error("Get likes API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
