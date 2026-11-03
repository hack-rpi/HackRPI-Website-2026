import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(
  email: string,
  subject: string,
  body: string
) {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    replyTo: "nickcone1215@gmail.com",
    subject,
    text: body,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function POST(request: Request) {
  try {
    const { email, subject, body } = await request.json();

    if (
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof body !== "string" ||
      !email.trim() ||
      !subject.trim() ||
      !body.trim()
    ) {
      return NextResponse.json(
        { error: "Email, subject, and body are required." },
        { status: 400 }
      );
    }

    const data = await sendEmail(email, subject, body);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email sending failed:", error);
  
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error while sending email.",
      },
      { status: 500 }
    );
  }
}