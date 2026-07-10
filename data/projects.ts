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
// Descriptions & stacks sourced from the actual local repos.
export const projects: Project[] = [
  {
    slug: 'corpai',
    name: 'CorpAi',
    description:
      'ChatGPT-style chat platform with a pluggable provider layer (OpenAI / Anthropic / Gemini), auth and chat history. Next.js BFF over an async FastAPI backend, shipped with Docker + Caddy.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    featured: true,
  },
  {
    slug: 'mathbooklm',
    name: 'MathBookLM',
    description:
      'AI math-learning platform: RAG chat over real textbooks, auto quiz generation and summaries. RabbitMQ job pipeline, Redis rate-limiting, Pinecone retrieval + rerank.',
    tech: ['Elysia · Bun', 'LangChain', 'Pinecone', 'RabbitMQ', 'MinIO'],
    featured: true,
  },
  {
    slug: 'repair-pro',
    name: 'Repair-Pro',
    description:
      'Repair-job platform in four apps — admin, superadmin, LIFF, Expo mobile — with PDF generation, push notifications and OpenTelemetry tracing.',
    tech: ['Elysia · Bun', 'Prisma', 'Expo', 'LINE LIFF'],
    featured: true,
  },
  {
    slug: 'fdj-logistics',
    name: 'FDJ Logistics',
    description:
      'LINE OA group manager + shipment tracking: automated mention replies, broadcasts, product carousels, AI intent analysis, Azure AD login.',
    tech: ['Next.js', 'LINE Bot SDK', 'OpenAI', 'Prisma'],
  },
  {
    slug: 'langhorpak',
    name: 'LangHorpak',
    description:
      'Dormitory management — rooms, tenants, billing. OCR meter readings with Tesseract, server-rendered receipt images via Satori.',
    tech: ['Elysia · Bun', 'Prisma', 'Tesseract OCR', 'LIFF'],
  },
  {
    slug: 'resonac-app',
    name: 'Resonac App',
    description:
      'Real-time chat + push notifications across Expo mobile, admin dashboard and a Socket.IO API.',
    tech: ['Express', 'MongoDB', 'Socket.IO', 'Expo'],
  },
  {
    slug: 'water-center-77',
    name: 'Water Center 77',
    description:
      'LINE-based loyalty & rewards platform for a water refill business — points, presigned S3 uploads.',
    tech: ['Next.js', 'Prisma', 'LINE LIFF', 'S3'],
  },
  {
    slug: 'prime-fit',
    name: 'Prime FIT',
    description: 'Fitness brand platform & landing with GSAP motion and AI image upscaling.',
    tech: ['Next.js', 'GSAP', 'Tailwind'],
  },
  {
    slug: 'meeting-liff',
    name: 'Meeting LIFF',
    description:
      'LINE LIFF QR check-in + document flow — scan stations, admin console, real-time updates.',
    tech: ['Next.js', 'LINE LIFF', 'Socket.IO', 'Prisma'],
  },
  {
    slug: 'cctv-tracking',
    name: 'CCTV Tracking',
    description:
      'Computer-vision pipeline over CCTV/NVR footage — zone + hand detection, event stores, annotated video rendering.',
    tech: ['Python', 'OpenCV', 'SQLite'],
  },
  {
    slug: 'uniqal-staff',
    name: 'Uniqal Staff',
    description: 'Staff / workforce management delivered as a LINE LIFF app.',
    tech: ['Next.js', 'Prisma', 'LINE LIFF'],
  },
  {
    slug: 'facebook-automation',
    name: 'Facebook Automation',
    description: 'Automated Facebook page / content workflows on the Graph API.',
    tech: ['Next.js', 'Prisma', 'Graph API'],
  },
  {
    slug: 'ai-content-planner',
    name: 'AI Content Planner',
    description: 'Multi-workspace social SaaS with an AI content planner & LINE integration.',
    tech: ['React', 'Supabase', 'shadcn'],
  },
  {
    slug: 'vein-analysis',
    name: 'Nurse / Vein Analysis',
    description:
      'Nursing-research tool for IV-site assessment — structured scoring with clinical flags, dashboards, Excel export, LIFF access.',
    tech: ['Next.js', 'Drizzle', 'Neon', 'LINE LIFF'],
  },
  {
    slug: 'langhorpak-crm',
    name: 'LangHorpak CRM',
    description: 'Housing sales & customer CRM dashboard for the LangHorpak system.',
    tech: ['Next.js', 'React 19', 'Tailwind'],
  },
  {
    slug: 'dukpyra',
    name: 'Dukpyra',
    description:
      'A web framework where you write Python and it runs on .NET — own compiler, CLI and dev server.',
    tech: ['Python', '.NET', 'Compiler'],
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
