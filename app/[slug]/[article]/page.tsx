/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA, Disclaimer } from "../../components";
import { allSeoContent, getSeoContent } from "../../seo-content";

const baseUrl="https://cmsv6.co.uk";

export function generateStaticParams(){
  return allSeoContent.map(page=>({slug:page.section,article:page.slug}));
}

export async function generateMetadata({params}:{params:Promise<{slug:string;article:string}>}):Promise<Metadata>{
  const {slug:section,article}=await params;
  const page=getSeoContent(section,article);
  if(!page) return {};
  const url=`${baseUrl}/${section}/${article}`;
  return {
    title:page.title,
    description:page.description,
    alternates:{canonical:url},
    openGraph:{type:page.section==="resources"?"article":"website",locale:"en_GB",siteName:"CMSV6 UK",title:page.title,description:page.description,url,images:[{url:"/og-seo.png",width:1728,height:909,alt:"CMSV6 live CCTV, remote DVR playback and GPS monitoring"}]},
    twitter:{card:"summary_large_image",title:page.title,description:page.description,images:["/og-seo.png"]},
  };
}

export default async function SeoContentRoute({params}:{params:Promise<{slug:string;article:string}>}){
  const {slug:section,article}=await params;
  const page=getSeoContent(section,article);
  if(!page) notFound();
  const url=`${baseUrl}/${section}/${article}`;
  const sectionLabel=section==="solutions"?"Solutions":"Resources";
  const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[
    {"@type":"ListItem",position:1,name:"Home",item:baseUrl},
    {"@type":"ListItem",position:2,name:sectionLabel,item:`${baseUrl}/${section}`},
    {"@type":"ListItem",position:3,name:page.h1,item:url},
  ]};
  const provider={"@type":"Organization",name:"iCustodian Limited",url:baseUrl};
  const primarySchema=section==="resources"?{
    "@context":"https://schema.org","@type":"Article",headline:page.h1,description:page.description,url,datePublished:page.published,dateModified:page.reviewed,author:provider,publisher:{...provider,logo:{"@type":"ImageObject",url:`${baseUrl}/cmsv6-logo.png`}},image:`${baseUrl}/og-seo.png`,mainEntityOfPage:url,
  }:{
    "@context":"https://schema.org","@type":"Service",name:page.h1,description:page.description,url,provider,areaServed:{"@type":"Place",name:"United Kingdom and international locations subject to service availability"},serviceType:"CMSV6 remote CCTV, live-video, playback and GPS monitoring for compatible equipment",
  };
  const faqSchema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:page.faqs.map(([question,answer])=>({"@type":"Question",name:question,acceptedAnswer:{"@type":"Answer",text:answer}}))};

  return <main>
    <section className="page-hero content-page-hero"><div className="page-grid-bg"/><div className="container"><div className="breadcrumbs"><a href="/">Home</a><span>/</span><a href={`/${section}`}>{sectionLabel}</a><span>/</span><b>{page.eyebrow}</b></div><span className="eyebrow light-blue">{page.eyebrow}</span><h1>{page.h1}</h1><p>{page.intro}</p></div></section>
    <article className="section seo-article"><div className="container article-layout"><aside className="article-summary"><span className="eyebrow">Key takeaways</span><p className="article-definition">{page.definition}</p><ul>{page.takeaways.map(item=><li key={item}>{item}</li>)}</ul>{section==="resources"&&<div className="editorial-meta"><b>Reviewed by iCustodian Technical Team</b><span>Published 2 August 2026</span><span>Last reviewed 2 August 2026</span><a href="mailto:support@cmsv6.co.uk?subject=CMSV6%20article%20correction">Suggest a correction</a></div>}</aside><div className="article-body">
      {page.sections.map(sectionBlock=><section key={sectionBlock.heading}><h2>{sectionBlock.heading}</h2>{sectionBlock.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{sectionBlock.bullets&&<ul>{sectionBlock.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}
      <section><h2>Compatible equipment, hosting and next steps</h2><p>CMSV6 requires a verified compatible DVR, suitable cameras, correctly sized local storage and an appropriate connection. Published hosting is £60 for six months, £100 for twelve months or £180 for twenty-four months per compatible device. Longer terms and multi-device arrangements are available by quotation.</p><p>Qualifying compatible iCustodian DVRs purchased directly through iCustodian include two months of CMSV6 hosting free, giving time to configure and test the supported functions. Hardware, installation, SIM cards, mobile data and permanent cloud-video storage are not included automatically.</p><div className="inline-actions"><a className="button primary" href="/cmsv6-device-compatibility">Check device compatibility</a><a className="button dark" href="/pricing">Compare hosting plans</a><a className="text-link" href={`https://www.icustodian.com/product-category/dvr/?utm_source=cmsv6.co.uk&utm_medium=referral&utm_campaign=cmsv6_equipment&utm_content=${page.slug}`} target="_blank" rel="noreferrer" data-analytics-event="icustodian_category_clicked">View iCustodian DVRs ↗</a></div></section>
      <Disclaimer/>
      <section className="article-faq"><h2>Frequently asked questions</h2>{page.faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      <section className="related-pages"><h2>Related CMSV6 information</h2><div>{page.related.map(([label,href])=><a key={href} href={href}>{label}<span>→</span></a>)}</div></section>
    </div></div></article>
    <CTA title="Check whether CMSV6 fits your equipment and monitoring needs." text="Send the exact DVR model, connection type, camera count and remote functions you need. Compatibility is confirmed manually before activation."/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(primarySchema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
  </main>;
}
