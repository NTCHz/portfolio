# Portfolio Roadmap

สถานะ ณ 2026-07-11: เว็บ live ที่ portfolio.vlls.space — poster design, resume PDF,
Lighthouse A11y 100 / SEO 100 / BP 96, JSON-LD + llms.txt + sitemap ครบ
Infra: Proxmox → Coolify (VM 4 cores / 12GB RAM / 99GB disk, auto-cleanup ทุก 4 ชม.)

---

## Phase A — Screenshots ทุก project (แผนที่ตกลงกันแล้ว)

หลักการ: **รัน dev ในเครื่อง + mock data** → screenshot → ใส่เว็บ
(ไม่ deploy โค้ดลูกค้า public, ไม่มีข้อมูลจริงหลุด, เลี่ยงหน้าที่มีราคา/ข้อมูล sensitive)

**เงื่อนไขหลัง anonymize ชื่อ (2026-07-11):** ภาพต้องสอดคล้องกับชื่อกลางบนเว็บ —
ซ่อน/แก้ logo+ชื่อแบรนด์ใน UI ก่อน screenshot (แก้ config ชื่อแอป หรือเบลอ/crop header),
เลือกหน้า generic ที่โชว์สกิลไม่โชว์แบรนด์. Fitness landing = ทั้งหน้าเป็นแบรนด์ลูกค้า → ข้ามหรือขออนุญาตก่อน

ขั้นตอนต่อ project:
1. รัน dev จาก `~/Projects/DIY_ENGINEERING/<repo>` (ส่วนใหญ่มี docker-compose)
2. seed mock data
3. screenshot หน้าเด่น 1-2 หน้า @1440px — เลือกหน้าที่ขายสกิล
4. ใส่เข้าเว็บ: featured card ได้ภาพ, archive row ได้ thumbnail

ลำดับตามความง่าย:
- [x] ง่าย (2026-07-12): Multi-LLM Chat (ภาพ chat + model picker), Uniqal Staff (ภาพ history), Loyalty LIFF (ภาพ users + rewards)
      — Fitness landing ข้าม (ทั้งหน้าเป็นแบรนด์ลูกค้า ต้องขออนุญาตก่อน)
      — วิธี: postgres ชั่วคราวใน docker (`shot-pg`, หยุดไว้ — `docker start shot-pg` ใช้ต่อได้) + mock seed, override brand ผ่าน env/JS ก่อนถ่าย
      — ภาพ raw อยู่ `.shots/` (gitignored), optimized webp อยู่ `public/shots/`
- [x] กลาง (2026-07-12): Repair platform (ใช้ `New_generation/` — seed QA ในตัว, ภาพ dashboard),
      Logistics LINE OA (forge session cookie ด้วย AUTH_SECRET demo, ภาพ dashboard + mention rules),
      Dorm Suite (mock บิล/มิเตอร์ทาง SQL, ภาพ invoices + meters), Field Ops (Resonac-Admin + mongo ชั่วคราว `shot-mongo`, ภาพ users)
- [x] หนัก (2026-07-12): SmartMath — frontend + mock API (bun ไฟล์เดียว, scratchpad) + เสิร์ฟ trigon.pdf จริง
      ภาพ 3-pane: บทเรียน + PDF + RAG chat มี LaTeX — **ภาพชุดนี้เป็น mockup UI จริง แต่คำตอบ AI เป็น canned data**

หน้าที่ควรเก็บ: chat UI (multi-LLM chat), RAG/quiz (SmartMath), job dashboard (repair platform),
LINE OA admin + intent review (logistics), ตาราง billing + OCR meter (dorm suite)

## Phase A รอบ 2 (2026-07-12) — เก็บที่เหลือครบ

ได้เพิ่ม 7 ระบบ → รวม **15/17 มีภาพจริงบนเว็บ** (เหลือแค่ fitness-landing + off-by-none):
- Dorm CRM (langhorpak-crm) — stack เดียวกับ horpak
- Meeting LIFF (liff_qr_doc) — mock event/orders ทาง SQL, forge session cookie ไม่ได้ ใช้ admin login demo
- Facebook Automation (facebook_auto/facebook_automation) — mock pages/posts, guard เป็น localStorage+cookie set เอง
- Nurse/Vein (nurseProject) — Neon serverless driver ต่อ local ไม่ได้ → swap เป็น node-postgres ชั่วคราวแล้ว **revert คืนแล้ว** (git checkout)
- Dukpyra — ไม่ใช่ web UI → ทำ code diptych (Python→C# จริงจาก `dukpyra build`) เป็น HTML แล้ว screenshot
- CCTV — ใช้ `dash_shot.png` ที่มีอยู่ (analytics ล้วน ไม่มีหน้าคน worker เป็นเลข ID) — **ห้ามใช้ frame ที่มีคนจริง**
- AI Content Planner (facebook_auto/count-project, Lovable/Vite/Supabase) — ถ่าย Landing hero, ไม่แตะ Supabase cloud

หมายเหตุ: content ต้อง force `opacity:1` ก่อนถ่าย (GSAP scroll animation ไม่ fire ใน headless)

## Case study detail pages (2026-07-12/13)

เปลี่ยนจาก "ภาพในการ์ด" เป็น **หน้า detail กดเข้าได้** ต่อ project:
- `app/work/[slug]/page.tsx` — 15 หน้า prerendered (Next 16: `params` เป็น Promise ต้อง await ไม่งั้น 404)
- เนื้อหา case study: The problem / approach / result + highlights + tech chips + architecture diagram + image gallery
- home: featured card มีปุ่ม "Read case study →" + archive row กดเข้า detail (off-by-none คงลิงก์ GitHub)
- featured card ในหน้าแรก: ภาพเป็น hover-reveal ลอย (typography เป็นพระเอกตอนโหลด) — plan B
- **ถ่ายรูปเพิ่ม phase 2:** 26 รูปรวม, featured ได้ 2-3/อัน (repair/logistics/loyalty=3), archive ส่วนใหญ่ 2
  - บางแอปคง 1 รูปเพราะมี view เดียวจริง (multi-llm=model picker แข็งอยู่แล้ว+MFA re-enroll แพง, facebook=composer, cctv=analytics only, meeting=flaky, ai-planner=landing, dukpyra=diptych, field-ops=users)
  - recipe login/cookie แต่ละแอปอยู่ `scratchpad/phase2-plan.md`

## Phase B — Demo ของตัวเอง (IP เราเอง 100%)

สร้าง mini-project ใหม่ที่โชว์สกิลเดียวกับงานลูกค้า → deploy บน homelab + open-source:
- [x] **mini RAG chat** (2026-07-13) — ทำเป็น route ในพอร์ต `/playground` "Ask my portfolio" แทน subdomain แยก
      (live ทันทีตอน push, discoverable ในเว็บ, $0). **BYOK**: visitor วาง OpenAI key เอง (localStorage), ยิงตรง
      OpenAI ไม่ผ่าน server เรา. corpus = ข้อมูลโปรเจกต์จริง (`lib/rag.ts`), retrieval = BM25-lite ใน browser (k=6),
      streaming SSE, citations ลิงก์เข้า `/work/[slug]`. verified E2E (mock fetch): LINE→LIFF projects, RAG→multi-llm+smartmath
      — TODO ถ้าอยาก repo public แยก: extract `/playground` + `lib/rag.ts` เป็น standalone template ทีหลัง
- [x] **LIFF QR check-in starter** (2026-07-13) — repo แยก `~/Projects/DIY_ENGINEERING/liff-checkin-starter`
      **public แล้ว: https://github.com/NTCHz/liff-checkin-starter** (2 repo public ตอนนี้ กับ off-by-none).
      vanilla LIFF frontend + **browser demo mode** (mock identity ไม่ต้องมี LINE), Bun+Elysia backend
      (in-memory store dedupe ต่อ event/userId), bun test 4/4, Dockerfile + MIT + README.
      verified: check-in → already-checked-in → error states.
      **ค้างฝั่งนาย:** สร้าง LIFF ID (LINE console) + deploy Coolify `demo-checkin.vlls.space` → ค่อยเพิ่มการ์ด project + live link ในเว็บ

ได้ 3 เด้ง: live demo กดเล่นได้ / เพิ่ม repo public บน GitHub (ตอนนี้เด่นแค่ off-by-none) / ไม่ติดสิทธิ์ใคร

## เนื้อหา (ดันคะแนน content 7→9)

- [ ] 1. **Case study 1-2 ระบบ** — หน้า detail ต่อ project (ปัญหา → ทางแก้ → ผลลัพธ์ + ภาพ/diagram ละเอียด)
      เริ่มจาก SmartMath หรือ Repair platform — เปลี่ยนเว็บจาก "รายการ" เป็น "หลักฐาน"
- [ ] 2. **ตัวเลขจริงใน proof lines** — จำนวน users, orders/วัน, uptime ของระบบลูกค้าที่พอเปิดเผยได้ — ถามลูกค้า/ดูจาก DB
- [x] 3. **รูป screenshot ระบบที่โชว์ได้** — เสร็จกับ Phase A (2026-07-12): featured 4/4 มีภาพ, archive 4 รายการมี hover preview

## Job-hunt loop

- [ ] 4. อัพเดต **LinkedIn** ให้ลิงก์กลับมาที่ portfolio — ฝั่ง GitHub README ทำแล้ว (badge Portfolio + Resume, 2026-07-11)
- [ ] 5. เปิด **CF Web Analytics** ดูสถิติหลังส่งสมัครงาน — รู้ว่า recruiter คลิกไหม (RUM เปิดอยู่แล้วใน CF)

## เว็บ (nice-to-have)

- [x] 6. **Micro-interaction** — hover ที่ archive row มี screenshot preview ลอย (2026-07-12, เฉพาะ row ที่มีภาพ)
- [x] 7. **หน้า 404** ธีมเดียวกัน (2026-07-13) — `app/not-found.tsx`, display 404 + accent dot + CTA
- [x] 8. **OG image ต่อ project** (2026-07-13) — `app/work/[slug]/opengraph-image.tsx` (next/og ImageResponse,
      dark card: role + ชื่อ + tech + domain), 15 การ์ด prerendered. twitter:image ของ detail คง fallback เป็น
      site og-v2 (X = channel รอง; og:image ต่อ project ใช้ได้ครบทุกที่ที่แชร์จริง — LINE/FB/LinkedIn)

## Infra

- [ ] 9. **Backup**: `/data/coolify` + Postgres ยังไม่มี backup ออกนอกเครื่อง — Coolify มี S3 backup ในตัว ชี้ไป MinIO/B2 ได้
- [ ] 10. ต่อ **notification** (Discord/Telegram) ใน Coolify — ตั้งเตือน disk 70% ไว้แล้วแต่ไม่มีช่องทางส่ง
- [ ] 11. **Uptime-kuma** เพิ่ม monitor portfolio.vlls.space + แจ้งเตือนเว็บล่ม (kuma รันอยู่แล้วใน VM เดียวกัน)
- [ ] 12. เปิด **2FA ใน Coolify** (Profile → Two-factor Authentication — ค้างจากวันแรก)
- [ ] 13. **ตุลา 2026: ย้าย domain** — จุดที่ต้องแก้: CF tunnel hostnames, Coolify wildcard + app domain,
      `metadataBase`/OG ใน `app/layout.tsx`, ลิงก์ใน `resume/resume.tex`, `public/llms.txt`

## หมายเหตุการทำงาน

- แก้แล้ว **โชว์ local ก่อน push เสมอ** (push = auto-deploy production)
- เนื้อหา project อยู่ `data/projects.ts` / resume อยู่ `resume/resume.tex` (compile เอง แล้ววาง `public/resume.pdf`)
- Coolify API token: gen ใหม่ผ่าน `docker exec coolify php artisan tinker` (ดู memory homelab-deploy-pipeline)
