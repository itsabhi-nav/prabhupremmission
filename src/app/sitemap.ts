import type { MetadataRoute } from "next";
import { initiatives, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/initiatives", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/darshan", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/shloka", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/gyan", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/donate", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...initiatives.map((initiative) => ({
      url: `${site.url}/initiatives/${initiative.slug}`,
      lastModified: new Date(initiative.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
