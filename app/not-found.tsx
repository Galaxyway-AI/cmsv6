/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";

export const metadata:Metadata={title:"Page Not Found | CMSV6",robots:{index:false,follow:true}};

export default function NotFound(){
  return <main><section className="page-hero not-found-hero"><div className="page-grid-bg"/><div className="container"><span className="eyebrow light-blue">404 · Page not found</span><h1>We could not find that CMSV6 page.</h1><p>The address may be outdated or mistyped. Use the links below to continue without being redirected to an unrelated page.</p><div className="hero-actions"><a className="button primary" href="/">Return to CMSV6 home</a><a className="button outline-light" href="/sitemap">Browse the website sitemap</a></div></div></section><section className="section"><div className="container page-card-grid"><article><h2>Check equipment</h2><p>Compare selected compatible iCustodian DVRs or request a manual compatibility review.</p><a href="/equipment">Compatible equipment →</a></article><article><h2>Read a guide</h2><p>Understand CMSV6 live video, GPS, playback, activation and troubleshooting.</p><a href="/resources">CMSV6 resources →</a></article><article><h2>Ask for help</h2><p>Contact the UK support team about an existing account, subscription or installation.</p><a href="/contact">Contact CMSV6 →</a></article></div></section></main>;
}
