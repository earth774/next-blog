# Tech Blog Task List (2026)

รายการนี้ออกแบบให้ทยอยทำทีละบทความแบบเป็นระบบ โดยเรียงตามลำดับแนะนำ:

1. FedCM + Third-party Cookies
2. OWASP สำหรับ Agentic/LLM Security
3. MCP หลังเข้า Linux Foundation (AAIF)
4. **Cursor 3 — อัปเดตข่าวสาร / สรุปฟีเจอร์สำหรับนักพัฒนา** (สรุปจากบล็อกและ changelog ทางการ วันที่ 3.0: 2 เม.ย. 2026) — Agents Window, multi-workspace, agent แบบขนาน (local / worktree / cloud / SSH), handoff local↔cloud, Design Mode และ Agent Tabs, `/worktree` และ `/best-of-n`, Marketplace/plugins และประเด็น Enterprise

---

## [ ] Article 1: FedCM + Third-party Cookies Migration Checklist

### Goal

- เขียนบทความเชิงปฏิบัติที่ช่วยให้ทีมเว็บย้ายระบบ login ได้จริง

### Research & References

- รวบรวมแหล่งอ้างอิงหลักจาก Chrome และ Google Identity
- สรุป timeline/impact ที่ยืนยันได้จากแหล่งทางการ
- เก็บลิงก์อ้างอิงไว้ท้ายบทความอย่างน้อย 3 แหล่ง

### Content Outline

- เกริ่นปัญหา: third-party cookies กระทบ flow ไหนบ้าง
- อธิบาย FedCM คืออะไร และต่างจาก flow เดิมอย่างไร
- ทำ migration checklist แบบ step-by-step
- ใส่ส่วน "Pitfalls ที่เจอบ่อย" และวิธีตรวจสอบ
- สรุป action items ที่ผู้อ่านทำต่อได้ทันที

### Publish Checklist

- ทบทวนความถูกต้องของข้อมูลล่าสุดก่อน publish
- ตรวจคำ SEO และ meta description
- ใส่ internal links ไปบทความที่เกี่ยวข้อง

---

## [ ] Article 2: OWASP for Agentic/LLM Apps (Threat Model + Controls)

### Goal

- เขียนบทความที่ทีม dev ใช้เป็น security checklist ได้จริง

### Research & References

- สรุป OWASP Top 10 for LLM/Agentic Applications ฉบับล่าสุด
- จับคู่ "ความเสี่ยง -> วิธีป้องกัน" แบบนำไปใช้ได้
- เก็บลิงก์อ้างอิงไว้ท้ายบทความอย่างน้อย 3 แหล่ง

### Content Outline

- อธิบายความต่างระหว่าง chatbot app กับ agentic app
- แยก threat model เป็นหมวด (tool misuse, data leakage, excessive agency)
- วาง baseline controls (approval gates, scoped credentials, audit logs)
- ยกตัวอย่าง architecture แบบปลอดภัยขึ้น
- ปิดท้ายด้วย security checklist 10 ข้อ

### Publish Checklist

- ให้คำเตือนเรื่อง scope ของคำแนะนำ (ไม่แทน security audit)
- ตรวจความสม่ำเสมอของศัพท์เทคนิคในบทความ
- เพิ่ม CTA ให้ดาวน์โหลด checklist/template

---

## [ ] Article 3: MCP in 2026 After Linux Foundation (AAIF)

### Goal

- เขียนบทความเชิงกลยุทธ์ + ลงมือทำได้ สำหรับนักพัฒนาที่กำลังเริ่ม MCP

### Research & References

- สรุปประเด็นสำคัญจากประกาศ Linux Foundation และ Anthropic
- ทบทวน MCP spec ล่าสุดก่อนเขียนส่วนเทคนิค
- เก็บลิงก์อ้างอิงไว้ท้ายบทความอย่างน้อย 3 แหล่ง

### Content Outline

- อธิบาย "ทำไมเรื่อง governance สำคัญต่อ dev"
- สรุป MCP architecture แบบเข้าใจง่าย
- แนะนำแนวปฏิบัติด้าน security (least privilege tools, auth, logging)
- ให้ roadmap เริ่มต้น MCP ในทีม (pilot -> hardening -> production)
- สรุปว่าใครควรเริ่มตอนนี้ และเริ่มจากอะไร

### Publish Checklist

- ตรวจเวอร์ชันเอกสาร MCP และคำศัพท์ให้ทันสมัย
- เพิ่มภาพสรุป architecture 1 ภาพ
- ทำ TL;DR สำหรับผู้อ่านที่มีเวลาน้อย

---

## [ ] Article 4: Cursor 3 — อัปเดตข่าวสาร / สรุปฟีเจอร์สำหรับนักพัฒนา

### Goal

- เขียนบทความภาษาไทยแบบข่าว + เชิงปฏิบัติ สรุปเฉพาะข้อเท็จจริงที่อ้างอิงได้จากแหล่งทางการของ Cursor เกี่ยวกับ Cursor 3 (รุ่น 3.0 วันที่ **2 เมษายน 2026** ตาม [changelog 3.0](https://cursor.com/changelog/3-0))
- ช่วยให้นักพัฒนาอ่านแล้วรู้ว่ามีอะไรใหม่ เปิดใช้ยังไง และควรตรวจสอบเอกสารเพิ่มในจุดที่ละเอียดหรือเปลี่ยนเร็ว

### Research & References

- ยืนยันวันประกาศและเวอร์ชัน: [New Cursor Interface · Changelog 3.0](https://cursor.com/changelog/3-0) (Apr 2, 2026) และลิงก์ไป announcement ในหน้าเดียวกัน
- ประกาศหลัก: [Meet the new Cursor](https://cursor.com/blog/cursor-3) — บริบทผลิตภัณฑ์, multi-workspace, agent หลายตัวแบบขนาน, handoff local/cloud, diff/PR, Marketplace/plugins, วิธีเปิด Agents Window (`Cmd+Shift+P` → Agents Window)
- รายละเอียดฟีเจอร์ใน 3.0: [Changelog 3.0](https://cursor.com/changelog/3-0) — Agents Window (local, worktrees, cloud, remote SSH), Design Mode และ shortcuts, Agent Tabs, `/worktree`, `/best-of-n`, การถอด cloud agents ออกจาก Editor, Plugins & MCP, Enterprise & Teams, Other Improvements (ยกเฉพาะเมื่ออ้างอิงได้ชัด)
- ถ้าจะอธิบาย Composer 2 ในบริบท handoff/โมเดล: อ่านโพสต์ทางการของ Cursor เกี่ยวกับ Composer 2 — **verify in docs before publish** สำหรับรายละเอียดการใช้งานหรือขีดจำกัดที่ไม่ได้อ้างโดยตรง
- ติดตามอัปเดตหลัง 3.0: [Cursor Changelog](https://cursor.com/changelog)
- ขั้นตอนใช้งานละเอียด (คีย์ลัดบนแพลตฟอร์มอื่น): [Agents Window docs](https://cursor.com/docs/agent/agents-window) — **verify in docs before publish**

### Content Outline

- เกริ่นและขอบเขต: Cursor 3 เป็นอินเทอร์เฟซใหม่ที่จัดรอบ agent; วันที่ 3.0 ตาม changelog; ไม่สรุปราคาหรือฟีเจอร์ที่ไม่ปรากฏในแหล่งทางการ
- Agents Window และ multi-workspace: รันหลาย agent ขนานข้าม repo และสภาพแวดล้อม (local, worktrees, cloud, remote SSH); เปิดผ่าน Command Palette → Agents Window; สลับกลับ IDE ได้หรือเปิดคู่กัน
- แหล่งที่มาของ session และการทำงานแบบขนาน: agent ใน sidebar รวมที่เริ่มจากหลายช่องทาง (ตามบล็อก — mobile, web, desktop, Slack, GitHub, Linear); cloud agent มี demo/screenshot สำหรับตรวจ (ตามข้อความในบล็อก)
- Handoff ระหว่าง local กับ cloud: ย้าย session cloud → local เพื่อแก้และทดสอบบนเครื่อง; local → cloud เพื่อให้รันต่อเมื่องานยาวหรือออฟไลน์ (ตามบล็อก); กล่าวถึง Composer 2 เฉพาะในขอบเขตที่บล็อกระบุ — **verify before publish** ถ้าลงรายละเอียดเชิงลึก
- Design Mode (ใน Agents Window): annotate/target UI ในเบราว์เซอร์; shortcuts ตาม changelog (เช่น `⌘+Shift+D`, Shift+drag, `⌘+L`, `⌥+click` — ตรวจกับ docs ก่อน publish)
- Agent Tabs: ดูหลายแชทพร้อมกันแบบเคียงข้างหรือตาราง
- Editor: `/worktree`, `/best-of-n`; เลิกทางเลือกแบบเดิมใน Editor; **cloud agents ถูกเอาออกจาก Editor** (ตาม changelog)
- Marketplace / plugins: Cursor Marketplace, ติดตั้งจากแอป; Enterprise: การนำเข้า plugin บุคคลที่สาม default ปิดเมื่อยังไม่ตั้งค่า (ตาม changelog)
- Enterprise & Teams: สรุปเฉพาะที่ changelog ระบุ (เช่น audit log อ่านง่ายขึ้น, การตั้งค่า Admin สำหรับ cloud agents และ team secrets, attribution)
- ปิดท้าย: ลิงก์ไป docs/changelog; **verify** สำหรับรายการใน Other Improvements (เช่น Await tool, browser automation) หากลงลึก

### Publish Checklist

- ข้อความสำคัญอ้างอิงได้จาก [blog cursor-3](https://cursor.com/blog/cursor-3), [changelog 3-0](https://cursor.com/changelog/3-0) หรือ [changelog](https://cursor.com/changelog)
- ระบุวันที่ 3.0 เป็น **2 เมษายน 2026** ให้สอดคล้องกับหน้า changelog
- ไม่แต่งราคา แผน หรือขีดจำกัดที่ไม่ได้มาจากแหล่งทางการ
- คีย์ลัด `⌘` ใช้คำอธิบายสำหรับ Windows/Linux หรือชี้ไปอ่าน docs
- ทดสอบ `Cmd+Shift+P` → Agents Window และคำสั่ง `/worktree`, `/best-of-n` บนเวอร์ชันปัจจุบันของแอปก่อนเผยแพร่
- ตรวจ SEO: หัวข้อ, meta description, slug ตามสไตล์บล็อก

---

## Backlog Ideas (ถัดไป)

- Next.js + AI SDK: Streaming Chat แบบ type-safe
- Next.js + OpenTelemetry: End-to-end tracing
- GitHub Actions OIDC: Deploy แบบไม่ใช้ long-lived secrets
- Playwright CI: ลด flaky tests ด้วย traces/artifacts
