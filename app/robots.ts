import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/api/","/admin/","/account/","/customer/","/checkout/","/form-success/","/preview/"] }, sitemap: "https://cmsv6.co.uk/sitemap.xml", host:"https://cmsv6.co.uk" }; }
