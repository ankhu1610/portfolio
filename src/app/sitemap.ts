import { MetadataRoute } from "next";
import { getAllProjects, getAllNotes } from "@/lib/content-api";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ankitchaubey.dev";

  const staticRoutes = [
    "",
    "/projects",
    "/lab",
    "/lab/experiments",
    "/lab/benchmarks",
    "/about",
    "/experience",
    "/resume",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = getAllProjects().map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const noteRoutes = getAllNotes().map((n) => ({
    url: `${baseUrl}/lab/notes/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}
