# Tech Blog Task List (2026)

รายการนี้ออกแบบให้ทยอยทำทีละบทความแบบเป็นระบบ โดยเรียงตามลำดับแนะนำ:

1. FedCM + Third-party Cookies
2. OWASP สำหรับ Agentic/LLM Security
3. MCP หลังเข้า Linux Foundation (AAIF)

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

## Backlog Ideas (ถัดไป)

- Next.js + AI SDK: Streaming Chat แบบ type-safe
- Next.js + OpenTelemetry: End-to-end tracing
- GitHub Actions OIDC: Deploy แบบไม่ใช้ long-lived secrets
- Playwright CI: ลด flaky tests ด้วย traces/artifacts