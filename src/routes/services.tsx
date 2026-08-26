import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { services } from "@/config/services";
import { company } from "@/config/company";
import {
  createWebPageSchema,
  createBreadcrumbSchema,
  serviceSchemas,
} from "@/config/schema";
import surveyImage from "@/assets/services-survey.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services | ${company.name} - Project Management Consultancy in Kalyan, Maharashtra` },
      {
        name: "description",
        content: "Explore Milestone Consultancy's project management consultancy and engineering services including PMC, highway engineering, infrastructure consultancy, building consultancy, QA/QC, quantity surveying, cost estimation, project planning, tender consultancy, and contract management for government and private projects.",
      },
      { property: "og:title", content: `Services | ${company.name} - Project Management Consultancy` },
      {
        property: "og:description",
        content: "Explore Milestone Consultancy's project management consultancy and engineering services including PMC, highway engineering, infrastructure consultancy, building consultancy, QA/QC, quantity surveying, cost estimation, project planning, tender consultancy, and contract management.",
      },
      {
        name: "keywords",
        content: "Project Management Consultancy, PMC Services, Engineering Consultancy, Civil Engineering Consultancy, Construction Management, Highway Consultancy, Infrastructure Consultancy, Building Consultancy, Industrial Consultancy, Quality Assurance, Quality Control, QA QC, Quantity Surveying, Cost Estimation, Project Planning, Project Monitoring, Tender Consultancy, Contract Management, Resident Engineering, Construction Supervision, Engineering Solutions, Kalyan, Thane, Mumbai Metropolitan Region, Maharashtra, India",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://milestoneconsultancy.in/services",
      },
      {
        property: "og:image",
        content: "https://milestoneconsultancy.in/milestone-logo.jpeg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${company.name} - Project Management Consultancy Services` },
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Services | ${company.name} - Project Management Consultancy` },
      {
        name: "twitter:description",
        content: "Explore Milestone Consultancy's project management consultancy and engineering services including PMC, highway engineering, infrastructure consultancy, building consultancy, QA/QC, quantity surveying, cost estimation, project planning, tender consultancy, and contract management.",
      },
      {
        name: "twitter:image",
        content: "https://milestoneconsultancy.in/milestone-logo.jpeg",
      },
      { name: "twitter:image:alt", content: `${company.name} - Project Management Consultancy Services` },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://milestoneconsultancy.in/services",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            createWebPageSchema({
              id: "services",
              url: "https://milestoneconsultancy.in/services",
              name: `Services | ${company.name} - Project Management Consultancy`,
              description:
                "Explore Milestone Consultancy's project management consultancy and engineering services including PMC, highway engineering, infrastructure consultancy, building consultancy, QA/QC, quantity surveying, cost estimation, project planning, tender consultancy, and contract management.",
              type: "CollectionPage",
            }),

            createBreadcrumbSchema(
              "https://milestoneconsultancy.in/services",
              [
                {
                  name: "Home",
                  item: "https://milestoneconsultancy.in",
                },
                {
                  name: "Services",
                  item: "https://milestoneconsultancy.in/services",
                },
              ],
            ),

            {
              "@type": "ItemList",
              "@id":
                "https://milestoneconsultancy.in/services#services-list",
              name:
                "Project Management Consultancy and Engineering Services",
              description:
                "Comprehensive project management and engineering consultancy services for infrastructure, highway, and building projects.",
              numberOfItems: serviceSchemas.length,
              itemListElement: serviceSchemas.map((service, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@id": service["@id"],
                },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="pt-16 pb-14 lg:pt-24 lg:pb-20 bg-[color:var(--color-brand-navy)] text-white" aria-labelledby="services-heading">
        <div className="container-page grid gap-10 lg:grid-cols-2 items-end">
          <div>
            <span className="eyebrow text-[color:var(--color-brand-orange)]">
              Our Services
            </span>
            <h1 id="services-heading" className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance leading-[1.05]">
              Engineering services across the project lifecycle.
            </h1>
          </div>
          <p className="text-white/75 text-base sm:text-lg max-w-xl lg:justify-self-end">
            From concept and planning through execution and closeout, we
            provide the technical and management support owners need to deliver
            complex infrastructure, highway, and building projects with confidence.
          </p>
        </div>
      </section>

      <section className="py-24" aria-labelledby="service-list-heading">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 6) * 0.04 }}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] hover:border-[color:var(--color-brand-orange)]/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)]/5 text-[color:var(--color-brand-navy)] group-hover:bg-[color:var(--color-brand-orange)] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-[color:var(--color-brand-navy)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                    {s.description}
                  </p>
                  <div className="mt-5 h-px w-10 bg-[color:var(--color-brand-orange)]" aria-hidden="true" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24" aria-labelledby="engagement-heading">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 items-center rounded-3xl overflow-hidden border border-border bg-card">
            <img
              src={surveyImage}
              alt="Quantity surveyor and civil engineer conducting site measurement and survey work for highway infrastructure project"
              loading="lazy"
              width={1400}
              height={900}
              className="h-full w-full object-cover min-h-[320px]"
              decoding="async"
            />
            <div className="p-8 sm:p-12">
              <SectionHeader
                eyebrow="Engagement Model"
                title="Flexible engagement to fit the way you deliver."
                description="Whether you need an embedded resident engineering team, an independent QA/QC framework, or a full PMC across a portfolio of works, we can shape our engagement to your delivery structure."
              />
              <Button
                asChild
                className="mt-8 rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white h-11"
              >
                <Link to="/contact">
                  Discuss your project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}