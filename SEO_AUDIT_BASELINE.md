# CMSV6 SEO Audit Baseline

Audit date: 2 August 2026  
Canonical property: https://cmsv6.co.uk  
Repository baseline: `af10713`  
Framework: Next.js App Router rendered by vinext on Cloudflare Workers, with a separate Cloudflare Email Service Worker for enquiry delivery.

## Executive baseline

The live website is visually complete, responsive and server-rendered. All 14 public routes returned HTTP 200, exposed one H1, included a self-referencing canonical and were indexable. The legal pages were already complete. The primary problems were technical duplication across host variants, unreliable sitemap modification dates, unfinished public wording, shallow resource architecture, missing priority industry and guide pages, incomplete business entity data, no human HTML sitemap, no branded 404, and no IndexNow or privacy-aware conversion event layer.

Measured live facts before implementation:

- `https://cmsv6.co.uk/robots.txt`: HTTP 200 and references the production sitemap.
- `https://cmsv6.co.uk/sitemap.xml`: HTTP 200 with 14 URLs, but all 14 used the build date as `lastmod`.
- `http://cmsv6.co.uk/`, `http://www.cmsv6.co.uk/` and `https://www.cmsv6.co.uk/`: duplicate HTTP 200 responses rather than permanent redirects.
- Unknown paths: genuine HTTP 404.
- Critical marketing copy, FAQs and legal content were present in initial HTML.
- Enquiry delivery used a same-origin server route, honeypot, origin validation, field limits and a separately rate-limited email worker.
- No fake reviews, ratings, awards, case studies or unsupported approval claims were found.

## Route inventory before implementation

| Current route | Current title | Meta description summary | H1 | Canonical | Indexability | Approx. words | Internal inbound links | Structured data | Main search intent | Problems found | Recommended action | Priority | Status |
|---|---|---|---:|---|---|---:|---|---|---|---|---|---|---|
| `/` | CMSV6 UK \| Live CCTV Video, GPS Tracking & Remote DVR Monitoring | UK-hosted CMSV6 monitoring overview | 1 | `/` | Index/follow | 1,079 | Navigation, logo | Organisation, Service | Brand/commercial | Global schema incomplete; commercial links lacked event hooks | Improve entity/schema and tracked CTAs | High | Baseline recorded |
| `/features` | CMSV6 Features \| Live CCTV, GPS & Remote Playback | Core feature overview | 1 | Self | Index/follow | 446 | Navigation, homepage | Global only | Commercial investigation | Unfinished download-link wording; no feature detail links | Remove unfinished wording; add contextual links | High | Baseline recorded |
| `/solutions` | CMSV6 Solutions \| Vehicles, Sites, Farms & Marine | Multi-sector overview | 1 | Self | Index/follow | 481 | Navigation, homepage | Global only | Commercial investigation | No crawlable industry child pages | Create unique priority solution pages | High | Baseline recorded |
| `/how-it-works` | How CMSV6 Works \| Connect DVRs for Remote Monitoring | Six-step connection overview | 1 | Self | Index/follow | 364 | Navigation, homepage | Global only | Informational | Thin for a core explainer | Strengthen internal links and related guides | Medium | Baseline recorded |
| `/equipment` | CMSV6 Compatible Equipment \| iCustodian DVRs | Compatible iCustodian equipment | 1 | Self | Index/follow | 629 | Navigation, homepage/footer | Global only | Transactional | No ItemList schema; inconsistent UTM campaign naming | Add ItemList and consistent referrals | High | Baseline recorded |
| `/pricing` | CMSV6 Hosting Prices UK \| From £60 Per Device | 6/12/24-month hosting | 1 | Self | Index/follow | 481 | Navigation, homepage/footer | Global only | Transactional | Plan selection not measurable | Add privacy-aware plan events and clear scope | High | Baseline recorded |
| `/support` | CMSV6 Support \| Setup, Activation & Troubleshooting | Setup and troubleshooting | 1 | Self | Index/follow | 515 | Navigation/footer | Global only | Navigational/support | Public text said login/download links would be added later | Replace unfinished wording; link to complete guides | High | Baseline recorded |
| `/about` | About iCustodian CMSV6 \| UK Remote CCTV Specialists | Brand and equipment experience | 1 | Self | Index/follow | 329 | Footer/secondary links | Global only | Entity trust | Business address and company identifier incomplete in schema | Add verified entity details and editorial policy | High | Baseline recorded |
| `/contact` | Contact CMSV6 \| Subscription, Support & Fleet Quotes | Contact and quotation routes | 1 | Self | Index/follow | 283 | CTAs/footer | Global only | Transactional | Missing full registered address, company number and ICO statement | Add verified NAP and compatibility route | High | Baseline recorded |
| `/faq` | CMSV6 Frequently Asked Questions | Compatibility and service questions | 1 | Self | Index/follow | 537 | Footer | FAQ plus global | Informational | Useful but disconnected from full guides | Add descriptive guide links | Medium | Baseline recorded |
| `/resources` | CMSV6 Guides & Resources | Six resource summaries | 1 | Self | Index/follow | 321 | Navigation/footer | Global only | Informational | Every card sent users to contact; no complete articles | Publish original priority guides | High | Baseline recorded |
| `/privacy` | CMSV6 Privacy Policy \| iCustodian | Complete privacy policy | 1 | Self | Index/follow | 3,999 | Footer | Global only | Legal | Footer contradicted completion by calling it a placeholder | Remove placeholder statement | High | Baseline recorded |
| `/terms` | Terms of Use and CMSV6 Service Terms | Complete service terms | 1 | Self | Index/follow | 4,359 | Footer | Global only | Legal | Footer contradicted completion by calling it a placeholder | Remove placeholder statement | High | Baseline recorded |
| `/responsible-use` | Responsible CCTV Use \| CMSV6 | Practical monitoring principles | 1 | Self | Index/follow | 349 | Footer | Global only | Informational/legal | Short and not linked from relevant sector content | Link contextually from solution pages | Medium | Baseline recorded |

## Cross-site findings

| Finding | Evidence | Risk | Action |
|---|---|---|---|
| Host duplication | HTTP and both `www` variants returned 200 | Duplicate discovery and split signals | Enforce HTTPS apex with 308 redirects |
| False sitemap freshness | Every URL used the current build date | Search engines receive unreliable change signals | Use explicit meaningful dates |
| Preview indexing | Production metadata was also emitted on the Sites hostname | Preview could be indexed | Add `X-Robots-Tag: noindex, nofollow` off canonical host |
| Unfinished copy | Footer legal placeholder; download links “will be added”; resource CTAs went only to contact | Trust and quality weakness | Remove/replace all unfinished wording |
| Thin architecture | No industry child pages or full articles | Weak topical coverage and hub/spoke linking | Publish priority unique pages only |
| Entity incompleteness | Organisation schema omitted full street, postcode and company identifier | Reduced entity clarity | Add verified legal/business details |
| Conversion visibility | No analytics event contract | Cannot measure qualified journeys | Add consent-aware first-party event hooks |
| Performance asset weight | Two logo PNGs total about 762 KB; social card about 1.84 MB | Transfer and decode cost where loaded | Avoid unnecessary loads; document future image conversion |
| Deep performance trace unavailable | Chrome DevTools MCP is not configured in this workspace | No lab trace for LCP/CLS/INP in this run | Use live HTTP/browser/bundle checks; rerun trace when configured |

## Content and compliance safeguards retained

- CMSV6 is described as customer remote access, not a staffed monitoring centre.
- Compatibility remains dependent on hardware, firmware, connectivity, configuration and permissions.
- Standard hosting does not claim to include permanent cloud-video storage.
- No guarantee of crime prevention, theft recovery, continuous availability or GPS accuracy is made.
- The two-month offer and £60/£100/£180 per-device terms remain qualified accurately.
- ICO registration is stated without implying approval or endorsement.

