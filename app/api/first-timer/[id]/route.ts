import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
