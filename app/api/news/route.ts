import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const news = await db.news.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: news })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newsItem = await db.news.create({
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        published: body.published || false,
        publishedAt: body.published ? new Date() : null,
        authorId: body.authorId,
      },
    })

    return NextResponse.json({ success: true, data: newsItem }, { status: 201 })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create news" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      )
    }

    const newsItem = await db.news.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        published: body.published,
        publishedAt: body.published ? new Date() : null, // Reset published date if re-published? Or only if not previously set? For simplicity, we update it if published is true. Better logic might be needed but this suffices for now.
      },
    })

    return NextResponse.json({ success: true, data: newsItem })
  } catch (error) {
    console.error("Error updating news:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update news" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      )
    }

    await db.news.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting news:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete news" },
      { status: 500 }
    )
  }
}
