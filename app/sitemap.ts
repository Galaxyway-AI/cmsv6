import type { MetadataRoute } from "next";
import { resourcePages, solutionPages } from "./seo-content";

const corePages = ["", "features", "solutions", "how-it-works", "equipment", "pricing", "support", "about", "contact", "faq", "resources", "responsible-use", "cmsv6-device-compatibility", "international-cmsv6-hosting", "editorial-policy", "sitemap"];
const legalPages=["privacy","terms"];
const lastModified="2026-08-02";

export default function sitemap(): MetadataRoute.Sitemap {
  const core=corePages.map((page,index)=>({url:`https://cmsv6.co.uk/${page}`,lastModified,changeFrequency:(index===0?"weekly":"monthly") as "weekly"|"monthly",priority:index===0?1:page==="pricing"||page==="equipment"?0.9:0.8}));
  const solutions=solutionPages.map(page=>({url:`https://cmsv6.co.uk/solutions/${page.slug}`,lastModified:page.reviewed,changeFrequency:"monthly" as const,priority:.85}));
  const resources=resourcePages.map(page=>({url:`https://cmsv6.co.uk/resources/${page.slug}`,lastModified:page.reviewed,changeFrequency:"monthly" as const,priority:.75}));
  const legal=legalPages.map(page=>({url:`https://cmsv6.co.uk/${page}`,lastModified,changeFrequency:"yearly" as const,priority:.4}));
  return [...core,...solutions,...resources,...legal];
}
