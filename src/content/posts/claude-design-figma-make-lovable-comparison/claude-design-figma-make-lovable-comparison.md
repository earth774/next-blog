---
title: "Claude Design vs Figma Make vs Lovable: เทียบเครื่องมือสร้าง UI/แอปด้วย AI ปี 2026"
date: "2026-04-19"
excerpt: "เปรียบเทียบ Claude Design (เปิดตัวเมษายน 2026), Figma Make และ Lovable ในมุมความสามารถ ราคา และ workflow สำหรับนักพัฒนา นักออกแบบ PM และ founder คนไทย"
author: "AI Research"
tags:
  - AI
  - Design Tools
  - App Builder
  - Claude Design
  - Figma Make
  - Lovable
  - Comparison
---

ปี 2026 เส้นแบ่งระหว่าง "นักออกแบบ" กับ "นักพัฒนา" จางลงเรื่อย ๆ AI ทำให้คนเดียวเดินจาก prompt ถึง production ได้ในวันเดียว และเมื่อวันที่ 17 เมษายน 2026 ที่ผ่านมา Anthropic ก็เพิ่งเปิดตัว **Claude Design** ซึ่งเป็น product แยกต่างหากที่ `claude.ai/design` ทำให้ landscape ของเครื่องมือ AI สำหรับงานออกแบบและสร้างแอปเปลี่ยนไปอีกขั้น

คำถามที่ทีมไทยถามกันบ่อยขึ้นคือ "ตกลงควรใช้ตัวไหน ระหว่าง Claude Design, Figma Make และ Lovable?" คำตอบสั้น ๆ คือไม่มีตัวไหนชนะแบบเบ็ดเสร็จ ทั้งสามตัวถูกออกแบบมาเพื่อผู้ใช้คนละแบบและยืนคนละชั้นของ stack บทความนี้จะเทียบความสามารถ ราคา และ use case จริงให้นักพัฒนา นักออกแบบ PM และ founder คนไทยตัดสินใจได้เร็วขึ้น

> หมายเหตุ: ข้อมูลอ้างอิงถึงวันที่ 19 เมษายน 2026 ราคาและฟีเจอร์อาจเปลี่ยนแปลง ควรเช็กกับหน้า pricing ทางการอีกครั้งก่อนตัดสินใจ

## ทำไมเรื่องนี้สำคัญในปี 2026

ในช่วงไม่กี่เดือนที่ผ่านมา เครื่องมือ AI เปลี่ยนไปสามเรื่องสำคัญ:

- **โมเดลเก่งขึ้นมาก** Claude Opus 4.7 ที่ออกเมื่อ 16 เมษายน 2026 ทำคะแนน SWE-bench Verified 87.6% และ SWE-bench Pro 64.3% เปลี่ยนเส้นมาตรฐานของ coding agent
- **Anthropic เพิ่งเปิด Claude Design** เมื่อ 17 เมษายน 2026 เป็น visual creation product แยกต่างหาก มี canvas ของตัวเอง เล็งกลุ่ม non-designer โดยตรง
- **Full-stack builder โตเร็ว** Lovable, v0, Bolt และอื่น ๆ ทำให้คนที่ไม่ใช่ full-stack dev ก็ปั้น SaaS MVP ออกสู่ production ได้ บวกกับ MCP และ Agent Skills ที่เป็นมาตรฐานกลาง ทำให้เครื่องมือต่อกันได้โดยไม่ผูกแพลตฟอร์มเดียว

การเลือกเครื่องมือผิดไม่ใช่แค่เสียเงิน แต่เสียเวลาทีมด้วย เช่น ทีมที่ใช้ Figma อยู่แล้วและต้องทำ prototype ให้ stakeholder การไปเริ่มที่ Lovable อาจ overkill ในทางกลับกัน startup ที่อยากส่ง MVP ให้ลูกค้าจ่ายเงินจริง การเริ่มที่ Claude Design ก็จะติดปัญหาเรื่อง deployment เพราะไม่ได้ออกแบบมาให้ deploy เป็น product เอง

## Claude Design: visual creation product ใหม่จาก Anthropic

Claude Design เป็น product **แยกต่างหาก** ของ Anthropic เข้าถึงผ่าน `claude.ai/design` วางตัวเป็น visual creation surface ที่มี canvas ของตัวเอง ทำงานแบบ conversational และใช้ Claude Opus 4.7 เป็นโมเดลเบื้องหลัง

### ระวังสับสนกับ product อื่นของ Anthropic

ก่อนอื่นต้องแยกให้ชัด เพราะชื่อในตลาดเริ่มปนกันมาก:

- **Claude Design** ไม่ใช่ **Artifacts** (ฟีเจอร์ใน Claude chat)
- **Claude Design** ไม่ใช่ **Claude Imagine** (desktop app ที่ยัง limited preview)
- **Claude Design** ไม่ใช่ **Claude Code** (CLI สำหรับ developer)
- **Claude Design** ไม่ใช่ **`claude.com/plugins/design`** ซึ่งเป็นคนละตัว (เป็น Claude Code plugin)

Claude Design เข้าใช้ที่ `claude.ai/design` เท่านั้น และถูก pair กับ Claude Code ผ่าน "handoff bundle" ซึ่งเป็นจุดขายเฉพาะตัว (จะอธิบายต่อด้านล่าง)

### สถานะและการเข้าถึง

- เปิดตัว **17 เมษายน 2026** (The Information leak 15 เมษายน)
- สถานะปัจจุบันคือ **Research Preview** ยังไม่ใช่ GA
- สำหรับ Enterprise จะ **ปิดไว้ by default** admin ต้องเปิดผ่าน org settings ก่อนทีมใช้ได้

### Capabilities

**Input ที่รับ:** text prompt หรือ brief, รูปภาพ, เอกสาร DOCX/PPTX/XLSX, codebase รวมถึง **web capture** ที่จับ element จาก live site มาเป็น reference ได้

**Output ที่สร้างได้:** pitch decks, interactive prototypes, landing pages, one-pagers, social assets, marketing collateral, product mockups

**Canvas** ของ Claude Design มีความสามารถที่สำคัญ:

- แก้ text ตรง ๆ บน canvas
- ใส่ inline comment ต่อ element เฉพาะ
- **Custom adjustment slider** (spacing, color, layout) ที่ Claude generate ขึ้นมาเองตาม context ของงาน
- Follow-up prompt สำหรับ refine ซ้ำ ๆ

**Design system อัตโนมัติ** ตอน onboarding Claude จะอ่าน codebase และ design file แล้วประกอบ design system (color, typography, component) ขึ้นมาให้เอง โปรเจกต์ถัดไปใช้ต่อได้ องค์กรเก็บได้หลาย design system และสลับไปมาได้

**Collaboration** scope อยู่ระดับ org, ตั้ง private หรือ share view-only ผ่าน link ได้ รองรับ group editing ที่หลายคน chat กับ Claude ใน canvas เดียวกัน แต่ยัง **ไม่ใช่ real-time multiplayer เต็มรูปแบบอย่าง Figma**

**Export/Handoff**

- Internal URL, standalone HTML, PDF, PPTX
- **Canva export** ผ่าน partnership
- **Handoff bundle → Claude Code** จุดขายสำคัญที่ตัดขั้น translation design↔dev ออก

### Model เบื้องหลัง

Claude Design รันบน **Claude Opus 4.7** ซึ่งเป็น flagship ของ Anthropic ที่ออกในสัปดาห์เดียวกัน Anthropic ใช้ dual-track: Opus 4.7 สำหรับ commercial, Mythos สำหรับ frontier (ปิด preview) โดย Claude Design อยู่บน commercial track

### Pricing

สิ่งที่ต่างจากคู่แข่งคือ Claude Design **ไม่มี plan แยก** รวมอยู่ใน subscription ของ Claude ที่มีอยู่แล้ว ได้แก่ Pro, Max, Team, Enterprise โดย **ไม่คิดเงินเพิ่ม** แต่จะกินโควตา usage ของ subscription นั้น ๆ ซื้อ extra usage เพิ่มได้

ข้อสังเกตสำคัญ:

- **Free tier ไม่ได้สิทธิ์ใช้ Claude Design**
- มีรีวิวหนึ่งระบุว่าใช้โปรเจกต์ซับซ้อนครั้งหนึ่งกิน **ประมาณ 50% ของ weekly allotment บน Pro** (เป็น single source ควร verify อีกครั้ง)

สำหรับราคา subscription ที่ Claude Design รวมอยู่ด้วย (จาก claude.com/pricing):

- **Pro**: $17/เดือน (annual) หรือ $20/เดือน (monthly) — รวม Claude Code, Opus access, Claude Design
- **Max 5x**: $100/เดือน usage 5 เท่าของ Pro
- **Max 20x**: $200/เดือน usage 20 เท่า
- **Team Standard**: $20/seat/เดือน (annual) ขั้นต่ำ 5 seat, มี SSO
- **Enterprise**: custom pricing (ติดต่อทีมขาย) รองรับ HIPAA, SCIM, SSO ระดับองค์กร (Claude Design ปิด by default, admin ต้องเปิดเอง)

### จุดแข็ง (อ้างอิงรีวิวจริง)

- **Iteration compression แรงมาก** มีเคสจาก Brilliant ที่ลดจาก 20+ prompts เหลือ 2 prompts
- PM จาก Datadog อธิบายว่า "idea → working prototype ก่อนคนเดินออกจากห้อง"
- Brand consistency อัตโนมัติ อ่าน codebase แล้ว output ตรง brand
- **Handoff → Claude Code** ตัดขั้น translation design↔dev ออก เป็น architectural seam ที่สำคัญมาก
- Learning curve ต่ำ เน้น chat-first
- รับ input หลากหลาย เอกสาร office, web capture, codebase

### จุดอ่อน

- ยังเป็น Research Preview ยังไม่ใช่ production surface
- Token cost สูง กิน quota เร็ว
- ไม่ใช่ real-time multiplayer เต็มตัวแบบ Figma
- Fidelity ยังไม่ลึกเท่าเครื่องมือเฉพาะทาง เหมาะเป็น ideation/exploration layer ส่งต่อ Canva หรือ Claude Code มากกว่าเป็น production-grade
- ยังไม่ยืนยันว่ามี version history, component library หรือ accessibility audit built-in
- **Free tier ใช้ไม่ได้**
- ไม่มี mobile app (web เท่านั้น)

## Figma Make: prompt-to-prototype สำหรับทีม design-first

Figma Make เปิด GA เดือนกรกฎาคม 2025 วางตัวเป็นฟีเจอร์ภายใน Figma ที่แปลง prompt เป็น interactive prototype ไปจนถึง web app โดยผูกกับ design system ของทีม

การมาของ Supabase integration แบบ native ตั้งแต่ต้นปี 2026 ทำให้ Figma Make ไม่ใช่แค่เครื่อง prototype อีกต่อไป เพราะ AI แนะนำเพิ่ม backend, auth, database ให้อัตโนมัติเมื่อรู้ว่า flow ที่ออกแบบต้องการ persistence

ด้าน input รับ text prompt, Figma file/frame, image และ design system library ส่วน output เป็น interactive prototype กับ editable code (HTML/CSS/JS, React) ที่เผยแพร่ขึ้น Figma Community หรือ export ผ่าน MCP ไปให้ VS Code, Cursor, Claude Code ใช้ต่อได้

ฝั่ง backend รองรับ email/password, magic link, OAuth (Google, GitHub) บวกกับ RLS, Postgres, Storage, Vector, Edge Functions ครบตามมาตรฐาน Supabase

### จุดแข็ง

- Workflow ลื่นมากถ้าทีมใช้ Figma อยู่แล้ว
- ดึง design system library มาเป็น context ให้ AI ได้ตรง ๆ
- Figma MCP server ให้ Cursor/Claude Code อ่าน design spec
- ราคา Pro $16/เดือน คุ้มเมื่อเทียบกับ feature
- Real-time multiplayer และ unlimited version history แบบ Figma ที่คนคุ้นเคย

### จุดอ่อน

- Code ที่ออกมามัก verbose เกินไป รีวิวหลายที่รายงานว่าแอปเล็ก ๆ เกิน 3,000 บรรทัด และ regenerate ครั้งละ 1,600+ บรรทัดเวลาแก้
- AI บางครั้งตัดสินใจเปลี่ยนโครงสร้าง (เช่น radio button → select) โดยไม่ถาม
- Prompt guidance ยังน้อยเมื่อเทียบกับ Lovable
- Import screen ทำทีละอัน
- รีวิวบางที่ในปี 2026 ยังเรียก Beta ทั้งที่ประกาศ GA แล้ว (อาจสับสนกับ Figma Sites)

### ราคา (จาก figma.com/pricing)

- **Starter (Free)**: $0, 150 AI credits/วัน สูงสุด 500/เดือน
- **Professional**: $16/เดือน Full seat, $12 Dev, $3 Collab, 3,000 credits/เดือน
- **Organization (annual)**: $55/เดือน Full, $25 Dev, $5 Collab, 3,500 credits/เดือน
- **Enterprise (annual)**: $90/เดือน Full, $35 Dev, $5 Collab, 4,250 credits/เดือน

ข้อควรระวัง: Figma Make ต้องใช้ Full seat เท่านั้น ทีมที่คิดว่าใช้ Dev/Collab seat จะพลาด

## Lovable: full-stack builder จริงจังที่สุดในสาม

Lovable วางตัวเป็น full-stack vibe coding platform เขียน prompt แล้วได้ web app ที่ deploy-ready พร้อม database, auth และ payment ครบในที่เดียว ใน 3 ตัวที่เปรียบเทียบ Lovable คือตัวที่ "สร้างของไปขายลูกค้าได้" มากที่สุด

ด้าน input รับ text prompt, image (screenshot, Figma export) และ GitHub repo แบบ 2-way sync output คือ full-stack web app deploy ทันทีในโดเมน project-name.lovable.app (Pro ขึ้นไปผูก custom domain ได้) และ export code ออกมาเป็นของตัวเองได้ทั้งหมด

Stack ที่ fix ไว้:

- React 18 + Vite + TypeScript
- Tailwind + shadcn/ui
- React Router
- Supabase (Postgres + Auth + Storage)
- Resend (email)
- Stripe (payment)
- Lovable Cloud (CDN + HTTPS อัตโนมัติผ่าน Let's Encrypt)

ฝั่ง backend ได้ Postgres เต็ม CRUD, real-time, RLS, full-text search, foreign keys ด้าน auth รองรับ email/password, magic link, phone OTP, OAuth (Google, GitHub, Apple, Discord) ส่วน payment มี Stripe แบบ built-in ครบทั้ง one-time และ subscription ซึ่งเร่ง SaaS MVP ได้มาก

Compliance: Lovable ได้ทั้ง SOC 2 Type II และ ISO 27001 เป็นข้อดีชัดเจนสำหรับทีม B2B ในไทยที่ลูกค้าเริ่มถามเรื่องนี้มากขึ้น

### ระบบ Credit

- **Agent Mode**: credit ตามความซับซ้อน เช่น แก้ style 0.50 credit, สร้าง landing page 1.70 credit
- **Plan Mode**: 1 credit ต่อ message (วางแผนอย่างเดียวไม่แก้ code)
- **"Try to fix"**: ฟรี
- Reset รายเดือนตาม renewal date, daily reset ที่ 00:00 UTC

### จุดแข็ง

- Production-grade full-stack ออกมาทันที
- Stack ที่ใช้เป็นที่ community ไทยคุ้นเคยอยู่แล้ว
- ไม่มี lock-in ทั้ง code และ data portable, self-host ได้
- GitHub 2-way sync ต่อยอดใน IDE ต่อได้
- SOC 2 + ISO 27001 บวก Stripe built-in เหมาะกับ SaaS MVP

### จุดอ่อน

- ต้องมีพื้นฐาน Git, database, web อยู่บ้าง
- Stack fix ไม่รองรับ Next.js, Vue, Svelte
- ไม่มี visual design tool
- Credit หมดเร็วถ้า prompt ซับซ้อนและ regenerate บ่อย

### ราคา (จาก lovable.dev/pricing)

- **Free**: $0, 5 credits/วัน สูงสุด 30/เดือน, project เป็น public, unlimited collaborators
- **Pro**: $25/เดือน (monthly) หรือ $21/เดือน (annual), 100 credits/เดือน (rollover ได้) + 5 credits/วัน (รีเซ็ตทุกวัน), custom domain, remove badge, private project, user roles
- **Business**: $50/เดือน (monthly) หรือ $42/เดือน (annual), 100 credits/เดือน, SSO, team workspace, role-based, security center
- **Enterprise**: custom, SCIM, audit logs, custom connectors, dedicated support

ส่วนลดที่น่าสนใจ: annual ลดประมาณ 16% และมีโปรนักศึกษาลดประมาณ 50% ของ Pro (ควรตรวจสอบเงื่อนไขกับ Lovable อีกครั้งก่อนสมัคร) นอกจากนี้ยัง top-up credits เพิ่มและแชร์ระหว่างสมาชิกในทีมได้

## ตารางเปรียบเทียบราคา

| Plan           | Claude Design (รวมใน Claude)                       | Figma Make (Full seat) | Lovable                                   |
| -------------- | -------------------------------------------------- | ---------------------- | ----------------------------------------- |
| Free           | ไม่รวม Claude Design                               | $0, 150 credits/วัน    | $0, 5 credits/วัน                         |
| Pro (เริ่มต้น) | $17/mo annual ($20 monthly) + Claude Design + Code | $16/mo + 3,000 credits | $21/mo annual ($25 monthly) + 100 credits |
| Mid tier       | Max 5x $100/mo                                     | Organization $55/mo    | Business $42/mo annual ($50 monthly)      |
| Heavy          | Max 20x $200/mo                                    | Enterprise $90/mo      | Enterprise custom                         |
| Team SSO       | Team $20/seat annual                               | Org/Enterprise         | Business $42/seat                         |
| โมเดลคิดเงิน   | Usage quota (share กับฟีเจอร์อื่น)                 | Seat + AI credits      | Credits (ตามความซับซ้อน)                  |

ข้อสังเกต: Claude Design **ไม่มี plan เฉพาะ** รวมอยู่ใน Pro ขึ้นไปทุก tier โดยไม่คิดเงินเพิ่มแต่กิน usage quota ของ subscription เดิม ต่างจาก Figma Make ที่คิดเป็น seat + credits และ Lovable ที่คิดตามความซับซ้อนของงาน การประเมินค่าใช้จ่ายจริงควรดูรูปแบบการใช้งานของทีมมากกว่าตัวเลขป้ายราคา

## ตารางเปรียบเทียบฟีเจอร์

| หัวข้อ           | Claude Design                                        | Figma Make                             | Lovable                               |
| ---------------- | ---------------------------------------------------- | -------------------------------------- | ------------------------------------- |
| Input            | Text, image, DOCX/PPTX/XLSX, codebase, web capture   | Text, Figma file, image, design system | Text, image, GitHub                   |
| Output           | Deck, prototype, landing, one-pager, marketing asset | Prototype + code                       | Deploy-ready app                      |
| Canvas           | มี canvas + slider ปรับ spacing/color/layout         | Figma canvas                           | ไม่มี (chat-first)                    |
| Tech stack       | ไม่ opinionated (ส่งต่อ Claude Code)                 | React-ish                              | Fix: React + Vite + Tailwind + shadcn |
| Backend built-in | ไม่มี                                                | มี (Supabase)                          | มี (Supabase)                         |
| Auth built-in    | ไม่มี                                                | มี                                     | มี                                    |
| Payment built-in | ไม่มี                                                | ไม่มี                                  | มี (Stripe)                           |
| Deployment       | Internal URL, HTML, PDF, PPTX, Canva export          | Figma Community                        | .lovable.app + custom domain          |
| Handoff → dev    | Handoff bundle → Claude Code                         | Figma MCP → IDE                        | GitHub 2-way sync                     |
| Multiplayer      | Group editing ไม่ใช่ real-time เต็มตัว               | Native realtime                        | Unlimited collaborators               |
| MCP              | Core (Claude ecosystem)                              | มี MCP server                          | ยังไม่รองรับตรง                       |
| Design system    | อ่าน codebase ประกอบให้อัตโนมัติ                     | Library context                        | ผ่าน shadcn                           |
| Status           | Research Preview                                     | GA (บางรีวิวยังเรียก Beta)             | GA                                    |
| เหมาะกับใคร      | Non-designer: founder, PM, marketer                  | Designer, UX, PM ทีมใช้ Figma          | Founder, indie, MVP                   |

## เลือกตัวไหนดี?

การเลือกควรมาจากคำถามว่า "ผลลัพธ์ที่ต้องการคืออะไร" ไม่ใช่ "ตัวไหนเจ๋งกว่า"

### ถ้าคุณเป็น Non-Designer (Founder, PM, Marketer)

ลอง **Claude Design** เป็นอันดับแรก เพราะ Anthropic ออกแบบมาสำหรับกลุ่มนี้โดยตรง จุดแข็งคือ learning curve ต่ำ chat-first ทำ pitch deck, landing page mockup, marketing asset ได้เร็ว และถ้ามี subscription Claude Pro/Max อยู่แล้วก็ไม่ต้องจ่ายเพิ่ม ข้อควรระวังคือยัง Research Preview, Free tier ใช้ไม่ได้ และไม่เหมาะจะเป็น production surface ตัวเดียวจบ

### ถ้าคุณเป็น Designer หรือ UX/PM

ใช้ **Figma Make** ถ้าทีมใช้ Figma อยู่แล้ว ได้ workflow ที่ไม่ต้องเปลี่ยน tool การทำ prototype ให้ stakeholder ตัดสินใจจะเร็วที่สุด และเมื่อ handoff ก็ export MCP ไปให้ dev ใช้ใน Cursor/Claude Code ได้ ต้องรับเรื่อง code ที่ verbose ในระดับหนึ่ง

### ถ้าคุณเป็น Founder หรือ Indie Hacker

ใช้ **Lovable** ถ้าเป้าหมายคือ "มีผลิตภัณฑ์ไปขายลูกค้า" ภายในไม่กี่วัน เพราะได้ทั้ง database, auth, payment, hosting, custom domain ครบในที่เดียว stack ที่ fix (React + Vite + Tailwind + shadcn + Supabase) เป็น stack ที่ freelance ไทยจำนวนมากรับช่วงต่อได้ บวกกับ SOC 2/ISO 27001 ถ้าทำ B2B

### ถ้าคุณเป็น Developer

Claude Design ไม่ใช่ tool ที่ออกแบบมาให้คุณใช้ตรง ๆ แต่คุณจะได้ประโยชน์จาก **handoff bundle → Claude Code** เมื่อทีม design/PM ส่งงานมา สำหรับงานเขียน code เองยังควรใช้ **Claude Code** ใน Claude Pro ($17/เดือน annual) ซึ่งรวมอยู่ใน plan เดียวกับ Claude Design พอดี

### ถ้าคุณเป็น Technical PM หรือ Ops

แนะนำให้ใช้ **Claude Design + Lovable** คู่กันเพื่อ flexibility สูงสุด โดยใช้ Claude Design ปั้นไอเดีย mockup และ design system แล้วส่งต่อ Lovable ไปทำ internal tool หรือ MVP ที่ deploy ได้จริง

## ใช้ร่วมกันได้ไหม workflow แบบ layered ในปี 2026

ข่าวดีคือไม่ต้องเลือกตัวเดียว ทั้งสามเริ่มเชื่อมกันได้ผ่าน handoff bundle, MCP, GitHub และ Supabase ที่เป็นมาตรฐานกลาง Anthropic เองก็ position Claude Design ให้เป็น **upstream ideation layer** ไม่ใช่คู่แข่งตรง ๆ กับ Figma หรือ Canva (Canva เป็น partner อย่างเป็นทางการ และ CEO ของ Canva ได้ออกความเห็นสนับสนุนในช่วง launch)

Pattern ที่เริ่มเห็น:

1. **Claude Design → Canva** ปั้น pitch deck หรือ marketing asset ใน Claude Design แล้ว export ไป polish/publish ต่อใน Canva
2. **Claude Design → Figma Make** ใช้ Claude Design สำรวจ concept และสร้าง design system แล้วส่งต่อ Figma Make เพื่อทำ prototype review ใน Figma ecosystem
3. **Claude Design → Claude Code** ใช้ handoff bundle ส่งต่อให้ Claude Code ทำ production โดยตัด translation design↔dev ออก
4. **Claude Design → Lovable** ใช้ Claude Design ทำ design system และ landing page mockup แล้วส่งเข้า Lovable เพื่อ scale เป็น deployable app
5. **Lovable MVP → GitHub → Claude Code ใน IDE** Founder ปั้น MVP ใน Lovable sync GitHub แล้วนักพัฒนาเข้ามาแก้ต่อใน IDE

### Integration ที่ใช้ได้จริงตอนนี้

- Claude Design กับ Claude Code ผ่าน handoff bundle
- Claude Design กับ Canva ผ่าน partnership export
- Figma กับ Cursor/Claude Code ผ่าน MCP (Pro seat ขึ้นไป)
- Lovable กับ GitHub 2-way sync native
- Lovable กับ Supabase, Stripe, Resend built-in
- Claude ecosystem กับ connector หลายตัวผ่าน MCP (Notion, Figma, Jira, Intercom, Cloudflare, Slack)

ภาพรวม: Claude Design จับชั้น ideation/design system, Figma Make จับชั้น design review/prototype, Lovable จับชั้น product delivery ที่ deploy จริง และ Claude Code ยืนเป็น production layer ที่รับ handoff จากทุกทิศทางผ่าน MCP และ handoff bundle

## สรุปและ Takeaway

สามตัวนี้ไม่ได้แข่งกันตรง ๆ แต่เลือกใช้ผิดบริบทก็เสียทั้งเงินและเวลา สิ่งที่ควรจำ:

- **Claude Design** เพิ่งเปิดตัว 17 เมษายน 2026 เป็น Research Preview รวมใน Claude Pro/Max/Team/Enterprise โดยไม่คิดเงินเพิ่ม (Free ใช้ไม่ได้) เหมาะกับ non-designer ที่อยากปั้น deck, prototype, design system เร็ว ๆ จุดขายคือ handoff bundle → Claude Code
- **Figma Make** เหมาะกับทีม design-first ที่ใช้ Figma อยู่แล้ว workflow ลื่น ใช้ design system เดิมได้ แต่ต้องรับเรื่อง code verbose ราคา Pro $16/เดือน ต้องใช้ Full seat
- **Lovable** เหมาะกับ founder/indie hacker ที่อยากส่งผลิตภัณฑ์ถึงมือลูกค้าเร็วที่สุด มี Stripe, auth, DB ครบ และ SOC 2/ISO 27001 สำหรับ B2B
- **ใช้ร่วมกันได้** ผ่าน handoff bundle, MCP, GitHub และ Canva partnership ซึ่งเป็นมาตรฐานกลางในปี 2026

คำแนะนำสุดท้าย: ถ้ายังลังเล ลองใช้ tier ที่ถูกที่สุดของทั้งสามตัวกับงานเดียวกัน (เช่น ปั้น landing page พร้อม form เก็บ email) แล้วดูว่า workflow ไหนสบายมือที่สุดในบริบทของทีมคุณ ข้อมูลราคาและฟีเจอร์เปลี่ยนเร็วมาก โดยเฉพาะ Claude Design ที่ยังเป็น Research Preview ควรเช็กหน้า pricing และประกาศทางการอีกครั้งก่อนจ่ายเงินจริง

## ข้อมูลที่ยังไม่แน่ชัด

Claude Design เพิ่งเปิดตัว 2 วันก่อนวันเขียนบทความนี้ ข้อมูลบางส่วนยังต้อง verify:

1. **Official announcement URL** ณ วันเขียน ยังไม่พบ blog post ทางการจาก anthropic.com ที่ประกาศ Claude Design ควรตรวจสอบอีกครั้งก่อน publish
2. **Pricing และ usage limit จริง** ข้อมูลว่าโปรเจกต์ซับซ้อนกินประมาณ 50% ของ weekly allotment บน Pro มาจาก single source ยังไม่มีข้อมูลยืนยันจาก Anthropic โดยตรง
3. **Multiplayer depth** ข้อความจาก Anthropic บอกว่ามี group editing แต่ยังไม่ใช่ real-time multiplayer แบบ Figma ยังไม่ชัดว่า limitation เท่าไร
4. **Image generation** ขอบเขตและโมเดลเบื้องหลังยังไม่ชัด
5. **Region availability** ยังไม่ทราบว่ารองรับผู้ใช้ในไทยหรือ APAC แบบไหน
6. **API access** ยังไม่ทราบว่า Claude Design มี API แยกหรือต้องใช้ผ่าน `claude.ai/design` อย่างเดียว

สำหรับ Figma Make และ Lovable ก็มีจุดที่ควร flag:

- **Figma Make** บางรีวิวกลางปี 2026 ยังเรียกว่า Beta ทั้งที่ Figma ประกาศ GA ตั้งแต่กรกฎาคม 2025 อาจสับสนกับ Figma Sites
- **Figma seat-based pricing** ทีมขนาดใหญ่จ่ายแพงกว่าตัวเลขป้าย เพราะ Figma Make ต้องใช้ Full seat เท่านั้น
- **Lovable student discount** ส่วนลดนักศึกษาควร verify กับทีม Lovable อีกครั้ง

## อ้างอิง / References

- [Claude Design (entry)](https://claude.ai/design)
- [Claude Pricing](https://claude.com/pricing)
- [Anthropic Just Launched Claude Design — Here's What It Actually Changes for Non-Designers (dev.to)](https://dev.to/om_shree_0709/anthropic-just-launched-claude-design-heres-what-it-actually-changes-for-non-designers-5e3e)
- [Anthropic's New Design Tool Rivals Adobe and Figma (PYMNTS)](https://www.pymnts.com/artificial-intelligence-2/2026/anthropics-new-design-tool-rivals-adobe-and-figma/)
- [Anthropic Launches Claude Design, Figma and Canva Rival (Blockchain News)](https://blockchain.news/news/anthropic-launches-claude-design-figma-canva-rival)
- [Anthropic Launches Claude Design: Taking Claude Beyond Chat and Into Visual Creation (Zulo AI)](https://www.zuloai.com/blog/anthropic-launches-claude-design-taking-claude-beyond-chat-and-into-visual-creation/)
- [Claude Opus 4.7 Release (The Next Web)](https://thenextweb.com/news/anthropic-claude-opus-4-7-coding-agentic-benchmarks-release)
- [Build with Claude Artifacts (Anthropic News)](https://anthropic.com/news/build-artifacts)
- [Anthropic Skills](https://www.anthropic.com/index/skills)
- [Figma Pricing](https://www.figma.com/pricing/)
- [Figma Make General Availability](https://figma.com/blog/figma-make-general-availability)
- [Supabase Support for Figma Make](https://supabase.com/blog/figma-make-support-for-supabase)
- [Figma Make Review (LogRocket)](https://blog.logrocket.com/ux-design/figma-make-review/)
- [Lovable Pricing](https://lovable.dev/pricing)
- [Lovable Billing Plans FAQ](https://lovable.dev/faq/billing/plans)
- [Lovable Plans and Credits Docs](https://docs.lovable.dev/introduction/plans-and-credits)
- [Figma Make vs Lovable vs v0 (Fivecube)](https://fivecube.agency/blog/figma-make-vs-lovable-vs-v0)
