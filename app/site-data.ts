export const navigation = [
  ["Features", "/features"],
  ["Solutions", "/solutions"],
  ["How it works", "/how-it-works"],
  ["Equipment", "/equipment"],
  ["Pricing", "/pricing"],
  ["Support", "/support"],
] as const;

export const features = [
  { icon: "LIVE", title: "Live video & audio", text: "View compatible multi-camera DVR feeds remotely and, where supported, listen or use two-way voice." },
  { icon: "GPS", title: "Real-time GPS", text: "See current location, direction, journey status and online state for compatible GPS-enabled equipment." },
  { icon: "PLAY", title: "Playback & download", text: "Search local or configured server footage, review events and retrieve important clips without removing storage media." },
  { icon: "ALRT", title: "Events & alerts", text: "Surface SOS, camera-loss, power, speed, geofence and other configured events supported by the connected system." },
  { icon: "FLEET", title: "One to many devices", text: "Organise one device or many vehicles, branches, farms, boats and sites from a single monitoring account." },
  { icon: "CTRL", title: "Remote control", text: "Request snapshots, inspect device state and control supported PTZ, intercom or device functions remotely." },
] as const;

export const industries = [
  { title: "Vehicles & fleets", label: "On the road", text: "Private cars, taxis, HGVs, delivery fleets, coaches, ambulances and plant.", image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1000&q=80" },
  { title: "Homes & business", label: "On site", text: "Homes, shops, offices, warehouses, factories, depots and temporary locations.", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80" },
  { title: "Farms & rural", label: "Across the land", text: "Livestock, barns, gates, machinery, stores, fields and remote rural assets.", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=80" },
  { title: "Marine & specialist", label: "Beyond the road", text: "Boats, harbours, public services, education, care and specialist operations.", image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1000&q=80" },
] as const;

export const plans = [
  { months: "6 months", price: 60, note: "A flexible shorter term", cta: "Choose 6 months" },
  { months: "12 months", price: 100, note: "Our popular annual option", cta: "Choose 12 months", popular: true },
  { months: "24 months", price: 180, note: "Best standard-plan value", cta: "Choose 24 months" },
] as const;

export const steps = [
  ["01", "Choose compatible equipment", "Select an approved iCustodian DVR, MDVR, dash camera or CCTV kit for the environment."],
  ["02", "Install cameras & accessories", "Fit the right cameras, storage, GPS, connectivity and optional sensors for the job."],
  ["03", "Connect to the internet", "Use supported mobile data, Wi-Fi or a wired network. Coverage and bandwidth vary by location."],
  ["04", "Activate CMSV6 hosting", "iCustodian configures the compatible device and supplies approved access information."],
  ["05", "Log in and monitor", "View the live feeds, location, status, playback and features enabled for your equipment."],
  ["06", "Review what matters", "Search supported footage, routes, snapshots, reports and events when they are needed."],
] as const;

export const faqs = [
  ["What is CMSV6?", "CMSV6 is a UK-hosted remote CCTV, live-video, audio and GPS monitoring platform that connects compatible DVRs and cameras in one monitoring system."],
  ["Is CMSV6 only for vehicles?", "No. It can support compatible equipment in homes, shops, offices, warehouses, farms, boats, temporary sites and other fixed or mobile locations."],
  ["Can I use my existing DVR?", "Possibly. Compatibility depends on the manufacturer, model, firmware and connection options. Send us the details and we will check before making any promise."],
  ["Does it provide live GPS tracking?", "Compatible GPS-enabled equipment can report location, direction, status and journey information while it has a suitable connection and GPS signal."],
  ["Can I download video remotely?", "Authorised users may be able to retrieve footage from compatible equipment or configured storage. Availability depends on the DVR, storage, connection and account setup."],
  ["What happens if the internet connection is lost?", "A compatible DVR normally continues recording to its local storage. Live viewing, GPS updates and remote requests pause until connectivity returns."],
  ["Do I need a SIM card?", "A mobile installation normally needs a suitable data SIM unless it uses another supported connection. Mobile data and the SIM are separate from standard CMSV6 hosting."],
  ["How much data does live video use?", "Usage varies significantly with image quality, frame rate, channels and viewing time. Contact iCustodian for guidance based on your planned setup."],
  ["How long is footage stored?", "Retention depends on installed local storage, recording settings and any separately configured server-side storage. Standard hosting does not automatically include unlimited cloud video storage."],
  ["What happens after the two free months?", "Choose a paid per-device hosting plan to keep the compatible device connected to CMSV6 after the introductory period."],
  ["Can several staff members have access?", "Separate access may be configured where supported. Permissions should be limited to authorised users and managed around your privacy and security responsibilities."],
  ["Is CMSV6 an emergency-response service?", "No. CMSV6 is a monitoring platform and does not replace the police, emergency services, professional alarm response or appropriate safety procedures."],
] as const;

export const resources = [
  "What is CMSV6 and how does it work?",
  "CMSV6 for vehicles and fixed premises",
  "Choosing a CMSV6-compatible DVR",
  "How farmers can use remote CCTV monitoring",
  "Live viewing versus recorded video playback",
  "Using remote CCTV responsibly in the workplace",
] as const;

export const pageMeta: Record<string, { title: string; description: string }> = {
  features: { title: "CMSV6 Features | Live CCTV, GPS & Remote Playback", description: "Explore CMSV6 live video, GPS tracking, playback, device management and compatible remote-monitoring features." },
  solutions: { title: "CMSV6 Solutions | Vehicles, Sites, Farms & Marine", description: "Remote CCTV and GPS monitoring solutions for vehicles, businesses, farms, boats, homes and specialist operations." },
  "how-it-works": { title: "How CMSV6 Works | Connect DVRs for Remote Monitoring", description: "See how compatible cameras and DVRs connect through the internet to UK-hosted CMSV6 remote viewing." },
  equipment: { title: "CMSV6 Compatible Equipment | iCustodian DVRs", description: "Find compatible iCustodian DVRs, MDVRs, dash cameras and accessories for CMSV6 remote monitoring." },
  pricing: { title: "CMSV6 Hosting Prices UK | From £60 Per Device", description: "Choose flexible 6, 12 or 24-month CMSV6 UK server hosting for each compatible device." },
  support: { title: "CMSV6 Support | Setup, Activation & Troubleshooting", description: "Get help with CMSV6 activation, connectivity, GPS, playback, devices and account access." },
  about: { title: "About iCustodian CMSV6 | UK Remote CCTV Specialists", description: "Learn about the iCustodian ecosystem for CCTV, mobile DVR and remote-monitoring products." },
  contact: { title: "Contact CMSV6 | Subscription, Support & Fleet Quotes", description: "Contact iCustodian about CMSV6 hosting, device activation, compatibility, support or multi-device quotes." },
  faq: { title: "CMSV6 Frequently Asked Questions", description: "Straight answers about CMSV6 compatibility, live video, GPS, mobile data, storage, access and hosting." },
  resources: { title: "CMSV6 Guides & Resources", description: "Practical guides to remote CCTV, GPS monitoring, compatible DVRs and responsible system use." },
  privacy: { title: "Privacy Information | CMSV6", description: "Privacy information for the CMSV6 website." },
  terms: { title: "Website & Service Terms | CMSV6", description: "Important CMSV6 website and service terms information." },
  "responsible-use": { title: "Responsible CCTV Use | CMSV6", description: "Guidance for lawful, fair and proportionate use of video, audio and GPS monitoring." },
};
