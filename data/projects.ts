export type Project = {
  slug: string
  name: string
  description: string
  tech: string[]
  github?: string
  live?: string
  featured?: boolean
}

// Flagship systems — mostly private / client & org repos, so most have no public link.
export const projects: Project[] = [
  {
    slug: 'corpai',
    name: 'CorpAi',
    description: 'ChatGPT-style multi-provider LLM chat with RAG.',
    tech: ['FastAPI', 'Next.js', 'Docker', 'Vector DB'],
    featured: true,
  },
  {
    slug: 'mathbooklm',
    name: 'MathBookLM',
    description: 'AI math learning platform — RAG + OCR pipeline.',
    tech: ['Next.js', 'PostgreSQL', 'Docker'],
    featured: true,
  },
  {
    slug: 'repair-pro',
    name: 'Repair-Pro',
    description: 'Multi-service repair platform (LIFF + dashboard + PDF engine).',
    tech: ['Elysia', 'Bun', 'Nuxt', 'Python'],
    featured: true,
  },
  {
    slug: 'fdj-logistics',
    name: 'FDJ Logistics',
    description: 'LINE OA tracking + group-manager bot + infra.',
    tech: ['Next.js', 'Bun', 'Prisma', 'Docker'],
  },
  {
    slug: 'langhorpak',
    name: 'LangHorpak',
    description: 'Housing CRM + tenant frontend + API.',
    tech: ['Next.js', 'Elysia', 'Bun', 'Prisma'],
  },
  {
    slug: 'resonac-app',
    name: 'Resonac App',
    description: 'Admin dashboard + REST API + mobile app.',
    tech: ['Next.js', 'Express', 'Expo'],
  },
  {
    slug: 'water-center-77',
    name: 'Water Center 77',
    description: 'Real-world customer loyalty & rewards platform.',
    tech: ['Next.js', 'Prisma', 'MinIO'],
  },
  {
    slug: 'prime-fit',
    name: 'Prime FIT',
    description: 'Fitness brand platform & landing.',
    tech: ['Next.js', 'Bun', 'Tailwind'],
  },
  {
    slug: 'meeting-liff',
    name: 'Meeting LIFF',
    description: 'LINE LIFF meeting + QR document flow.',
    tech: ['Next.js', 'Bun', 'Prisma'],
  },
  {
    slug: 'cctv-tracking',
    name: 'CCTV Tracking',
    description: 'Computer-vision people/object tracking.',
    tech: ['Python', 'OpenCV'],
  },
  {
    slug: 'uniqal-staff',
    name: 'Uniqal Staff',
    description: 'Staff / workforce management system.',
    tech: ['Next.js', 'Prisma', 'Tailwind'],
  },
  {
    slug: 'facebook-automation',
    name: 'Facebook Automation',
    description: 'Automated FB page / content workflows.',
    tech: ['Next.js', 'Prisma'],
  },
  {
    slug: 'ai-content-planner',
    name: 'AI Content Planner',
    description: 'Multi-workspace social SaaS with AI planner & LINE.',
    tech: ['React', 'Supabase', 'shadcn'],
  },
  {
    slug: 'vein-analysis',
    name: 'Nurse / Vein Analysis',
    description: 'Research tool for medical vein detection.',
    tech: ['Next.js', 'Drizzle', 'Tailwind'],
  },
  {
    slug: 'langhorpak-crm',
    name: 'LangHorpak CRM',
    description: 'Housing sales & customer CRM dashboard.',
    tech: ['Next.js', 'React', 'Tailwind'],
  },
  {
    slug: 'dukpyra',
    name: 'Dukpyra',
    description: 'Pythonic web framework powered by .NET.',
    tech: ['Python', '.NET'],
  },
  {
    slug: 'off-by-none',
    name: 'off-by-none',
    description:
      'A Claude Code skill for spec-faithful implementation — spec-derived tests, boundary coverage, adversarial spec re-reads.',
    tech: ['Claude Code', 'Shell'],
    github: 'https://github.com/NTCHz/off-by-none',
  },
]
