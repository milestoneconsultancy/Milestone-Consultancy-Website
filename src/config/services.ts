import {
  Briefcase,
  Route,
  Building2,
  Building,
  Ruler,
  Receipt,
  CalendarClock,
  FileSignature,
  ShieldCheck,
  FolderKanban,
  HardHat,
  FileSearch,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  description: string;
}

export const services: Service[] = [
  // ============ NEW SERVICES (Top मध्ये) ============
  {
    slug: "prebid-engineering-services",
    title: "Prebid Engineering Services",
    icon: FileSearch,
    summary:
      "Comprehensive pre-bid engineering support for informed bidding decisions.",
    description:
      "Feasibility studies, cost estimation, technical due diligence, and bid preparation support to ensure competitive and accurate project proposals.",
  },
  {
    slug: "project-management-consultancy-new",
    title: "Project Management Consultancy",
    icon: Briefcase,
    summary:
      "Structured planning, disciplined execution and rigorous monitoring across the full project lifecycle.",
    description:
      "End-to-end project stewardship from inception through commissioning with structured planning, disciplined execution and rigorous monitoring across the full project lifecycle.",
  },
  {
    slug: "construction-management-services",
    title: "Construction Management Services",
    icon: Wrench,
    summary:
      "End-to-end construction management for successful project delivery.",
    description:
      "Comprehensive construction management including planning, coordination, quality control, safety oversight, and project execution from groundbreaking to handover.",
  },

  // ============ EXISTING SERVICES ============
  {
    slug: "highway-engineering",
    title: "Highway Engineering",
    icon: Route,
    summary:
      "Geometric design, pavement, drainage and highway construction supervision.",
    description:
      "Design review, quality supervision and technical assurance for national and state highway works.",
  },
  {
    slug: "infrastructure-consultancy",
    title: "Infrastructure Consultancy",
    icon: Building2,
    summary:
      "Advisory across roads, bridges, urban infrastructure and public works.",
    description:
      "Independent engineering advice for concept, feasibility, detailed design and delivery of infrastructure assets.",
  },
  {
    slug: "building-consultancy",
    title: "Building Consultancy",
    icon: Building,
    summary:
      "Technical consultancy for residential, commercial and institutional buildings.",
    description:
      "Design coordination, execution planning and construction supervision for building projects.",
  },
  {
    slug: "quantity-surveying",
    title: "Quantity Surveying",
    icon: Ruler,
    summary: "Accurate measurement, cost control and commercial management.",
    description:
      "BOQ preparation, quantity take-offs, cost estimation and value engineering to protect project economics.",
  },
  {
    slug: "billing-engineering",
    title: "Billing Engineering",
    icon: Receipt,
    summary:
      "Contractor billing, RA bills, joint measurement and reconciliation.",
    description:
      "Transparent billing workflows aligned with contract conditions and measurement standards.",
  },
  {
    slug: "planning-scheduling",
    title: "Planning & Scheduling",
    icon: CalendarClock,
    summary: "Baseline schedules, look-aheads and progress analytics.",
    description:
      "Primavera and MS Project based scheduling, delay analysis and recovery planning.",
  },
  {
    slug: "contract-management",
    title: "Contract Management",
    icon: FileSignature,
    summary: "FIDIC and Indian contract administration and claim management.",
    description:
      "Contract compliance, correspondence, variation orders and dispute avoidance support.",
  },
  {
    slug: "qa-qc",
    title: "QA / QC",
    icon: ShieldCheck,
    summary:
      "Independent quality assurance and quality control for site works.",
    description:
      "Method statements, ITPs, checklists and third-party inspection frameworks.",
  },
  {
    slug: "documentation",
    title: "Documentation",
    icon: FolderKanban,
    summary:
      "Structured project documentation, DPRs, MPRs and closeout records.",
    description:
      "Daily, weekly and monthly reporting with audit-ready project record keeping.",
  },
  {
    slug: "site-coordination",
    title: "Site Coordination",
    icon: HardHat,
    summary:
      "Resident engineering and multi-agency site coordination on the ground.",
    description:
      "Supervision teams, safety oversight and coordination across owner, contractor and stakeholders.",
  },
];