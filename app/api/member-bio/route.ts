import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendRegistrationThankYouEmail } from "@/lib/registration-mailer"

const allowedRoles = ["SUPERADMIN", "ADMIN"]

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.fullName || !body.phoneNumber || !body.shortBio) {
      return NextResponse.json(
        { success: false, error: "Full name, phone number, and short bio are required" },
        { status: 400 }
      )
    }

    const memberBio = await db.memberBio.create({
      data: {
        fullName: body.fullName,
        profilePhoto: body.profilePhoto || null,
        phoneNumber: body.phoneNumber,
        email: body.email || null,
        gender: body.gender || null,
        maritalStatus: body.maritalStatus || null,
        occupation: body.occupation || null,
        department: body.department || null,
        address: body.address || null,
        shortBio: body.shortBio,
        salvationStory: body.salvationStory || null,
        prayerRequest: body.prayerRequest || null,
        isActiveMember: body.isActiveMember !== false,
      },
    })

    let emailStatus: "not_requested" | "sent" | "smtp_not_configured" | "send_failed" = "not_requested"

    if (memberBio.email) {
      const emailResult = await sendRegistrationThankYouEmail({
        to: memberBio.email,
        fullName: memberBio.fullName,
        kind: "member-bio",
      })

      emailStatus = emailResult.sent
        ? "sent"
        : emailResult.reason === "SMTP_NOT_CONFIGURED"
          ? "smtp_not_configured"
          : "send_failed"
    }

    return NextResponse.json({ success: true, data: memberBio, emailStatus }, { status: 201 })
  } catch (error) {
    console.error("Error creating member bio:", error)
    return NextResponse.json(
      { success: false, error: "Failed to submit member bio" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const role = (session?.user as { role?: string } | undefined)?.role

    if (!session?.user || !role || !allowedRoles.includes(role)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const memberBios = await db.memberBio.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: memberBios })
  } catch (error) {
    console.error("Error fetching member bios:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch member bios" },
      { status: 500 }
    )
  }
}
