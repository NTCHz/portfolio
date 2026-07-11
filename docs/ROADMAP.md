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
- [ ] ง่าย: Fitness landing (repo: prime_ft), Multi-LLM Chat (repo: CorpAi), Uniqal Staff, Loyalty LIFF (repo: earn-point-water)
- [ ] กลาง: Repair platform (repo: repair — dashboard พอ), Logistics LINE OA (repo: fdj), Dorm Suite (repo: horpak), Field Ops admin
- [ ] หนัก: SmartMath (`~/Projects/CMU/MATHBOOKLM`) — รันเฉพาะ frontend + mock API พอ

หน้าที่ควรเก็บ: chat UI (multi-LLM chat), RAG/quiz (SmartMath), job dashboard (repair platform),
LINE OA admin + intent review (logistics), ตาราง billing + OCR meter (dorm suite)

## Phase B — Demo ของตัวเอง (IP เราเอง 100%)

สร้าง mini-project ใหม่ที่โชว์สกิลเดียวกับงานลูกค้า → deploy บน homelab + open-source:
- [ ] **mini RAG chat** (สกิลเดียวกับ multi-LLM chat/SmartMath) → `demo-rag.vlls.space` + repo public
- [ ] **LIFF QR check-in starter** (สกิล LINE platform ครอบ Meeting LIFF/Uniqal/Loyalty LIFF)

ได้ 3 เด้ง: live demo กดเล่นได้ / เพิ่ม repo public บน GitHub (ตอนนี้เด่นแค่ off-by-none) / ไม่ติดสิทธิ์ใคร

## เนื้อหา (ดันคะแนน content 7→9)

- [ ] 1. **Case study 1-2 ระบบ** — หน้า detail ต่อ project (ปัญหา → ทางแก้ → ผลลัพธ์ + ภาพ/diagram ละเอียด)
      เริ่มจาก SmartMath หรือ Repair platform — เปลี่ยนเว็บจาก "รายการ" เป็น "หลักฐาน"
- [ ] 2. **ตัวเลขจริงใน proof lines** — จำนวน users, orders/วัน, uptime ของระบบลูกค้าที่พอเปิดเผยได้ — ถามลูกค้า/ดูจาก DB
- [ ] 3. **รูป screenshot ระบบที่โชว์ได้** — เช่น dashboard repair platform (เบลอข้อมูลลูกค้า) → รวมกับ Phase A

## Job-hunt loop

- [ ] 4. อัพเดต **LinkedIn** ให้ลิงก์กลับมาที่ portfolio — ฝั่ง GitHub README ทำแล้ว (badge Portfolio + Resume, 2026-07-11)
- [ ] 5. เปิด **CF Web Analytics** ดูสถิติหลังส่งสมัครงาน — รู้ว่า recruiter คลิกไหม (RUM เปิดอยู่แล้วใน CF)

## เว็บ (nice-to-have)

- [ ] 6. **Micro-interaction** จำได้ 1 จุด — hover ที่ archive row แล้วมี preview ลอย (จาก critique เดิม)
- [ ] 7. **หน้า 404** ธีมเดียวกัน (ตอนนี้เป็น default Next)
- [ ] 8. **OG image ต่อ project** ถ้าทำ case study — แชร์ลิงก์ระบบไหนได้การ์ดของระบบนั้น

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
