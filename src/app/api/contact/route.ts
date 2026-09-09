import { NextResponse, type NextRequest } from "next/server";
import { isValidEmail } from "@/lib/utils";

export const runtime = "nodejs";

/**
 * Accepts the contact form. Wire this to your CRM, help desk or an email
 * provider — the shape below is what the form sends.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!isValidEmail(email) || message.length < 5) {
    return NextResponse.json({ ok: false, error: "Email and message are required." }, { status: 400 });
  }

  console.info("[contact]", {
    email,
    name: body.name,
    subject: body.subject,
    locale: body.locale,
    length: message.length,
  });

  return NextResponse.json({ ok: true });
}
