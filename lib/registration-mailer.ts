type RegistrationKind = "first-timer" | "member-bio"

interface RegistrationEmailInput {
  to: string
  fullName: string
  kind: RegistrationKind
}

const CHURCH_CONTACT = {
  phone: "+234 7048345555",
  email: "info@wgministries.org",
  address: "Word of Grace Ministries, No 64 Old Lagos-Asaba Road, Agbor, Delta State. Nigeria",
  serviceDays: [
    "Sunday Leadership Training - 8:00 AM",
    "Sunday Celebration Service - 9:00 AM",
    "Wednesday Word Alive (Bible Study) - 5:00 PM",
    // "Friday Prayer Meeting - 5:00 PM",
  ],
}

function buildHtmlMessage(fullName: string, kind: RegistrationKind) {
  const registrationLine =
    kind === "first-timer"
      ? "Thank you for completing our First Timer registration."
      : "Thank you for submitting your Membership Bio registration."
  const siteUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.wgministries.org"
  const logoUrl = `${siteUrl.replace(/\/$/, "")}/images/WOGLOGO.png`

  return `
    <div style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr>
          <td style="background:linear-gradient(120deg,#1d4ed8,#2563eb);padding:28px 24px;text-align:center;">
            <img src="${logoUrl}" alt="Word of Grace Ministries" style="width:84px;height:auto;display:block;margin:0 auto 10px auto;" />
            <h1 style="margin:0;color:#ffffff;font-size:22px;line-height:1.3;">Word of Grace Ministries</h1>
            <p style="margin:6px 0 0 0;color:#dbeafe;font-size:14px;">Thank You for Registering</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <h2 style="margin:0 0 8px 0;font-size:20px;color:#111827;">Hello ${fullName},</h2>
            <p style="margin:0 0 14px 0;line-height:1.7;color:#374151;">${registrationLine}</p>
            <p style="margin:0 0 18px 0;line-height:1.7;color:#374151;">We are excited to have you connected with us. Here is useful information to help you stay engaged.</p>

            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 16px;margin-bottom:16px;">
              <h3 style="margin:0 0 10px 0;font-size:16px;color:#1e40af;">Service Days</h3>
              <ul style="margin:0;padding-left:18px;color:#1f2937;line-height:1.7;">
                ${CHURCH_CONTACT.serviceDays.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>

            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;">
              <h3 style="margin:0 0 10px 0;font-size:16px;color:#111827;">Contact Information</h3>
              <p style="margin:0 0 6px 0;"><strong>Phone:</strong> ${CHURCH_CONTACT.phone}</p>
              <p style="margin:0 0 6px 0;"><strong>Email:</strong> ${CHURCH_CONTACT.email}</p>
              <p style="margin:0;"><strong>Address:</strong> ${CHURCH_CONTACT.address}</p>
            </div>

            <p style="margin:18px 0 0 0;line-height:1.7;color:#374151;">We look forward to worshipping with you.</p>
            <p style="margin:10px 0 0 0;line-height:1.7;color:#111827;"><strong>Grace and peace be multiplied,</strong><br/>Word of Grace Ministries</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function sendRegistrationThankYouEmail(input: RegistrationEmailInput) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || "587")
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || user
  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465

  if (!host || !user || !pass || !from) {
    console.warn("Registration email skipped: SMTP is not fully configured.")
    return { sent: false, reason: "SMTP_NOT_CONFIGURED" as const }
  }

  try {
    const nodemailer = await import("nodemailer")
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 30_000,
      tls: {
        servername: host,
      },
    })

    await transporter.sendMail({
      from,
      to: input.to,
      subject: "Thank you for registering with Word of Grace Ministries",
      html: buildHtmlMessage(input.fullName, input.kind),
    })

    console.log(`Registration thank-you email sent to ${input.to} for ${input.kind}.`)
    return { sent: true as const }
  } catch (error) {
    console.error("Failed to send registration thank-you email:", error)
    return { sent: false, reason: "SEND_FAILED" as const }
  }
}
