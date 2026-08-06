import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { projects } from "@/config/projects";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Users, 
  TrendingUp,
  Building2,
  Route as RouteIcon,
  HardHat,
  ArrowRight,
  Clock,
  CheckCircle,
  Loader2
} from "lucide-react";
import { company } from "@/config/company";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects | ${company.name} - Engineering & Infrastructure Project Management` },
      {
        name: "description",
        content: "Explore Milestone Consultancy's project management consultancy projects including highway engineering, infrastructure development, and building construction projects across Maharashtra and India.",
      },
      {
        name: "keywords",
        content: "Milestone Consultancy Projects, Project Management Consultancy, PMC Projects, Highway Projects, Infrastructure Projects, Building Projects, Construction Projects, Engineering Consultancy, Civil Engineering Projects, Government Infrastructure, Private Infrastructure, Maharashtra, India",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },

      { property: "og:title", content: `Projects | ${company.name} - Engineering & Infrastructure Project Management` },
      {
        property: "og:description",
        content: "Explore Milestone Consultancy's project management consultancy projects including highway engineering, infrastructure development, and building construction projects across Maharashtra and India.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://milestoneconsultancy.in/projects",
      },
      {
        property: "og:image",
        content: "https://milestoneconsultancy.in/milestone-logo.jpeg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${company.name} - Project Management Consultancy Projects` },
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "en_IN" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Projects | ${company.name} - Engineering & Infrastructure Project Management` },
      {
        name: "twitter:description",
        content: "Explore Milestone Consultancy's project management consultancy projects including highway engineering, infrastructure development, and building construction projects across Maharashtra and India.",
      },
      {
        name: "twitter:image",
        content: "https://milestoneconsultancy.in/milestone-logo.jpeg",
      },
      { name: "twitter:image:alt", content: `${company.name} - Project Management Consultancy Projects` },
    ],

    links: [
      {
        rel: "canonical",
        href: "https://milestoneconsultancy.in/projects",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": "https://milestoneconsultancy.in/projects#collection-page",
              url: "https://milestoneconsultancy.in/projects",
              name: `Projects | ${company.name} - Engineering & Infrastructure Project Management`,
              description: "Explore Milestone Consultancy's project management consultancy projects including highway engineering, infrastructure development, and building construction projects across Maharashtra and India.",
              isPartOf: {
                "@id": "https://milestoneconsultancy.in#website",
              },
              about: {
                "@id": "https://milestoneconsultancy.in#organization",
              },
              publisher: {
                "@id": "https://milestoneconsultancy.in#organization",
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://milestoneconsultancy.in",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Projects",
                    item: "https://milestoneconsultancy.in/projects",
                  },
                ],
              },
              ...(projects.length > 0 ? {
                mainEntity: {
                  "@type": "ItemList",
                  itemListElement: projects.map((project, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@type": "CreativeWork",
                      name: project.title,
                      description: project.description,
                      url: `https://milestoneconsultancy.in/projects/${project.id}`,
                      ...(project.location && {
                        spatialCoverage: {
                          "@type": "Place",
                          name: project.location,
                        },
                      }),
                    },
                  })),
                  numberOfItems: projects.length,
                },
              } : {}),
            },
            ...(projects.length > 0 ? [{
              "@type": "ItemList",
              "@id": "https://milestoneconsultancy.in/projects#projects-list",
              name: "Milestone Consultancy Projects",
              description: "Project management and engineering consultancy projects delivered across infrastructure, highway, and building sectors.",
              itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Project",
                  name: project.title,
                  description: project.description,
                  url: `https://milestoneconsultancy.in/projects/${project.id}`,
                  status: project.status === "completed" ? "Completed" : 
                          project.status === "ongoing" ? "InProgress" : 
                          "Pending",
                  ...(project.location && {
                    locationCreated: {
                      "@type": "Place",
                      name: project.location,
                    },
                  }),
                  funder: {
                    "@type": "Organization",
                    name: company.name,
                  },
                },
              })),
              numberOfItems: projects.length,
            }] : [{
              "@type": "CollectionPage",
              "@id": "https://milestoneconsultancy.in/projects#collection-page",
              url: "https://milestoneconsultancy.in/projects",
              name: `Projects | ${company.name} - Engineering & Infrastructure Project Management`,
              description: "Projects coming soon. Milestone Consultancy is currently working on exciting infrastructure, highway, and building projects.",
            }]),
          ],
        }),
      },
    ],
  }),
  component: ProjectsPageComponent,
});

function ProjectsPageComponent() {
  const hasProjects = projects.length > 0;

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden" aria-labelledby="projects-heading">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[color:var(--color-brand-navy)] to-[color:var(--color-brand-blue)]" />
        <div className="container-page py-20 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-orange)]" aria-hidden="true" />
              Our Projects
            </span>
            <h1 id="projects-heading" className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              Building India's
              <span className="block text-[color:var(--color-brand-orange)]">
                Infrastructure Future
              </span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl">
              From highways to urban infrastructure, we deliver excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" aria-labelledby="project-list-heading">
        <div className="container-page">
          {hasProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <ComingSoon />
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function ProjectCard({ project }: { project: any }) {
  const statusColors = {
    ongoing: "bg-yellow-500/20 text-yellow-500",
    completed: "bg-green-500/20 text-green-500",
    upcoming: "bg-blue-500/20 text-blue-500",
  };

  const statusIcons = {
    ongoing: <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />,
    completed: <CheckCircle className="h-3 w-3" aria-hidden="true" />,
    upcoming: <Clock className="h-3 w-3" aria-hidden="true" />,
  };

  return (
    <article className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-elegant)]">
      <div className="relative h-48 bg-gradient-to-br from-[color:var(--color-brand-navy)]/10 to-[color:var(--color-brand-orange)]/10 flex items-center justify-center">
        <Building2 className="h-12 w-12 text-[color:var(--color-brand-navy)]/20" aria-hidden="true" />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${statusColors[project.status]}`}>
            {statusIcons[project.status]}
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <RouteIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{project.category}</span>
        </div>
        <h3 className="text-xl font-semibold text-[color:var(--color-brand-navy)] group-hover:text-[color:var(--color-brand-orange)] transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{project.location}</span>
          </div>
          {project.client && (
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{project.client}</span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className="mt-4 px-0 text-[color:var(--color-brand-orange)] hover:text-[color:var(--color-brand-orange)]/80 hover:bg-transparent"
          aria-label={`View details of ${project.title}`}
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}

function ComingSoon() {
  return (
    <section className="text-center py-20" aria-labelledby="coming-soon-heading">
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-brand-orange)]/20" aria-hidden="true" />
        <div className="relative inline-flex h-32 w-32 items-center justify-center rounded-full bg-[color:var(--color-brand-orange)]/10 border-2 border-[color:var(--color-brand-orange)]/30">
          <HardHat className="h-16 w-16 text-[color:var(--color-brand-orange)]" aria-hidden="true" />
        </div>
      </div>
      <h2 id="coming-soon-heading" className="font-display text-3xl sm:text-4xl font-bold text-[color:var(--color-brand-navy)]">
        🚧 Projects Coming Soon
      </h2>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        We're currently working on exciting engineering and infrastructure projects. Stay tuned!
      </p>
      <div className="mt-12 flex justify-center gap-4" aria-hidden="true">
        <div className="h-1 w-16 rounded-full bg-[color:var(--color-brand-orange)]/30" />
        <div className="h-1 w-16 rounded-full bg-[color:var(--color-brand-orange)]/50" />
        <div className="h-1 w-16 rounded-full bg-[color:var(--color-brand-orange)]/30" />
      </div>
      <div className="mt-12">
        <Button
          asChild
          className="rounded-full bg-[color:var(--color-brand-orange)] hover:bg-[color:var(--color-brand-orange)]/90 text-white"
        >
          <a href="/contact">
            Discuss Your Project
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>
  );
}