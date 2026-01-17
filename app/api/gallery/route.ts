import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const galleries = await db.gallery.findMany({
      include: {
        images: true,
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { eventDate: "desc" },
    })

    return NextResponse.json({ success: true, data: galleries })
  } catch (error) {
    console.error("Error fetching galleries:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch galleries" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const gallery = await db.gallery.create({
      data: {
        title: body.title,
        description: body.description,
        eventDate: new Date(body.eventDate),
        published: body.published || false,
        authorId: body.authorId,
        images: {
          create: body.images?.map((img: { url: string; caption?: string }) => ({
            url: img.url,
            caption: img.caption,
          })) || [],
        },
      },
      include: {
        images: true,
      },
    })

    return NextResponse.json({ success: true, data: gallery }, { status: 201 })
  } catch (error) {
    console.error("Error creating gallery:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create gallery" },
      { status: 500 }
    )
  }
}
