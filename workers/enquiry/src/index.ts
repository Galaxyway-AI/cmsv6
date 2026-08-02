const MAX_BODY_BYTES = 16_384;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ORIGINS = new Set([
  "https://cmsv6.co.uk",
  "https://www.cmsv6.co.uk",
  "https://cmsv6-uk.frankywright.chatgpt.site",
]);

const ENQUIRY_TYPES = new Set([
  "New CMSV6 subscription",
  "Activate an existing device",
  "Check device compatibility",
  "Fleet or multi-site quote",
  "Farm or rural system",
  "Marine system",
  "Technical support",
  "Hosting renewal",
]);

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  type: string;
  devices: string;
  message: string;
};

function json(data: object, status = 200): Response {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

function stringField(record: Record<string, unknown>, key: string): string {
  return typeof record[key] === "string" ? record[key].trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateEnquiry(value: unknown): Enquiry | null {
  if (!isRecord(value)) return null;
  const enquiry: Enquiry = {
    name: stringField(value, "name"),
    email: stringField(value, "email"),
    phone: stringField(value, "phone"),
    organisation: stringField(value, "organisation"),
    type: stringField(value, "type"),
    devices: stringField(value, "devices"),
    message: stringField(value, "message"),
  };
  const deviceCount = enquiry.devices ? Number(enquiry.devices) : 0;
  if (
    enquiry.name.length < 2 || enquiry.name.length > 120 ||
    !EMAIL_PATTERN.test(enquiry.email) || enquiry.email.length > 254 ||
    enquiry.phone.length > 40 || enquiry.organisation.length > 160 ||
    !ENQUIRY_TYPES.has(enquiry.type) ||
    (enquiry.devices !== "" && (!Number.isInteger(deviceCount) || deviceCount < 1 || deviceCount > 10_000)) ||
    enquiry.message.length < 10 || enquiry.message.length > 4_000
  ) return null;
  return enquiry;
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;",
  })[character] ?? character);
}

async function readJson(request: Request): Promise<unknown> {
  const statedLength = Number(request.headers.get("content-length") || 0);
  if (statedLength > MAX_BODY_BYTES) throw new RangeError("Request body is too large");
  if (!request.body) throw new SyntaxError("Request body is missing");
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel("Request body is too large");
      throw new RangeError("Request body is too large");
    }
    text += decoder.decode(value, { stream: true });
  }
  text += decoder.decode();
  return JSON.parse(text);
}

function buildEmail(enquiry: Enquiry, enquiryId: string) {
  const safe = Object.fromEntries(Object.entries(enquiry).map(([key, value]) => [key, escapeHtml(value)]));
  const rows = [
    ["Name", safe.name], ["Email", safe.email], ["Telephone", safe.phone || "Not supplied"],
    ["Organisation", safe.organisation || "Not supplied"], ["Enquiry type", safe.type],
    ["Number of devices", safe.devices || "Not supplied"],
  ];
  const htmlRows = rows.map(([label, value]) => `<tr><th style="padding:8px 12px;text-align:left;background:#eef5f8">${label}</th><td style="padding:8px 12px">${value}</td></tr>`).join("");
  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  return {
    to: "frankywright@hotmail.com",
    from: { email: "website@cmsv6.co.uk", name: "CMSV6 Website" },
    replyTo: { email: enquiry.email, name: enquiry.name },
    subject: `CMSV6 website enquiry: ${enquiry.type}`,
    text: `New CMSV6 website enquiry\nReference: ${enquiryId}\n\n${textRows}\n\nMessage:\n${enquiry.message}`,
    html: `<div style="font-family:Arial,sans-serif;color:#0c1b2e;max-width:680px"><h1 style="font-size:24px">New CMSV6 website enquiry</h1><p><strong>Reference:</strong> ${enquiryId}</p><table style="width:100%;border-collapse:collapse">${htmlRows}</table><h2 style="font-size:18px;margin-top:24px">Message</h2><p style="white-space:pre-wrap">${safe.message}</p><p style="margin-top:28px;color:#59697b;font-size:13px">Reply directly to this email to contact ${safe.name}.</p></div>`,
    headers: { "X-CMSV6-Enquiry-ID": enquiryId },
  };
}

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/health") return json({ ok: true });
  if (request.method !== "POST" || url.pathname !== "/submit") return json({ error: "Not found" }, 404);
  const sourceOrigin = request.headers.get("x-cmsv6-origin") || "";
  if (!ALLOWED_ORIGINS.has(sourceOrigin)) return json({ error: "Forbidden" }, 403);
  let payload: unknown;
  try {
    payload = await readJson(request);
  } catch (error) {
    return json({ error: error instanceof RangeError ? "Request is too large" : "Invalid request" }, error instanceof RangeError ? 413 : 400);
  }
  const enquiry = validateEnquiry(payload);
  if (!enquiry) return json({ error: "Please check the required fields" }, 400);
  const rateKey = request.headers.get("cf-connecting-ip") || `email:${enquiry.email.toLowerCase()}`;
  const { success } = await env.RATE_LIMITER.limit({ key: rateKey });
  if (!success) return json({ error: "Too many enquiries. Please wait a minute and try again" }, 429);
  const enquiryId = crypto.randomUUID();
  try {
    const result = await env.EMAIL.send(buildEmail(enquiry, enquiryId));
    console.log(JSON.stringify({ event: "enquiry_sent", enquiryId, messageId: result.messageId }));
    return json({ ok: true, delivered: true, reference: enquiryId });
  } catch (error) {
    console.error(JSON.stringify({ event: "enquiry_failed", enquiryId, error: error instanceof Error ? error.message : String(error) }));
    return json({ error: "Delivery failed" }, 502);
  }
}

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    return handleRequest(request, env);
  },
} satisfies ExportedHandler<Env>;
