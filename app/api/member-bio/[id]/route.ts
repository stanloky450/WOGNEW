import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const allowedRoles = ["SUPERADMIN", "ADMIN"]

async function authorizeAdmin() {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: string } | undefined)?.role

  if (!session?.user || !role || !allowedRoles.includes(role)) {
    return false
  }

  return true
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthorized = await authorizeAdmin()
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const memberBio = await db.memberBio.findUnique({
      where: { id: params.id },
    })

    if (!memberBio) {
      return NextResponse.json(
        { success: false, error: "Member bio not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: memberBio })
  } catch (error) {
    console.error("Error fetching member bio:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch member bio" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthorized = await authorizeAdmin()
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    await db.memberBio.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting member bio:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete member bio" },
      { status: 500 }
    )
  }
}
