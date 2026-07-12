export type ProjectImage = {
  src: string
  alt: string
  /** Optional one-line caption shown under the image in the case study. */
  caption?: string
}

export type Project = {
  slug: string
  name: string
  description: string
  tech: string[]
  role?: string
  proof?: string
  github?: string
  live?: string
  featured?: boolean
  /** Card / hover thumbnail — first gallery image. */
  image?: string
  imageAlt?: string
  /** Case-study narrative shown on /work/[slug]. */
  problem?: string
  approach?: string
  result?: string
  highlights?: string[]
  /** Detail-page gallery — real UI, run locally with mock data. */
  images?: ProjectImage[]
}

// Flagship systems — mostly private / client & org repos, so most have no public link.
// Descriptions & stacks sourced from the actual local repos.
export const projects: Project[] = [
  {
    slug: 'multi-llm-chat',
    name: 'Multi-LLM Chat Platform',
    description:
      'ChatGPT-style chat platform with a pluggable provider layer (OpenAI / Anthropic / Gemini), auth and chat history. Next.js BFF over an async FastAPI backend, shipped with Docker + Caddy.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    proof: '3 LLM providers behind one abstraction · separate renderer + reranker services',
    featured: true,
    image: '/shots/corpai-models.webp',
    imageAlt:
      'Chat workspace answering a REST vs GraphQL question, with the model picker open showing OpenAI, Anthropic and Gemini models',
    problem:
      'A team wanted one internal chat workspace across OpenAI, Anthropic and Gemini — with real auth, saved history and their own knowledge base — instead of paying for three separate tools and leaking data into each.',
    approach:
      'A Next.js app owns only the UI and a thin BFF; all business logic lives in an async FastAPI service that abstracts every provider behind one interface, streams responses over SSE, and keeps conversations in Postgres. Auth is mandatory-MFA (TOTP), and knowledge search runs through a separate renderer + reranker service so retrieval scales independently of chat.',
    result:
      'Switching models mid-conversation keeps full context; the provider layer means a new model is a config change, not a rewrite. RAG, rerank and document rendering each run as their own service so one heavy request never blocks the chat path.',
    highlights: [
      '3 providers (OpenAI / Anthropic / Gemini) behind a single abstraction',
      'Mandatory TOTP MFA — fail-closed login',
      'Separate renderer + reranker services for RAG',
      'Streaming SSE responses with server-side history',
    ],
    images: [
      {
        src: '/shots/corpai-models.webp',
        alt: 'Chat answering a REST vs GraphQL question with the model picker open',
        caption: 'Model picker — switch between OpenAI, Anthropic and Gemini mid-conversation.',
      },
    ],
  },
  {
    slug: 'smartmath',
    role: 'Full-stack developer — team project',
    name: 'SmartMath',
    description:
      'AI math-learning platform: RAG chat over real textbooks, auto quiz generation and summaries. RabbitMQ job pipeline, Redis rate-limiting, Pinecone retrieval + rerank.',
    tech: ['Elysia · Bun', 'LangChain', 'Pinecone', 'RabbitMQ', 'MinIO'],
    proof: 'async job pipeline — RabbitMQ workers · Redis throttling · SSE status',
    featured: true,
    image: '/shots/smartmath-chat-top.webp',
    imageAlt:
      'SmartMath learning workspace — lesson progress, textbook PDF viewer and RAG chat answering a trigonometry question with rendered math',
    problem:
      'Students needed to ask questions against their actual textbook, not a generic model — and get grounded answers with citations, plus quizzes generated from the same material.',
    approach:
      'Textbooks are chunked into Pinecone; a LangChain RAG pipeline retrieves, reranks and answers with page-level citations, rendering math as LaTeX beside the source PDF. Quiz and summary generation are heavy, so they run as RabbitMQ jobs consumed by workers, with Redis rate-limiting and SSE pushing job status back to the UI.',
    result:
      'The chat answers from the real book with sources; lesson progress and quizzes are driven by an async pipeline that never blocks the request thread. Retrieval quality is tunable (multi-query, RRF, rerank) without touching the frontend.',
    highlights: [
      'RAG over real textbooks with page-level citations',
      'RabbitMQ job pipeline for quiz / summary generation',
      'Redis rate-limiting + SSE job status',
      'LaTeX math rendered beside the source PDF',
    ],
    images: [
      {
        src: '/shots/smartmath-chat-top.webp',
        alt: 'Lesson progress, textbook PDF and RAG chat answering a trigonometry question',
        caption: 'Three-pane workspace — lessons, source PDF, and grounded RAG chat with rendered math.',
      },
      {
        src: '/shots/smartmath-home.webp',
        alt: 'Home — lesson modules with progress',
        caption: 'Module picker — each subject tracks its own progress.',
      },
    ],
  },
  {
    slug: 'repair-platform',
    name: 'Repair Service Platform',
    description:
      'Repair-job platform for a service company in four apps — admin, superadmin, LIFF, Expo mobile — with PDF generation, push notifications and OpenTelemetry tracing.',
    tech: ['Elysia · Bun', 'Prisma', 'Expo', 'LINE LIFF'],
    proof: '4 apps on one Bun API — admin · superadmin · LIFF · Expo mobile',
    featured: true,
    image: '/shots/repair-dashboard.webp',
    imageAlt:
      'Repair admin dashboard — job totals with per-status breakdown from pending through safety check to verified',
    problem:
      'A manufacturing service company ran repair requests on paper and chat — no status visibility, no approval trail, no way for technicians and safety staff to sign off before a job closed.',
    approach:
      'One Bun/Elysia API drives four surfaces: an admin dashboard, a superadmin console, a LINE LIFF app for reporters, and an Expo mobile app for technicians. Every repair moves through an explicit state machine (pending → safety check → in progress → completed → verified) with role-scoped approvals, PDF work orders, push notifications and OpenTelemetry tracing across the whole flow.',
    result:
      'Repairs now have a single source of truth with an auditable approval chain; the same API serves web, LIFF and mobile so nobody re-enters data. Status is visible at a glance on the dashboard.',
    highlights: [
      'One Bun API behind admin · superadmin · LIFF · Expo mobile',
      'Explicit repair state machine with role-scoped approvals',
      'PDF work orders + push notifications',
      'OpenTelemetry tracing end to end',
    ],
    images: [
      {
        src: '/shots/repair-dashboard.webp',
        alt: 'Repair dashboard — job totals with per-status breakdown',
        caption: 'Dashboard — live counts across every repair status.',
      },
      {
        src: '/shots/repair-repairs.webp',
        alt: 'Repair job list with priority, status, section and technician columns',
        caption: 'Job list — every repair with priority, status and assigned technician.',
      },
      {
        src: '/shots/repair-stock.webp',
        alt: 'Parts stock table with brand, rank, min/max and on-hand quantity',
        caption: 'Parts / stock — inventory with reorder points and stock rank.',
      },
    ],
  },
  {
    slug: 'logistics-line-oa',
    name: 'Logistics LINE OA Manager',
    description:
      'LINE OA group manager + shipment tracking for a Thai logistics company: automated mention replies, broadcasts, product carousels, AI intent analysis, Azure AD login.',
    tech: ['Next.js', 'LINE Bot SDK', 'OpenAI', 'Prisma'],
    proof: 'AI intent analysis + human review loop · Azure AD SSO',
    featured: true,
    image: '/shots/fdj-dashboard.webp',
    imageAlt:
      'LINE OA group manager dashboard — broadcast reach, group breakdown by business type, broadcast activity and mention engagement',
    problem:
      'A logistics company managed dozens of customer LINE groups by hand — answering the same price/hours questions, sending broadcasts one group at a time, and losing track of which shipments customers were asking about.',
    approach:
      'A Next.js console sits on top of the LINE Bot SDK: it auto-replies to @mentions via keyword and regex rules, segments groups by business type for targeted broadcasts, and runs each inbound message through OpenAI intent analysis with a human review loop before anything is sent. Staff sign in with Azure AD SSO.',
    result:
      'Repetitive questions get answered automatically with a measured match rate; broadcasts go to the right segment in one action; and AI intent classification is gated by human review so nothing risky goes out unchecked.',
    highlights: [
      'Keyword + regex mention auto-reply rules',
      'Segmented broadcasts by business type',
      'OpenAI intent analysis with human-in-the-loop review',
      'Azure AD SSO for staff',
    ],
    images: [
      {
        src: '/shots/fdj-dashboard.webp',
        alt: 'LINE OA dashboard — reach, group breakdown, broadcast activity and mention engagement',
        caption: 'Dashboard — broadcast reach, group segments and live mention engagement.',
      },
      {
        src: '/shots/fdj-mentions.webp',
        alt: 'Mention rules — keyword, substring and regex auto-reply rules with match rate',
        caption: 'Mention rules — keyword / substring / regex auto-replies with a live match rate.',
      },
      {
        src: '/shots/fdj-tracking.webp',
        alt: 'Track & Trace — shipments by stage with driver and LINE group',
        caption: 'Track & Trace — shipments by stage, pushing status into the right LINE group.',
      },
    ],
  },
  {
    slug: 'dorm-suite',
    name: 'Dormitory Management Suite',
    description:
      'Dormitory operations for a housing operator — rooms, tenants, billing. OCR meter readings with Tesseract, server-rendered receipt images via Satori.',
    tech: ['Elysia · Bun', 'Prisma', 'Tesseract OCR', 'LIFF'],
    image: '/shots/horpak-invoices.webp',
    imageAlt:
      'Dormitory billing — monthly invoices per room with paid, verifying and overdue statuses',
    problem:
      'A dormitory operator tracked rooms, tenants and monthly water/electric billing in spreadsheets — meter readings were typed by hand and receipts were made one by one.',
    approach:
      'A Bun/Elysia + Prisma backend models branches, rooms, tenants, leases and billing cycles. Meter readings are captured by photo and read with Tesseract OCR; invoices compute per-room utility charges from the reading delta, and receipts are rendered server-side as images via Satori for one-tap LINE delivery.',
    result:
      'Billing runs per branch per month with paid / verifying / overdue states; meter entry is photo-first instead of manual; and every tenant gets a rendered receipt over LINE without a human designing it.',
    highlights: [
      'Photo meter readings via Tesseract OCR',
      'Per-room utility billing from reading deltas',
      'Server-rendered receipt images (Satori)',
      'Multi-branch rooms / tenants / leases',
    ],
    images: [
      {
        src: '/shots/horpak-invoices.webp',
        alt: 'Monthly invoices per room with paid, verifying and overdue statuses',
        caption: 'Billing — per-room invoices with paid / verifying / overdue states.',
      },
      {
        src: '/shots/horpak-meters.webp',
        alt: 'Meter reading entry per room with previous and current water/electric values',
        caption: 'Meter entry — previous vs current water/electric readings per room.',
      },
    ],
  },
  {
    slug: 'field-ops',
    name: 'Field Ops Platform',
    description:
      'Real-time chat + push notifications for a manufacturing team — Expo mobile, admin dashboard and a Socket.IO API.',
    tech: ['Express', 'MongoDB', 'Socket.IO', 'Expo'],
    image: '/shots/fieldops-users.webp',
    imageAlt: 'Field ops admin — user management table with roles and online status',
    problem:
      'A manufacturing team needed real-time chat and push alerts between the floor and the office, plus an admin view of who was online and what role they held.',
    approach:
      'An Express + MongoDB API with Socket.IO powers live messaging and presence; an Expo mobile app is the field client and a web admin manages users, roles and conversations. Push notifications reach staff off-app.',
    result:
      'Messages and presence update in real time across mobile and web; admins manage roles and monitor online status from one table.',
    highlights: [
      'Socket.IO real-time chat + presence',
      'Expo mobile field client',
      'Push notifications off-app',
      'Role-based admin user management',
    ],
    images: [
      {
        src: '/shots/fieldops-users.webp',
        alt: 'User management table with roles and online status',
        caption: 'Admin — user roles and live online status.',
      },
    ],
  },
  {
    slug: 'loyalty-liff',
    name: 'Loyalty & Rewards LIFF',
    description:
      'LINE-based loyalty & rewards platform for a local retail business — points, presigned S3 uploads.',
    tech: ['Next.js', 'Prisma', 'LINE LIFF', 'S3'],
    image: '/shots/earnpoint-users.webp',
    imageAlt:
      'Loyalty admin panel — member list with points, accumulated spend and premium tiers',
    problem:
      'A retail business wanted a LINE-native loyalty program — points per purchase, tiered membership and redeemable rewards — without a separate app install.',
    approach:
      'A Next.js + Prisma app runs inside LINE LIFF: customers earn points and climb day-based and premium tiers, admins manage members, rewards, promotions and redemptions, and reward images upload straight to S3 via presigned URLs. A mock POS drives point accrual in testing.',
    result:
      'Members check points and tier inside LINE; admins run the whole reward catalog and redemption flow from one panel, with membership cycles and premium tiers computed from accumulated spend.',
    highlights: [
      'LINE LIFF — no separate app install',
      'Day-based + premium membership tiers',
      'Presigned S3 uploads for reward images',
      'Admin rewards / promotions / redemptions',
    ],
    images: [
      {
        src: '/shots/earnpoint-users.webp',
        alt: 'Member list with points, accumulated spend and premium tiers',
        caption: 'Admin — members with points, spend and premium tier.',
      },
      {
        src: '/shots/earnpoint-rewards.webp',
        alt: 'Reward catalog with system, redeemable and admin rewards linked to milestones',
        caption: 'Rewards — the catalog, from milestone vouchers to redeemable gifts.',
      },
      {
        src: '/shots/earnpoint-transactions.webp',
        alt: 'Point transaction history',
        caption: 'Transactions — the point-accrual and redemption ledger.',
      },
    ],
  },
  {
    slug: 'fitness-landing',
    name: 'Fitness Brand Platform',
    description: 'Brand platform & landing for a fitness studio with GSAP motion and AI image upscaling.',
    tech: ['Next.js', 'GSAP', 'Tailwind'],
  },
  {
    slug: 'meeting-liff',
    name: 'Meeting LIFF',
    description:
      'LINE LIFF QR check-in + document flow — scan stations, admin console, real-time updates.',
    tech: ['Next.js', 'LINE LIFF', 'Socket.IO', 'Prisma'],
    image: '/shots/meetingliff-dashboard.webp',
    imageAlt: 'Event admin dashboard — active events, connected LINE users and recent-event stats',
    problem:
      'Events needed fast QR check-in and a per-event credit/ordering flow, with organizers seeing registrations and activity live instead of reconciling spreadsheets afterward.',
    approach:
      'A Next.js + LINE LIFF app handles member check-in by QR at scan stations; each event has its own credit balance, products and orders. An admin console manages events, LINE users, products and transactions, with Socket.IO pushing real-time updates as people scan and order.',
    result:
      'Attendees check in and spend event credits from inside LINE; organizers watch registrations, orders and credit flow update live from one dashboard.',
    highlights: [
      'QR check-in at scan stations via LINE LIFF',
      'Per-event credit balances, products and orders',
      'Real-time updates over Socket.IO',
      'Admin console for events / users / transactions',
    ],
    images: [
      {
        src: '/shots/meetingliff-dashboard.webp',
        alt: 'Event admin dashboard — active events, connected LINE users and recent-event stats',
        caption: 'Dashboard — active events, connected LINE users and live stats.',
      },
    ],
  },
  {
    slug: 'cctv-tracking',
    name: 'CCTV Tracking',
    description:
      'Computer-vision pipeline over CCTV/NVR footage — zone + hand detection, event stores, annotated video rendering.',
    tech: ['Python', 'OpenCV', 'SQLite'],
    image: '/shots/cctv-dashboard.webp',
    imageAlt:
      'Cycle-monitor analytics from the CV pipeline — OK/NG rates, per-station breakdown, cycle-time chart and event log',
    problem:
      'A production line needed to know whether workers followed the correct assembly sequence and hand usage per station — data that only existed as raw CCTV/NVR footage nobody had time to watch.',
    approach:
      'A Python + OpenCV pipeline runs YOLO pose estimation over the footage, detects zone entries and which hand acts at each station, and scores every work cycle as OK or NG (wrong sequence, wrong hand, timeout, out-of-range). Events are stored in SQLite and rendered back as an annotated video plus a cycle-monitor dashboard.',
    result:
      'Hours of footage become a per-cycle OK/NG report with reasons, per-station breakdowns and cycle-time trends — turning passive cameras into an assembly-compliance signal. The dashboard shown uses anonymized worker IDs and carries no identifiable footage.',
    highlights: [
      'YOLO pose + zone / hand detection',
      'Per-cycle OK/NG scoring with reason codes',
      'Annotated video rendering',
      'Cycle-time + per-station analytics',
    ],
    images: [
      {
        src: '/shots/cctv-dashboard.webp',
        alt: 'Cycle-monitor analytics — OK/NG rates, per-station breakdown, cycle-time chart and event log',
        caption: 'Cycle monitor — OK/NG rates, per-station breakdown and event log (anonymized IDs).',
      },
    ],
  },
  {
    slug: 'uniqal-staff',
    name: 'Uniqal Staff',
    description: 'Staff / workforce management delivered as a LINE LIFF app.',
    tech: ['Next.js', 'Prisma', 'LINE LIFF'],
    image: '/shots/uniqal-history.webp',
    imageAlt:
      'Check-in/check-out admin — history table with filters, status badges and CSV export',
    problem:
      'A company wanted staff check-in/out tied to real location, managed from LINE, with an admin view of attendance history they could export.',
    approach:
      'A Next.js + Prisma LIFF app lets employees check in and out from LINE with office-geofence validation; an admin manages the employee roster and reviews a filterable check-in/out history with status (on-time / late / remote) and CSV export.',
    result:
      'Attendance is captured inside LINE with location context; admins filter history by employee, location and status and export it in one click.',
    highlights: [
      'LINE LIFF check-in / check-out',
      'Office-geofence validation',
      'On-time / late / remote status',
      'Filterable history + CSV export',
    ],
    images: [
      {
        src: '/shots/uniqal-history.webp',
        alt: 'Check-in/check-out history table with filters, status badges and CSV export',
        caption: 'Admin — attendance history with filters and CSV export.',
      },
      {
        src: '/shots/uniqal-employees.webp',
        alt: 'Employee roster with codes and Thai/English names',
        caption: 'Employee roster — the staff directory behind check-in.',
      },
    ],
  },
  {
    slug: 'facebook-automation',
    name: 'Facebook Automation',
    description: 'Automated Facebook page / content workflows on the Graph API.',
    tech: ['Next.js', 'Prisma', 'Graph API'],
    image: '/shots/fbauto-dashboard.webp',
    imageAlt: 'Auto-post console — compose a page post next to a post-history feed with status',
    problem:
      'Managing several Facebook pages meant logging into each, posting the same content by hand and losing track of what went out where.',
    approach:
      'A Next.js + Prisma app connects pages through the Graph API, stores page tokens encrypted, and gives one console to compose a post, target a page, attach images and schedule it. Every post is logged with its success / pending / failed status.',
    result:
      'One place posts to any connected page, with a running history of what succeeded or failed — no more per-page logins or lost drafts.',
    highlights: [
      'Multi-page posting via Graph API',
      'Encrypted page-token storage',
      'Compose, attach images, schedule',
      'Post history with success / failed status',
    ],
    images: [
      {
        src: '/shots/fbauto-dashboard.webp',
        alt: 'Auto-post console — compose a post next to a post-history feed',
        caption: 'Console — compose and target a post beside the live post history.',
      },
    ],
  },
  {
    slug: 'ai-content-planner',
    name: 'AI Content Planner',
    description: 'Multi-workspace social SaaS with an AI content planner & LINE integration.',
    tech: ['React', 'Supabase', 'shadcn'],
    image: '/shots/contentplanner-landing.webp',
    imageAlt: 'Content platform landing hero — "Start your content" with trial CTA and feature highlights',
    problem:
      'Content teams juggle planning, creating, approving and scheduling across tools and channels — with no shared workspace or approval trail.',
    approach:
      'A React + Vite + Supabase SaaS gives each team a workspace to plan, draft, approve and schedule content, with an AI planner to draft and organize and LINE integration for delivery. Auth, data and multi-tenant workspaces are handled through Supabase.',
    result:
      'Teams run the full content lifecycle — plan → create → approve → schedule — in one multi-workspace app, with AI assisting the drafting and LINE handling distribution.',
    highlights: [
      'Multi-workspace / multi-tenant SaaS',
      'AI-assisted content planning',
      'Approval + scheduling workflow',
      'LINE integration for delivery',
    ],
    images: [
      {
        src: '/shots/contentplanner-landing.webp',
        alt: 'Landing hero — "Start your content" with trial CTA and feature highlights',
        caption: 'Product landing — the content workspace pitch.',
      },
    ],
  },
  {
    slug: 'vein-analysis',
    role: 'Full-stack developer — team project',
    name: 'Nurse / Vein Analysis',
    description:
      'Nursing-research tool for IV-site assessment — structured scoring with clinical flags, dashboards, Excel export, LIFF access.',
    tech: ['Next.js', 'Drizzle', 'Neon', 'LINE LIFF'],
    image: '/shots/nurse-dashboard.webp',
    imageAlt:
      'IV-site assessment dashboard — severity stats, level-distribution donut and daily-trend chart',
    problem:
      'A nursing research team needed structured, consistent IV-site (phlebitis) assessments in the field — with severity scoring and clinical flags — instead of free-text notes they could not analyze.',
    approach:
      'A Next.js + Drizzle/Neon app collects assessments through a LINE LIFF form: redness, pain, swelling, streak, cord and purulence feed a scoring function that computes a severity level and flags severe/purulent cases. An admin dashboard aggregates severity distribution and daily trends with Excel export for the research data.',
    result:
      'Assessments are captured consistently in the field and scored the same way every time; researchers see severity distribution and trends at a glance and export the full dataset for analysis.',
    highlights: [
      'Structured IV-site scoring with clinical flags',
      'LINE LIFF field data collection',
      'Severity distribution + daily-trend dashboards',
      'Excel export for research',
    ],
    images: [
      {
        src: '/shots/nurse-dashboard.webp',
        alt: 'IV-site assessment dashboard — severity stats, level-distribution donut and daily-trend chart',
        caption: 'Dashboard — severity distribution and daily assessment trend.',
      },
      {
        src: '/shots/nurse-responses.webp',
        alt: 'Assessment records table — ward, patient, severity level, with month filters and export',
        caption: 'Records — every assessment with severity level, filterable and exportable.',
      },
    ],
  },
  {
    slug: 'dorm-crm',
    name: 'Dormitory Suite CRM',
    description: 'Sales & customer CRM dashboard for the dormitory management suite.',
    tech: ['Next.js', 'React 19', 'Tailwind'],
    image: '/shots/dormcrm-dashboard.webp',
    imageAlt: 'CRM dashboard — member totals by status with a recent-signups table',
    problem:
      'The dormitory suite needed a sales-side view — who signed up, which accounts were active vs pending, and what package each was on — separate from day-to-day operations.',
    approach:
      'A Next.js + React 19 CRM sits alongside the operations suite: it tracks members and their subscription status, packages and discount codes, and surfaces signups, active vs pending counts and recent activity on a dashboard.',
    result:
      'The sales side gets its own dashboard for membership status, packages and recent signups — decoupled from the operational billing app.',
    highlights: [
      'Member + subscription status tracking',
      'Packages and discount codes',
      'Signup / active / pending overview',
      'Separate from the operations suite',
    ],
    images: [
      {
        src: '/shots/dormcrm-dashboard.webp',
        alt: 'CRM dashboard — member totals by status with a recent-signups table',
        caption: 'Dashboard — membership status and recent signups.',
      },
      {
        src: '/shots/dormcrm-members.webp',
        alt: 'Member directory with status, source and signup date',
        caption: 'Members — the full directory with status and source.',
      },
    ],
  },
  {
    slug: 'dukpyra',
    role: 'Full-stack developer — team project',
    name: 'Dukpyra',
    description:
      'A web framework where you write Python and it runs on .NET — own compiler, CLI and dev server.',
    tech: ['Python', '.NET', 'Compiler'],
    image: '/shots/dukpyra-compiler.webp',
    imageAlt: 'Compiler view — Python route decorators on the left, generated C# .NET minimal-API on the right',
    problem:
      'We wanted the ergonomics of writing an API in Python decorators, but the runtime performance of .NET — normally a choice you can only make one way.',
    approach:
      'Dukpyra is a source-to-source compiler: you write routes as Python `@app.get(...)` decorators, and it transpiles them to a C# .NET minimal-API `Program.cs`, wrapped in a CLI (`init` / `build` / `run` / `dev`) with a hot-reload dev server. The image is the real generated output from `dukpyra build`.',
    result:
      'Python-style route definitions compile to a runnable .NET service — the developer writes the language they like and ships on the runtime they want, driven by a single CLI.',
    highlights: [
      'Python decorators → C# minimal API',
      'Own source-to-source compiler',
      'CLI: init / build / run / dev',
      'Hot-reload dev server',
    ],
    images: [
      {
        src: '/shots/dukpyra-compiler.webp',
        alt: 'Python route decorators on the left, generated C# .NET minimal-API on the right',
        caption: 'Compiler output — Python decorators (left) transpiled to C# .NET (right), from a real `dukpyra build`.',
      },
    ],
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
