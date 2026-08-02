"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { FormEvent, useEffect, useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu">
    <button className="menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    {open && <nav id="mobile-nav" aria-label="Mobile navigation">
      {[["Features","/features"],["Solutions","/solutions"],["How it works","/how-it-works"],["Equipment","/equipment"],["Pricing","/pricing"],["Support","/support"],["Contact","/contact"]].map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      <a className="button primary" href="/contact?enquiry=activation">Get CMSV6</a>
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
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/enquiry", { method: "POST", body: new FormData(form) });
      if (response.ok) { setState("sent"); form.reset(); } else setState("error");
    } catch { setState("error"); }
  }
  return <form className="enquiry-form" onSubmit={submit} aria-label="CMSV6 enquiry form">
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

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(!localStorage.getItem("cmsv6-cookie-choice")));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!visible) return null;
  function choose(value: string) { localStorage.setItem("cmsv6-cookie-choice", value); setVisible(false); }
  return <aside className="cookie" aria-label="Cookie choices"><div><strong>Your privacy matters</strong><p>We use essential cookies to make this site work. Optional analytics will only be enabled with your permission.</p></div><div><button className="button ghost" onClick={() => choose("essential")}>Essential only</button><button className="button primary" onClick={() => choose("all")}>Accept analytics</button></div></aside>;
}
