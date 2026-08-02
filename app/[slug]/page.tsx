/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { CTA, Disclaimer, PricingCards, SectionHeading } from "../components";
import { CompatibilityChecker, EnquiryForm, PriceEstimator } from "../interactive";
import { legalDocuments } from "../legal-content";
import { resourcePages, solutionPages } from "../seo-content";
import { faqs, features, industries, pageMeta, steps } from "../site-data";

export function generateStaticParams() { return Object.keys(pageMeta).map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const { slug } = await params; const meta = pageMeta[slug]; if (!meta) return {};
  return { ...meta, alternates:{ canonical:`https://cmsv6.co.uk/${slug}` }, openGraph:{type:"website",locale:"en_GB",siteName:"CMSV6 UK",title:meta.title,description:meta.description,url:`https://cmsv6.co.uk/${slug}`,images:[{url:"/og-seo.png",width:1728,height:909,alt:"CMSV6 live CCTV, remote DVR playback and GPS monitoring"}]},twitter:{card:"summary_large_image",title:meta.title,description:meta.description,images:["/og-seo.png"]} };
}

const heroCopy: Record<string,[string,string,string]> = {
  features:["Platform features","Remote monitoring that helps you see, locate and respond.","Explore the CMSV6 capabilities available through compatible equipment and the right configuration."],
  solutions:["Solutions for almost any environment","Moving, fixed, temporary or remote — keep the right view.","From one private vehicle to national fleets and multiple commercial sites, CMSV6 adapts to the equipment and setting."],
  "how-it-works":["Simple, connected monitoring","From compatible camera to your screen.","Understand how local recording, internet connectivity and UK-hosted CMSV6 access work together."],
  equipment:["Compatible iCustodian® equipment","Choose the right DVR for the job.","Connect CMSV6 with approved mobile DVRs, dash cameras, CCTV systems, cameras and accessories."],
  pricing:["CMSV6 server hosting","Clear prices. Flexible terms. Per compatible device.","Start with two months free when you purchase a compatible iCustodian DVR, then choose a plan that fits."],
  support:["CMSV6 customer support","Practical help from setup to playback.","Find clear first steps for activation, connectivity, account access and troubleshooting."],
  about:["About iCustodian CMSV6","Specialist CCTV products with a connected service.","CMSV6 is part of the wider iCustodian ecosystem for vehicle cameras, CCTV, DVRs and remote monitoring."],
  contact:["Contact & quotations","Tell us what you need to see.","Ask about subscriptions, activation, compatibility, renewals, support or a tailored multi-device system."],
  faq:["Frequently asked questions","Straight answers before you connect.","Understand compatibility, connectivity, storage, pricing and responsible use without the jargon."],
  resources:["CMSV6 resources","Practical guides for better remote visibility.","Learn how CMSV6, compatible DVRs, connectivity and responsible monitoring fit together."],
  privacy:["Legal information","CMSV6 Privacy Policy","How iCustodian Limited collects, uses, shares and protects personal information in connection with CMSV6."],
  terms:["Legal information","Terms of Use and CMSV6 Service Terms","The terms governing the CMSV6 website, accounts, subscriptions, monitoring functions and related services."],
  "cmsv6-device-compatibility":["Compatibility checker","Check your DVR before activation.","Send the exact recorder, firmware, camera and connection details for a manual CMSV6 compatibility review."],
  "international-cmsv6-hosting":["International availability","UK-hosted CMSV6 for compatible systems abroad.","Understand connectivity, time-zone, support and local-law considerations before requesting international service."],
  "editorial-policy":["Editorial standards","How CMSV6 information is checked and updated.","Our approach to technical accuracy, commercial disclosure, corrections and responsible publication."],
  sitemap:["Website directory","Find CMSV6 services, solutions and guides.","A human-readable route to every important public CMSV6 page and compatible equipment resource."],
  "responsible-use":["Responsible monitoring","Use CCTV, audio and GPS fairly.","Practical principles for lawful, transparent, necessary, proportionate and secure monitoring."],
};

export default async function StandardPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const hero=heroCopy[slug]; if(!hero) notFound();
  const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://cmsv6.co.uk"},{"@type":"ListItem",position:2,name:hero[0],item:`https://cmsv6.co.uk/${slug}`}]};
  return <main><PageHero eyebrow={hero[0]} title={hero[1]} text={hero[2]}>{slug === "pricing" && <a className="button primary" href="#plans">See hosting plans</a>}{slug === "contact" && <a className="button primary" href="#enquiry">Start an enquiry</a>}</PageHero>{renderPage(slug)}{!["contact","privacy","terms","responsible-use","sitemap","cmsv6-device-compatibility"].includes(slug) && <CTA/>}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/></main>;
}

function PageHero({eyebrow,title,text,children}:{eyebrow:string;title:string;text:string;children?:React.ReactNode}) { return <section className="page-hero"><div className="page-grid-bg"/><div className="container"><div className="breadcrumbs"><a href="/">Home</a><span>/</span><b>{eyebrow}</b></div><span className="eyebrow light-blue">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{children && <div className="hero-actions">{children}</div>}</div></section>; }

function renderPage(slug:string) {
  switch(slug) {
    case "features": return <><section className="section"><div className="container"><SectionHeading eyebrow="Core capabilities" title="Live, locate, review and manage." text="Each feature is available where supported by the connected equipment and configuration."/><div className="feature-grid detailed">{features.map((f,i)=><article className="feature-card" key={f.title}><span className="feature-icon">{f.icon}</span><small>0{i+1}</small><h3>{f.title}</h3><p>{f.text}</p></article>)}</div><Disclaimer/></div></section><section className="section pale"><div className="container two-column"><div><h2>Local recording. Remote connectivity.</h2><p>A compatible DVR records footage to its installed local storage. CMSV6 provides remote access while the DVR has a suitable connection. If mobile data or Wi-Fi drops, local recording does not necessarily stop; live viewing and remote requests resume when connectivity returns, depending on the setup.</p><p>For a detailed comparison, read <a className="text-link" href="/resources/live-cctv-versus-recorded-playback">live CCTV viewing versus recorded playback</a>.</p></div><div className="info-card"><h3>Flexible access</h3><ul className="tick-list dark-ticks"><li>Supported web browser</li><li>Windows desktop client</li><li>Mobile application</li><li>Phone, tablet, laptop or desktop</li></ul><p className="small">Use only the login address and application version supplied for your confirmed device and CMSV6 account.</p></div></div></section></>;
    case "solutions": return <><section className="section"><div className="container"><SectionHeading eyebrow="Across every environment" title="One monitoring platform, many practical uses." text="Choose the view, connectivity and compatible equipment around the environment — not the other way around."/><div className="solution-list">{industries.map((item,i)=><article key={item.title}><div className="solution-image" style={{backgroundImage:`url(${item.image})`}}/><div><span className="eyebrow">0{i+1} · {item.label}</span><h2>{item.title}</h2><p>{item.text}</p><ul>{solutionBullets[i].map(x=><li key={x}>{x}</li>)}</ul><a className="text-link" href={`/solutions/${solutionPages[[0,4,5,6][i]].slug}`}>Read the detailed {item.title.toLowerCase()} guide →</a></div></article>)}</div><div className="page-card-grid solution-page-grid">{solutionPages.map(page=><article key={page.slug}><span>{page.eyebrow}</span><h2>{page.h1}</h2><p>{page.description}</p><a href={`/solutions/${page.slug}`}>Explore {page.eyebrow.toLowerCase()} →</a></article>)}</div></div></section><ResponsibleSector/></>;
    case "how-it-works": return <><section className="section"><div className="container"><SectionHeading eyebrow="Six steps" title="A clear path from equipment to remote visibility." text="Your exact data path and features depend on the installed system."/><div className="vertical-steps">{steps.map(([n,t,d])=><article key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div></article>)}</div><div className="data-path large-path"><span>Camera</span><b>→</b><span>DVR</span><b>→</b><span>Internet connection</span><b>→</b><span className="active">UK-hosted CMSV6</span><b>→</b><span>Phone, tablet or computer</span></div><Disclaimer/></div></section></>;
    case "equipment": return <EquipmentPage/>;
    case "pricing": return <PricingPage/>;
    case "support": return <SupportPage/>;
    case "about": return <AboutPage/>;
    case "contact": return <ContactPage/>;
    case "faq": return <FaqPage/>;
    case "resources": return <ResourcesPage/>;
    case "privacy": return <LegalPage type="privacy"/>;
    case "terms": return <LegalPage type="terms"/>;
    case "cmsv6-device-compatibility": return <CompatibilityPage/>;
    case "international-cmsv6-hosting": return <InternationalPage/>;
    case "editorial-policy": return <EditorialPolicy/>;
    case "sitemap": return <HtmlSitemap/>;
    case "responsible-use": return <ResponsibleUse/>;
    default: return null;
  }
}

const solutionBullets = [
  ["Private cars, taxis and school transport","Delivery, haulage and logistics fleets","Emergency, security and public-service vehicles","Heavy plant, machinery and mobile workshops"],
  ["Homes, garages and outbuildings","Shops, offices and warehouses","Factories, depots and multi-branch businesses","Temporary sites and remote properties"],
  ["Livestock areas, barns and stables","Gates, fields, machinery and stores","Greenhouses, forestry and fisheries","Remote checks that can reduce unnecessary travel"],
  ["Boats, harbours and marine storage","Schools, campuses and authorised transport","Healthcare sites and patient transport","Utilities, events and temporary control locations"],
];

function ResponsibleSector(){ return <section className="section responsible"><div className="container"><SectionHeading eyebrow="Sensitive settings" title="Monitoring must be authorised, proportionate and appropriate." text="Schools, care settings, workplaces and public-service operations need particularly careful governance." light/><div className="responsible-grid"><article><h3>Education & care</h3><p>Use only for authorised safeguarding, transport, access or property-security purposes. Never monitor toilets, changing areas, private treatment spaces or other inappropriate locations.</p></article><article><h3>Workplace & transport</h3><p>Be transparent about driver, employee, passenger, audio and location monitoring. Respect private use and restrict access to people with a legitimate need.</p></article><article><h3>Public-facing systems</h3><p>Use appropriate signage and privacy information. Keep recordings secure, set suitable retention rules and provide a way for people to exercise applicable rights.</p></article></div></div></section> }

function EquipmentPage(){
  const products=[
    {
      name:"iCustodian® iC9800MDVR-AI",
      subtitle:"Hybrid GPS, 4G and Wi-Fi AI Mobile DVR",
      spec:"4/8-channel · 4G · Wi-Fi · GPS · AI",
      image:"/iC9000MDVR-AI.png",
      alt:"Front view of the iCustodian iC9800MDVR-AI mobile DVR",
      summary:"An intelligent mobile CCTV recorder built for live monitoring as well as recording, with support for driver assistance, driver monitoring and blind-spot detection on compatible installations.",
      features:["ADAS and driver monitoring","Blind-spot detection support","Cars, lorries and marine use","Homes and business premises"],
      url:"https://www.icustodian.com/product/icustodian-ic9800mdvr-ai-hybrid-gps-4g-wifi-mobile-dvr/"
    },
    {
      name:"iCustodian® iC9800MDVR-K",
      subtitle:"Hybrid 4G, Wi-Fi and GPS HD Mobile DVR",
      spec:"4/8-channel · 4G · Wi-Fi · GPS · HD",
      image:"/iC9800MDVR-K.png",
      alt:"Front view of the iCustodian iC9800MDVR-K key-lock mobile DVR",
      summary:"A robust hybrid recorder with password protection, video encryption and a key-lockable 2.5-inch SATA hard-drive housing for professional fixed or mobile surveillance.",
      features:["Key-lock storage protection","Password and video encryption","Up to eight camera channels","Vehicles, boats and fixed sites"],
      url:"https://www.icustodian.com/product/ic9800mdvr8-k/"
    },
    {
      name:"iCustodian® iC-N9DASHCAM",
      subtitle:"Compact 4-channel Hybrid MDVR Dash Camera",
      spec:"4-channel · 4G LTE · Wi-Fi · GPS · ADAS · DMS",
      image:"/N9.png",
      alt:"Angled view of the iCustodian iC-N9DASHCAM hybrid mobile DVR",
      summary:"A professional four-channel MDVR in a compact dashcam body, combining dual built-in 1080p cameras with support for two additional 1080p CCTV cameras and remote live streaming.",
      features:["Dual built-in 1080p cameras","Two additional camera inputs","Dual SD storage and encryption","ADAS and driver monitoring"],
      url:"https://www.icustodian.com/product/n9dashcam"
    }
  ];
  const itemListSchema={"@context":"https://schema.org","@type":"ItemList",name:"CMSV6-compatible iCustodian DVR equipment",itemListElement:products.map((product,index)=>({"@type":"ListItem",position:index+1,name:product.name,url:product.url,image:`https://cmsv6.co.uk${product.image}`}))};

  return <>
    <section className="section equipment-catalogue"><div className="container">
      <SectionHeading eyebrow="Featured compatible equipment" title="Professional recorders ready for CMSV6 streaming." text="Compare three versatile iCustodian systems for vehicles, homes, businesses and specialist installations. Follow any product link for the full specification, availability and current purchase information."/>
      <div className="product-grid equipment-grid">{products.map((product)=><article className="equipment-product" key={product.name}>
        <div className="product-visual equipment-product-image"><img src={product.image} alt={product.alt} loading="lazy" decoding="async"/><span>CMSV6 ready</span></div>
        <div className="equipment-product-body"><span className="product-type">CMSV6 compatible</span><h2>{product.name}</h2><h3>{product.subtitle}</h3><b className="equipment-spec">{product.spec}</b>
          <div className="equipment-price price-link"><small>Price &amp; availability</small><strong>See iCustodian</strong></div>
          <p>{product.summary}</p><ul>{product.features.map(feature=><li key={feature}>{feature}</li>)}</ul>
          <a className="button dark" href={`${product.url}?utm_source=cmsv6.co.uk&utm_medium=referral&utm_campaign=cmsv6_equipment&utm_content=${encodeURIComponent(product.name)}`} target="_blank" rel="noreferrer" data-analytics-event="icustodian_product_clicked">View product on iCustodian <span aria-hidden="true">↗</span></a>
        </div>
      </article>)}</div>
      <div className="equipment-shop"><div><span className="eyebrow light-blue">More compatible choices</span><h2>Explore the wider iCustodian DVR range.</h2><p>Find a wide variety of DVRs and mobile recorders that can be configured for the CMSV6 streaming app, from compact vehicle systems to multi-camera installations.</p></div><a className="button light large" href="https://www.icustodian.com/product-category/dvr/?utm_source=cmsv6.co.uk&utm_medium=referral&utm_campaign=cmsv6_equipment&utm_content=equipment_range" target="_blank" rel="noreferrer" data-analytics-event="icustodian_category_clicked">Browse all compatible DVRs <span aria-hidden="true">↗</span></a></div>
      <Disclaimer/>
    </div></section>
    <section className="section pale"><div className="container contact-grid"><div><SectionHeading eyebrow="Already own a DVR?" title="Let us check compatibility." text="Send the manufacturer, model, firmware, connection type, camera count and the remote functions you need. We will check before confirming compatibility."/><ul className="tick-list dark-ticks"><li>No assumptions about third-party devices</li><li>No promise until the model is checked</li><li>Advice for mobile and fixed installations</li></ul><a className="text-link" href="/cmsv6-device-compatibility">Use the detailed compatibility checker →</a></div><EnquiryForm compact/></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemListSchema)}}/>
  </>
}

function PricingPage(){ return <><section className="section" id="free-offer"><div className="container promo-panel"><span className="promo-big">2</span><div><span className="eyebrow red">Included with a compatible iCustodian DVR</span><h2>Two months of CMSV6 hosting free.</h2><p>Use the introductory period to connect cameras, configure mobile data or Wi-Fi, test live viewing and GPS, and get familiar with playback. A paid hosting plan is required to continue after the free period.</p></div><a className="button primary" href="https://www.icustodian.com/product-category/dvr/?utm_source=cmsv6.co.uk&utm_medium=referral&utm_campaign=cmsv6_equipment&utm_content=pricing_free_offer" rel="noreferrer" data-analytics-event="icustodian_category_clicked">View compatible DVRs</a></div></section><section className="section pale" id="plans"><div className="container"><SectionHeading eyebrow="Published hosting plans" title="Choose a term for each compatible device." text="Simple standard pricing, with tailored quotations for larger and longer requirements."/><PricingCards/><div className="pricing-explainer"><div><h3>What the price covers</h3><p>CMSV6 server hosting for one compatible device, remote platform access and setup guidance for the selected term.</p></div><div><h3>What is separate</h3><p>DVRs, cameras, installation, mobile data, local storage, optional licences and server-side video storage unless expressly included.</p></div><div><h3>Need more?</h3><p>Ask for a quotation for fleets, multiple locations, longer terms and specialist configuration. No unapproved discount is assumed.</p></div></div></div></section><section className="section"><div className="container two-column estimator-wrap"><div><SectionHeading eyebrow="Quick estimator" title="Estimate standard hosting." text="Change the device count and term to see the published-price total."/><PriceEstimator/></div><div className="quote-card"><span className="eyebrow light-blue">Fleet & multi-site</span><h2>Need a tailored quotation?</h2><p>Tell us how many compatible devices, cameras and locations you need to manage, and the hosting term you have in mind.</p><a className="button light" href="/contact?enquiry=fleet" data-analytics-event="fleet_quote_requested">Request a quotation</a></div></div></section></> }

function SupportPage(){ const topics=[["New customer setup","/resources/cmsv6-device-activation-guide"],["Device activation","/resources/cmsv6-device-activation-guide"],["Login and password help","#login"],["Adding a device","/cmsv6-device-compatibility"],["Mobile-data and Wi-Fi setup","/resources/cmsv6-troubleshooting-device-offline"],["GPS troubleshooting","/resources/cmsv6-gps-tracking-guide"],["Camera troubleshooting","#troubleshooting"],["Playback and video download","/resources/live-cctv-versus-recorded-playback"],["Device offline checks","/resources/cmsv6-troubleshooting-device-offline"],["App and desktop-client guidance","#login"],["Hosting renewal","/contact?enquiry=renewal"],["Manuals and downloads","/contact?enquiry=support"]]; return <><section className="section"><div className="container"><SectionHeading eyebrow="Support centre" title="Choose the area you need help with." text="Never share server credentials, administrator passwords or customer device IDs in a public message."/><div className="support-grid">{topics.map(([label,href],i)=><a href={href} key={label} data-analytics-event={label==="Hosting renewal"?"cmsv6_renewal_requested":label==="Device activation"?"cmsv6_activation_requested":undefined}><span>{String(i+1).padStart(2,"0")}</span><h3>{label}</h3><b>Get guidance →</b></a>)}</div></div></section><section className="section pale" id="troubleshooting"><div className="container two-column"><div><SectionHeading eyebrow="First checks" title="Device showing offline?" text="Work through these steps before changing settings."/><div className="faq-list compact-faq">{["Confirm the DVR still has power and is recording locally.","Check that the supported internet connection is active.","Check SIM data allowance, signal or Wi-Fi/network status.","Confirm antennas and approved cables are firmly connected.","Note any warning shown and the last time the device reported."].map((x,i)=><details key={x}><summary>{i+1}. {x}</summary><p>Record what you find and contact support before resetting or changing advanced settings. A connection loss does not necessarily stop normal local DVR recording.</p></details>)}</div><a className="text-link" href="/resources/cmsv6-troubleshooting-device-offline">Read the complete device-offline guide →</a></div><div className="support-contact" id="login"><span className="eyebrow light-blue">Existing customer?</span><h2>Account and login assistance</h2><p>Use only the CMSV6 login address and application version supplied for your confirmed account. If you no longer have the approved details, the support team will verify the account before helping you regain access.</p><a className="button light" href="/contact?enquiry=support" data-analytics-event="cmsv6_login_clicked">Request login help</a><a className="text-link light-link" href="tel:+447543025555" data-analytics-event="telephone_clicked">Call +44 (0) 7543 02 5555 →</a></div></div></section></> }

function AboutPage(){ return <><section className="section"><div className="container about-grid"><div><SectionHeading eyebrow="Part of the iCustodian ecosystem" title="CCTV products and connected monitoring, with UK-focused support." text="iCustodian Limited specialises in CCTV security products for vehicles, homes and businesses. CMSV6 extends compatible equipment with live video, GPS and remote management."/><p>iCustodian supports customers in choosing compatible systems, connecting approved equipment and understanding what each configuration can provide. The service is designed for individual customers as well as businesses and larger organisations.</p><div className="stat-row"><div><b>UK</b><span>service focus</span></div><div><b>1:1</b><span>customer guidance</span></div><div><b>Wide</b><span>use-case range</span></div></div></div><div className="about-panel"><span>iCustodian®</span><h2>Smart security solutions for every space.</h2><p>Compatible equipment, clear advice and a practical route from local CCTV recording to remote visibility.</p><a className="button light" href="https://www.icustodian.com/about-us/?utm_source=cmsv6.co.uk&utm_medium=referral" rel="noreferrer">Visit iCustodian</a></div></div></section><section className="section pale"><div className="container values-grid"><article><span>01</span><h3>Clear compatibility</h3><p>Check equipment, connections and requirements before making a recommendation.</p></article><article><span>02</span><h3>Useful explanations</h3><p>Translate live view, local recording, GPS and remote playback into practical language.</p></article><article><span>03</span><h3>Responsible monitoring</h3><p>Keep privacy, access control, transparency and proportionality visible throughout the journey.</p></article></div></section></> }

function ContactPage(){ return <section className="section" id="enquiry"><div className="container contact-grid"><div><SectionHeading eyebrow="Talk to the UK team" title="A short enquiry is enough to get started." text="Choose the closest enquiry type and tell us what you already know. We can ask the right follow-up questions."/><div className="contact-options"><a href="tel:+447543025555" data-analytics-event="telephone_clicked"><span>Telephone</span><b>+44 (0) 7543 02 5555</b><small>Monday to Friday · 10am–8pm</small></a><a href="mailto:support@cmsv6.co.uk" data-analytics-event="email_clicked"><span>Email</span><b>support@cmsv6.co.uk</b><small>Subscriptions, compatibility and support</small></a><div><span>Registered office</span><b>iCustodian Limited · Company 15930836</b><small>18 Holly Hill Road, Erith, England, DA8 1QD, United Kingdom</small></div><div><span>Data protection</span><b>Registered with the Information Commissioner’s Office</b><small>Registration does not mean ICO approval, certification or endorsement.</small></div></div><p className="small">Do not submit passwords, administrator credentials, private server addresses or unnecessary personal information.</p></div><EnquiryForm/></div></section> }

function FaqPage(){ const schema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}; return <section className="section"><div className="container faq-layout"><div><span className="eyebrow">Answers by topic</span><h2>Before you choose a plan</h2><p>These answers explain the general service. Your exact options still depend on compatible equipment and configuration.</p><a className="button dark" href="/contact?enquiry=compatibility">Ask about my setup</a></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></div></section> }

function ResourcesPage(){ return <section className="section"><div className="container"><SectionHeading eyebrow="Learning centre" title="Practical CMSV6 guides, reviewed by the iCustodian Technical Team." text="Each guide explains one clear topic, states compatibility limits and links to the next useful step."/><div className="resource-grid">{resourcePages.map(page=><article key={page.slug}><span>{page.eyebrow}</span><h2>{page.h1}</h2><p>{page.description}</p><a href={`/resources/${page.slug}`}>Read the complete guide →</a></article>)}</div><div className="editorial-link-panel"><div><h2>How this content is checked</h2><p>Technical claims are reviewed against supported equipment and commercial relationships are disclosed clearly.</p></div><a className="button dark" href="/editorial-policy">Read the editorial policy</a></div></div></section> }

function CompatibilityPage(){ return <><section className="section"><div className="container compatibility-layout"><div><SectionHeading eyebrow="Manual confirmation" title="Compatibility is checked against the exact recorder and functions you need." text="A model family can contain different firmware, channel standards and connection options. Send the details below and the iCustodian team will review them before confirming CMSV6 support."/><div className="compatibility-notes"><h2>What happens next</h2><ol><li>We identify the exact manufacturer, model and firmware.</li><li>We compare the required live, playback, GPS, audio and camera functions.</li><li>We ask for any missing technical detail through the private support route.</li><li>We confirm compatibility, limitations and the appropriate next step manually.</li></ol><p><strong>No automated result is shown.</strong> An incomplete model number or device ID format is not enough to promise compatibility.</p></div><Disclaimer/></div><CompatibilityChecker/></div></section><section className="section pale"><div className="container two-column"><div><h2>Buying new equipment?</h2><p>Selected iCustodian DVRs are already promoted for CMSV6-compatible installations, including four- and eight-channel mobile recorders and a compact hybrid MDVR dash camera.</p><a className="button dark" href="/equipment">Compare compatible equipment</a></div><div><h2>Keep private information private</h2><p>Do not send passwords, CMSV6 credentials, complete device serial numbers or customer footage in this form. The team will provide an approved private route if a sensitive identifier is genuinely required.</p></div></div></section></> }

function InternationalPage(){ return <section className="section"><div className="container article-layout"><aside className="article-summary"><span className="eyebrow">Key considerations</span><p className="article-definition">CMSV6 is hosted in the United Kingdom and may be offered internationally where compatible equipment, lawful use, support arrangements and reliable connectivity can be confirmed.</p><ul><li>The DVR must be technically compatible with the configured CMSV6 service.</li><li>The installation needs a suitable local mobile, Wi-Fi or wired connection.</li><li>The customer remains responsible for local CCTV, workplace, audio and location laws.</li><li>Pricing, tax, payment and support arrangements must be confirmed by quotation.</li></ul></aside><div className="article-body"><section><h2>International availability is assessed individually</h2><p>CMSV6 can receive supported connections from compatible equipment outside the UK, but service cannot be assumed in every country or network. Mobile bands, SIM roaming, firewalls, data routing, power standards and installer capability all affect a practical deployment.</p><p>Send the country, operating area, device model, connection plan, camera count and required functions before purchasing hosting.</p></section><section><h2>Network and time-zone planning</h2><p>Live CCTV can use significant upload bandwidth and mobile data. Test the actual network at the vehicle routes or fixed location, including roaming restrictions and carrier policies. Configure the DVR, CMSV6 account and local procedures around the correct time zone so playback searches and evidence timestamps remain understandable.</p></section><section><h2>Cross-border access and data protection</h2><p>UK hosting does not remove the customer’s obligations in the country where cameras, people and assets are located. International access to video, audio or GPS may involve cross-border data transfers and additional notices, contracts or safeguards. Obtain qualified local advice where required.</p></section><section><h2>Support and commercial arrangements</h2><p>Support hours are based in the UK. Confirm language, time-zone, remote-assistance and any installer arrangements before deployment. International payment methods, taxes, hardware delivery and mobile data are supplied only where expressly confirmed in a quotation.</p><div className="inline-actions"><a className="button primary" href="/contact?enquiry=international">Request an international quotation</a><a className="button dark" href="/cmsv6-device-compatibility">Check equipment compatibility</a></div></section></div></div></section> }

function EditorialPolicy(){ return <section className="section"><div className="container legal-content editorial-policy"><p className="legal-updated"><strong>Last reviewed: 2 August 2026</strong></p><h2>Purpose</h2><p>CMSV6 publishes practical information about compatible CCTV equipment, mobile DVRs, live remote viewing, GPS-enabled systems, hosting, setup and responsible monitoring. Content is written for customers comparing or using the service, not to manipulate search rankings.</p><h2>Technical review</h2><p>Substantial guides identify iCustodian Technical Team review. Product and compatibility statements are checked against supported equipment and known configuration requirements. We do not invent qualifications, customer numbers, installation totals or performance statistics.</p><h2>Compatibility and limitations</h2><p>CMSV6 functions vary by recorder, firmware, cameras, sensors, network, account permissions and configuration. Published examples do not guarantee that a function is available on every device. A manual compatibility check is required before activation or purchase decisions.</p><h2>Legal and privacy information</h2><p>General articles may explain responsible CCTV, audio and GPS considerations but are not legal advice. The formal Privacy Policy and Terms of Use are maintained separately. Higher-risk monitoring should be reviewed by an appropriately qualified professional.</p><h2>Commercial disclosure</h2><p>CMSV6 is operated by iCustodian Limited. Links to iCustodian equipment are commercial links to the associated seller and may include referral tracking parameters. No fake reviews, ratings, awards or undisclosed paid editorial recommendations are published.</p><h2>Updates and corrections</h2><p>Articles show a published and last-reviewed date. Material updates are made when CMSV6 services, supported equipment or reliable guidance changes. To report an error, email <a href="mailto:support@cmsv6.co.uk?subject=CMSV6%20content%20correction">support@cmsv6.co.uk</a> with the page URL and the correction requested.</p></div></section> }

function HtmlSitemap(){ const serviceLinks=[["Home","/"],["Features","/features"],["How CMSV6 works","/how-it-works"],["Compatible equipment","/equipment"],["Hosting prices","/pricing"],["Device compatibility checker","/cmsv6-device-compatibility"],["International CMSV6 hosting","/international-cmsv6-hosting"]] as const; const helpLinks=[["Support","/support"],["Frequently asked questions","/faq"],["Contact and quotations","/contact"],["About iCustodian CMSV6","/about"],["Editorial policy","/editorial-policy"],["Responsible CCTV use","/responsible-use"],["Privacy policy","/privacy"],["Terms of use","/terms"]] as const; return <section className="section"><div className="container sitemap-groups"><section><h2>CMSV6 services</h2>{serviceLinks.map(([label,href])=><a href={href} key={href}>{label}</a>)}</section><section><h2>Industry solutions</h2><a href="/solutions">All solutions</a>{solutionPages.map(page=><a href={`/solutions/${page.slug}`} key={page.slug}>{page.h1}</a>)}</section><section><h2>Guides and resources</h2><a href="/resources">All resources</a>{resourcePages.map(page=><a href={`/resources/${page.slug}`} key={page.slug}>{page.h1}</a>)}</section><section><h2>Help, company and legal</h2>{helpLinks.map(([label,href])=><a href={href} key={href}>{label}</a>)}<a href="https://www.icustodian.com/product-category/dvr/?utm_source=cmsv6.co.uk&utm_medium=referral&utm_campaign=cmsv6_equipment&utm_content=html_sitemap" target="_blank" rel="noreferrer">Browse iCustodian DVR equipment ↗</a></section></div></section> }

function renderLegalInline(text:string):ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return tokens.map((token,index)=>{
    if(token.startsWith("**")&&token.endsWith("**")) return <strong key={index}>{token.slice(2,-2)}</strong>;
    const link=token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if(link) return <a key={index} href={link[2]}>{link[1]}</a>;
    return token;
  });
}

function LegalDocument({markdown}:{markdown:string}){
  const lines=markdown.replace(/\r/g,"").split("\n");
  const blocks:ReactNode[]=[];
  let index=0;

  while(index<lines.length){
    const line=lines[index].trim();
    if(!line||line.startsWith("# ")){ index++; continue; }
    if(line==="---"){ blocks.push(<hr key={`hr-${index}`}/>); index++; continue; }
    if(line.startsWith("## ")){ blocks.push(<h2 key={`h2-${index}`}>{renderLegalInline(line.slice(3))}</h2>); index++; continue; }
    if(line.startsWith("### ")){ blocks.push(<h3 key={`h3-${index}`}>{renderLegalInline(line.slice(4))}</h3>); index++; continue; }
    if(line.startsWith("* ")){
      const items:ReactNode[]=[];
      const start=index;
      while(index<lines.length&&lines[index].trim().startsWith("* ")){
        items.push(<li key={index}>{renderLegalInline(lines[index].trim().slice(2))}</li>);
        index++;
      }
      blocks.push(<ul key={`ul-${start}`}>{items}</ul>);
      continue;
    }

    const paragraph:string[]=[];
    const start=index;
    while(index<lines.length){
      const current=lines[index].trim();
      if(!current||current.startsWith("#")||current==="---"||current.startsWith("* ")) break;
      paragraph.push(current);
      index++;
    }
    const content=paragraph.join(" ");
    blocks.push(<p className={content.startsWith("**Last updated:")?"legal-updated":undefined} key={`p-${start}`}>{renderLegalInline(content)}</p>);
  }

  return <>{blocks}</>;
}

function LegalPage({type}:{type:"privacy"|"terms"}){ return <section className="section legal-section"><article className="container legal-content"><LegalDocument markdown={legalDocuments[type]}/></article></section> }

function ResponsibleUse(){ return <section className="section"><div className="container responsible-page"><div className="legal-warning"><strong>Professional review required</strong><p>This practical overview does not guarantee compliance and is not a substitute for legal, safeguarding or data-protection advice.</p></div><SectionHeading eyebrow="Core principles" title="Monitor only what is justified." text="Customers are responsible for the lawful placement, configuration and use of every camera, microphone, sensor and tracking device."/><div className="principle-grid">{[["Lawful","Identify a valid purpose and lawful basis before monitoring."],["Fair & transparent","Tell affected people what is monitored, why and by whom."],["Necessary","Use monitoring only where the aim cannot reasonably be met in a less intrusive way."],["Proportionate","Limit cameras, audio, tracking, users and retention to what the purpose requires."],["Secure","Protect accounts, devices, recordings and downloads from unauthorised access."],["Accountable","Document decisions, reviews, access and deletion arrangements."]].map(([t,d])=><article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div><h2>Areas needing extra care</h2><div className="warning-list"><p><b>Employee and driver monitoring:</b> be clear about monitoring during work and private use, and avoid excessive or continuous observation without strong justification.</p><p><b>Audio:</b> sound monitoring is often more intrusive than video. Do not enable it by default; assess necessity, permissions and notice.</p><p><b>Children and vulnerable people:</b> schools, nurseries, hospitals and care services must apply safeguarding, privacy and sector-specific rules.</p><p><b>Public and neighbouring areas:</b> position cameras carefully, minimise unnecessary capture and provide clear signage and privacy information.</p><p><b>Biometric or AI features:</b> obtain specialist advice before using face recognition or other biometric processing.</p></div></div></section> }
