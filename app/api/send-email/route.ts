import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Try EmailJS first (primary method)
    try {
      const emailJSResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_portfolio",
          template_id: "template_contact",
          user_id: "your_emailjs_user_id",
          template_params: {
            from_name: name,
            from_email: email,
            subject: subject || "Portfolio Contact Form",
            message: message,
            to_email: "ufoundashwin@gmail.com",
            timestamp: new Date().toLocaleString(),
          },
        }),
      })

      if (emailJSResponse.ok) {
        return NextResponse.json({
          success: true,
          message: "Email sent successfully via EmailJS!",
        })
      }
    } catch (emailJSError) {
      console.log("EmailJS failed, trying Formspree...", emailJSError)
    }

    // Fallback to Formspree
    try {
      const formspreeResponse = await fetch("https://formspree.io/f/your_form_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject: subject || "Portfolio Contact Form",
          message: `
TERMINAL_CONTACT_FORM_SUBMISSION
================================

FROM: ${name} <${email}>
SUBJECT: ${subject || "Portfolio Contact Form"}
TIMESTAMP: ${new Date().toLocaleString()}
SOURCE: NARUTO_PORTFOLIO_CONTACT_FORM

MESSAGE:
${message}

================================
SYSTEM_INFO: SENT_VIA_FORMSPREE_FALLBACK
          `,
        }),
      })

      if (formspreeResponse.ok) {
        return NextResponse.json({
          success: true,
          message: "Email sent successfully via Formspree!",
        })
      }
    } catch (formspreeError) {
      console.log("Formspree also failed:", formspreeError)
    }

    // If both services fail, return error
    return NextResponse.json({ error: "Failed to send email. Please try again or contact directly." }, { status: 500 })
  } catch (error) {
    console.error("Email API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
