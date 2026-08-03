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

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Milestone Consultancy" },
      {
        name: "description",
        content: "Explore our ongoing and completed projects.",
      },
    ],
  }),
  component: ProjectsPageComponent,
});

function ProjectsPageComponent() {
  const hasProjects = projects.length > 0;

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[color:var(--color-brand-navy)] to-[color:var(--color-brand-blue)]" />
        <div className="container-page py-20 text-white">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand-orange)]" />
              Our Projects
            </span>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
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

      <section className="py-16 lg:py-24">
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
    ongoing: <Loader2 className="h-3 w-3 animate-spin" />,
    completed: <CheckCircle className="h-3 w-3" />,
    upcoming: <Clock className="h-3 w-3" />,
  };

  return (
    <div className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-elegant)]">
      <div className="relative h-48 bg-gradient-to-br from-[color:var(--color-brand-navy)]/10 to-[color:var(--color-brand-orange)]/10 flex items-center justify-center">
        <Building2 className="h-12 w-12 text-[color:var(--color-brand-navy)]/20" />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${statusColors[project.status]}`}>
            {statusIcons[project.status]}
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <RouteIcon className="h-3.5 w-3.5" />
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
            <MapPin className="h-3.5 w-3.5" />
            <span>{project.location}</span>
          </div>
          {project.client && (
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{project.client}</span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className="mt-4 px-0 text-[color:var(--color-brand-orange)] hover:text-[color:var(--color-brand-orange)]/80 hover:bg-transparent"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="text-center py-20">
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-brand-orange)]/20" />
        <div className="relative inline-flex h-32 w-32 items-center justify-center rounded-full bg-[color:var(--color-brand-orange)]/10 border-2 border-[color:var(--color-brand-orange)]/30">
          <HardHat className="h-16 w-16 text-[color:var(--color-brand-orange)]" />
        </div>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-[color:var(--color-brand-navy)]">
        🚧 Projects Coming Soon
      </h2>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        We're currently working on exciting projects. Stay tuned!
      </p>
      <div className="mt-12 flex justify-center gap-4">
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
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}