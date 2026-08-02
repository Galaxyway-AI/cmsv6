import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const deliveryEndpoint = "https://forms.cmsv6.co.uk/submit";
const allowedOrigins = new Set(["https://cmsv6.co.uk", "https://www.cmsv6.co.uk", "https://cmsv6-uk.frankywright.chatgpt.site"]);

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const organisation = String(form.get("organisation") || "").trim();
  const type = String(form.get("type") || "").trim();
  const devices = String(form.get("devices") || "").trim();
  const message = String(form.get("message") || "").trim();
  const consent = form.get("consent");
  const honeypot = String(form.get("website") || "");
  if (honeypot) return NextResponse.json({ ok: true });
  if (name.length < 2 || name.length > 120 || !emailPattern.test(email) || phone.length > 40 || organisation.length > 160 || !type || message.length < 10 || message.length > 4000 || !consent) return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });

  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && !allowedOrigins.has(requestOrigin)) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  const sourceOrigin = requestOrigin || "https://cmsv6.co.uk";
  try {
    const delivery = await fetch(deliveryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CMSV6-Origin": sourceOrigin },
      body: JSON.stringify({ name, email, phone, organisation, type, devices, message }),
    });
    if (!delivery.ok) return NextResponse.json({ error: "We could not deliver your enquiry yet." }, { status: delivery.status === 429 ? 429 : 502 });
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json({ error: "We could not deliver your enquiry yet." }, { status: 502 });
  }
}
