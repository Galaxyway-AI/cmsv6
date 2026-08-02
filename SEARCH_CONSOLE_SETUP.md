# Google Search Console Setup

Code support is ready through `GOOGLE_SITE_VERIFICATION`; no verification token is committed.

## Domain-property setup

1. Sign in to the organisation’s Google Search Console account.
2. Add a Domain property for `cmsv6.co.uk` (not a URL-prefix variant).
3. Copy the Google TXT verification value into Cloudflare DNS exactly as supplied.
4. Complete verification in Search Console.
5. If metadata verification is preferred for a URL-prefix property, set `GOOGLE_SITE_VERIFICATION` in the production environment to the token value only and redeploy.

## Initial submission

1. Submit `https://cmsv6.co.uk/sitemap.xml`.
2. Inspect and request indexing for:
   - `https://cmsv6.co.uk/`
   - `/pricing`
   - `/equipment`
   - `/cmsv6-device-compatibility`
   - `/solutions/fleet-cctv-and-video-telematics`
   - `/solutions/farm-cctv`
   - `/resources/what-is-cmsv6`
   - `/resources/choosing-a-cmsv6-compatible-dvr`
3. Do not request hundreds of URLs repeatedly; allow sitemap discovery after the priority set.

## Reports to review

- Page Indexing: canonical selection, crawled-not-indexed and discovered-not-indexed.
- Sitemaps: submitted URL count and fetch status.
- HTTPS: verify all indexed URLs use the apex HTTPS host.
- Core Web Vitals: review mobile and desktop field groups when data exists.
- Enhancements: inspect structured-data issues that apply to visible markup.
- Manual actions and Security issues: confirm both remain clear.
- Performance: group queries by the categories in `SEO_MEASUREMENT_PLAN.md`.

## Safe verification handling

Search Console tokens are ownership-verification values, not customer credentials, but they should still be managed through DNS or production configuration rather than casually duplicated in source.

