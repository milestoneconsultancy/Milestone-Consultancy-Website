/**
 * Single source of truth for company information.
 * Update this file to reflect any change across the site.
 */
export const company = {
  name: "Milestone Consultancy",
  legalName: "Milestone Consultancy LLP",
  tagline: "Engineering Tomorrow. Delivering Excellence.",
  shortDescription:
    "An Indian Project Management Consultancy delivering highway, infrastructure and building projects with engineering precision.",
  industry: "Project Management Consultancy (PMC)",
  founded: 2024,

  contact: {
    phone: "+91 8452845537",
    phoneHref: "tel:+918452845537",
    email: "milestoneconsultancyllp@gmail.com",
    emailHref: "mailto:milestoneconsultancyllp@gmail.com",
    // ✅ WhatsApp
    whatsappNumber: "+91 8452845537",
    whatsappMessage: "Hello! I would like to know more about your services.",
  },

  address: {
    line1: "Kalyan",
    line2: "Maharashtra – 421301",
    country: "India",
    full: "Kalyan, Maharashtra – 421301, India",
  },

  workingHours: [
    { days: "Monday – Saturday", hours: "9:30 AM – 6:30 PM" },
    { days: "Sunday", hours: "Closed" },
  ],

  socials: {
    linkedin: "#",
    twitter: "#",
    facebook: "#",
    instagram: "#",
  },

  googleMapsEmbed:
    "https://www.google.com/maps?q=Kalyan,+Maharashtra+421301,+India&output=embed",
  googleMapsUrl: "https://www.google.com/maps?q=Kalyan,+Maharashtra+421301,+India",

  brand: {
    logoSrc: "/milestone-logo.jpeg",
    logoAlt: "Milestone Consultancy",
  },
} as const;

export type Company = typeof company;