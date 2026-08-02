import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();
  const consent = form.get("consent");
  const honeypot = String(form.get("website") || "");
  if (honeypot) return NextResponse.json({ ok: true });
  if (name.length < 2 || name.length > 120 || !emailPattern.test(email) || message.length < 10 || message.length > 4000 || !consent) return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  // Production handoff: connect this validated payload to the approved CRM or email service.
  return NextResponse.json({ ok: true, delivered: false }, { status: 202 });
}
