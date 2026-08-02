import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

const seoRoutes = [
  "/", "/features", "/solutions", "/how-it-works", "/equipment", "/pricing", "/support", "/about", "/contact", "/faq", "/resources", "/responsible-use", "/cmsv6-device-compatibility", "/international-cmsv6-hosting", "/editorial-policy", "/sitemap", "/privacy", "/terms",
  "/solutions/vehicle-cctv", "/solutions/fleet-cctv-and-video-telematics", "/solutions/taxi-private-hire-cctv", "/solutions/lorry-hgv-cctv", "/solutions/business-cctv", "/solutions/farm-cctv", "/solutions/boat-marine-cctv",
  "/resources/what-is-cmsv6", "/resources/choosing-a-cmsv6-compatible-dvr", "/resources/live-cctv-versus-recorded-playback", "/resources/cmsv6-gps-tracking-guide", "/resources/cmsv6-device-activation-guide", "/resources/cmsv6-troubleshooting-device-offline",
];

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
  assert.match(html, /og-seo\.png/);
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

test("publishes the complete updated legal documents", async () => {
  const termsResponse = await render("/terms");
  assert.equal(termsResponse.status, 200);
  const terms = await termsResponse.text();
  assert.match(terms, /Last updated: 2 August 2026/);
  assert.match(terms, /Consumer Cancellation Rights/);
  assert.match(terms, /£60 per Device/);
  assert.match(terms, /49\. Contact Details/);
  assert.match(terms, /registered with the Information Commissioner’s Office/);
  assert.doesNotMatch(terms, /Review required before publication|structured placeholder/);

  const privacyResponse = await render("/privacy");
  assert.equal(privacyResponse.status, 200);
  const privacy = await privacyResponse.text();
  assert.match(privacy, /Last updated: 2 August 2026/);
  assert.match(privacy, /Our Data-Protection Roles/);
  assert.match(privacy, /We Do Not Sell Personal Information/);
  assert.match(privacy, /Requests About Customer Footage/);
  assert.match(privacy, /30\. Contact Us/);
  assert.match(privacy, /support@cmsv6\.co\.uk/);
  assert.doesNotMatch(privacy, /Review required before publication|structured placeholder/);
});

test("publishes complete crawlable SEO architecture with unique metadata", async () => {
  const titles=new Set();
  const descriptions=new Set();
  for(const route of seoRoutes){
    const response=await render(route);
    assert.equal(response.status,200,`${route} should return 200`);
    const html=await response.text();
    const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
    const description=html.match(/<meta name="description" content="(.*?)"/s)?.[1];
    assert.ok(title,`${route} needs a title`);
    assert.ok(description,`${route} needs a description`);
    assert.equal((html.match(/<h1[ >]/g)??[]).length,1,`${route} needs one H1`);
    assert.match(html,new RegExp(`<link rel="canonical" href="https://cmsv6\\.co\\.uk${route==="/"?"/":route.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}"`),`${route} needs a self canonical`);
    assert.doesNotMatch(html,/structured placeholder|Review required before publication|Approved download links will be added/i);
    assert.ok(!titles.has(title),`duplicate title: ${title}`);
    assert.ok(!descriptions.has(description),`duplicate description: ${description}`);
    titles.add(title); descriptions.add(description);
  }
});

test("publishes robots, sitemap, schema and a genuine branded 404", async () => {
  const robots=await render("/robots.txt");
  assert.equal(robots.status,200);
  const robotsText=await robots.text();
  assert.match(robotsText,/Disallow: \/api\//);
  assert.match(robotsText,/Sitemap: https:\/\/cmsv6\.co\.uk\/sitemap\.xml/);

  const sitemap=await render("/sitemap.xml");
  assert.equal(sitemap.status,200);
  const sitemapText=await sitemap.text();
  assert.ok((sitemapText.match(/<loc>/g)??[]).length>=seoRoutes.length);
  assert.match(sitemapText,/solutions\/farm-cctv/);
  assert.match(sitemapText,/resources\/what-is-cmsv6/);
  assert.doesNotMatch(sitemapText,/localhost|frankywright\.chatgpt\.site/);

  const farm=await render("/solutions/farm-cctv");
  const farmHtml=await farm.text();
  assert.match(farmHtml,/"@type":"Service"/);
  assert.match(farmHtml,/"@type":"FAQPage"/);
  assert.match(farmHtml,/"@type":"BreadcrumbList"/);

  const missing=await render("/not-a-real-cmsv6-page");
  assert.equal(missing.status,404);
  const missingHtml=await missing.text();
  assert.match(missingHtml,/We could not find that CMSV6 page/);
  assert.match(missingHtml,/noindex/);
});

test("renders the manual compatibility checker and privacy-aware event hooks", async () => {
  const response=await render("/cmsv6-device-compatibility");
  assert.equal(response.status,200);
  const html=await response.text();
  assert.match(html,/Manufacturer/);
  assert.match(html,/Exact model/);
  assert.match(html,/Device ID format/);
  assert.match(html,/Remote playback or download/);
  assert.match(html,/No automated result is shown/);
  const pricing=await render("/pricing");
  assert.match(await pricing.text(),/six_month_plan_selected/);
});

test("has no broken or orphaned internal content links", async () => {
  const inbound=new Map(seoRoutes.map(route=>[route,0]));
  const linkedPaths=new Set();
  for(const source of seoRoutes){
    const html=await (await render(source)).text();
    for(const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)){
      const href=match[1];
      if(!href.startsWith("/")||href.startsWith("//")) continue;
      assert.notEqual(href,"#",`${source} contains an empty fragment link`);
      const path=new URL(href,"https://cmsv6.co.uk").pathname.replace(/\/$/,"")||"/";
      linkedPaths.add(path);
      if(path!==source&&inbound.has(path)) inbound.set(path,inbound.get(path)+1);
    }
  }
  for(const path of linkedPaths){
    const response=await render(path);
    assert.equal(response.status,200,`internal link target ${path} should return 200`);
  }
  for(const route of seoRoutes.filter(route=>route!=="/")) assert.ok(inbound.get(route)>0,`${route} should have an internal inbound link`);
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
