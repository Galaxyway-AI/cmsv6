# CMSV6 Post-Deployment SEO Checklist

## Deployment and canonical host

- [ ] `https://cmsv6.co.uk/` returns 200.
- [ ] `http://cmsv6.co.uk/*` returns one 308 to the matching HTTPS apex path.
- [ ] `http://www.cmsv6.co.uk/*` returns one 308 to the matching HTTPS apex path.
- [ ] `https://www.cmsv6.co.uk/*` returns one 308 to the matching HTTPS apex path.
- [ ] No redirect chains or loops.
- [ ] Non-canonical preview hostname returns `X-Robots-Tag: noindex, nofollow`.

## Crawl and metadata

- [ ] Robots returns 200 and references the canonical sitemap.
- [ ] XML sitemap returns 200 and contains only canonical indexable URLs.
- [ ] Every sitemap URL returns 200.
- [ ] Titles and descriptions are unique.
- [ ] Each page has one H1 and one self-canonical.
- [ ] No `frankywright.chatgpt.site`, localhost or tracking parameter appears in canonical metadata.
- [ ] Unknown URL returns genuine branded 404 with noindex.
- [ ] No legal placeholder or unfinished public wording remains.

## Structured data

- [ ] Validate homepage Organisation, WebSite and Service JSON-LD.
- [ ] Validate representative Service, Article, FAQPage, BreadcrumbList and ItemList pages.
- [ ] Confirm every FAQ answer is visible and every price matches visible pricing.
- [ ] Confirm no Product price, reviews or social profiles are invented.

## Function and accessibility

- [ ] Desktop and mobile navigation reach all hubs.
- [ ] Compatibility and contact forms reject invalid submissions and deliver valid approved test submissions.
- [ ] Pricing, fleet quote, login help, telephone, email and iCustodian links work.
- [ ] Cookie choice persists and analytics hooks stay inactive before consent.
- [ ] Keyboard focus is visible; mobile menu and accordions are keyboard accessible.
- [ ] Reduced-motion preference suppresses decorative animation.

## Search platforms

- [ ] Verify Google Search Console domain property.
- [ ] Submit sitemap and request priority indexing.
- [ ] Verify/import Bing Webmaster Tools and submit sitemap.
- [ ] Confirm IndexNow key file and submit only materially changed URLs once.

## Performance

- [ ] Record live HTTP timing for representative routes.
- [ ] Run mobile Lighthouse/PageSpeed after cache warm-up.
- [ ] Run Chrome DevTools performance trace when profiler is configured.
- [ ] Review Search Console field Core Web Vitals when sufficient data exists.

