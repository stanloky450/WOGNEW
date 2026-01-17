import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const posts = await db.post.findMany({
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

    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("[API POST] Received body:", JSON.stringify(body));

    if (!body.authorId) {
        return NextResponse.json(
            { success: false, error: "Author ID is missing. You might not be logged in or your session is invalid." },
            { status: 400 }
        )
    }

    // Handle Debug User (Ensure exists in DB)
    if (body.authorId === "debug-user-id") {
      console.log("[API POST] Processing Debug User...");
      try {
          // 1. Try to find by EMAIL first
          const existingUser = await db.user.findUnique({
              where: { email: "debug@test.com" }
          });

          if (existingUser) {
              console.log("[API POST] Found existing Debug User by email:", existingUser.id);
              body.authorId = existingUser.id;
          } else {
              // 2. If not found, create it with the specific ID or generated ID
              console.log("[API POST] Creating new Debug User...");
              // We use a try/catch for upsert because "debug-user-id" might conflict if mistakenly used elsewhere
              const newUser = await db.user.upsert({
                where: { email: "debug@test.com" }, // Upsert by unique email
                update: {},
                create: {
                  id: "debug-user-id", // Try these explicitly
                  email: "debug@test.com",
                  name: "Debug Admin",
                  password: "debug_hashed_password_placeholder",
                  role: "ADMIN",
                }
              });
              body.authorId = newUser.id;
          }
      } catch (upsertError: any) {
          console.error("[API POST] Debug User Setup FAILED:", upsertError);
          
          // Fallback: Find ANY admin to assign this post to, so it doesn't fail
          const fallbackAdmin = await db.user.findFirst({ where: { role: "ADMIN" } });
          if (fallbackAdmin) {
              console.log("[API POST] Using Fallback Admin:", fallbackAdmin.id);
              body.authorId = fallbackAdmin.id;
          } else {
               return NextResponse.json(
                  { success: false, error: "Failed to set up Debug User and no fallback admin found." },
                  { status: 500 }
              )
          }
      }
    }

    console.log("[API POST] Creating Post with AuthorID:", body.authorId);
    
    // Validate Author ID exists to prevent foreign key constraint failed
    const authorExists = await db.user.findUnique({ where: { id: body.authorId } });
    if (!authorExists) {
         return NextResponse.json(
            { success: false, error: `Author with ID ${body.authorId} does not exist in database.` },
            { status: 400 }
        )
    }

    const post = await db.post.create({
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
    console.log("[API POST] Post Created ID:", post.id);

    return NextResponse.json({ success: true, data: post }, { status: 201 })
  } catch (error: any) {
    console.error("[API POST] CRITICAL ERROR:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create post: " + (error.message || String(error)) },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    console.log("[API PUT] Received update body:", JSON.stringify(body));

    if (!body.id) {
        return NextResponse.json({ success: false, error: "Post ID is required" }, { status: 400 })
    }

    const post = await db.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        published: body.published,
        publishedAt: body.published ? new Date() : null,
      },
    })
    console.log("[API PUT] Post Updated ID:", post.id);

    return NextResponse.json({ success: true, data: post })
  } catch (error: any) {
    console.error("[API PUT] CRITICAL ERROR:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update post: " + (error.message || String(error)) },
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

    await db.post.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete post" },
      { status: 500 }
    )
  }
}
