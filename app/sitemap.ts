import type { MetadataRoute } from "next";
const pages = ["", "features", "solutions", "how-it-works", "equipment", "pricing", "support", "about", "contact", "faq", "resources", "privacy", "terms", "responsible-use"];
export default function sitemap(): MetadataRoute.Sitemap { return pages.map((page, index) => ({ url: `https://cmsv6.co.uk/${page}`, lastModified: new Date(), changeFrequency: index === 0 ? "weekly" : "monthly", priority: index === 0 ? 1 : .75 })); }
