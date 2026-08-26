// src/config/projects.ts
export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  description: string;
  image?: string;
  client?: string;
  startDate?: string;
  completionDate?: string;
}

export const projects: Project[] = [
  // ✅ Future projects will be added here
  // Example:
  // {
  //   id: 1,
  //   title: "Alibaug Coastal Highway",
  //   category: "Highway Engineering",
  //   location: "Alibaug, Maharashtra",
  //   status: "ongoing",
  //   description: "4-lane coastal highway project with 3 bridges...",
  //   client: "Maharashtra Government",
  //   startDate: "2025-08-01",
  //   completionDate: "2026-12-31"
  // }
];