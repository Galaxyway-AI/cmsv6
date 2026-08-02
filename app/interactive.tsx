"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { FormEvent, useEffect, useState } from "react";

type AnalyticsPayload = { event:string; [key:string]:string|number|boolean };

function trackEvent(event:string,parameters:Record<string,string|number|boolean>={}){
  if(typeof window==="undefined"||localStorage.getItem("cmsv6-cookie-choice")!=="all") return;
  const payload:AnalyticsPayload={event,...parameters};
  const analyticsWindow=window as Window & {dataLayer?:AnalyticsPayload[]};
  analyticsWindow.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("cmsv6:analytics",{detail:payload}));
}

export function AnalyticsTracker(){
  useEffect(()=>{
    function click(event:MouseEvent){
      const target=(event.target as Element|null)?.closest<HTMLElement>("[data-analytics-event]");
      const eventName=target?.dataset.analyticsEvent;
      if(eventName){
        const destination=target instanceof HTMLAnchorElement?new URL(target.href,location.href).hostname:"onsite";
        trackEvent(eventName,{destination});
        if(["six_month_plan_selected","twelve_month_plan_selected","twenty_four_month_plan_selected"].includes(eventName)) trackEvent("pricing_plan_selected",{plan:eventName.replace("_plan_selected","")});
      }
    }
    document.addEventListener("click",click);
    return()=>document.removeEventListener("click",click);
  },[]);
  return null;
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu">
    <button className="menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    {open && <nav id="mobile-nav" aria-label="Mobile navigation">
      {[["Features","/features"],["Solutions","/solutions"],["How it works","/how-it-works"],["Equipment","/equipment"],["Pricing","/pricing"],["Resources","/resources"],["Support","/support"],["Contact","/contact"]].map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      <a className="button primary" href="/contact?enquiry=activation" data-analytics-event="cmsv6_activation_requested">Get CMSV6</a>
    </nav>}
  </div>;
}

export function PriceEstimator() {
  const [devices, setDevices] = useState(1);
  const [plan, setPlan] = useState(100);
  return <div className="estimator">
    <div><label htmlFor="device-count">Compatible devices</label><input id="device-count" type="number" min="1" max="100" value={devices} onChange={e => setDevices(Math.max(1, Number(e.target.value)))} /></div>
    <div><label htmlFor="hosting-term">Hosting term</label><select id="hosting-term" value={plan} onChange={e => setPlan(Number(e.target.value))}><option value="60">6 months</option><option value="100">12 months</option><option value="180">24 months</option></select></div>
    <div className="estimate-total"><span>Published price estimate</span><strong>£{devices * plan}</strong><small>per selected term, for {devices} device{devices === 1 ? "" : "s"}</small></div>
    <p className="small">Standard prices are per compatible device. Ask for a tailored quotation for larger fleets, multiple sites or longer terms.</p>
  </div>;
}

export function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [started,setStarted]=useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/enquiry", { method: "POST", body: new FormData(form) });
      if (response.ok) { const type=String(new FormData(form).get("type")||""); trackEvent(type==="Technical support"?"support_request_submitted":"cmsv6_enquiry_submitted",{enquiry_type:type||"unspecified"}); setState("sent"); form.reset(); } else setState("error");
    } catch { setState("error"); }
  }
  return <form className="enquiry-form" onSubmit={submit} onFocus={()=>{if(!started){setStarted(true);trackEvent("cmsv6_enquiry_started");}}} aria-label="CMSV6 enquiry form">
    <div className="form-grid">
      <div><label htmlFor="name">Full name</label><input id="name" name="name" required autoComplete="name" /></div>
      <div><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
      {!compact && <><div><label htmlFor="phone">Telephone</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div><div><label htmlFor="organisation">Company or organisation</label><input id="organisation" name="organisation" autoComplete="organization" /></div></>}
      <div><label htmlFor="type">What can we help with?</label><select id="type" name="type" required><option value="">Select an enquiry</option><option>New CMSV6 subscription</option><option>Activate an existing device</option><option>Check device compatibility</option><option>Fleet or multi-site quote</option><option>Farm or rural system</option><option>Marine system</option><option>Technical support</option><option>Hosting renewal</option></select></div>
      <div><label htmlFor="devices">Number of devices</label><input id="devices" name="devices" type="number" min="1" /></div>
    </div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <div><label htmlFor="message">Tell us about your setup</label><textarea id="message" name="message" rows={compact ? 3 : 5} required placeholder="Where will it be used, what equipment do you have, and what do you need to monitor?" /></div>
    <label className="check"><input type="checkbox" name="consent" required /> <span>I agree that iCustodian may use these details to respond to my enquiry.</span></label>
    <button className="button primary" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}</button>
    <div className="form-status" aria-live="polite">{state === "sent" ? "Thank you — your enquiry has been sent to the CMSV6 support team." : state === "error" ? "We could not send that yet. Please try again or email support@cmsv6.co.uk." : ""}</div>
  </form>;
}

export function CompatibilityChecker(){
  const [state,setState]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [started,setStarted]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setState("sending");
    const form=event.currentTarget;
    const raw=new FormData(form);
    const outbound=new FormData();
    for(const key of ["name","email","phone","organisation","consent","website"]) outbound.set(key,raw.get(key)||"");
    outbound.set("type","Check device compatibility");
    outbound.set("devices","1");
    outbound.set("message",[
      `Manufacturer: ${raw.get("manufacturer")}`,
      `Model: ${raw.get("model")}`,
      `Firmware: ${raw.get("firmware")||"Not known"}`,
      `Device ID format: ${raw.get("deviceIdFormat")||"Not known"}`,
      `Channels: ${raw.get("channels")}`,
      `Connectivity: ${raw.get("connectivity")}`,
      `GPS required: ${raw.get("gps")?"Yes":"No"}`,
      `Audio required: ${raw.get("audio")?"Yes":"No"}`,
      `Remote playback required: ${raw.get("playback")?"Yes":"No"}`,
      `Installation: ${raw.get("installation")}`,
    ].join("\n"));
    try{
      const response=await fetch("/api/enquiry",{method:"POST",body:outbound});
      if(response.ok){trackEvent("compatibility_check_submitted",{connectivity:String(raw.get("connectivity")||"unspecified")});setState("sent");form.reset();}
      else setState("error");
    }catch{setState("error");}
  }
  return <form className="enquiry-form compatibility-form" onSubmit={submit} onFocus={()=>{if(!started){setStarted(true);trackEvent("compatibility_check_started");}}} aria-label="CMSV6 equipment compatibility checker">
    <div className="form-grid"><div><label htmlFor="compat-name">Full name</label><input id="compat-name" name="name" required autoComplete="name"/></div><div><label htmlFor="compat-email">Email address</label><input id="compat-email" name="email" type="email" required autoComplete="email"/></div><div><label htmlFor="compat-phone">Telephone</label><input id="compat-phone" name="phone" type="tel" autoComplete="tel"/></div><div><label htmlFor="compat-organisation">Company or organisation</label><input id="compat-organisation" name="organisation" autoComplete="organization"/></div><div><label htmlFor="manufacturer">Manufacturer</label><input id="manufacturer" name="manufacturer" required/></div><div><label htmlFor="model">Exact model</label><input id="model" name="model" required/></div><div><label htmlFor="firmware">Firmware version</label><input id="firmware" name="firmware" placeholder="If known"/></div><div><label htmlFor="device-id-format">Device ID format</label><input id="device-id-format" name="deviceIdFormat" placeholder="Format only — no complete private ID"/></div><div><label htmlFor="channels">Camera channels</label><select id="channels" name="channels" required><option value="">Select</option><option>1–2 channels</option><option>4 channels</option><option>8 channels</option><option>More than 8</option></select></div><div><label htmlFor="connectivity">Connection</label><select id="connectivity" name="connectivity" required><option value="">Select</option><option>4G or mobile data</option><option>Wi-Fi</option><option>Wired network</option><option>Not sure</option></select></div></div>
    <fieldset><legend>Required remote functions</legend><label className="check"><input type="checkbox" name="gps"/><span>GPS reporting</span></label><label className="check"><input type="checkbox" name="audio"/><span>Audio or two-way voice</span></label><label className="check"><input type="checkbox" name="playback"/><span>Remote playback or download</span></label></fieldset>
    <div><label htmlFor="installation">Where will the equipment be used?</label><textarea id="installation" name="installation" rows={4} required placeholder="Vehicle type, business premises, farm, boat or another installation — and the views you need."/></div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="compat-website">Website</label><input id="compat-website" name="website" tabIndex={-1} autoComplete="off"/></div>
    <label className="check"><input type="checkbox" name="consent" required/><span>I agree that iCustodian may use these details to assess compatibility and respond.</span></label>
    <button className="button primary" type="submit" disabled={state==="sending"}>{state==="sending"?"Sending…":"Request manual compatibility check"}</button>
    <div className="form-status" aria-live="polite">{state==="sent"?"Thank you — the CMSV6 team will review the exact equipment details and reply.":state==="error"?"We could not send that yet. Please try again or email support@cmsv6.co.uk.":""}</div>
  </form>;
}

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(!localStorage.getItem("cmsv6-cookie-choice")));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!visible) return null;
  function choose(value: string) { localStorage.setItem("cmsv6-cookie-choice", value); setVisible(false); if(value==="all") trackEvent("cmsv6_consent_update",{analytics:true}); }
  return <aside className="cookie" aria-label="Cookie choices"><div><strong>Your privacy matters</strong><p>We use essential cookies to make this site work. Optional analytics will only be enabled with your permission.</p></div><div><button className="button ghost" onClick={() => choose("essential")}>Essential only</button><button className="button primary" onClick={() => choose("all")}>Accept analytics</button></div></aside>;
}
