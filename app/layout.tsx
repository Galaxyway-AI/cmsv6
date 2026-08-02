import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "./components";
import { AnalyticsTracker, CookieNotice } from "./interactive";

const googleVerification=process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification=process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://cmsv6.co.uk"),
  title: { default: "CMSV6 UK | Live CCTV, GPS & Remote DVR Access", template: "%s" },
  description: "UK-hosted CMSV6 live CCTV, remote DVR playback and GPS monitoring for compatible vehicles, businesses, farms, boats and multi-site operations.",
  applicationName: "CMSV6 UK",
  icons: { icon: "/cmsv6-logo.png", shortcut: "/cmsv6-logo.png", apple: "/cmsv6-logo.png" },
  openGraph: { type: "website", locale: "en_GB", siteName: "CMSV6 UK", title: "CMSV6 UK | Live CCTV. Real-time GPS.", description: "One remote-monitoring platform for vehicles, properties, farms, boats and multi-site operations.", images: [{ url: "/og-seo.png", width: 1728, height: 909, alt: "CMSV6 UK remote CCTV, DVR playback and GPS monitoring across vehicles, business premises, farms and boats" }] },
  twitter: { card: "summary_large_image", title: "CMSV6 UK | Live CCTV. Real-time GPS.", description: "Remote visibility for compatible vehicles, properties, farms, boats and sites.", images: ["/og-seo.png"] },
  robots: { index: true, follow: true },
  ...(googleVerification?{verification:{google:googleVerification}}:{}),
  ...(bingVerification?{other:{"msvalidate.01":bingVerification}}:{}),
};

const organisationSchema = { "@context":"https://schema.org", "@type":"Organization", "@id":"https://cmsv6.co.uk/#organisation", name:"iCustodian Limited", alternateName:"iCustodian®", url:"https://cmsv6.co.uk", logo:{"@type":"ImageObject",url:"https://cmsv6.co.uk/cmsv6-logo.png",width:600,height:600}, email:"support@cmsv6.co.uk", telephone:"+44 7543 02 5555", identifier:{"@type":"PropertyValue",propertyID:"Companies House",value:"15930836"}, address:{"@type":"PostalAddress",streetAddress:"18 Holly Hill Road",addressLocality:"Erith",postalCode:"DA8 1QD",addressCountry:"GB"},contactPoint:{"@type":"ContactPoint",contactType:"customer support",telephone:"+44 7543 02 5555",email:"support@cmsv6.co.uk",availableLanguage:"English",areaServed:"GB"} };
const websiteSchema={"@context":"https://schema.org","@type":"WebSite","@id":"https://cmsv6.co.uk/#website",url:"https://cmsv6.co.uk",name:"CMSV6 UK",publisher:{"@id":"https://cmsv6.co.uk/#organisation"},inLanguage:"en-GB"};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body><a className="skip-link" href="#main-content">Skip to content</a><Header/><div id="main-content">{children}</div><Footer/><AnalyticsTracker/><CookieNotice/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organisationSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/></body></html>;
}
