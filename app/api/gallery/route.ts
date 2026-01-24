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

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    console.log("[API PUT] Received gallery update:", body.id);

    if (!body.id) {
        return NextResponse.json({ success: false, error: "Gallery ID is required" }, { status: 400 })
    }

    // Transactional update: we need to handle images which is a relation
    // Simplest robust strategy for this context: Delete all images and recreate them.
    // Ideally we would diff them, but for a simple dashboard this ensures consistency.
    
    // First, delete existing images
    await db.galleryImage.deleteMany({
        where: { galleryId: body.id }
    })

    // Then update gallery and create new images
    const gallery = await db.gallery.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        eventDate: new Date(body.eventDate),
        published: body.published,
        images: {
          create: body.images?.map((img: { url: string; caption?: string }) => ({
            url: img.url,
            caption: img.caption || "",
          })) || [],
        },
      },
      include: {
        images: true,
      },
    })
    
    return NextResponse.json({ success: true, data: gallery })
  } catch (error: any) {
    console.error("Error updating gallery:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update gallery: " + (error.message || String(error)) },
      { status: 500 }
    )
  }
}
