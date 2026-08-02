import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "./components";
import { CookieNotice } from "./interactive";

export const metadata: Metadata = {
  metadataBase: new URL("https://cmsv6.co.uk"),
  title: { default: "CMSV6 UK | Remote CCTV, Live Video & GPS", template: "%s" },
  description: "UK-hosted remote CCTV, live-video, audio and GPS monitoring for compatible iCustodian DVRs and cameras.",
  applicationName: "CMSV6 UK",
  icons: { icon: "/cmsv6-logo.png", shortcut: "/cmsv6-logo.png", apple: "/cmsv6-logo.png" },
  openGraph: { type: "website", locale: "en_GB", siteName: "CMSV6 UK", title: "CMSV6 UK | Live CCTV. Real-time GPS.", description: "One remote-monitoring platform for vehicles, properties, farms, boats and multi-site operations.", images: [{ url: "/og.png", width: 1728, height: 909, alt: "CMSV6 UK remote CCTV and GPS monitoring across vehicles, business premises, farms and boats" }] },
  twitter: { card: "summary_large_image", title: "CMSV6 UK | Live CCTV. Real-time GPS.", description: "Remote visibility for compatible vehicles, properties, farms, boats and sites.", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

const organisationSchema = { "@context":"https://schema.org", "@type":"Organization", name:"iCustodian Limited", url:"https://cmsv6.co.uk", logo:"https://cmsv6.co.uk/cmsv6-logo.png", email:"support@cmsv6.co.uk", telephone:"+44 7543 02 5555", address:{"@type":"PostalAddress", addressLocality:"Erith", addressRegion:"Greater London", addressCountry:"GB"} };
const serviceSchema = { "@context":"https://schema.org", "@type":"Service", name:"iCustodian CMSV6 hosting", serviceType:"Remote CCTV, live-video and GPS monitoring platform", provider:{"@type":"Organization",name:"iCustodian Limited"}, areaServed:{"@type":"Country",name:"United Kingdom"}, offers:{"@type":"AggregateOffer",lowPrice:"60",highPrice:"180",priceCurrency:"GBP"} };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body><a className="skip-link" href="#main-content">Skip to content</a><Header/><div id="main-content">{children}</div><Footer/><CookieNotice/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organisationSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceSchema)}}/></body></html>;
}
