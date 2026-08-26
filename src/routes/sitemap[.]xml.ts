import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://milestoneconsultancy.in";

const entries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/projects", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map(
          (e) => `  <url>
    <loc>${BASE_URL}${e.path}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
        );

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=UTF-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});