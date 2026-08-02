# Bing Webmaster Tools and IndexNow Setup

## Bing Webmaster Tools

1. Sign in with the organisation’s Bing Webmaster Tools account.
2. Import the verified Google Search Console property where available, or add `https://cmsv6.co.uk` directly.
3. Verify through DNS or set `BING_SITE_VERIFICATION` in the production environment and redeploy.
4. Submit `https://cmsv6.co.uk/sitemap.xml`.
5. Inspect the homepage, pricing, equipment, compatibility, fleet, farm and primary guide URLs.
6. Review crawl information, indexed pages, keywords and site-scan findings monthly.

## IndexNow implementation

- Verification key file: `https://cmsv6.co.uk/0e167d47b5200125e1c2ac8734b07c09.txt`
- Submission utility: `npm run indexnow -- /changed-path /another-changed-path`
- The utility accepts only canonical HTTPS URLs on `cmsv6.co.uk`.
- It submits only the URLs explicitly supplied; it does not crawl or repeatedly spam unchanged URLs.
- Logs include response status and URL count, never customer data or secrets.

Use IndexNow only when a URL is added, materially changed or removed. The public verification key is not an account password; its published key file is part of the protocol.

