import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { services } from "@/config/services";
import { company } from "@/config/company";
import surveyImage from "@/assets/services-survey.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services | ${company.name}` },
      {
        name: "description",
        content:
          "Explore Milestone Consultancy's services: PMC, highway engineering, infrastructure and building consultancy, QA/QC, quantity surveying, planning, contract management and more.",
      },
      { property: "og:title", content: `Services | ${company.name}` },
      {
        property: "og:description",
        content:
          "PMC, highway engineering, infrastructure and building consultancy services.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="pt-16 pb-14 lg:pt-24 lg:pb-20 bg-[color:var(--color-brand-navy)] text-white">
        <div className="container-page grid gap-10 lg:grid-cols-2 items-end">
          <div>
            <span className="eyebrow text-[color:var(--color-brand-orange)]">
              Our Services
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance leading-[1.05]">
              Engineering services across the project lifecycle.
            </h1>
          </div>
          <p className="text-white/75 text-base sm:text-lg max-w-xl lg:justify-self-end">
            From concept and planning through execution and closeout, we
            provide the technical and management support owners need to deliver
            complex projects with confidence.
          </p>
        </div>
      </section>

      <section className="py-24">
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
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-[color:var(--color-brand-navy)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                    {s.description}
                  </p>
                  <div className="mt-5 h-px w-10 bg-[color:var(--color-brand-orange)]" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2 items-center rounded-3xl overflow-hidden border border-border bg-card">
            <img
              src={surveyImage}
              alt="Surveyor working on a highway project"
              loading="lazy"
              width={1400}
              height={900}
              className="h-full w-full object-cover min-h-[320px]"
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
