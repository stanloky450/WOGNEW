import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

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

    const like = await db.like.upsert({
      where: {
        userId_postId: {
          userId: user.id,
          postId: id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        postId: id,
      },
    });

    return NextResponse.json({ success: true, like });
  } catch (error: any) {
    console.error("Like API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
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

    await db.like.delete({
      where: {
        userId_postId: {
          userId: user.id,
          postId: id,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Unlike API error:", error);
    return NextResponse.json({ success: true });
  }
}
