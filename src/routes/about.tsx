import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Target, Eye, Gem, Compass, Building2, HeartHandshake } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { company } from "@/config/company";
import aboutImage from "@/assets/about-engineer.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${company.name} | Project Management Consultancy` },
      {
        name: "description",
        content:
          "Learn about Milestone Consultancy — our mission, vision, values and engineering philosophy for delivering infrastructure and building projects across India.",
      },
      { property: "og:title", content: `About ${company.name}` },
      {
        property: "og:description",
        content:
          "Mission, vision, values and engineering philosophy of Milestone Consultancy.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To deliver measurable value to our clients through disciplined project management, engineering rigour and transparent execution across every project we undertake.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To become a trusted engineering consultancy partner for India's infrastructure growth — recognised for quality, integrity and long-term client outcomes.",
  },
  {
    icon: Gem,
    title: "Core Values",
    body: "Integrity, precision, safety and accountability. We believe great engineering is built on great habits — practised consistently, project after project.",
  },
];

const whyPoints = [
  {
    icon: Compass,
    title: "Structured Delivery",
    body: "Every project is governed by a defined scope, schedule, budget and quality baseline.",
  },
  {
    icon: Building2,
    title: "Engineering Depth",
    body: "Our team brings hands-on experience across highways, bridges, and building works.",
  },
  {
    icon: HeartHandshake,
    title: "Client Partnership",
    body: "We work alongside owners — not around them — with clear communication throughout.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      {/* Intro banner */}
      <section className="pt-16 pb-10 lg:pt-24 lg:pb-16 bg-[color:var(--color-brand-navy)] text-white">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="eyebrow text-[color:var(--color-brand-orange)]">
              About Us
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance leading-[1.05]">
              Engineering discipline for India's next generation of infrastructure.
            </h1>
            <p className="mt-6 text-white/75 text-base sm:text-lg max-w-2xl">
              Milestone Consultancy is a Project Management Consultancy based in
              Kalyan, Maharashtra. We support owners, developers and public
              agencies in delivering highways, infrastructure and buildings with
              engineering precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-navy)] text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[color:var(--color-brand-navy)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why + Image */}
      <section className="pb-24">
        <div className="container-page grid gap-14 lg:grid-cols-2 items-center">
          <img
            src={aboutImage}
            alt="Engineer supervising site works"
            loading="lazy"
            width={1400}
            height={1000}
            className="rounded-2xl object-cover shadow-[var(--shadow-elegant)] w-full aspect-[4/3]"
          />
          <div>
            <SectionHeader
              eyebrow="Why Milestone Consultancy"
              title="A partner focused on outcomes, not just deliverables."
              description="We are a newly established consultancy that combines contemporary project management practices with traditional engineering discipline. Our approach is deliberately professional, transparent and outcome-driven."
            />
            <div className="mt-8 space-y-5">
              {whyPoints.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="flex gap-4">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-brand-orange)]/10 text-[color:var(--color-brand-orange)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[color:var(--color-brand-navy)]">
                        {w.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {w.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="pb-24">
        <div className="container-page">
          <div className="rounded-3xl bg-muted/50 border border-border p-8 sm:p-14">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <span className="eyebrow">Engineering Philosophy</span>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-[color:var(--color-brand-navy)] text-balance">
                  Plan carefully. Execute precisely. Sustain relentlessly.
                </h2>
              </div>
              <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
                <p>
                  We believe good project outcomes are the result of good
                  project habits: clear scope, honest measurement, disciplined
                  quality control and open communication.
                </p>
                <p>
                  Our commitment is simple — to earn every client's trust by
                  the quality of our engineering, the clarity of our reporting
                  and the reliability of our delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
