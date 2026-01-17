import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const firstTimer = await db.firstTimer.create({
      data: {
        fullName: body.fullName,
        phoneNumber: body.phoneNumber,
        email: body.email || null,
        ageGroup: body.ageGroup || null,
        isFirstTime: body.isFirstTime,
        attendingDuration: body.attendingDuration || null,
        servicesAttended: JSON.stringify(body.servicesAttended || []),
        departmentsInterest: JSON.stringify(body.departmentsInterest || []),
        needsCounseling: body.needsCounseling || false,
        prayerRequest: body.prayerRequest || null,
        updatePreferences: JSON.stringify(body.updatePreferences || []),
        serviceFeedback: body.serviceFeedback || null,
        suggestions: body.suggestions || null,
      },
    })

    return NextResponse.json({ success: true, data: firstTimer }, { status: 201 })
  } catch (error) {
    console.error("Error creating first timer entry:", error)
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const firstTimers = await db.firstTimer.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: firstTimers })
  } catch (error) {
    console.error("Error fetching first timers:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    )
  }
}
