import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Ordinals Mail <noreply@ordinalsmail.com>",
        to: "info@ordinalsmail.com",
        subject: "OM Waitlist",
        text: `New subscriber: ${email}`,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error("Resend API error:", errorData)
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ message: "Subscribed successfully" })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

