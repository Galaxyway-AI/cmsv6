# CMSV6 Analytics Event Map

The code dispatches first-party browser events only after the visitor chooses `Accept analytics`. No third-party destination is connected automatically. A future approved provider may consume the data layer without changing the event contract.

| Event | Trigger | Parameters | Consent category | Conversion | Destination | Test result |
|---|---|---|---|---|---|---|
| `cmsv6_enquiry_started` | First focus in general enquiry form | None | Analytics | Micro | First-party event/data layer | Implemented |
| `cmsv6_enquiry_submitted` | Successful general enquiry delivery | Non-sensitive enquiry type | Analytics | Yes | First-party event/data layer | Implemented |
| `compatibility_check_started` | First focus in compatibility form | None | Analytics | Micro | First-party event/data layer | Implemented |
| `compatibility_check_submitted` | Successful manual-check request | Connectivity category only | Analytics | Yes | First-party event/data layer | Implemented |
| `pricing_plan_selected` | Any hosting-plan CTA click | Plan term only | Analytics | Micro | First-party event/data layer | Implemented |
| `six_month_plan_selected` | Six-month CTA click | Destination host | Analytics | Micro | First-party event/data layer | Implemented |
| `twelve_month_plan_selected` | Twelve-month CTA click | Destination host | Analytics | Micro | First-party event/data layer | Implemented |
| `twenty_four_month_plan_selected` | Twenty-four-month CTA click | Destination host | Analytics | Micro | First-party event/data layer | Implemented |
| `fleet_quote_requested` | Fleet quotation CTA click | Destination host | Analytics | Yes | First-party event/data layer | Implemented |
| `cmsv6_login_clicked` | Approved-login/help CTA click | Destination host | Analytics | No | First-party event/data layer | Implemented |
| `cmsv6_activation_requested` | Activation CTA click | Destination host | Analytics | Yes | First-party event/data layer | Implemented |
| `cmsv6_renewal_requested` | Renewal CTA click | Destination host | Analytics | Yes | First-party event/data layer | Implemented |
| `icustodian_product_clicked` | Product referral click | Destination host | Analytics | Yes | First-party event plus UTM | Implemented |
| `icustodian_category_clicked` | DVR/category referral click | Destination host | Analytics | Yes | First-party event plus UTM | Implemented |
| `telephone_clicked` | Telephone link click | Destination host only | Analytics | Micro | First-party event/data layer | Implemented |
| `email_clicked` | Support-email link click | Destination host only | Analytics | Micro | First-party event/data layer | Implemented |
| `resource_downloaded` | Future approved checklist/PDF download | Resource slug only | Analytics | No | Future provider | No download published yet |
| `support_request_submitted` | Successful Technical support form delivery | Enquiry type only | Analytics | Yes | First-party event/data layer | Implemented |

Prohibited parameters: form contents, names, email addresses, telephone numbers, footage, coordinates, credentials, device IDs and sensitive support text.
