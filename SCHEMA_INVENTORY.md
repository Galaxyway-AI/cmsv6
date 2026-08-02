# CMSV6 Structured-Data Inventory

All structured data is JSON-LD and must continue to match visible content.

| Page type | Schema | Key visible evidence | Status | Validation action |
|---|---|---|---|---|
| All public pages | `Organization` | Legal name, trading name, company number, full registered address, telephone and email | Implemented globally | Validate after deployment |
| All public pages | `WebSite` | CMSV6 UK name and canonical URL | Implemented globally | Validate after deployment |
| Homepage | `Service` with three visible Offers | CMSV6 service and £60/£100/£180 plans | Implemented | Rich Results/Schema.org review |
| Top-level public pages | `BreadcrumbList` | Visible Home/page breadcrumbs | Implemented | Validate representative pages |
| Solution pages | `Service` | Visible sector-specific service explanation and limitations | Implemented | Validate every solution template |
| Resource guides | `Article` | Headline, description, dates, iCustodian Technical Team review and correction route | Implemented | Validate every resource template |
| Solution/resource pages | `FAQPage` | Every marked question and answer is visible in an accessible details element | Implemented | Check duplicate/excessive use periodically |
| Equipment page | `ItemList` | Three visible compatible product cards and outbound seller links | Implemented | Schema.org validator |
| FAQ page | `FAQPage` | Twelve visible iCustodian-authored questions and answers | Existing/retained | Validate after deployment |

## Deliberately omitted

- `LocalBusiness`: the registered office is not asserted to be a public customer-facing location.
- `Product`/`Offer` on CMSV6 equipment cards: live price and availability are not maintained visibly on CMSV6.co.uk.
- `Review` and `AggregateRating`: no eligible genuine review data is published.
- `VideoObject`: no genuine public CMSV6 video is currently embedded.
- `sameAs`: no controlled social-profile URLs were supplied and none were invented.

