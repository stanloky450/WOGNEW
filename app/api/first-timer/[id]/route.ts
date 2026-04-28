import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const firstTimer = await db.firstTimer.findUnique({
      where: {
        id: id,
      },
    });

    if (!firstTimer) {
      return NextResponse.json(
        { success: false, error: "First timer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: firstTimer });
  } catch (error) {
    console.error("Error fetching first timer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;

    if (!session?.user || !role || !["SUPERADMIN", "ADMIN"].includes(role)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await db.firstTimer.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting first timer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete first timer" },
      { status: 500 }
    );
  }
}
