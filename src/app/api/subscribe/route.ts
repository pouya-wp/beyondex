import { NextResponse, type NextRequest } from "next/server";
import { isValidEmail } from "@/lib/utils";

export const runtime = "nodejs";

/** Newsletter opt-in. Swap the log for your ESP's subscribe call. */
export async function POST(request: NextRequest) {
  let body: { email?: string; locale?: string };
  try {
    body = (await request.json()) as { email?: string; locale?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed body." }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  console.info("[subscribe]", { email, locale: body.locale });

  return NextResponse.json({ ok: true });
}
