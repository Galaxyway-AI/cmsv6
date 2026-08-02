# CMSV6 Performance Report

Audit date: 2 August 2026

## Scope and tooling

The production site uses Next.js App Router with vinext/Vite and Cloudflare Workers. Primary marketing content is server-rendered into initial HTML. The implementation was assessed through production builds, rendered-worker tests, live HTTP checks, asset inspection and responsive browser inspection.

The dedicated Chrome DevTools MCP profiler was not configured in this workspace, so a full lab trace for LCP, INP, CLS, FCP, TBT and Speed Index could not be produced. This is recorded as a technical-verification action rather than replaced with invented measurements.

## Core Web Vitals targets

| Metric | Good target | Measured in this run | Status |
|---|---:|---:|---|
| LCP | ≤2.5 s | DevTools trace unavailable | Requires profiler |
| INP | ≤200 ms | Field interaction data unavailable | Requires RUM/Search Console |
| CLS | ≤0.1 | No visible layout instability found in responsive checks | Browser observation only |
| TTFB | <800 ms target | Live HTTP timing recorded post-deployment in checklist | See post-deployment results |

## Positive implementation findings

- Critical headings, definitions, links, FAQs and structured data are present in initial server HTML.
- Marketing pages do not depend on client-side rendering for indexable content.
- Client code is limited mainly to menu, estimator, consent and forms.
- CSS is a single generated asset and production builds are minified.
- Below-the-fold product images use lazy loading.
- Hero content is text-first; the CCTV console is CSS/HTML rather than a large dashboard screenshot.
- Images include alt text, and supplied product images reserve a fixed visual area.
- Optional analytics is not loaded before consent and no third-party analytics bundle is shipped.
- Reduced-motion rules suppress animations and transitions for visitors who request it.

## Remaining opportunities

1. Convert the two logo PNG files (about 762 KB combined source weight) to optimised WebP/AVIF while retaining a suitable fallback and verifying transparency/brand fidelity.
2. Compress or regenerate the 1.84 MB source social card; it is not a normal page-render asset but affects crawler/share fetch cost.
3. Replace remote Unsplash query URLs with appropriately licensed, locally optimised responsive images to reduce third-party variability.
4. Run Chrome DevTools trace and Lighthouse mobile tests once the required profiler is configured; prioritise only findings with measurable impact.
5. Enable approved real-user monitoring only after consent to obtain field LCP/INP/CLS by template.

## Representative route coverage

- Homepage: rendered and metadata tested.
- Feature hub: rendered and internal guide links tested.
- Solution hub and farm solution: rendered, schema and crawl tested.
- Long article: `what-is-cmsv6` and legal pages rendered successfully.
- Equipment, pricing, contact and compatibility pages: rendered and functional contracts tested.

## Responsive browser observations

The locally built production application was inspected at desktop width and at a 390 x 844 mobile viewport:

- Homepage: one H1, correct canonical and social metadata, no horizontal overflow, desktop navigation hidden on mobile and the mobile menu working with nine links.
- Farm CCTV solution: one H1, no horizontal overflow, visible definition and four visible FAQs; the page emitted five structured-data objects.
- Compatibility checker: all controls remained within the viewport, with 16 labelled fields and eight required inputs; the result clearly requested manual review instead of making an unsupported compatibility claim.
- Browser console: no errors or warnings were observed on the representative routes.
