import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { PACES, SOURCES } from "@/lib/options";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  city?: unknown;
  pace?: unknown;
  source?: unknown;
  _gotcha?: unknown;
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept so bots think they succeeded, but store nothing.
  if (str(body._gotcha)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const city = str(body.city);
  const pace = str(body.pace);
  const source = str(body.source);

  // --- validation ---
  if (name.length < 1 || name.length > 120) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (city.length > 120) {
    return NextResponse.json({ error: "That city looks too long." }, { status: 400 });
  }
  if (pace && !(PACES as readonly string[]).includes(pace)) {
    return NextResponse.json({ error: "Please choose a valid pace." }, { status: 400 });
  }
  if (source && !(SOURCES as readonly string[]).includes(source)) {
    return NextResponse.json({ error: "Please choose how you found us." }, { status: 400 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "The waitlist isn’t connected yet. Please try again soon." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("waitlist").insert({
    name,
    email,
    city: city || null,
    pace: pace || null,
    source: source || null,
  });

  if (error) {
    // 23505 = unique_violation → email already on the list.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    console.error("[waitlist] insert failed:", error.message);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
