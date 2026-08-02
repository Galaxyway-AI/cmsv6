/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import Image from "next/image";
import { CTA, Disclaimer, PricingCards, SectionHeading } from "./components";
import { EnquiryForm } from "./interactive";
import { features, industries, steps } from "./site-data";

export const metadata: Metadata = {
  title: "CMSV6 UK | Live CCTV Video, GPS Tracking & Remote DVR Monitoring",
  description: "UK-hosted CMSV6 live CCTV, audio and GPS monitoring for vehicles, homes, businesses, farms, boats and fleets. Flexible per-device hosting.",
  alternates: { canonical: "https://cmsv6.co.uk/" },
};

export default function Home() {
  return <main>
    <section className="hero"><div className="hero-grid-bg"/><div className="container hero-layout"><div className="hero-copy"><span className="eyebrow light-blue">Live CCTV, audio & GPS monitoring</span><h1>Live CCTV capture. Remote access. <em>Complete visibility.</em></h1><p className="hero-lead">View compatible cameras live across homes, businesses and vehicles, with remote playback, audio and GPS available where supported.</p><div className="hero-actions"><a className="button primary large" href="/contact?enquiry=free-trial">Start your two months free</a><a className="button outline-light large" href="/how-it-works">See how CMSV6 works</a></div><div className="hero-trust"><span><b>LIVE</b> multi-camera viewing</span><span><b>REC</b> local DVR recording</span><span><b>GPS</b> where fitted</span></div></div><DashboardVisual/></div>
      <div className="container hero-foot"><span>One platform for</span><b>Moving vehicles</b><b>Fixed premises</b><b>Temporary locations</b><b>Remote sites</b></div>
    </section>

    <section className="section free-strip" id="free-offer"><div className="container free-layout"><div className="free-number"><span>2</span><small>months<br/>free</small></div><div><span className="eyebrow red">Included with compatible equipment</span><h2>Buy a compatible iCustodian® DVR and start with two months of CMSV6 hosting free.</h2><p>Configure your system, test live viewing and GPS, and learn the remote tools before choosing a paid hosting term.</p></div><div className="stack-actions"><a className="button primary" href="https://www.icustodian.com/product-category/dvr/?utm_source=cmsv6.co.uk&utm_medium=referral&utm_campaign=two_months_free" rel="noreferrer">View compatible DVRs</a><a className="text-link" href="/contact?enquiry=compatibility">Check my device →</a></div></div></section>

    <section className="section"><div className="container"><SectionHeading eyebrow="The platform" title="See it live. Know where it is. Review what happened." text="CMSV6 brings the most useful remote-monitoring tools together in a clear system, with availability shaped by your connected equipment and configuration."/><div className="feature-grid">{features.map(item => <article className="feature-card" key={item.title}><span className="feature-icon">{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p><a href="/features">Explore feature →</a></article>)}</div><Disclaimer/></div></section>

    <section className="section pale"><div className="container"><SectionHeading eyebrow="One platform. Limitless applications." title="Designed for the road — and everywhere beyond it." text="The same remote technology can protect visibility across moving assets and fixed locations. CMSV6 is not simply a vehicle tracker."/><div className="industry-grid">{industries.map((industry, index) => <article className="industry-card" key={industry.title} style={{backgroundImage:`linear-gradient(180deg, transparent 20%, rgba(4,15,31,.92) 100%), url(${industry.image})`}}><span>0{index+1} · {industry.label}</span><div><h3>{industry.title}</h3><p>{industry.text}</p><a href="/solutions">Explore solutions →</a></div></article>)}</div></div></section>

    <section className="section how-section"><div className="container split-heading"><SectionHeading eyebrow="How CMSV6 works" title="From camera to screen in six clear steps." text="Choose compatible equipment, connect it securely and access the functions configured for your system."/><a className="button dark" href="/how-it-works">View the full process</a></div><div className="container steps-line">{steps.map(([num,title,text]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="container data-path" aria-label="CMSV6 data path"><span>Camera</span><b>→</b><span>DVR</span><b>→</b><span>Internet</span><b>→</b><span className="active">UK CMSV6</span><b>→</b><span>Your devices</span></div></section>

    <section className="section pricing-home"><div className="container"><SectionHeading eyebrow="Straightforward hosting" title="Flexible per-device CMSV6 plans." text="Choose the hosting term that fits today. For longer periods, fleets and multi-site systems, ask us for a tailored quotation."/><PricingCards/><p className="pricing-note">All published prices are per compatible device. Hardware, installation, mobile data, local storage and optional services are separate unless expressly stated.</p></div></section>

    <section className="section advanced"><div className="container advanced-layout"><div><span className="eyebrow light-blue">With compatible equipment</span><h2>Advanced safety features</h2><p>Selected iCustodian systems can extend CMSV6 with driver and operational safety signals.</p><ul className="tick-list"><li>ADAS driver-assistance alerts</li><li>Driver-status and fatigue monitoring</li><li>Forward-collision or lane-departure warnings</li><li>Blind-spot, object or passenger detection</li><li>Temperature and other sensor inputs</li></ul><p className="small light-text">These are not standard CMSV6 features. Compatible DVRs, cameras, sensors, licences and configuration are required.</p></div><div className="radar-card"><div className="radar"><i/><i/><i/><span>AI</span></div><div className="signal-list"><span><b>ADAS</b> Assistance events</span><span><b>DMS</b> Driver status</span><span><b>SENS</b> Connected inputs</span></div></div></div></section>

    <section className="section contact-preview"><div className="container contact-grid"><div><SectionHeading eyebrow="Start the conversation" title="Tell us what you need to monitor." text="One DVR or one hundred, mobile or fixed — start with a few practical details and our UK team can guide the next step."/><div className="direct-contact"><a href="tel:+447543025555"><small>Call the team</small><b>+44 (0) 7543 02 5555</b></a><a href="mailto:support@cmsv6.co.uk"><small>Email</small><b>support@cmsv6.co.uk</b></a></div></div><EnquiryForm compact/></div></section>
    <CTA title="Monitor what matters — on the road, on site or across multiple locations." />
  </main>;
}

function DashboardVisual() {
  return <div className="dashboard-wrap cctv-console" aria-label="Animated illustrative CCTV live monitoring for a home, business and vehicle">
    <span className="illustrative">Illustrative live monitoring view</span>
    <div className="dash-top"><span className="dash-brand branded-dash"><Image src="/cmsv6-logo.png" alt="CMSV6" width={600} height={600} unoptimized/><i>LIVE</i></span><span><b className="online-dot"/> Live capture active</span></div>
    <div className="cctv-wall">
      <div className="live-feed feed-business feed-primary"><div className="camera-chrome"><span>BUSINESS · WAREHOUSE 01</span><b><i/> LIVE</b></div><div className="scan-line"/><div className="capture-caption"><small>REMOTE VIEW</small><strong>Business premises</strong><span>Multi-camera coverage</span></div></div>
      <div className="live-feed feed-home"><div className="camera-chrome"><span>HOME · EXTERIOR 02</span><b><i/> LIVE</b></div><div className="scan-line"/><div className="capture-caption"><strong>Home</strong><span>Remote property view</span></div></div>
      <div className="live-feed feed-vehicle"><div className="camera-chrome"><span>VEHICLE · ROAD 03</span><b><i/> LIVE</b></div><div className="scan-line"/><div className="capture-caption"><strong>Vehicle</strong><span>Live video + GPS</span></div></div>
      <div className="capture-event"><span className="event-wave"><i/><i/><i/></span><div><small>CONNECTED MONITORING</small><b>Three environments. One live view.</b></div><span className="event-time">NOW</span></div>
    </div>
    <div className="dash-stats cctv-stats"><span><small>LIVE VIDEO</small><b>3 views active</b></span><span><small>RECORDING</small><b>Local DVR</b></span><span><small>REMOTE ACCESS</small><b>Connected</b></span><span><small>GPS</small><b>Where fitted</b></span></div>
  </div>;
}
