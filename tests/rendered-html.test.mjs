import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the CMSV6 acquisition homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Live CCTV\. Real-time GPS\./);
  assert.match(html, /Live CCTV capture\. Remote access\./);
  assert.match(html, /Business premises/);
  assert.match(html, /Remote property view/);
  assert.match(html, /Live video \+ GPS/);
  assert.match(html, /cmsv6-logo-1\.png/);
  assert.match(html, /cmsv6-logo\.png/);
  assert.doesNotMatch(html, /_vinext\/image\?url=%2Fcmsv6-logo/);
  assert.match(html, /two months of CMSV6 hosting free/i);
  assert.match(html, /Vehicles &amp; fleets/);
  assert.match(html, /Farms &amp; rural/);
  assert.match(html, /Choose 12 months/);
  assert.match(html, /All published prices are per compatible device/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("publishes SEO and safety essentials", async () => {
  const response = await render("/faq");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /FAQPage/);
  assert.match(html, /Is CMSV6 only for vehicles\?/);
  assert.match(html, /CMSV6 is not an emergency-response service/i);
  assert.match(html, /og\.png/);
});

test("publishes the featured compatible equipment catalogue", async () => {
  const response = await render("/equipment");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /iCustodian® iC9800MDVR-AI/);
  assert.doesNotMatch(html, /£249\.00/);
  assert.ok((html.match(/Price &amp; availability/g) ?? []).length >= 3);
  assert.ok((html.match(/See iCustodian/g) ?? []).length >= 3);
  assert.match(html, /iC9000MDVR-AI\.png/);
  assert.match(html, /iC9800MDVR-K\.png/);
  assert.match(html, /N9\.png/);
  assert.match(html, /Browse all compatible DVRs/);
  assert.match(html, /icustodian\.com\/product\/n9dashcam/);
  assert.match(html, /support@cmsv6\.co\.uk/);
  assert.doesNotMatch(html, /info@icustodian\.com/);
});

test("rejects incomplete enquiry submissions before delivery", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-enquiry`);
  const { default: worker } = await import(workerUrl.href);
  const body = new FormData();
  body.set("name", "A");
  const response = await worker.fetch(new Request("http://localhost/api/enquiry", { method: "POST", body }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 400);
  assert.match(await response.text(), /check the required fields/i);
});
